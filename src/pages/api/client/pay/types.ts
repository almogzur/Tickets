import { SeatType } from "@/pages/details/[id]";
import { OrderRequest } from "@paypal/paypal-server-sdk";

export interface  CartItem extends SeatType  {
    id: string,
    quantity: number,
    price:number,
    description :string,
}

export type PayPalReqType = { // see Order Controller fn parameters 
    body: OrderRequest;
    paypalRequestId?: string;
    paypalPartnerAttributionId?: string;
    paypalClientMetadataId?: string;
    prefer?: string;
    paypalAuthAssertion?: string;
}