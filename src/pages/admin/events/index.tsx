import { useSession } from 'next-auth/react'
import {useEffect,useState} from 'react'
import { useRouter } from 'next/router'
import { Button, Typography } from '@mui/material'
import {   GridColDef, GridRowsProp } from '@mui/x-data-grid'
import { useAdminEvents } from '@/hooks/admin/use-admin-events'
import { GetServerSideProps } from 'next'
import { ClientEventType } from '@/types/pages-types/admin/admin-event-types'
import axios from 'axios'
import DataGridWrap from '@/mui-components/data-grid-wrapper/grid-wrapper'




const ManageEventsPage=()=>{

  const router = useRouter()
  const { data: session ,status ,update} = useSession()
  const { Events,isEventsError,isEventsValidating ,updateEvents }  =  useAdminEvents(session)



  useEffect(()=>{
    console.log(Events) },[Events]
   )

  const Na = "לא זמין "




  const ColData : GridColDef[] =  [
        { field: 'actions', type:'actions', headerName: 'פעולות',width: 170,
          getActions: ({ id , row  })=> { // row contain all the fields in row (event) object
               return [
                <Button  
                  key={row.eventId}
                  sx={{p:0.3, display:"flex",flexDirection:"column", "*":{fontSize:12,fontWeight:'bold',color:"#ddd"}}}

                  color='error'
      
                  onClick={()=>{}} 
                  >
                                 
                     <Typography>הוסף</Typography>
                     <Typography>מכירה </Typography>
                </Button>,
                 <Button
                    color='success' 
                   key={row.eventId} 
                   onClick={   ()=>  router.push(`/admin/events/info/${row.eventId}`)}

                    sx={{p:0.3, display:"flex",flexDirection:"column", "*":{fontSize:12,fontWeight:'bold',color:"#ddd"}}}
                     >
                     <Typography>צפה</Typography>
                     <Typography>בנתונים </Typography>
                  </Button>
               ]
          
          }
        },
        { field: 'eventName', headerName: 'שם האירוע', align:'right' , width: 150  },
        { field: 'price', headerName: 'מחיר ', align:'right', width: 150 },
        { field: 'date', headerName: 'תאריך', align:'right', width: 150 },
        { field: "hour", headerName: "שעה" , align:"right" , width:150},
        { field: "location", headerName: "מיקום" , align:"right" , width:110},
        ]

        const Rows : GridRowsProp = 
    ! Events
       ? [{id:1,eventName:"טוען"}] 
    : Array.isArray(Events) 
       ? Events.map((event,i)=> [
            {
            id:i ,
            eventName:event.info.eventName,
            date:event.info.Date ??  Na ,
            hour:event.info.Hour ?? Na,
            price:event.tickets?.map((ticket)=> ticket.selectedType ==='normal' ? ticket.price : null ),
            eventId:event._id, // this value dose NOT ! have a value on columns , its for config the button key 
            location:event.info.TheaterName?? Na,
            }
          ]
          ).flat() // Rows is Array and 
                   //  Draft.map return array so its [][] to cancel the map effect
       :
       [] // data is not array 
// Eed Table Data 

   

    if (status === 'loading') {
     return <h1 style={{textAlign:'center'}}>Loading...</h1>
}

return (
        <>
                <DataGridWrap columnsData={ColData} rowsData={Rows}/>
        </>
) 
}

export default ManageEventsPage

