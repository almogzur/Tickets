import { z }  from 'zod'
import { ItemCategory, OrderRequest } from '@paypal/paypal-server-sdk'
import { SeatValidationSchema } from '@/types/components-typs/admin/theater/admin-theater-types'
import { SeatsRow } from "@/types/components-typs/admin/theater/admin-theater-types"
import { PayPalCartItemVS, PayPalOrderVS } from './payment-object'


 
export const ClientSelectedSeatsVS= z.object({
    row: z.string().nonempty(),
    seatNumber: z.number(),
    value: z.number(),
    price: z.string().nonempty(),
    priceInfo: z.string().nonempty().or(z.undefined()),
  
})

export const  PayPalRequestCreateOrderVS = z.object({
    cart: z.array(PayPalCartItemVS),
    total:z.string().nonempty(),
    publicId:z.string().nonempty(),
    eventId:z.string().nonempty()
})
  
export const  UpdateTheaterApiVS = z.object({
   eventId:z.string().nonempty(),
   reqTheater: z.object({
        mainSeats:SeatValidationSchema,
        sideSeats:SeatValidationSchema
     }),
    numerOfSeatsSealected : z.number()  
})

export const  PayPalOnApproveResponceDataVS = z.object({
  billingToken: z.string().nonempty().nullable().or(z.undefined()),
  facilitatorAccessToken: z.string().nonempty().or(z.undefined()),
  orderID: z.string().nonempty(),
  payerID:  z.string().nonempty().nullable().or(z.undefined()),
  paymentID: z.string().nonempty().nullable().or(z.undefined()),
  subscriptionID: z.string().nonempty().nullable().or(z.undefined()),
  authCode:  z.string().nonempty().nullable().or(z.undefined()),
})

export const PayPalCapturedRequestOrderVS = z.object({
  PaypalData:PayPalOnApproveResponceDataVS,
  eventId:z.string().nonempty(),
  publicId: z.string().nonempty(),
})

export const SavePayPalInvoceVS = PayPalOrderVS.extend({
  eventId: z.string().nonempty(),
  total: z.string().nonempty(),
  purchase_date: z.string().nonempty(),
  cart: z.array(PayPalCartItemVS)
});


export type  modifieSeatValueFunctionType = {
  main :SeatsRow , side : SeatsRow 
}
export type  UpdateTheaterApiResquestType = z.infer< typeof UpdateTheaterApiVS>

export type RequestStatusType ="Temp"|"Production"|undefined

export type ClientSelectedSeatType = z.infer<typeof ClientSelectedSeatsVS>

export type  PayPalRequestCreateOrderType =z.infer<typeof PayPalRequestCreateOrderVS> 

export type PayPalRequestCapturedOrderType= z.infer<typeof PayPalCapturedRequestOrderVS>

export type PayPalResponceCapturedOrderType = z.infer<typeof PayPalOnApproveResponceDataVS>

export type SavePayPalInvoceTpee = z.infer<typeof SavePayPalInvoceVS >


// from PayPal 

export type PayPalClollectInfoObjectType  = { // see Order Controller fn parameters 
  body: OrderRequest;
  paypalRequestId?: string;
  paypalPartnerAttributionId?: string;
  paypalClientMetadataId?: string;
  prefer?: string;
  paypalAuthAssertion?: string;
}
