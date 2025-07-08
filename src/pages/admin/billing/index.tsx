import {  useSession } from 'next-auth/react'
import { Typography, Stack as Flex, Button, Container } from '@mui/material'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { grey } from '@mui/material/colors'
import {  UserPayPalInfoType, UserIsracardInfoType, PayPalInfoZVS, IsracardZVS } from '@/types/pages-types/admin/user-billing-info-types'
import IosWithTextSwitchWrap from '@/mui-components/ios-switch-wrap'
import { useAdminPaypalBillingInfo } from '@/hooks/admin/use-admin-paypal-billing-info'
import { useAdminIsracardBillingInfo } from '@/hooks/admin/use-admin-isracard-billing-info'
import IsracardForm from '@/components/admin/billing/isracard-form'
import PayPalForm from '../../../components/admin/billing/paypal-from'

// page is secure under JWT token 
// https uses  (Advanced Encryption Standard)  AES  chipper 
// back end uses same AES chipper  


export type BillingAccountStateType = {
  paypal: boolean,
  isracard: boolean
}

export type IsracardPropsType =  {
  isracardBillingInfo: UserIsracardInfoType,
  setIsracardBillingInfo: Dispatch<SetStateAction<UserIsracardInfoType>>
}
export type PayPalFormPropsType = {
  PayPalBillingInfo: UserPayPalInfoType
  setPayPalBillingInfo: Dispatch<SetStateAction<UserPayPalInfoType>>
}


const PageWrapper = Flex,
  Switches = Flex

const AdminBillingPage = () => {

  const { data: session, status, update } = useSession()
  const [pageLoad, setPageLoad] = useState<boolean>(false)

  const { UserDBPayPalInfo } = useAdminPaypalBillingInfo(session)
  const { UserDBIsracardInfo } = useAdminIsracardBillingInfo(session)

  const [billingType, setBillingType] = useState<BillingAccountStateType>({
    paypal: false,
    isracard: false
  })

  const [PayPalBillingInfo, setPayPalBillingInfo] = useState<UserPayPalInfoType>({
    
    email: "",
    accountId: "",
    type: "business",
    phone: "",
    clientId: "",
    clientSecret: "",

  })
  const [isracardBillingInfo, setIsracardBillingInfo] = useState<UserIsracardInfoType>({
    firstName: '',
    lastName: '',
    socialId: '',
    phone: '',
    email: '',

    businessName: '',
    businessNumber: '',
    
    bankNumber: '',
    bankBranch: '',

    accountNumber: '',
    accountName: '',
    apiKey: '',
  })


  useEffect(() => {

    setPageLoad(true)

   // console.log(UserDBIsracardInfo, UserDBPayPalInfo)

    if (UserDBPayPalInfo) {

      setBillingType(p => ({ ...p, paypal: true }))
      setPayPalBillingInfo(UserDBPayPalInfo)

    }
    
    if(UserDBIsracardInfo){
      setBillingType(p => ({ ...p, isracard: true }))

      setIsracardBillingInfo(UserDBIsracardInfo)
    }


  }, [UserDBIsracardInfo, UserDBPayPalInfo])


  if (!pageLoad) {
    return <h3>loading...</h3>
  }


  return (
     <PageWrapper
      justifyContent={"center"}
      flexWrap={'wrap'}
      gap={2}
      bgcolor={grey[300]}
      m={1}
      mt={1}
      p={4}
      borderRadius={4}
    >

      <Typography variant='h5' fontWeight={"bold"} textAlign={"center"} >חשבון סליקה אשראי </Typography>

      <Switches direction={"row"}>

        <IosWithTextSwitchWrap
          switchValue={billingType.isracard}
          switchOnChangeHandler={(e, checked) => { setBillingType(p => ({ ...p, isracard: checked })) }}
          title={'בנקאי'}
          labelPlacement={'top'}
          textColor='black'
        />

        <IosWithTextSwitchWrap
          switchValue={billingType.paypal}
          switchOnChangeHandler={(e, checked) => { setBillingType(p => ({ ...p, paypal: checked })) }}
          title={'פייפאל'}
          labelPlacement={'top'}
          textColor='black'
        />

      </Switches>

     { billingType.isracard && <IsracardForm   isracardBillingInfo={isracardBillingInfo} setIsracardBillingInfo={setIsracardBillingInfo}/> }

     { billingType.paypal && <PayPalForm  PayPalBillingInfo={PayPalBillingInfo}setPayPalBillingInfo={setPayPalBillingInfo}/>}

    </PageWrapper>
  )
}



export default AdminBillingPage