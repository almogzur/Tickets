

export const UserBankInfoDBSchema = {
    bank: { type: String, requierd: true },
    bankNumber: { type: Number, requierd: true },
    bankBranch: { type: Number, requierd: true },
    ankAccountNumber: { type: String, requierd: true },
    accountName: { type: String, requierd: true },
    benifitName: { type: String, requierd: true },
}
export  const UserPayPalBillingShema = {
    payEmail: { type: String, requierd: true ,unique:true },
    AccountId: { type: String, requierd: true ,unique:true},
    type: { type: String, requierd: true },
    phone: { type: String, requierd: true,unique:true },
    clientId:{ type:String , requierd: true,unique:true  },
    clientSecret:{type:String ,requierd: true,unique:true  }
}


// complite the billing form

