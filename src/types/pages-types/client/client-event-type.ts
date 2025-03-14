import { z }  from 'zod'
import {  OrderRequest } from '@paypal/paypal-server-sdk'
import { SeatValidationSchema, TheaterValidationSchema } from '@/types/components-typs/admin/theater/admin-theater-types'
import { SeatsRow } from "@/types/components-typs/admin/theater/admin-theater-types"
import { ItemCategory } from "@paypal/paypal-server-sdk";



// EVENT 
 
export type  UpdateTheaterApiResquestType = z.infer< typeof UpdateTheaterApiVS>

export type ClientSelectedSeatType = z.infer<typeof ClientSelectedSeatsVS>


export const ClientSelectedSeatsVS= z.object({
    row: z.string().nonempty(),
    seatNumber: z.number(),
    value: z.number(),
    price: z.string().nonempty(),
    priceInfo: z.string().nonempty().or(z.undefined()),
  
})


export const  UpdateTheaterApiVS = z.object({
  eventId:z.string().nonempty(),
  reqTheater: z.object({
       mainSeats:SeatValidationSchema,
       sideSeats:SeatValidationSchema
    }),
   numerOfSeatsSealected : z.number()  
})


 

export type  RollbackTheaterApiResquestType  = z.infer <typeof RollbackTheaterApiVS>

export type  modifieSeatValueFunctionType = {
  main :SeatsRow , side : SeatsRow 
}








// GLOBAL
export type RequestStatusType ="Temp"|"Production"|undefined

/**
 * 
 * 
 * 
 * 
 // PayPal  
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * https://developer.paypal.com/tools/sandbox/
 */


const CardVS = z.object({
  name: z.string(),
  last_digits: z.string(),
  brand: z.string(),
  available_networks: z.array(z.string()),
  type: z.string(),
});

const PayPalVS = z.object({
  email_address: z.string(),
  account_id: z.string(),
  account_status: z.string(),
  name: z.object({
    given_name: z.string(),
    surname: z.string(),
  }),
  phone: z.string().optional(),
});

const BancontactVS = z.object({
  name: z.string(),
  country_code: z.string(),
  bic: z.string(),
  iban_last_chars: z.string(),
  card_last_digits: z.string(),
});

const BlikVS = z.object({
  name: z.string(),
  country_code: z.string(),
  email: z.string(),
  one_click: z.object({
    consumer_reference: z.string(),
  }),
});

const EpsVS = z.object({
  name: z.string(),
  country_code: z.string(),
  bic: z.string(),
});

const PaymentSourceVS = z.object({
    card: CardVS.optional(),
    paypal: PayPalVS.optional(),
    bancontact: BancontactVS.optional(),
    blik: BlikVS.optional(),
    eps: EpsVS.optional(),
 });

const PayerVS = z.object({
    name: z.object({
      given_name: z.string(),
      surname: z.string(),
    }),
    email_address: z.string(),
    payer_id: z.string(),
    address: z.object({
      country_code: z.string(),
    }).optional(),
 });

const LinkVS = z.object({
    href: z.string(),
    rel: z.string(),
    method: z.string(),
});

const PurchaseUnitVS = z.object({
    reference_id: z.string(),
    amount: z.object({
      currency_code: z.string(),
      value: z.string(),
    }).optional(),
    payee: z.object({
      email_address: z.string(),
      merchant_id: z.string(),
    }).optional(),
});

export const PayPalCartItemVS= z.object({
  id: z.string().nonempty().or(z.undefined()),
  name: z.string().nonempty(),
  quantity: z.string().nonempty(),
  category:z.union([z.literal(ItemCategory.Donation) ,z.literal(ItemCategory.DigitalGoods),z.literal(ItemCategory.PhysicalGoods) ] ),
  unitAmount: z.object( { currencyCode:z.string().min(1), value:z.string().min(1)}),
})

export const PayPalOrderVS = z.object({
    id: z.string(),
    status: z.string(),
    payer: PayerVS,
    payment_source: PaymentSourceVS,
    purchase_units: z.array(PurchaseUnitVS),
    links: z.array(LinkVS).optional(),

})

