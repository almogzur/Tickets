
import { TheaterType } from "@/types/components-types/admin/theater/admin-theater-types";
import {
    ClientSelectedSeatType,
    PayPalCartItemType,
    PayPalRequestCreateOrderType,
    RollbackTheaterApiRequestType,
} from "@/types/pages-types/client/client-event-type";
import { capturePayPalPayment, rollBack, saveInvoices, updateEvent } from "@/util/fn/frontend_api-fn";
import { PayPalScriptProvider, PayPalButtons, ScriptProviderProps } from "@paypal/react-paypal-js";
import axios from "axios";
import { useRouter } from "next/router";







export interface PaypalBtnType {
    cart: PayPalCartItemType[]
    total: string
    TheaterState: TheaterType | undefined
    publicId: string
    eventId: string
    selectedSeats: ClientSelectedSeatType[]
}

const PaypalBtn = ({ publicId, eventId, cart, total, TheaterState, selectedSeats }: PaypalBtnType) => {


    const Options: ScriptProviderProps['options'] = {
        'client-id': publicId,
        'clientId': publicId,
        disableFunding: ['card']

    }

    const router = useRouter()


    //useEffect(() => { console.log(cart) }, [cart])



    return (
        <PayPalScriptProvider options={Options}   >
            <PayPalButtons
                // when public id change re render 
                style={{
                    shape: "rect",
                    layout: "vertical",
                    color: "blue",
                    label: "paypal",
                }}


                // send array of object to back end to create a list of item to display and calc price 
                //
                createOrder={async () => {

                    if (!TheaterState) {
                        return
                    }

                    // update the Theater in backend 

                    const PatPalData: PayPalRequestCreateOrderType = {
                        cart,
                        total,
                        eventId,
                        Theater: TheaterState,
                    }

                    try {
                        const response = await axios.post("/api/client/providers/paypal/create-order", PatPalData);

                        const orderData = await JSON.parse(response.data)

                        if (orderData.id) {
                            return orderData.id;
                        }
                        const errorDetail = orderData?.details?.[0];
                        const errorMessage = errorDetail
                            ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                            : JSON.stringify(orderData);

                        throw new Error(errorMessage);

                    } catch (error) {
                        console.error(error);

                    }
                    finally{
                        
                    }
                }}
                onApprove={async (data, actions) => {

                    if (!TheaterState) {
                        return
                    }

                    const orderID = data.orderID

                    // on payment  before  process completing  payment 
                    // see that the seat is open for sale  { avoiding  race conditions }

                    // send user sms and qr code 



                    const PayPalInvoice = await capturePayPalPayment(data, eventId, orderID, actions)

                    if (!PayPalInvoice) {

                        const RollBackData: RollbackTheaterApiRequestType = {
                            eventId,
                            selectedSeats,
                            Theater: TheaterState,
                            cart
                        }

                        //await rollBack(RollBackData)

                        router.push("/thank-you/err")

                    }

                    await saveInvoices(PayPalInvoice, cart, eventId, total)


                    router.push(`/thank-you/${PayPalInvoice.id}`)

                }}

            />
        </PayPalScriptProvider>
    )
}

export default PaypalBtn