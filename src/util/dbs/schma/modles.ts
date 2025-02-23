import { UpdateDraftType, ClientEventType, NewEventType } from "@/types/pages-types/admin/admin-event-types"
import { createBindToConnectionModel } from "./schema-fn"
import { DraftSchema, EventSchema } from "./db-event"
import { NewUserType } from "@/types/pages-types/admin/supervisor-types"
import { NewUserSchemaDefinition } from "./new-user"
import { UserBankInfo, UserPayPalInfo } from "@/types/pages-types/admin/user-biling-info-types"
import { UserBankInfoDBSchema, UserPayPalBillingShema } from "./user-biling-info"




// create modole return a function (Connection : mongoosee,Connection ): mongoose.Modle
// thats retun a mongosee modle binds to a connection 

/**
 * new DraftModle(connetion) . modleMethods 
 */

export const DraftModle = createBindToConnectionModel<UpdateDraftType>(`${process.env.USER_DRAFT_FOLDER_PATH}`, DraftSchema)
export const ClientEventMolde= createBindToConnectionModel<ClientEventType>(`${process.env.USER_EVENTS_FOLDER_PATH}`,EventSchema)
export const AdminEventModle = createBindToConnectionModel<NewEventType>(`${process.env.USER_EVENTS_FOLDER_PATH}`, EventSchema)

export const UsersModle =  createBindToConnectionModel<NewUserType>(`${process.env.APP_USERS_FOLDER_PATH}`,NewUserSchemaDefinition)


export const PayPalModle = createBindToConnectionModel<UserPayPalInfo>(`${process.env.BILING_FOLDER_NAME}`, UserPayPalBillingShema)
export const BankModle = createBindToConnectionModel<UserBankInfo>(`${process.env.BANK_BLIING_FOLDER_NAME}`, UserBankInfoDBSchema)