export const  PayPalRequestCreateOrderVS = z.object({
    cart: z.array(PayPalCartItemVS),
    total:z.string().nonempty(),

    eventId:z.string().nonempty()
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
})

export const SavePayPalInvoceVS = PayPalOrderVS.extend({
  eventId: z.string().nonempty(),
  total: z.string().nonempty(),
  purchase_date: z.string().nonempty(),
  cart: z.array(PayPalCartItemVS)
});

export type  PayPalOrderType =  z.infer<typeof PayPalOrderVS>

export type  PayPalCartItemType  =  z.infer<typeof PayPalCartItemVS>

export type  PayPalRequestCreateOrderType =z.infer<typeof PayPalRequestCreateOrderVS> 

export type PayPalRequestCapturedOrderType= z.infer<typeof PayPalCapturedRequestOrderVS>

export type PayPalResponceCapturedOrderType = z.infer<typeof PayPalOnApproveResponceDataVS>

export type SavePayPalInvoceTpee = z.infer<typeof SavePayPalInvoceVS >


// Order Controller fn parameters 
export type PayPalClollectInfoObjectType  = {
  body: OrderRequest;
  paypalRequestId?: string;
  paypalPartnerAttributionId?: string;
  paypalClientMetadataId?: string;
  prefer?: string;
  paypalAuthAssertion?: string;
}



/**
 * 
 * 
 * 
 * 
 * 
// ISRACARD 
 * 
 * 
 * 
   // https://payme.stoplight.io/docs/payments/d7da26bb42da8-generate-payment* 
 */









export const IsracartCartItemZVS = z.object({
    name: z.string().nonempty(), // Example: shirt
    quantity: z.number().int().nonnegative(), // Example: 1
    unit_price: z.number().nonnegative(), // Example: 500
    unit_measurement: z.string().optional(), // Example: "pounds"
    total: z.number().nonnegative(), // Example: 100
    discount_total: z.number().optional(), // Example: 50
    description: z.string().optional(), // Example: "free text"
    product_code: z.string().optional(), // Example: "ab123"
    commodity_code: z.number().optional(), // Example: 123456789101
    fees: z.object({
      tax: z.number().optional(), // Example: 5200
      duty: z.number().optional(), // Example: 6000
      discount: z.number().optional(), // Example: 8000
    }).optional()
})
export type  IsracartCartItemType = z.infer<typeof IsracartCartItemZVS>







export const IsracardCreateOrderZVS = z.object({
  cart: z.array(IsracartCartItemZVS),
  total:z.string().nonempty(),
  eventId:z.string().nonempty(), 
  eventName:z.string().nonempty(),
  TheaterState:TheaterValidationSchema,
})

export type IsracardCreateOrderType = z.infer<typeof IsracardCreateOrderZVS>





export const IsracardGanerateSaleRequestZVS = z.object({

  // Required fields
  seller_payme_id: z.string().nonempty(), // Example: MPLDEMO-MPLDEMO-MPLDEMO-1234567
  sale_price: z.number(), // Example: 100
  currency: z.string().nonempty(), // Example: ILS
  product_name: z.string().nonempty(), // Example: Phone
  buyer_perform_validation:z.boolean().or(z.string()),

 
  //sale url
  sale_callback_url: z.string().url().optional(), // Example: https://www.example.com/payment/callback
  sale_return_url: z.string().url().optional(), // Example: https://www.example.com/payment/success
  

  // Optional fields
  transaction_id: z.string().optional(), // Example: 12345
  installments: z.string().optional(), // Example: 1
  market_fee: z.number().optional(), // Example: 0.5
  sale_send_notification: z.boolean().optional(),
  sale_email: z.string().email().optional(), // Example: test@testmail.com
  sale_mobile: z.string().optional(), // Example: +972525888888
  sale_name: z.string().optional(), // Example: John Doe
  capture_buyer: z.string().optional().or(z.boolean() ), // Example: 0

  sale_type: z.string().optional(), // Example: sale
  sale_payment_method: z.string().optional(), // Example: credit-card
  layout: z.string().optional(), // Example: dynamic
  language: z.string().optional(), // Example: he
  order_number: z.string().optional(), // Example: 6545584

  items: z.array(IsracartCartItemZVS),

  shipping_details: z.object({
    name: z.string().nonempty(), // Example: John Doe
    email: z.string().email(), // Example: test@payme.io
    phone: z.string().optional(), // Example: +111174448863
    address: z.object({}).optional(),
  }).optional(),

  billing_details: z.object({
    name: z.string().nonempty(), // Example: PayMe
    email: z.string().email(), // Example: payer@payme.io
    phone: z.string().optional(), // Example: +111174448863
    address: z.object({}).optional(),
  }).optional(),

  buyer_name: z.string().optional(), // Example: John Doe
  buyer_email: z.string().email().optional(), // Example: buyer@email.com
  buyer_phone: z.string().optional(), // Example: 0501234567
});

