
import { useSession } from 'next-auth/react'
import {useEffect,useState} from 'react'
import { useRouter } from 'next/router'
import { Button } from '@mui/material'
import axios from 'axios'
import { PaypalBtnType } from './paypal'
import { IsracardCreateOrderType, IsracardCreateOrderZVS } from '@/types/pages-types/client/client-event-type'



const IsracardBtn=(props:IsracardCreateOrderType)=>{
  
const SaleLinkRequest = async (e: React.SyntheticEvent<HTMLButtonElement> )=>{

    const isValidData = IsracardCreateOrderZVS.safeParse(props)

    if(!isValidData.success){
      return alert(isValidData.error.issues)
    }
    
    try{
          const responce  = await axios.post("/api/client/providers/isracard/create-payment-link",props)
          console.log(responce.data)
          return responce.data
         }
    catch (err){ 
      console.log(err,"err front")
      return

     }

    
  }

return (
 <Button
   onClick={SaleLinkRequest}
   >ישרכרט
</Button>
)

}

export default IsracardBtn