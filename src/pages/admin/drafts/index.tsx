import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import AdminLayout from '@/Layouts/admin-layout'
import { Button, Typography } from '@mui/material'
import DataGridWrap from '@/components/gen/data-grid-wrapper/grid-wrapper'
import { useAdminDrafts } from '@/lib/Hooks/use-admin-drafts'
import { useEffect, useMemo, useState } from 'react'
import LoadingScreen from '@/components/gen/loading'
import {  GridActionsCellItem, GridColDef, GridRowsProp } from '@mui/x-data-grid'
import NewEventFormWraper from '@/components/admin/newEvent/from-wrapper'
import axios, { AxiosRequestConfig } from 'axios'




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
       /** thers more just add ...price cat  */
        }
     id:string|number
    }
  const Na = "לא זמין "

// Table Data 
  const ColData : GridColDef[] =  [
    { field: 'eventName', headerName: 'שם האירוע', align:'right' , width: 100  },
    { field: 'price', headerName: 'מחיר מלא', align:'right', width: 70 },
    { field:  "eventId" , headerName:"סידורי",align:"right" , width:200},
    { field: "cat", headerName: "קטגוריה" , align:"right" , width:100},
    { field: 'date', headerName: 'תאריך', align:'right', width: 150 },
    { field: "hour", headerName: "שעה" , align:"right" , width:150},
    { field: "location", headerName: "מיקום" , align:"right" , width:110},
    { field: 'actions', type:'actions', headerName: 'פעולות',width: 170,
      getActions: ({ id , row }:GetActionsProps)=> {
         
           return [
            <Button  
              key={row.eventId}   
              loading={delActionIsLoading === row.eventId} 
              onClick={()=>removeDraft(row.eventId)} sx={{p:0.5}} >מחק
            </Button>,
            <Button  key={row.eventId}   onClick={()=>{setDraftId(row["eventId"])}}  sx={{p:0.5}} >ערוך</Button>
           ]
      
      }

    },
    ]
  const Rows : GridRowsProp = 
    ! Drafts
       ? [{id:1,eventName:"טוען"}] 
    : Array.isArray(Drafts) 
       ? Drafts.map((draft,i)=> [
            {
            id:i ,
            eventName:draft.eventName,
            date:draft.Date ??  Na ,
            hour:draft.Hour ?? Na,
            cat: draft.cat ? draft.cat: Na,
            price:draft.tickets?.map((ticket)=> ticket.selectedType ==='normal' ? ticket.price : null ),
            eventId:draft._id,
            location:draft.TheaterName?? Na,
            }
          ]
          ).flat() // Rows is Array and 
                   //  Draft.map return array so its [][] to cancel the map effect
       :
       [] // data is not array 
// Eed Table Data 





// Functons  

const  removeDraft = async (draftId:string)=>{
  setDelActionIsLoading(draftId)

  console.log("Remove Draft inv");

  const reqData = { id : draftId } // dont like any but the function  overload allow it 
   const options : AxiosRequestConfig ={ }
  
   try{ 
       const responce = await axios.post("/api/admin/drafts/D/remove-draft",reqData,options)

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

  <AdminLayout >
     { draftId && <Button sx={{position:"absolute" , top:10 ,left:90 , zIndex:300}}  onClick={()=>{setDraftId(undefined)}} >
        בטל וחזור לרשימה  
      </Button>}
    { !draftId
       ? <DataGridWrap columnsData={ColData} rowsData={Rows} />
       : <NewEventFormWraper EventId={draftId} setEventId={setDraftId} />
    }
  
  </AdminLayout>
  ) 
}

export default AdminDrafts 


