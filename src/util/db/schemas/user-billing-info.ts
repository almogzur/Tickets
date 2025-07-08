

export const UserIsracardSchema = {
    
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    socialId: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },

    businessName: { type: String, required: true },
    businessNumber: { type: String, required: true },
    accountName: { type: String, required: true },

    
    bankNumber: { type: String, required: false }, // send box
    bankBranch: { type: String, required: false}, // send box
    accountNumber: { type: String, required: false }, // send box

    apiKey: { type: String, required: true }
}


export  const UserPayPalBillingSchema = {
    email: { type: String, requierd: true ,unique:true },
    accountId: { type: String, requierd: true ,unique:true},
    type: { type: String, requierd: true },
    phone: { type: String, requierd: true,unique:true },
    clientId:{ type:String , requierd: true,unique:true  },
    clientSecret:{type:String ,requierd: true,unique:true  }
}


// complite the billing form

