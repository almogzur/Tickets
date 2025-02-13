
import { SeatType } from "@/types/pages-types/new-event-types";
import { OrderRequest } from "@paypal/paypal-server-sdk";

export interface CartItemType extends Omit<SeatType, 'value'> {
    id: string;
    name: string;
    Date:string,
    Hour:string
}

export type PayPalReqType = { // see Order Controller fn parameters 
    body: OrderRequest;
    paypalRequestId?: string;
    paypalPartnerAttributionId?: string;
    paypalClientMetadataId?: string;
    prefer?: string;
    paypalAuthAssertion?: string;
}

