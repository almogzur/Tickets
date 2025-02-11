import { z } from 'zod'

export type BillingAccountType  = "PayPal"| "Bank"| ""

export const UserBankInfoValidationSchema = z.object({
    bank: z.string(),
    bankNumber: z.number(),
    bankBranch: z.number(),
    ankAccountNumber: z.string(),
    accountName: z.string(),
    benifitName: z.string(),
})

const phoneRegex = new RegExp( /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/);

export const UserPayPalInfoValidationSchema = z.object({
    payEmail: z.string().email(),
    AccountId: z.string().min(6),
    type: z.literal('business'),
    phone: z.string().regex(phoneRegex, 'מספר לא תקין '),
    clientId:z.string().min(1),
    clientSecret:z.string().min(1)
})

export type UserPayPalInfo = z.infer<typeof UserPayPalInfoValidationSchema>
export type UserBankInfo = z.infer<typeof UserBankInfoValidationSchema>




