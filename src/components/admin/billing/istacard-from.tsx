import { IsracardZVS } from "@/types/pages-types/admin/user-biling-info-types"
import { IsracardPropsType } from "../../../pages/admin/biling"
import { useRouter } from "next/router"
import axios from "axios"
import InputWrap from "@/mui-components/TeextFiledWrpa/input-wrap"
import { Typography , Stack as Flex, Button } from "@mui/material"


const Buttons = Flex

const IsracardForm = ({ isracardBillingInfo, setIsracardBillingInfo }: IsracardPropsType) => {

    const router = useRouter()
  
    const UserIsracardFormErrors = () => {
      const validateIsracardInfo = IsracardZVS.safeParse(isracardBillingInfo)
      return
  
    }
  
  
    const saveIsracardInfo = async (e: React.SyntheticEvent<HTMLButtonElement>,) => {
  
      e.preventDefault()
  
      const ApiUrl = '/api/admin/billing/isracard/save-isracard-info'
  
      const isValiedData = IsracardZVS.safeParse(isracardBillingInfo)
  
      if (!isValiedData.success) {
        console.log(isValiedData.error.issues)
        return
      }
  
      try {
        const responce = await axios.post(ApiUrl, isValiedData.data)
        if (responce.status === 200) {
          return router.push("/admin")
        }
        alert(responce.data)
      }
      catch (err) {
        alert(err)
      }
  
  
  
  
  
  
    }
  
  
    const {
      businessName,
      businessNumber,
      bankBranch,
      bankNumber,
      accountName,
      accountNumber,
      apiKey,
      ...restUserInfo
    } = isracardBillingInfo
  
  
  
    return (
      <Flex width={"100%"} maxWidth={600}   >
  
        <Typography>    פרטי חשבון בנקאי  </Typography>

        <InputWrap
          variant='outlined'
          label={'שם'}
          value={isracardBillingInfo.firstName}
          onChangeHndler={(e) => { setIsracardBillingInfo(p => ({ ...p, firstName: e.target.value })) }}
          helpText={''}
          labelPositioin={'top'}
        />

        <InputWrap
          variant='outlined'
          label={'שם משפחה'}
          value={isracardBillingInfo.lastName}
          onChangeHndler={(e) => { setIsracardBillingInfo(p => ({ ...p, lastName: e.target.value })) }}
          helpText={''}
          labelPositioin={'top'}
        />

        <InputWrap
          variant='outlined'
          label={'תז'}
          value={isracardBillingInfo.socialId}
          onChangeHndler={(e) => { setIsracardBillingInfo(p => ({ ...p, socialId: e.target.value })) }}
          helpText={''}
          labelPositioin={'top'}
        />

        <InputWrap
          variant='outlined'
          label={'טלפון'}
          value={isracardBillingInfo.phone}
          onChangeHndler={(e) => { setIsracardBillingInfo(p => ({ ...p, phone: e.target.value })) }}
          helpText={''}
          labelPositioin={'top'}
        />
  
        <InputWrap
          variant='outlined'
          label={'מייל'}
          value={isracardBillingInfo.email}
          onChangeHndler={(e) => { setIsracardBillingInfo(p => ({ ...p, email: e.target.value })) }}
          helpText={''}
          labelPositioin={'top'}
        />
  
        <InputWrap
          variant='outlined'
          label={'שם העסק'}
          value={isracardBillingInfo.businessName}
          onChangeHndler={(e) => { setIsracardBillingInfo(p => ({ ...p, businessName: e.target.value })) }}
          helpText={''}
          labelPositioin={'top'}
        />
  
        <InputWrap
          variant='outlined'
          label={' מספר ח.פ - ע.מ'}
          value={isracardBillingInfo.businessNumber}
          onChangeHndler={(e) => { setIsracardBillingInfo(p => ({ ...p, businessNumber: e.target.value })) }}
          helpText={''}
          labelPositioin={'top'}
        />
  
        <InputWrap
          variant='outlined'
          label={'שם החשבון'}
          value={isracardBillingInfo.accountName}
          onChangeHndler={(e) => { setIsracardBillingInfo(p => ({ ...p, accountName: e.target.value })) }}
          helpText={''}
          labelPositioin={'top'}
        />
  
  
        <InputWrap
          variant='outlined'
          label={'מספר בנק'}
          value={isracardBillingInfo.bankNumber}
          onChangeHndler={(e) => { setIsracardBillingInfo(p => ({ ...p, bankNumber: e.target.value })) }}
          helpText={''}
          labelPositioin={'top'}
        />
  
        <InputWrap
          variant='outlined'
          label={'מספר סניף'}
          value={isracardBillingInfo.bankBranch}
          onChangeHndler={(e) => { setIsracardBillingInfo(p => ({ ...p, bankBranch: e.target.value })) }}
          helpText={''}
          labelPositioin={'top'}
        />
  
        <InputWrap
          variant='outlined'
          label={'מספר חשבון'}
          value={isracardBillingInfo.accountNumber}
          onChangeHndler={(e) => { setIsracardBillingInfo(p => ({ ...p, accountNumber: e.target.value })) }}
          helpText={''}
          labelPositioin={'top'}
        />
  
        <InputWrap
          variant='outlined'
          label={'סוד'}
          value={isracardBillingInfo.apiKey}
          onChangeHndler={(e) => { setIsracardBillingInfo(p => ({ ...p, apiKey: e.target.value })) }}
          helpText={''}
          type='password'
          labelPositioin={'top'}
        />
  
  
  
        <Buttons direction={"row"} gap={1} >
  
          <Button
            onClick={saveIsracardInfo}
  
          > שמור</Button>
          <Button> עדכן</Button>
          <Button> הסר</Button>
        </Buttons>
  
      </Flex>
    )
}

export default IsracardForm
  