
import { TheaterType } from "@/types/components-typs/admin/theater/admin-theater-types";
import { PayPalCartItemType, PayPalOrderType, PayPalRequestCapturedOrderType, PayPalRequestCreateOrderType, PayPalResponceCapturedOrderType, SavePayPalInvoceTpee, UpdateTheaterApiResquestType } from "@/types/pages-types/client/client-event-type";
import { PayPalScriptProvider, PayPalButtons, ScriptProviderProps } from "@paypal/react-paypal-js";
import axios from "axios";
import { useRouter } from "next/router";




export interface PaypalBtnType {
    cart: PayPalCartItemType[]
    total: string
    TheaterState: TheaterType | undefined
    publicId: string
    eventId: string
}

const PaypalBtn = ({ publicId, eventId, cart, total, TheaterState }: PaypalBtnType) => {


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


                // send array of object to back end to create a list of item to display and cala price 
                //
                createOrder={async () => {

                    const PatPalData: PayPalRequestCreateOrderType = {
                        cart,
                        total,
                        eventId,
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
                }}
                onApprove={async (data, actions) => {

                    const orderID = data.orderID
                    // on payment  befor proces compliting payment 
                    // see that the seat is open for sale  { avoiding  race conditions }
                    console.log("on approve")

                    const updateEvent = async (): Promise<boolean> => {
                        try {
                            if (!TheaterState) { return false }
                            const { mainSeats, sideSeats } = TheaterState

                            const UpdateEventData: UpdateTheaterApiResquestType = {
                                eventId,
                                reqTheater: { mainSeats, sideSeats },
                                numerOfSeatsSealected: cart.length
                            }
                            const UpdateEvent = await axios.post("/api/client/events/update-event", UpdateEventData,)

                            return UpdateEvent.status === 200 ? true : false

                        } catch (err) {
                            alert(err)
                            return false
                        }
                    }
                    const capturePayment = async (): Promise<any | void> => {
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

                                router.push(`/thank-you/err/${errorDetail.description} ( ${orderData.debug_id} )`)

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
                    const saveInvoices = async (PayPalInvoice: PayPalOrderType): Promise<boolean> => {


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

                    // send user sms and qr code 

                    const updateTheaterResult = await updateEvent()

                    if (!updateTheaterResult) {

                        // try to update the theater if it not avalebule push to err page 
                        // **  cant return from onAprove function 
                        router.push("/thank-you/err")


                    } else {

                        const PayPalInvoice = await capturePayment()

                        if (!PayPalInvoice) {


                            router.push("/thank-you/err")



                        }

                        await saveInvoices(PayPalInvoice)



                        router.push(`/thank-you/${PayPalInvoice.id}`)

                    }


                }}

            />
        </PayPalScriptProvider>
    )
}

export default PaypalBtn