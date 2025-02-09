import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { Typography, Stack as Flex, Button, Container } from '@mui/material'
import { ChangeEvent, useState } from 'react'
import { grey } from '@mui/material/colors'
import InputWrap from '@/components/gen/TeextFiledWrpa/input-wrap'
import AdminLayout from '@/components/Layouts/admin-layout'
import { UserBankInfo, UserBankInfoValidationSchema } from '@/types/pages-types/finance-types'
import axios from 'axios'


const FinancePage = () => {

  const router = useRouter()
  const { data: session, status, update } = useSession()
  
  //https://github.com/DefinitelyTyped/DefinitelyTyped/issues/11508#issuecomment-256045682
  const saveInfo = async ( e:React.SyntheticEvent<HTMLButtonElement> ,  )=>{

    if( UserBankInfoValidationSchema.safeParse(formData).success ){

    try{ 
      const responce = await axios.post("",{})

     }
    catch (err){  }
    finally {  }
    }
  }

  const [formData, setFormData] = useState<UserBankInfo>({
    // back futher ref
    bank: "",
    bankNumber: 0,
    backBranch: 0,
    ankAccountNumber: "",
    accountName: "",
    benifitName: "",
    //------ pay pal
    payEmail: "",
    AccountId: "",
    type: "business",
    phone: "",
    
  })

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
   
        <Flex width={"100%"} maxWidth={600}   >
          <Typography>חשבון   בנק </Typography>
          <InputWrap variant='outlined' label={'בנק'} value={undefined} onChangeHndler={() => { }} helpText={''} labelPositioin={'top'} disabled />
          <InputWrap variant='outlined' label={'מספר בנק'} value={undefined} onChangeHndler={() => { }} helpText={''} labelPositioin={'top'} disabled />
          <InputWrap variant='outlined' label={'מספר סניף'} value={undefined} onChangeHndler={() => { }} helpText={''} labelPositioin={'top'} disabled />
          <InputWrap variant='outlined' label={'שם החשבון'} value={undefined} onChangeHndler={() => { }} helpText={''} labelPositioin={'top'} disabled />
          <InputWrap variant='outlined' label={'מספר חשבון'} value={undefined} onChangeHndler={() => { }} helpText={''} labelPositioin={'top'} disabled />
          <InputWrap variant='outlined' label={'שם המוטב'} value={undefined} onChangeHndler={() => { }} helpText={''} labelPositioin={'top'} disabled />
        </Flex>

        <Flex width={"100%"} maxWidth={600}   >
          <Typography>חשבון PayPal </Typography>
          <InputWrap 
          variant='outlined'
           label={'email'}
            value={formData.payEmail}
             onChangeHndler={(e) => { 
              const value = e.target.value
                setFormData(p => ({ ...p , payEmail:value }) )
             }} 
             helpText={''} 
             labelPositioin={'top'}
              />
           <InputWrap 
              variant='outlined'
               label={'id'}
                value={formData.AccountId}
                onChangeHndler={(e) => { 
                  const value = e.target.value
                    setFormData(p => ({ ...p , AccountId:value }) )
                 }} 
                 helpText={''} 
                 labelPositioin={'top'}
                  />
             <InputWrap variant='outlined' 
               label={'phone'} 
                value={formData.phone}
                onChangeHndler={(e) => { 
                  const value = e.target.value
                    setFormData(p => ({ ...p , phone:value }) )
                 }}  
              helpText={''} 
              labelPositioin={'top'}
              />
        </Flex>
        <Flex width={"100%"} >
        <Button onClick={saveInfo} >עדכן</Button>
        </Flex>

      </Wrapper>
      </Container>
   
    </AdminLayout>
  )
}

export default FinancePage


