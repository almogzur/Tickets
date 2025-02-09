import {z} from 'zod'


export const UserBankInfoValidationSchema= z.object({
    bank: z.string(),
    bankNumber: z.number(),
    backBranch: z.number(),
    ankAccountNumber:z.string(),
    accountName: z.string(),
    benifitName: z.string(),
    //------ pay pal
    payEmail: z.string(),
    AccountId: z.string(),
    type: z.literal('business'),
    phone: z.string(),
})

export type UserBankInfo = z.infer<typeof UserBankInfoValidationSchema>




