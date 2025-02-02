import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";



const PaypalBtn = ({id,amount}:{id:string,amount:number})=>{
    const [message, setMessage] = useState("");

    const initialOptions = {   
        "clientId":"ASYRE-aeRnmPLyJTz9GSQBAZMHxfcVD_MyzVS2bUv-_5GKyHJAOhY8lvZi3RFsa2LF_QFS6MiWOwni-o",


        
    };
    return (
        <PayPalScriptProvider  options={initialOptions}>
          <PayPalButtons
                    style={{
                        shape: "rect",
                        layout: "vertical",
                        color: "blue",
                        label: "paypal",
                        tagline:false
                    }} 
                        // send array of object to back end to create a list of item to display and cala price 
                        //
                    createOrder={async () => {
                        try {
                            const response = await fetch("/api/client/pay/C/create-order", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                // use the "body" param to optionally pass additional order information
                                // like product ids and quantities
                                body: JSON.stringify({
                                    cart: [ // pass  array of items to create a list the back end 
                                        {
                                            id: id,
                                            quantity: 1,
                                            price:100,
                                            description :"",

                                        },
                                        {
                                            id: id,
                                            quantity: 1,
                                            price:100,
                                            description :"",
                                        },
                                        {
                                            id: id,
                                            quantity: 1,
                                            price:100,
                                            description :"",
                                        }
                                    ],
                                }),
                            });
                        
                            const orderData = await response.json();
                        
                            if (orderData.id) {
                                return orderData.id;
                            } else {
                                const errorDetail = orderData?.details?.[0];
                                const errorMessage = errorDetail
                                    ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                                    : JSON.stringify(orderData);
                            
                                throw new Error(errorMessage);
                            }
                        } catch (error) {
                            console.error(error);
                            setMessage(
                                `Could not initiate PayPal Checkout...${error}`
                            );
                        }
                    }} 
                    onApprove={async (data, actions) => {
                        try {
                            const response = await fetch(
                                `/api/orders/${data.orderID}/capture`,
                                {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                }
                            );
                        
                            const orderData = await response.json();
                            // Three cases to handle:
                            //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                            //   (2) Other non-recoverable errors -> Show a failure message
                            //   (3) Successful transaction -> Show confirmation or thank you message
                        
                            const errorDetail = orderData?.details?.[0];
                        
                            if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                                // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                                // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
                                return actions.restart();
                            } else if (errorDetail) {
                                // (2) Other non-recoverable errors -> Show a failure message
                                throw new Error(
                                    `${errorDetail.description} (${orderData.debug_id})`
                                );
                            } else {
                                // (3) Successful transaction -> Show confirmation or thank you message
                                // Or go to another URL:  actions.redirect('thank_you.html');
                                const transaction =
                                    orderData.purchase_units[0].payments
                                        .captures[0];
                                setMessage(
                                    `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`
                                );
                                console.log(
                                    "Capture result",
                                    orderData,
                                    JSON.stringify(orderData, null, 2)
                                );
                            }
                        } catch (error) {
                            console.error(error);
                            setMessage(
                                `Sorry, your transaction could not be processed...${error}`
                            );
                        }
                    }} 
                />
       </PayPalScriptProvider>
    )

}


export default PaypalBtn