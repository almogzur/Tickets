import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import AdminLayout from '@/Layouts/admin-layout'
import { Button, Typography } from '@mui/material'
import DataGridWrap from '@/components/gen/data-grid-wrapper/grid-wrapper'
import { useAdminDrafts } from '@/lib/Hooks/use-admin-drafts'
import { useEffect, useState } from 'react'
import LoadingScreen from '@/components/gen/loading'
import { GridActionsCellItem, GridColDef, GridRowModes, GridRowsProp } from '@mui/x-data-grid'
import NewEventFormWraper from '@/components/admin/newEvent/from-wrapper'
import { Cancel, Edit, Save } from '@mui/icons-material'



const AdminDrafts=()=>{

  const router = useRouter()
  const { data: session ,status ,update} = useSession()
  const { Drafts , isUserError , isUserValidating , updateUser}=useAdminDrafts(session)
  const [ isLoading ,setIsLoading] = useState(false)
  const [ draftId ,setDraftId] = useState<string|undefined>(undefined)

  const ColData : GridColDef[] =  [
 
    { field: 'eventName', headerName: 'שם האירוע', align:'right' , width: 100  },
    { field: 'price', headerName: 'מחיר מלא', align:'right', width: 70 },
    { field:  "eventId" , headerName:"סידורי",align:"right" , width:200},
    { field: "cat", headerName: "קטגוריה" , align:"right" , width:100},
    { field: 'date', headerName: 'תאריך', align:'right', width: 150 },
    { field: "hour", headerName: "שעה" , align:"right" , width:150},
    { field: "location", headerName: "מיקום" , align:"right" , width:110},
    { field: 'actions', type: 'actions', headerName: 'פעולות',width: 170,
      getActions: ({ id , row}) => {
           return [
            <Button key={row["eventId"]} sx={{p:0.5}} >מחק</Button>,
            <Button key={row["eventId"]} onClick={()=>{setDraftId(row["eventId"])}}  sx={{p:0.5}} >ערוך</Button>
           ];
      }
    },
    ]


  const Na = "לא זמין "

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
         


if(status==="loading" || isLoading){
  return <LoadingScreen/>
}
 
return (
  <AdminLayout >
    { !draftId ? 
      <DataGridWrap 
           columnsData={ColData} 
           rowsData={Rows} 
          />
          :
          <NewEventFormWraper id={draftId} />

    }
  </AdminLayout>
  ) 
}

export default AdminDrafts 


