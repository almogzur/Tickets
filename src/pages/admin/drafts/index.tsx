import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { Button, Typography } from '@mui/material'
import { useAdminDrafts } from '@/hooks/admin/use-admin-drafts'
import { useState } from 'react'
import {   GridColDef, GridRowsProp } from '@mui/x-data-grid'
import axios, { AxiosRequestConfig } from 'axios'
import { ImRedo2 } from "react-icons/im";
import DataGridWrap from '@/mui-components/data-grid-wrapper/grid-wrapper'
import LoadingScreen from '@/mui-components/loading'
import NewEventFormWrap from '@/components/admin/newEvent/from-wrapper'




const AdminDrafts=()=>{

  const router = useRouter()
  const { data: session ,status ,update} = useSession()
  const { Drafts , isDraftsError , isDraftsValidating , updateDrafts}=useAdminDrafts(session)
  const [ isLoading ,setIsLoading] = useState(false)
  const [ draftId ,setDraftId] = useState<string|undefined>(undefined)
  const [ delActionIsLoading,setDelActionIsLoading]= useState<string|undefined>(undefined)





  type GetActionsProps ={
     row:{ 
       eventId:string
       price:string,
       cat:string,
       date:Date
       location:string
       /** thar's more just add ...price cat  */
        }
     id:string|number
    }
  const Na = "לא זמין "

// Table Data 
  const ColData : GridColDef[] =  [
    { field: 'actions', type:'actions', headerName: 'פעולות',width: 170,
      getActions: ({ id , row }:GetActionsProps)=> {
           return [
            <Button  
              key={row.eventId}   
              loading={delActionIsLoading === row.eventId} 
              sx={{p:0.5}}
              color='error'
              onClick={()=>removeDraft(row.eventId)}  >מחק
            </Button>,
            <Button  
                key={row.eventId}
                onClick={()=>{setDraftId(row["eventId"])}} 
                
                    sx={{p:0.5}}
                     >ערוך</Button>
           ]
      
      }
    },
    { field: 'eventName', headerName: 'שם האירוע', align:'right' , width: 150  },
    { field: 'price', headerName: 'מחיר מלא', align:'right', width: 150 },
    { field: 'date', headerName: 'תאריך', align:'right', width: 150 },
    { field: "hour", headerName: "שעה" , align:"right" , width:150},
    { field: "location", headerName: "מיקום" , align:"right" , width:110},
    ]
  const Rows : GridRowsProp = 
    ! Drafts
       ? [{id:1,eventName:"טוען"}] 
    : Array.isArray(Drafts) 
       ? Drafts.map((draft,i)=> [
            {
            id:i ,
            eventName:draft.info.eventName,
            date:draft.info.Date ??  Na ,
            hour:draft.info.Hour ?? Na,
            price:draft.tickets?.map((ticket)=> ticket.selectedType ==='normal' ? ticket.price : null ),
            eventId:draft._id, // this value dose NOT ! have a value on columns , its for config the button key 
            location:draft.info.TheaterName?? Na,
            }
          ]
          ).flat() // Rows is Array and 
                   //  Draft.map return array so its [][] to cancel the map effect
       :
       [] // data is not array 
// Eed Table Data 

const Draft = Drafts?.find((draft) => draft._id === draftId);



// functions  

const  removeDraft = async (draftId:string)=>{
  setDelActionIsLoading(draftId)

  console.log("Remove Draft inv");

  const reqData = { id : draftId } // don't like any but the function  overload allow it 
   const options : AxiosRequestConfig ={ }
  
   try{ 
       const responce = await axios.post("/api/admin/drafts/remove-draft",reqData,options)

      if(responce.status){

     }
    }
   catch (err){
    alert( err )
     }
   finally {  
    
    await updateDrafts()
    setDelActionIsLoading(undefined)  
  }

}

if(status==="loading" || isLoading){
  return <LoadingScreen/>
}
 
return (

  < >
  { !draftId && <Typography textAlign={"center"} variant='h3' >טיוטות</Typography>}
     { draftId &&
      <Button variant='text' sx={{position:"absolute" , top:10 ,left:90 , zIndex:300}}  onClick={()=>{setDraftId(undefined)}} >
      <ImRedo2  size={'2em'} />
     </Button>}
    { !draftId
       ? <DataGridWrap columnsData={ColData} rowsData={Rows} />
       : <NewEventFormWrap Draft={Draft} DraftId={draftId}  />
    }
  
  </>
  ) 
}

export default AdminDrafts 


