import InputWrap from "@/mui-components/text_filed_wrap/input-wrap"
import { PayPalInfoZVS, UserPayPalInfoType } from "@/types/pages-types/admin/user-billing-info-types"
import { Typography, Button, Stack as Flex } from "@mui/material"
import axios from "axios"
import { useRouter } from "next/router"
import { ZodIssue } from "zod"
import { PayPalFormPropsType } from "../../../pages/admin/billing"


const Buttons = Flex


const PayPalForm = ({ PayPalBillingInfo, setPayPalBillingInfo }: PayPalFormPropsType) => {


    const UserPayPalFormErrors = (fromFiled: string): ZodIssue | undefined => {
      const validatePayPalInfo = PayPalInfoZVS.safeParse(PayPalBillingInfo)
      return
    }
  
    const router = useRouter()
  
    const savePayPalInfo = async (e: React.SyntheticEvent<HTMLButtonElement>,) => {
  
      const isValidData = PayPalInfoZVS.safeParse(PayPalBillingInfo)
  
      if (!isValidData.success) {
        console.log("savePayPalInfo no valid data", isValidData.error.issues)
        return
      }
  
      // hashing string before sending the req , so if db is gets hacked the hacker left with  *hit 
  
      const URL = "/api/admin/billing/paypal/save-paypal-info"
  
      const data: UserPayPalInfoType = isValidData.data
  
      try {
        const responce = await axios.post(URL, data)
        if (responce.status === 200) {
          router.push("/admin")
        }
      } catch (err) {
        alert(err)
      }
    }
  
    const { email, accountId, type, clientId, clientSecret, ...restInfo } = PayPalBillingInfo
  
  
    return (
  
      <Flex width={"100%"} maxWidth={600}    >
  
  
        <Typography>חשבון PayPal </Typography>
  
        <InputWrap
          variant='outlined'
          label={'מייל'}
          value={PayPalBillingInfo.email}
          onChangeHandler={(e) => {
            const value = e.target.value
            setPayPalBillingInfo(p => ({ ...p, email: value }))
          }}
          helpText={''}
          labelPosition={'top'}
        />
  
        <InputWrap
          variant='outlined'
          label={'  מזהה חשבון'}
          value={PayPalBillingInfo.accountId}
          onChangeHandler={(e) => {
            const value = e.target.value
            setPayPalBillingInfo(p => ({ ...p, accountId: value }))
          }}
          helpText={''}
          labelPosition={'top'}
        />
  
        <InputWrap variant='outlined'
          label={'טלפון'}
          value={PayPalBillingInfo.phone}
          onChangeHandler={(e) => {
            const value = e.target.value
            setPayPalBillingInfo(p => ({ ...p, phone: value }))
          }}
          helpText={''}
          labelPosition={'top'}
        />
  
        <InputWrap
          variant='outlined'
          label={'מזהה אפליקצה '}
          value={PayPalBillingInfo.clientId}
          onChangeHandler={(e) => {
            const value = e.target.value
            setPayPalBillingInfo(p => ({ ...p, clientId: value }))
          }}
          helpText={''}
          labelPosition={'top'}
        />
  
        <InputWrap
          type='password'
          variant='outlined'
          label={' סוד '}
          value={PayPalBillingInfo.clientSecret}
          onChangeHandler={(e) => {
            const value = e.target.value
            setPayPalBillingInfo(p => ({ ...p, clientSecret: value }))
          }}
          helpText={''}
          labelPosition={'top'}
        />
  
        <Buttons direction={"row"} gap={1} >
          <Button
            onClick={savePayPalInfo}
          > שמור
          </Button>
  
          <Button> עדכן</Button>
          <Button> הסר</Button>
  
        </Buttons>
      </Flex>
    )
}

export default PayPalForm  
  