import { getCsrfToken, useSession } from 'next-auth/react'
import router, { useRouter } from 'next/router'
import { Typography, Stack as Flex, Button, Container } from '@mui/material'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { grey } from '@mui/material/colors'
import AdminLayout from '@/Wrappers/admin'
import { UserIsracardInfo, UserPayPalInfoZVS, UserPayPalInfo } from '@/types/pages-types/admin/user-biling-info-types'
import axios from 'axios'
import { useAdminBilingInfo } from '@/hooks/admin/use-admin-biiling-info'
import SelectWrap from '@/HOCs/select-wrap'
import InputWrap from '@/HOCs/TeextFiledWrpa/input-wrap'
import IosWithTextSwitchWrap from '@/HOCs/ios-switch-wrap'

// page is secure under JWT token 
// https uses  (Advanced Encryption Standard)  AES  chiper 
// back end uses same AES chiper  


export type BillingAccountStateType = {
  paypal: boolean,
  isracard: boolean
}


const Wrapper = Flex,
  Switches = Flex,
  Buttons = Flex

const AdminBillingPage = () => {

  const { data: session, status, update } = useSession()
  const [pageMounte, setPageMaount] = useState<boolean>(false)


  const [biilingType, setBiilingType] = useState<BillingAccountStateType>({
    paypal: false,
    isracard: false
  })

  const { UserDBPayPalInfo } = useAdminBilingInfo(session)

  const [PayPalBillingInfo, setPayPalBillingInfo] = useState<UserPayPalInfo>({
    payEmail: "",
    AccountId: "",
    type: "business",
    phone: "",
    clientId: "",
    clientSecret: ""
  })

  const [isracardBillingInfo, setIsracardBillingInfo] = useState<UserIsracardInfo>({
    bank: "",
    bankNumber: 0,
    bankBranch: 0,
    ankAccountNumber: "",
    accountName: "",
    benifitName: "",
  })


  useEffect(() => {

    setPageMaount(true)

    if (UserDBPayPalInfo) {
      const { AccountId, payEmail, phone } = UserDBPayPalInfo

      if (AccountId && payEmail && phone) {
        setBiilingType(p => ({ ...p, paypal: true }))
        setPayPalBillingInfo(UserDBPayPalInfo)
      }
    }


  }, [UserDBPayPalInfo])


  if (!pageMounte) {
    return <h3>loading...</h3>
  }


  return (
    <Wrapper

      justifyContent={"center"}
      flexWrap={'wrap'}
      gap={2}
      bgcolor={grey[300]}
      m={1}
      mt={1}
      p={4}
      borderRadius={4}
    >
      <Typography variant='h5' fontWeight={"bold"} textAlign={"center"} >   חשבון סליקה אשראי </Typography>

      <Switches direction={"row"}>

        <IosWithTextSwitchWrap
          switchValue={biilingType.isracard}
          switchOnChangeHendler={(e, checked) => { setBiilingType(p => ({ ...p, isracard: checked })) }}
          title={'ישראכרט'}
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

      {biilingType.paypal &&
        <PayPalForm PayPalBillingInfo={PayPalBillingInfo} setPayPalBillingInfo={setPayPalBillingInfo} />
      }

      {biilingType.isracard &&
        <BankForm isracardBillingInfo={isracardBillingInfo} setIsracardBillingInfo={setIsracardBillingInfo} />
      }

    </Wrapper>
  )
}

type PayPalFormPropsType = {
  PayPalBillingInfo: UserPayPalInfo
  setPayPalBillingInfo: Dispatch<SetStateAction<UserPayPalInfo>>
}
type IsracardPropsType = {
  isracardBillingInfo: UserIsracardInfo,
  setIsracardBillingInfo: Dispatch<SetStateAction<UserIsracardInfo>>

}


const PayPalForm = ({ PayPalBillingInfo, setPayPalBillingInfo }: PayPalFormPropsType) => {

  const router = useRouter()

  const savePayPalInfo = async (e: React.SyntheticEvent<HTMLButtonElement>,) => {

    const isValiedData = UserPayPalInfoZVS.safeParse(PayPalBillingInfo)

    if (!isValiedData.success) {
      console.log("no valid data  Client ", isValiedData.error.issues)
      return
    }


    // hasing sring befor sending the req , so if db is gets hacked the haker letf with  *hit 
    const URL = "/api/admin/billing-info/paypal/add-billing-info"
    const data: UserPayPalInfo = isValiedData.data

    try {
      const responce = await axios.post(URL, data)
      if (responce.status === 200) {
        router.push("/admin")
      }
    } catch (err) {
      alert(err)
    }
  }





  return (
    <Flex width={"100%"} maxWidth={600}    >
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

      <Buttons direction={"row"} gap={1} >
        <Button> שמור</Button>
        <Button> עדכן</Button>
        <Button> הסר</Button>
      </Buttons>
    </Flex>
  )
}


const BankForm = ({ isracardBillingInfo, setIsracardBillingInfo }: IsracardPropsType) => {

  const router = useRouter()

  const saveIsracardInfo = (e: React.SyntheticEvent<HTMLButtonElement>,) => { }


  return (
    <Flex width={"100%"} maxWidth={600}   >
      <Typography>חשבון   בנק </Typography>
      <InputWrap variant='outlined' label={'בנק'} value={undefined} onChangeHndler={() => { }} helpText={''} labelPositioin={'top'} disabled />
      <InputWrap variant='outlined' label={'מספר בנק'} value={undefined} onChangeHndler={() => { }} helpText={''} labelPositioin={'top'} disabled />
      <InputWrap variant='outlined' label={'מספר סניף'} value={undefined} onChangeHndler={() => { }} helpText={''} labelPositioin={'top'} disabled />
      <InputWrap variant='outlined' label={'שם החשבון'} value={undefined} onChangeHndler={() => { }} helpText={''} labelPositioin={'top'} disabled />
      <InputWrap variant='outlined' label={'מספר חשבון'} value={undefined} onChangeHndler={() => { }} helpText={''} labelPositioin={'top'} disabled />

      <InputWrap variant='outlined' label={'שם המוטב'} value={undefined} onChangeHndler={() => { }} helpText={''} labelPositioin={'top'} disabled />

      <Buttons direction={"row"} gap={1} >
        <Button> שמור</Button>
        <Button> עדכן</Button>
        <Button> הסר</Button>
      </Buttons>

    </Flex>
  )
}




export default AdminBillingPage