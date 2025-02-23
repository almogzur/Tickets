import { z } from "zod";

// Define the schema for each payment source type
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

export const PayPalOrderVS = z.object({
    id: z.string(),
    status: z.string(),
    payer: PayerVS,
    payment_source: PaymentSourceVS,
    purchase_units: z.array(PurchaseUnitVS),
    links: z.array(LinkVS).optional(),
});

export type  PayPalOrderType =  z.infer<typeof PayPalOrderVS>



