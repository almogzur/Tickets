
import { z } from 'zod'

const phoneRegex = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/);


export const IsracardZVS = z.object({
    firstName: z.string().nonempty(),
    lastName: z.string().nonempty(),
    socialId: z.string().nonempty(),
    phone: z.string().nonempty(),
    email: z.string().nonempty(),

    businessName: z.string().nonempty(),
    businessNumber: z.string().nonempty(),
    accountName: z.string().nonempty(),

    bankNumber: z.string().optional(),
    bankBranch: z.string().optional(),
    accountNumber: z.string().optional(),

    apiKey: z.string().nonempty(),
})

export const PayPalInfoZVS = z.object({
    email: z.string().email(),
    accountId: z.string().min(6),
    type: z.literal('business'),
    phone: z.string().regex(phoneRegex, 'מספר לא תקין '),
    clientId: z.string().nonempty(),
    clientSecret: z.string().nonempty(),
})

export type UserPayPalInfoType = z.infer<typeof PayPalInfoZVS>
export type UserIsracardInfoType = z.infer<typeof IsracardZVS>
