import { UpdateDraftType, ClientEventType, NewEventType } from "@/types/pages-types/admin/admin-event-types"
import { createBindToConnectionModel } from "./schema-fn"
import { DraftSchemaDef, EventSchemaDef } from "./db-event"
import { NewUserType } from "@/types/pages-types/admin/supervisor-types"
import { NewUserSchemaDefinition } from "./new-user"
import { UserBankInfo, UserPayPalInfo } from "@/types/pages-types/admin/user-biling-info-types"
import { UserBankInfoDBSchema, UserPayPalBillingShema } from "./user-biling-info"




// create modole return a function (Connection : mongoosee,Connection ): mongoose.Modle
// thats retun a mongosee modle binds to a connection 

/**
 * new DraftModle(connetion) . modleMethods 
 */



export const DraftModel = createBindToConnectionModel<UpdateDraftType>(`${process.env.USER_DRAFT_FOLDER_PATH}`, DraftSchemaDef)
export const ClientEventModel= createBindToConnectionModel<ClientEventType>(`${process.env.USER_EVENTS_FOLDER_PATH}`,EventSchemaDef)
export const AdminEventModel = createBindToConnectionModel<NewEventType>(`${process.env.USER_EVENTS_FOLDER_PATH}`, EventSchemaDef)


export const UsersModel =  createBindToConnectionModel<NewUserType>(`${process.env.APP_USERS_FOLDER_PATH}`,NewUserSchemaDefinition,)

export const PayPalModel = createBindToConnectionModel<UserPayPalInfo>(`${process.env.PAYPAL_BILING_FOLDER_NAME}`, UserPayPalBillingShema)
export const BankModel = createBindToConnectionModel<UserBankInfo>(`${process.env.BANK_BLIING_FOLDER_NAME}`, UserBankInfoDBSchema)
