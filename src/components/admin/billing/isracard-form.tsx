import { IsracardZVS } from "@/types/pages-types/admin/user-billing-info-types"
import { IsracardPropsType } from "../../../pages/admin/billing"
import { useRouter } from "next/router"
import axios from "axios"
import InputWrap from "@/mui-components/text_filed_wrap/input-wrap"
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
  
      const isValidData = IsracardZVS.safeParse(isracardBillingInfo)
  
      if (!isValidData.success) {
        console.log(isValidData.error.issues)
        return
      }
  
      try {
        const responce = await axios.post(ApiUrl, isValidData.data)
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
          onChangeHandler={(e) => { setIsracardBillingInfo(p => ({ ...p, firstName: e.target.value })) }}
          helpText={''}
          labelPosition={'top'}
        />

        <InputWrap
          variant='outlined'
          label={'שם משפחה'}
          value={isracardBillingInfo.lastName}
          onChangeHandler={(e) => { setIsracardBillingInfo(p => ({ ...p, lastName: e.target.value })) }}
          helpText={''}
          labelPosition={'top'}
        />

        <InputWrap
          variant='outlined'
          label={'תז'}
          value={isracardBillingInfo.socialId}
          onChangeHandler={(e) => { setIsracardBillingInfo(p => ({ ...p, socialId: e.target.value })) }}
          helpText={''}
          labelPosition={'top'}
        />

        <InputWrap
          variant='outlined'
          label={'טלפון'}
          value={isracardBillingInfo.phone}
          onChangeHandler={(e) => { setIsracardBillingInfo(p => ({ ...p, phone: e.target.value })) }}
          helpText={''}
          labelPosition={'top'}
        />
  
        <InputWrap
          variant='outlined'
          label={'מייל'}
          value={isracardBillingInfo.email}
          onChangeHandler={(e) => { setIsracardBillingInfo(p => ({ ...p, email: e.target.value })) }}
          helpText={''}
          labelPosition={'top'}
        />
  
        <InputWrap
          variant='outlined'
          label={'שם העסק'}
          value={isracardBillingInfo.businessName}
          onChangeHandler={(e) => { setIsracardBillingInfo(p => ({ ...p, businessName: e.target.value })) }}
          helpText={''}
          labelPosition={'top'}
        />
  
        <InputWrap
          variant='outlined'
          label={' מספר ח.פ - ע.מ'}
          value={isracardBillingInfo.businessNumber}
          onChangeHandler={(e) => { setIsracardBillingInfo(p => ({ ...p, businessNumber: e.target.value })) }}
          helpText={''}
          labelPosition={'top'}
        />
  
        <InputWrap
          variant='outlined'
          label={'שם החשבון'}
          value={isracardBillingInfo.accountName}
          onChangeHandler={(e) => { setIsracardBillingInfo(p => ({ ...p, accountName: e.target.value })) }}
          helpText={''}
          labelPosition={'top'}
        />
  
  
        <InputWrap
          variant='outlined'
          label={'מספר בנק'}
          value={isracardBillingInfo.bankNumber}
          onChangeHandler={(e) => { setIsracardBillingInfo(p => ({ ...p, bankNumber: e.target.value })) }}
          helpText={''}
          labelPosition={'top'}
        />
  
        <InputWrap
          variant='outlined'
          label={'מספר סניף'}
          value={isracardBillingInfo.bankBranch}
          onChangeHandler={(e) => { setIsracardBillingInfo(p => ({ ...p, bankBranch: e.target.value })) }}
          helpText={''}
          labelPosition={'top'}
        />
  
        <InputWrap
          variant='outlined'
          label={'מספר חשבון'}
          value={isracardBillingInfo.accountNumber}
          onChangeHandler={(e) => { setIsracardBillingInfo(p => ({ ...p, accountNumber: e.target.value })) }}
          helpText={''}
          labelPosition={'top'}
        />
  
        <InputWrap
          variant='outlined'
          label={'סוד'}
          value={isracardBillingInfo.apiKey}
          onChangeHandler={(e) => { setIsracardBillingInfo(p => ({ ...p, apiKey: e.target.value })) }}
          helpText={''}
          type='password'
          labelPosition={'top'}
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
  