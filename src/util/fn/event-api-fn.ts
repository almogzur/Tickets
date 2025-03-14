 // move  api updates functions and roolbcks  hear 

import { TheaterType } from "@/types/components-typs/admin/theater/admin-theater-types";
import { UserIsracardInfoType } from "@/types/pages-types/admin/user-biling-info-types";
import { ClientSelectedSeatType, IsracardGanerateSaleRequestType, IsracardGanerateSaleResponseType, IsracartCartItemType, modifieSeatValueFunctionType, PayPalCartItemType, PayPalClollectInfoObjectType, PayPalOrderType, PayPalRequestCapturedOrderType, PayPalResponceCapturedOrderType, RollbackTheaterApiResquestType, SavePayPalInvoceTpee, UpdateTheaterApiResquestType } from "@/types/pages-types/client/client-event-type";
import { Item, OrdersController, CheckoutPaymentIntent, OrderApplicationContextShippingPreference, ApiError ,   Client as PayPalClient,} from "@paypal/paypal-server-sdk";
import axios from "axios";
import { OnApproveActions} from '@paypal/paypal-js/types'

 // update select  seats function to select onle passed in seats


export const ValidateNotOcupideSeats = (oldT: TheaterType, newT: Partial<TheaterType>): boolean => {
    console.log("Validating Inoket");

    const existingTheaterSeats = { ...oldT };
    const newSeats = { ...newT };

    const combinedExistingSeats = { ...existingTheaterSeats.mainSeats, ...existingTheaterSeats.sideSeats };
    const combinedNewSeats = { ...newSeats.mainSeats, ...newSeats.sideSeats };

    for (const [rowName, rowSeats] of Object.entries(combinedExistingSeats)) {
        for (let index = 0; index < rowSeats.length; index++) {
            const seatValue = rowSeats[index];

            if (seatValue === 1 && combinedNewSeats[rowName]?.[index] === 2) {
                console.log("ValidateNotOcupideSeats", "new:", combinedNewSeats[rowName]?.[index], "old:", seatValue, "at ", rowName);
                return false;
            }
        }
    }

    return true;
};

export const selectSeats = (TheaterSeates: modifieSeatValueFunctionType): modifieSeatValueFunctionType => {
    const newTheaterSeatDetails = { ...TheaterSeates };
    const combinedSeats = { ...TheaterSeates.main, ...TheaterSeates.side };

    Object.entries(combinedSeats).forEach(([_, rowSeats]) => {
        rowSeats.forEach((value, index) => {
            if (value === 2) {
                rowSeats[index] = 1;
            }
        });
    });

    return newTheaterSeatDetails;
};

export const unSelectSeates = ( TheaterSeates: TheaterType, seats: ClientSelectedSeatType[]) :TheaterType =>  {
    
    const newTheaterSeatDetails = { ...TheaterSeates };
  
    seats.forEach((seat) => {
      if (newTheaterSeatDetails.mainSeats[seat.row]) {
        newTheaterSeatDetails.mainSeats[seat.row][seat.seatNumber] = 0;
      } else if (newTheaterSeatDetails.sideSeats[seat.row]) {
        newTheaterSeatDetails.sideSeats[seat.row][seat.seatNumber] = 0;
      }
    })
    
  
    return newTheaterSeatDetails;
};


export const roolBackEvent = async (Data : RollbackTheaterApiResquestType): Promise<boolean> => {
     try {
       if (!Data.Theater) {  return false }
       
       const { mainSeats, sideSeats } = Data.Theater
       const UpdateEventData: UpdateTheaterApiResquestType = {
                eventId : Data.eventId,
                reqTheater: { mainSeats, sideSeats },
                numerOfSeatsSealected: Data.cart.length
            }
       const UpdateEvent = await axios.post( `${process.env.NEXTAUTH_URL}`+"/api/client/events/rool-back-event", UpdateEventData,)
        
         return UpdateEvent.status === 200 ? true : false
        } catch (err) {
            console.log(err)
            return false
        }
};

export const updateEvent = async (Theater:TheaterType, eventId: string , cart: IsracartCartItemType[]|PayPalCartItemType[]): Promise<boolean> => {
    try {
        if (!Theater) {
             return false
             }
        const { mainSeats, sideSeats } = Theater

        const UpdateEventData: UpdateTheaterApiResquestType = {
            eventId,
            reqTheater: { mainSeats, sideSeats },
            numerOfSeatsSealected: cart.length
        }
        const UpdateEvent = await axios.post("/api/client/events/update-event", UpdateEventData,)
        return UpdateEvent.status === 200 ? true : false
    } catch (err) {
        console.log(err)
        return false
    }
};




