import { getCsrfToken, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { Typography, Stack as Flex, Button, Container } from '@mui/material'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { grey } from '@mui/material/colors'
import {  UserPayPalInfoType, UserIsracardInfoType, PayPalInfoZVS, IsracardZVS } from '@/types/pages-types/admin/user-biling-info-types'
import axios from 'axios'
import { useAdminPaypalBilingInfo } from '@/hooks/admin/use-admin-paypal-biiling-info'
import InputWrap from '@/mui-components/TeextFiledWrpa/input-wrap'
import IosWithTextSwitchWrap from '@/mui-components/ios-switch-wrap'
import { ZodIssue } from 'zod'
import { useAdminIsracardBilingInfo } from '@/hooks/admin/use-admin-isracard-billing-info'
import IsracardForm from '../../../components/admin/billing/istacard-from'
import PayPalForm from '../../../components/admin/billing/paypal-from'

// page is secure under JWT token 
// https uses  (Advanced Encryption Standard)  AES  chiper 
// back end uses same AES chiper  


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
  const [pageMounte, setPageMaount] = useState<boolean>(false)

  const { UserDBPayPalInfo } = useAdminPaypalBilingInfo(session)
  const { UserDBIsracardlInfo } = useAdminIsracardBilingInfo(session)

  const [biilingType, setBiilingType] = useState<BillingAccountStateType>({
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

    setPageMaount(true)

   // console.log(UserDBIsracardlInfo, UserDBPayPalInfo)

    if (UserDBPayPalInfo) {

      setBiilingType(p => ({ ...p, paypal: true }))
      setPayPalBillingInfo(UserDBPayPalInfo)

    }
    
    if(UserDBIsracardlInfo){
      setBiilingType(p => ({ ...p, isracard: true }))

      setIsracardBillingInfo(UserDBIsracardlInfo)
    }


  }, [UserDBIsracardlInfo, UserDBPayPalInfo])


  if (!pageMounte) {
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
          switchValue={biilingType.isracard}
          switchOnChangeHendler={(e, checked) => { setBiilingType(p => ({ ...p, isracard: checked })) }}
          title={'בנקאי'}
          labelPlacement={'top'}
          textColor='black'
        />

        <IosWithTextSwitchWrap
          switchValue={biilingType.paypal}
          switchOnChangeHendler={(e, checked) => { setBiilingType(p => ({ ...p, paypal: checked })) }}
          title={'פייפאל'}
          labelPlacement={'top'}
          textColor='black'
        />

      </Switches>

     { biilingType.isracard && <IsracardForm   isracardBillingInfo={isracardBillingInfo} setIsracardBillingInfo={setIsracardBillingInfo}/> }

     { biilingType.paypal && <PayPalForm  PayPalBillingInfo={PayPalBillingInfo}setPayPalBillingInfo={setPayPalBillingInfo}/>}

    </PageWrapper>
  )
}



export default AdminBillingPage