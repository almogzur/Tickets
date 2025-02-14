import { getCsrfToken, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { Typography, Stack as Flex, Button, Container } from '@mui/material'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { grey } from '@mui/material/colors'
import AdminLayout from '@/Wrappers/admin'
import { BillingAccountType, UserBankInfo, UserBankInfoValidationSchema, UserPayPalInfo, UserPayPalInfoValidationSchema } from '@/types/pages-types/admin/user-biling-info-types'
import axios from 'axios'
import { useAdminBilingInfo } from '@/hooks/admin/use-admin-biiling-info'
import SelectWrap from '@/HOCs/select-wrap'
import InputWrap from '@/HOCs/TeextFiledWrpa/input-wrap'

// page is secure under JWT token 
// https uses  (Advanced Encryption Standard)  AES  chiper 
// back end uses same AES chiper  



const AdminBillingPage = () => {

  const router = useRouter()
  const { data: session, status, update } = useSession()
  const [biilingType, setBiilingType] = useState<BillingAccountType>("")
  const { PayPalInfo, updatePayPalInfo, isPayPalInfoError, isPayPalInfoValidating } = useAdminBilingInfo(session)

  const [PayPalBillingInfo, setPayPalBillingInfo] = useState<UserPayPalInfo>({
    payEmail: "",
    AccountId: "",
    type: "business",
    phone: "",
    clientId: "",
    clientSecret: ""
  })

  const [BankBillingInfo, setBankBillingInfo] = useState<UserBankInfo>({
    bank: "",
    bankNumber: 0,
    bankBranch: 0,
    ankAccountNumber: "",
    accountName: "",
    benifitName: "",

  })


  useEffect(() => {

    if (PayPalInfo) {

      const { AccountId, payEmail, phone } = PayPalInfo

      if (AccountId && payEmail && phone) {
        setBiilingType('PayPal')
        setPayPalBillingInfo(PayPalInfo)

      }
    }
  }, [PayPalInfo])


  const savePayPalInfo = async (e: React.SyntheticEvent<HTMLButtonElement>,) => {

    const isValiedData = UserPayPalInfoValidationSchema.safeParse(PayPalBillingInfo)

    if(!isValiedData.success){
      console.log("no valid data  Client "  , "")
      return
    }
  

    // hasing sring befor sending the req , so if db is gets hacked the haker letf with  *hit 
    const URL = "/api/admin/billing-info/paypal/add-billing-info"
    const data: UserPayPalInfo = isValiedData.data

    try {
       const responce = await axios.post( URL , data )
      if (responce.status === 200) {} 
       alert(responce.data)
    }catch (err) {
       alert(err)
    }
  }

  const saveBankInfo = async (e: React.SyntheticEvent<HTMLButtonElement>) => { }

  // const responce =  axios.post("/api/billing/new-billing",{})

  const Wrapper = Flex


  return (
    <AdminLayout >
      <Typography variant='h3' textAlign={"center"} > כספים</Typography>

      <Container>
        <Wrapper
          direction={"row"}
          justifyContent={"center"}
          flexWrap={'wrap'}
          gap={2}
          bgcolor={grey[300]}
          m={3}
          mt={1}
          p={4}
          borderRadius={4}
        >

          <SelectWrap
            label={'סוג חשבון'}
            items={[{ value: "Bank", label: "בנקאי" }, { value: "PayPal", label: "PayPal" }]}
            value={biilingType}
            changeHndler={(e) => {
              // e.target.value type : any
              //https://github.com/DefinitelyTyped/DefinitelyTyped/issues/11508#issuecomment-256045682
              setBiilingType(e.target.value as BillingAccountType)
            }}
            helpText={''}
            labelPositioin={'top'} />

          {biilingType === 'PayPal'
            ? <PayPalForm PayPalBillingInfo={PayPalBillingInfo} setPayPalBillingInfo={setPayPalBillingInfo} />
            : biilingType === 'Bank'
              ? <BankForm />
              : undefined
          }

          <Flex width={"100%"} >
            <Button onClick={
              biilingType === 'Bank'
                ? saveBankInfo
                : biilingType === 'PayPal'
                  ? savePayPalInfo
                  : undefined
            } >עדכן</Button>
          </Flex>

        </Wrapper>
      </Container>

    </AdminLayout>
  )
}

export default AdminBillingPage


type PayPalFormPropsType = {
  PayPalBillingInfo: UserPayPalInfo
  , setPayPalBillingInfo: Dispatch<SetStateAction<UserPayPalInfo>>

}

const PayPalForm = ({ PayPalBillingInfo, setPayPalBillingInfo }: PayPalFormPropsType) => {

  return (
    <Flex width={"100%"} maxWidth={600}   >
      <Typography>חשבון PayPal </Typography>
      <InputWrap
        variant='outlined'
        label={'מייל'}
        value={PayPalBillingInfo.payEmail}
        onChangeHndler={(e) => {
          const value = e.target.value
          setPayPalBillingInfo(p => ({ ...p, payEmail: value }))
        }}
        helpText={''}
        labelPositioin={'top'}
      />
      <InputWrap
        variant='outlined'
        label={'  מזהה חשבון'}
        value={PayPalBillingInfo.AccountId}
        onChangeHndler={(e) => {
          const value = e.target.value
          setPayPalBillingInfo(p => ({ ...p, AccountId: value }))
        }}
        helpText={''}
        labelPositioin={'top'}
      />
      <InputWrap variant='outlined'
        label={'טלפון'}
        value={PayPalBillingInfo.phone}
        onChangeHndler={(e) => {
          const value = e.target.value
          setPayPalBillingInfo(p => ({ ...p, phone: value }))
        }}
        helpText={''}
        labelPositioin={'top'}
      />

      <InputWrap
        variant='outlined'
        label={'מזהה אפליקצה '}
        value={PayPalBillingInfo.clientId}
        onChangeHndler={(e) => {
          const value = e.target.value
          setPayPalBillingInfo(p => ({ ...p, clientId: value }))
        }}
        helpText={''}
        labelPositioin={'top'}
      />

      <InputWrap
        type='password'
        variant='outlined'
        label={' סוד '}
        value={PayPalBillingInfo.clientSecret}
        onChangeHndler={(e) => {
          const value = e.target.value
          setPayPalBillingInfo(p => ({ ...p, clientSecret: value }))
        }}
        helpText={''}
        labelPositioin={'top'}
      />
    </Flex>
  )
}

const BankForm = () => {


  return (
    <Flex width={"100%"} maxWidth={600}   >
      <Typography>חשבון   בנק </Typography>
      <InputWrap variant='outlined' label={'בנק'} value={undefined} onChangeHndler={() => { }} helpText={''} labelPositioin={'top'} disabled />
      <InputWrap variant='outlined' label={'מספר בנק'} value={undefined} onChangeHndler={() => { }} helpText={''} labelPositioin={'top'} disabled />
      <InputWrap variant='outlined' label={'מספר סניף'} value={undefined} onChangeHndler={() => { }} helpText={''} labelPositioin={'top'} disabled />
      <InputWrap variant='outlined' label={'שם החשבון'} value={undefined} onChangeHndler={() => { }} helpText={''} labelPositioin={'top'} disabled />
      <InputWrap variant='outlined' label={'מספר חשבון'} value={undefined} onChangeHndler={() => { }} helpText={''} labelPositioin={'top'} disabled />
      <InputWrap variant='outlined' label={'שם המוטב'} value={undefined} onChangeHndler={() => { }} helpText={''} labelPositioin={'top'} disabled />
    </Flex>
  )
}


