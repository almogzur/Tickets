import { UpdateDraftType,  WithDataEventType } from "@/types/pages-types/admin/admin-event-types"
import { NewUserType } from "@/types/pages-types/admin/supervisor-types"
import { UserIsracardInfoType, UserPayPalInfoType } from "@/types/pages-types/admin/user-billing-info-types"
import { DraftSchema, EventSchema } from "./schemas/db-event"
import { NewUserSchema } from "./schemas/new-user"
import { createBindToConnectionModel } from "./schemas/schema-fn"
import { UserPayPalBillingSchema, UserIsracardSchema } from "./schemas/user-billing-info"


// create model return a function (Connection : mongoose,Connection ): mongoose.Model
// thats return a mongeese model binds to a connection 

/**
 * new DraftModel(connection) . modelMethods 
 */

export const filterAdminDataQueryOptions = { 
                projection : { log: false , invoices:false },
                lean:true
} 

export const DraftModel = createBindToConnectionModel<UpdateDraftType>(`${process.env.USER_DRAFT_FOLDER_PATH}`, DraftSchema)

export const EventModel = createBindToConnectionModel<WithDataEventType>(`${process.env.USER_EVENTS_FOLDER_PATH}`, EventSchema)

export const UsersModel =  createBindToConnectionModel<NewUserType>(`${process.env.APP_USERS_FOLDER_PATH}`,NewUserSchema,)

export const PayPalModel = createBindToConnectionModel<UserPayPalInfoType>(`${process.env.PAYPAL_BILLING_FOLDER_NAME}`, UserPayPalBillingSchema)

export const IsracardModel = createBindToConnectionModel<UserIsracardInfoType>(`${process.env.ISRACARD_BILLING_FOLDER_NAME}`, UserIsracardSchema)