export const saveInvoices = async (PayPalInvoice: PayPalOrderType, cart: PayPalCartItemType[], eventId: string, total: string): Promise<boolean> => {


  const currentDate = new Date();
  const dateString = currentDate.toLocaleDateString(); // Date part only.
  const timeString = currentDate.toLocaleTimeString();

  const invoice: SavePayPalInvoceTpee = {
    ...PayPalInvoice,
    cart,
    eventId,
    total,
    purchase_date: `${dateString} ${timeString}`,
  }

  try {
    const responce = await axios.post("/api/client/events/new-event-invoice", invoice)
    if (responce.status === 200 || responce.status === 201) {

      console.log("responce")
      return true


    }
    return false

  }
  catch (err) {
    return false
  }

}


export const createPayPalOrder = async (cart: Item[], total: string, client: PayPalClient) => {

    const ordersController = new OrdersController(client);
  
    const collect: PayPalClollectInfoObjectType = {
      body: {
        intent: CheckoutPaymentIntent.Capture,
        purchaseUnits: [
          {
            amount: {
              currencyCode: "USD",
              value: total,
              breakdown: { itemTotal: { value: total, currencyCode: "USD" } }
            },
            items: cart
          },
        ],
        applicationContext: {
          brandName: "Styled-Tickets",
          locale: "he",
          shippingPreference: OrderApplicationContextShippingPreference.NoShipping,
        },
      },
      prefer: "return=minimal",
    };
  
    try {
      const { body, ...httpResponse } = await ordersController.ordersCreate(collect);
      return {
        jsonResponse: body,
        httpStatusCode: httpResponse.statusCode,
      };
    }
    catch (error) {
      if (error instanceof ApiError) {
        const { statusCode } = error;
        return {
          jsonResponse: { error: error.message },
          httpStatusCode: statusCode
        };
      }
      // Handle non-ApiError cases
      return {
        jsonResponse: { error: 'An unexpected error occurred' },
        httpStatusCode: 500
      };
    }
  };

  export const capturePayPalPayment = async ( 
    data : PayPalResponceCapturedOrderType , 
    eventId : string ,
     orderID : string ,
     actions : OnApproveActions
    ): Promise<any | void> => {

      
  try {

      const OrderData: PayPalRequestCapturedOrderType = {
          PaypalData: data,
          eventId,
      }

      // paypal builing process 
      const payPalResponse = await axios.post(`/api/client/providers/paypal/${orderID}`, OrderData);

      const orderData = await payPalResponse.data // err  or data  

      /** PAYPAL PROVIDED ERROR HANDLEING */

      // Three cases to handle:
      //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
      //   (2) Other non-recoverable errors -> Show a failure message



      // ** CASE 1 AND 2  add rollbacks !!!!  calls to update event theater 


      //   (3) Successful transaction -> Show confirmation or thank you message

      const errorDetail = orderData?.details?.[0];


      if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
          // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
          // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
          return actions.restart();
      }
      else if (errorDetail) {
          // (2) Other non-recoverable errors -> Show a failure message

          //  router.push(`/thank-you/err/${errorDetail.description} ( ${orderData.debug_id} )`)
          
      }

      else {
          // (3) Successful transaction -> Show confirmation or thank you message
          // Or go to another URL:  actions.redirect('thank_you.html');

          const PayPalData = JSON.parse(orderData)

          return PayPalData

          //  const transaction = orderData.purchase_units[0].payments.captures[0];


      }
  } catch (error) {
      console.error(error);

  }

}
  
  
  
  export const CreateIsracardSaleLink = async (UserInfo: UserIsracardInfoType, total: string, eventId: string, cart: IsracartCartItemType[]): Promise<IsracardGanerateSaleResponseType | undefined> => {
  
    const saleParameters: IsracardGanerateSaleRequestType = {
      buyer_perform_validation: false,
  
      seller_payme_id: UserInfo.apiKey,
      sale_price: parseInt(total),
      product_name: eventId,
      currency: "ILS",
  
      sale_callback_url: "http://37.142.96.179/api/client/providers/isracard/sale",
      // sale_return_url: "https://styled-tickets.netlify.app/thank-you/",
  
      items: cart,
      language: "he",
      sale_email: UserInfo.email,
  
      sale_type: "template", // or "template" if needed
      sale_payment_method: "credit-card",
      capture_buyer: false,
      transaction_id: Date.now().toString(), // Generate a unique ID
      installments: "112",
      market_fee: 0.5, // Convert to string
      sale_send_notification: true,
      sale_mobile: "+9725254448888"
  
    };
  
    const options = {
      method: 'POST',
      url: 'https://sandbox.payme.io/api/generate-sale',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      data: saleParameters
    };
  
    //    console.log(saleParameters)
  
    try {
      const responce = await axios.post(options.url, saleParameters);
      return responce.data
      console.log(responce);
  
    } catch (error: any) {
      console.log(error.toJSON());
      return
    }
  }
  
  