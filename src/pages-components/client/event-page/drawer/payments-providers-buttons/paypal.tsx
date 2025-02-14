
import { TheaterType } from "@/types/components-typs/admin/theater/admin-theater-types";
import { PayPalCartItemType } from "@/types/pages-types/client/client-event-type";
import { PayPalScriptProvider, PayPalButtons, ScriptContextState } from "@paypal/react-paypal-js";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";



export interface PaypalBtnType {
    cart: PayPalCartItemType[]
    total: string
    TheaterState: TheaterType | undefined
    publicId: string
    eventId: string|undefined
}

const PaypalBtn = ({ eventId, publicId, cart, total, TheaterState }: PaypalBtnType) => {
    const router = useRouter()

    const initialOptions: ScriptContextState['options'] = {
        "client-id": publicId,
        "clientId": publicId,
        environment: 'sandbox',
    };

    useEffect(() => { console.log(cart) }, [cart])

    return (
        <PayPalScriptProvider options={initialOptions} >
            <PayPalButtons
                style={{
                    shape: "rect",
                    layout: "vertical",
                    color: "blue",
                    label: "paypal",
                }}
                // send array of object to back end to create a list of item to display and cala price 
                //
                createOrder={async () => {

                    try {
                        const response = await axios.post("/api/client/pay/create-order", { cart, total, publicId, eventId, });

                        const orderData = await response.data

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
                }}
                onApprove={async (data, actions) => {

                    const orderID = data.orderID
                    // on payment  befor proces compliting payment 
                    // see that the seat is open for sale  { avoiding  race conditions }

                    const updateEvent = async (): Promise<boolean> => {
                        try {
                            if (!TheaterState) { return false }
                            const { mainSeats, sideSeats } = TheaterState

                            const UpdateEventData = {
                                eventId,
                                reqTheater: { mainSeats, sideSeats }
                            }

                            const UpdateEvent = await axios.post("/api/client/events/update-event",
                                UpdateEventData,
                                { headers: { "Content-Type": "application/json" } }
                            )

                            return UpdateEvent.status === 200 ? true : false


                        } catch (err) {

                            alert(err)
                            return false
                        }
                    }
                    const capturePayment = async (): Promise<void> => {
                        try {

                            const OrderData = {
                                ...data,
                                eventId,
                                publicId
                            }

                            // paypal builing process 
                            const payPalResponse = await axios.post(`/api/client/pay/${orderID}`, OrderData);
                            const orderData = await payPalResponse.data

                            // Three cases to handle:
                            //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                            //   (2) Other non-recoverable errors -> Show a failure message
                            //   (3) Successful transaction -> Show confirmation or thank you message

                            const errorDetail = orderData?.details?.[0];

                                // CASE 1 AND 2  add rollbacks !!!!  calls to update event theater 



                            if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                                // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                                // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
                                return actions.restart();
                            }
                            else if (errorDetail) {
                                // (2) Other non-recoverable errors -> Show a failure message
                                throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
                            }






                            else {
                                // (3) Successful transaction -> Show confirmation or thank you message
                                // Or go to another URL:  actions.redirect('thank_you.html');
                                console.log(orderData)

                                router.push({
                                    pathname: `/thank-you/${orderData.id}/`,  // Dynamic route with transactionId
                                    query: orderData,  // Query parameter for units
                                });
                              //  const transaction = orderData.purchase_units[0].payments.captures[0];


                            }
                        } catch (error) {
                            console.error(error);

                        }

                    }


                    if (! await updateEvent()) {
                        router.push({
                            pathname: "/thank-you/err",
                            query: "שגיעה בעדכון האולם"
                        })

                    }
                    else {
                        await capturePayment()
                    }

                }}
            />
        </PayPalScriptProvider>
    )
}

export default PaypalBtn