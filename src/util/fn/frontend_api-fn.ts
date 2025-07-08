// move  api updates functions and rollBack  hear 

import { TheaterType } from "@/types/components-types/admin/theater/admin-theater-types";
import { UserIsracardInfoType } from "@/types/pages-types/admin/user-billing-info-types";
import { ClientSelectedSeatType, 
   IsracardGenerateSaleResponseType,
    IsracardCartItemType,
     modifySeatValueFunctionType,
      PayPalCartItemType,
       PayPalCollectInfoObjectType,
        PayPalOrderType,
         PayPalRequestCapturedOrderType,
          PayPalResponceCapturedOrderType,
           RollbackTheaterApiRequestType, 
           SavePayPalInvoceType,
            UpdateTheaterApiRequestType, 
            IsracardGenerateSaleRequestType} from "@/types/pages-types/client/client-event-type";
import { Item, OrdersController, CheckoutPaymentIntent, OrderApplicationContextShippingPreference, ApiError, Client as PayPalClient, } from "@paypal/paypal-server-sdk";
import axios from "axios";
import { OnApproveActions } from '@paypal/paypal-js/types'

const baseUrl = `${process.env.NEXTAUTH_URL}`

export const rollBack = async (
  Theater: TheaterType,
  eventId: string,
  selectedSeats: ClientSelectedSeatType[],
  cart: PayPalCartItemType[] | IsracardCartItemType[])
  : Promise<boolean> => {
  try {


    const RollbackEventData: RollbackTheaterApiRequestType = {
      eventId: eventId,
      selectedSeats,
      cart,
      Theater
    }

    const RolledEvent = await axios.post('/api/client/events/roll-back', RollbackEventData,)

    return RolledEvent.status === 200 ? true : false
  } catch (err) {
    console.log(err)
    return false
  }
}

export const updateEvent = async (
  Theater: TheaterType,
  eventId: string,
  cart: IsracardCartItemType[] | PayPalCartItemType[]):
  Promise<boolean> => {
  try {

    const { mainSeats, sideSeats } = Theater

    const UpdateEventData: UpdateTheaterApiRequestType = {
      eventId,
      reqTheater: { mainSeats, sideSeats },
      numberOfSeatsSelected: cart.length
    }
    const UpdateEvent = await axios.post(baseUrl + "/api/client/events/update-event", UpdateEventData,)
    return UpdateEvent.status === 200 ? true : false
  } catch (err) {
    console.log(err)
    return false
  }
}


export const saveInvoices = async (PayPalInvoice: PayPalOrderType, cart: PayPalCartItemType[], eventId: string, total: string): Promise<boolean> => {


  const currentDate = new Date();
  const dateString = currentDate.toLocaleDateString(); // Date part only.
  const timeString = currentDate.toLocaleTimeString();

  const invoice: SavePayPalInvoceType = {
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

  const collect: PayPalCollectInfoObjectType = {
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
  data: PayPalResponceCapturedOrderType,
  eventId: string,
  orderID: string,
  actions: OnApproveActions
): Promise<any | void> => {


  try {

    const OrderData: PayPalRequestCapturedOrderType = {
      PaypalData: data,
      eventId,
    }

    // paypal billing process 
    const payPalResponse = await axios.post(`/api/client/providers/paypal/${orderID}`, OrderData);

    const orderData = await payPalResponse.data // err  or data  

    /** PAYPAL PROVIDED ERROR */

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

export const CreateIsracardSaleLink = async (
  UserInfo: UserIsracardInfoType,
  total: string,
  eventId: string,
  cart: IsracardCartItemType[],
): Promise<IsracardGenerateSaleResponseType | undefined> => {


  const devLink = `${process.env.DEV_ISRACARD_SALE_URL}`
  const prodLink = `${process.env.PROD_ISRACARD_SALE_URL}`

  if (!devLink || !prodLink) {
    console.log("!! NO ENV STRING ")
    return
  }

  const saleParameters: IsracardGenerateSaleRequestType = {
    buyer_perform_validation: false,

    seller_payme_id: UserInfo.apiKey,
    sale_price: parseInt(total),
    product_name: eventId,
    currency: "ILS",

    sale_callback_url: process.env.NODE_ENV === 'production' ? prodLink : devLink,
     sale_return_url: "https://styled-tickets.netlify.app/thank-you/",

    items: cart,
    language: "he",


    sale_type: "template", // or "template" if needed
    sale_payment_method: "credit-card",
    capture_buyer: false,
    transaction_id: Date.now().toString(), // Generate a unique ID
    installments: "112",
    market_fee: 0.5, // Convert to string
    sale_send_notification: true,


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
    console.log(responce.data);
    return responce.data

  } catch (error: any) {
    console.log(error.toJSON());
    return
  }
}