export type IsracardGanerateSaleRequestType = z.infer<typeof IsracardGanerateSaleRequestZVS>







export const IsracardGanerateSaleResponseZVS = z.object({
  status_code: z.number(), // Represents the status of the request (0 for success, 1 for error)
  sale_url: z.string(), // URL as a string
  payme_sale_id: z.string(), // Unique sale ID as a string
  payme_sale_code: z.number(), // Sale code as a number
  price: z.number(), // Price as a number
  transaction_id: z.string(), // Transaction ID as a string
  currency: z.string(), // Currency as a string (3-letter ISO 4217 code)
});

export type IsracardGanerateSaleResponseType = z.infer<typeof IsracardGanerateSaleResponseZVS  >











const IsaracdCaptureSaleCallbackNotificationTypeZVS = z.enum([
  'sale-complete',
  'sale-authorized',
  'refund',
  'sale-failure',
  'sale-chargeback',
  'sale-chargeback-refund',
]);

const IsaracdCaptureSaleCallbackNotificationAttributesZVS = z.object({
  status_code: z.number(), // 0 for success, 1 for error
  sale_created: z.string(), // e.g., '2016-01-01 15:15:15'
  transaction_id: z.string(), // Merchant's unique sale ID
  status_error_code: z.string().optional(), // Optional, only present in case of an error
  payme_sale_id: z.string(), // Our unique sale ID
  status_error_details: z.string().optional(), // Optional, only present in case of an error
  notify_type: IsaracdCaptureSaleCallbackNotificationTypeZVS, // Use the enum defined above
  payme_sale_code: z.string(), // Our unique sale code
  payme_transaction_id: z.string(), // Our unique transaction ID
  price: z.number(), // Sale final price in smallest currency unit
  currency: z.string(), // 3-letter ISO 4217 currency code
  sale_status: z.string(), // e.g., 'completed'
  payme_transaction_card_brand: z.string(), // e.g., 'Visa'
  payme_transaction_auth_number: z.string(), // Sale authorization number
  buyer_card_mask: z.string(), // Buyer's credit card mask
  buyer_card_exp: z.string(), // Buyer's credit card expiry date
  buyer_name: z.string(), // Buyer's full name
  buyer_email: z.string(), // Buyer's email address
  buyer_phone: z.string(), // Buyer's phone number
  buyer_social_id: z.string(), // Buyer's social ID
  buyer_key: z.string().optional(), // Optional, buyer key for future token payments
  installments: z.number(), // Amount of installments
  sale_paid_date: z.string(), // e.g., '2016-01-01 15:16:15'
  sale_release_date: z.string(), // e.g., '2016-01-08 15:15:15'
  is_token_sale: z.boolean(), // true if token sale, false otherwise
  payme_signature: z.string(), // Signature for verification
  sale_invoice_url: z.string().url().optional(), // Optional, URL to the sale invoice
});




export type IsracardSaleCallbackNotificationAttributes = z.infer<typeof IsaracdCaptureSaleCallbackNotificationAttributesZVS >





// global 

export const RollbackTheaterApiVS = z.object({
  eventId:z.string(),
  selectedSeats : z.array(ClientSelectedSeatsVS),
  Theater:TheaterValidationSchema,
  cart:z.array(IsracartCartItemZVS).or(z.array(PayPalCartItemVS))
  
})