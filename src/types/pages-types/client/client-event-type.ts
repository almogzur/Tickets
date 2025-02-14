import { z }  from 'zod'
import { ItemCategory, OrderRequest } from '@paypal/paypal-server-sdk'
import { SeatValidationSchema } from '@/types/components-typs/admin/theater/admin-theater-types'


export const PayPalCartItemVlidationShema= z.object({
    id: z.string().min(1).or(z.undefined()),
    name: z.string().min(1),
    quantity: z.string().min(1),
    category:z.union([z.literal(ItemCategory.Donation) ,z.literal(ItemCategory.DigitalGoods),z.literal(ItemCategory.PhysicalGoods) ] ),
    unitAmount: z.object( { currencyCode:z.string().min(1), value:z.string().min(1)}),
  })

export const ClientSelectedValidationSchema= z.object({
    row: z.string(),
    seatNumber: z.number(),
    value: z.number(),
    price: z.string(),
    priceInfo: z.string().or(z.undefined()),
  
  })

export const  PayPalRequestCreateOrderValidationSchema = z.object({
  cart: z.array(PayPalCartItemVlidationShema),
  total:z.string(),
  publicId:z.string(),
  eventId:z.string()
})

export const  UpdateTheaterApiValidationSchema = z.object({
   eventId:z.string(),
   reqTheater: z.object({
        mainSeats:SeatValidationSchema,
        sideSeats:SeatValidationSchema
     })
})

export const  PayPalOnApproveResponceDataValidationSchema = z.object({
  billingToken: z.string().nullable().or(z.undefined()),
  facilitatorAccessToken: z.string().or(z.undefined()),
  orderID: z.string(),
  payerID:  z.string().nullable().or(z.undefined()),
  paymentID: z.string().nullable().or(z.undefined()),
  subscriptionID: z.string().nullable().or(z.undefined()),
  authCode:  z.string().nullable().or(z.undefined()),
})

export const PayPalCapturedRequestOrderValidationSchema= z.object({
  resData:PayPalOnApproveResponceDataValidationSchema,
  cart: z.array(PayPalCartItemVlidationShema),
  eventId:z.string(),
  publicId: z.string(),
})



export interface CartItemType extends Omit<ClientSelectedSeatType, 'value'> {
  id: string;
  name: string;
  Date:string,
  Hour:string
}

export type PayPalClollectInfoObjectType  = { // see Order Controller fn parameters 
  body: OrderRequest;
  paypalRequestId?: string;
  paypalPartnerAttributionId?: string;
  paypalClientMetadataId?: string;
  prefer?: string;
  paypalAuthAssertion?: string;
}


  
export type  UpdateTheaterApiResquestType = z.infer< typeof UpdateTheaterApiValidationSchema>

export type RequestStatusType ="Temp"|"Production"|undefined

export type ClientSelectedSeatType = z.infer<typeof ClientSelectedValidationSchema>

export type  PayPalCartItemType  =  z.infer<typeof PayPalCartItemVlidationShema>

export type  PayPalRequestCreateOrderType =z.infer<typeof PayPalRequestCreateOrderValidationSchema> 

export type PayPalRequestCapturedOrderType= z.infer<typeof PayPalCapturedRequestOrderValidationSchema>

export type PayPalResponceCapturedOrderType = z.infer<typeof PayPalOnApproveResponceDataValidationSchema>
