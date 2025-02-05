import { TheaterType } from "@/components/admin/newEvent/theater/types/theater-types";
import { CartItemType } from "@/pages/api/client/pay/paypal-types";
import { Item  as PaypalItem} from "@paypal/paypal-server-sdk";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


interface PaypalBtnType {
     cart :PaypalItem[]
     total:string
     TheaterState:TheaterType|undefined
     eventId:string
}   

const PaypalBtn = ({eventId,cart,total,TheaterState}:PaypalBtnType)=>{
    const [message, setMessage] = useState("");
    const router= useRouter()

    const initialOptions = {   
        "client-id":"ASYRE-aeRnmPLyJTz9GSQBAZMHxfcVD_MyzVS2bUv-_5GKyHJAOhY8lvZi3RFsa2LF_QFS6MiWOwni-o",
        "clientId":"ASYRE-aeRnmPLyJTz9GSQBAZMHxfcVD_MyzVS2bUv-_5GKyHJAOhY8lvZi3RFsa2LF_QFS6MiWOwni-o",
    };

    useEffect(()=>{console.log(cart)},[cart])

    return (
        <PayPalScriptProvider  options={initialOptions}>
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
                                const response = await fetch("/api/client/pay/create-order", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    // use the "body" param to optionally pass additional order information
                                    // like product ids and quantities
                                    body: JSON.stringify({
                                        cart,
                                        total
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
                            const orderID =data.orderID
                        try {
                            const payPalResponse = await axios.post(`/api/client/pay/aproved/${orderID}`,
                                 data,
                               {headers: { "Content-Type": "application/json" } }
                                );
                            
                            const EventResult = await axios.post("/api/client/events/U/update-event",
                                {TheaterState,eventId},
                              {headers: { "Content-Type": "application/json" } }
                            )


                        
                            const orderData = await payPalResponse.data

                            // Three cases to handle:
                            //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                            //   (2) Other non-recoverable errors -> Show a failure message
                            //   (3) Successful transaction -> Show confirmation or thank you message
                        
                            const errorDetail = orderData?.details?.[0];
                        
                            if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                                // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                                // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
                                return actions.restart();
                            } 
                            else if (errorDetail) {
                                // (2) Other non-recoverable errors -> Show a failure message
                                throw new Error( `${errorDetail.description} (${orderData.debug_id})`);
                            } 
                          else {
                                // (3) Successful transaction -> Show confirmation or thank you message
                                // Or go to another URL:  actions.redirect('thank_you.html');
                                console.log(orderData)
                                const transaction =  orderData.purchase_units[0].payments.captures[0];
                                router.push("/")     
                                setMessage(
                                    `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`
                                );
              
                            }
                        }
                     catch (error) {
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