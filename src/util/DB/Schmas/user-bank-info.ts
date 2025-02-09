import { UserBankInfo } from "@/types/pages-types/finance-types";
import { createModel } from "./event";


export const UserBankInfoDBSchema= {
    bank: {  },
    bankNumber: {},
    backBranch: {},
    ankAccountNumber:{},
    accountName: {},
    benifitName:{},
    //------ pay pal
    payEmail: {},
    AccountId:{},
    type: {},
    phone: {},
}


// complite the billing form


export const UsersModle =  createModel<UserBankInfo>("BankInfo",UserBankInfoDBSchema)
