import { UpdateDraftType,  WithDataEventType } from "@/types/pages-types/admin/admin-event-types"
import { NewUserType } from "@/types/pages-types/admin/supervisor-types"
import { UserIsracardInfoType, UserPayPalInfoType } from "@/types/pages-types/admin/user-biling-info-types"
import { DraftSchemaDef, EventSchemaDef } from "./schma/db-event"
import { NewUserSchema } from "./schma/new-user"
import { createBindToConnectionModel } from "./schma/schema-fn"
import { UserPayPalBillingShema, UserIsracardSchema } from "./schma/user-biling-info"


// create modole return a function (Connection : mongoosee,Connection ): mongoose.Modle
// thats retun a mongosee modle binds to a connection 

/**
 * new DraftModle(connetion) . modleMethods 
 */

export const filterAdminDataQuryOptions = { 
                projection : { log: false , invoices:false },
                lean:true
} 

export const DraftModel = createBindToConnectionModel<UpdateDraftType>(`${process.env.USER_DRAFT_FOLDER_PATH}`, DraftSchemaDef)

export const EventModel = createBindToConnectionModel<WithDataEventType>(`${process.env.USER_EVENTS_FOLDER_PATH}`, EventSchemaDef)

export const UsersModel =  createBindToConnectionModel<NewUserType>(`${process.env.APP_USERS_FOLDER_PATH}`,NewUserSchema,)

export const PayPalModel = createBindToConnectionModel<UserPayPalInfoType>(`${process.env.PAYPAL_BILING_FOLDER_NAME}`, UserPayPalBillingShema)

export const IsracardModel = createBindToConnectionModel<UserIsracardInfoType>(`${process.env.ISRACARD_BLIING_FOLDER_NAME}`, UserIsracardSchema)

