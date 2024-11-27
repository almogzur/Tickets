import { useSession } from 'next-auth/react'
import {useEffect,useState} from 'react'
import { useRouter } from 'next/router'

const CostumeComponent=()=>{

  const router = useRouter()
  const { data: session ,status ,update} = useSession()

  useEffect(()=>{

        })

    if (status === 'loading') {
     return <h1 style={{textAlign:'center'}}>Loading...</h1>
}

return (<div></div>) 
}

export default CostumeComponent