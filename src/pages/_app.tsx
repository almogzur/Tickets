import type { AppProps } from 'next/app'

// 
import { useMediaQuery } from 'usehooks-ts';
import { useState } from 'react';
import { Event, Seats, SeatStyles } from '../constants/models/Events';
import '../styles/global.css'

//Context
import { events as eventData } from '../constants/event';
import MoviesContext from '../context/Events'
import WidthContext from '../context/WidthContext';
/////
import AdminTransformContext  from '../context/admin/new-event/map/admin-map-positions-context'
import ClineTransformContext from '@/context/client/client-map-positions-context'
///////
import SingleTipContext from '@/context/admin/new-event/map/single-tip-context';
import multiSelectContext from '@/context/admin/new-event/map/multi-select-context';
///////
import ClientTipContext from '@/context/client/c-tip-context'
//Auth 
import { SessionProvider } from "next-auth/react"

//MUI ------
import { Color, createTheme, ThemeProvider } from '@mui/material/styles';
import { blue, grey } from '@mui/material/colors';


//Day JS
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/he';
import { heIL as datePikerHeb } from '@mui/x-date-pickers/locales';

// Mui Componet
import { heIL as coreHeb } from '@mui/material/locale';
//Mui LOC
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

// Geo Location  Map  Css
import '@tomtom-international/web-sdk-maps/dist/maps.css'

// Theater Types
export interface Positions {
    x:number ,
    y:number ,
    Scale?:number ,
    disabled? :boolean
}
export interface TipinfoType {
  initValue:number
  row:string
  seatNumber:number
} 
export interface MultiTipeInfoType  {
  seatNumber: number
  row: string
  first:number
  second:number
  totalselected:number
  err:string
  selectdir:"R"|"L"|undefined
}

export const FullDateOptions :Intl.DateTimeFormatOptions = {
  year:'numeric',
  month: 'long',
  weekday:'long',
  day: '2-digit',
  hour:'2-digit',
  minute:"2-digit",
};
export const samiDateOptions :Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
};


const theme  = createTheme({    
    direction:"rtl",
    palette:{
      primary:{main:blue[700]},
      secondary:{main:"#3f51b5"},
   
    }
    ,

    components: {
      MuiTypography:{
        defaultProps:{},
        styleOverrides:{
          root:{
            color:"black",

 
            
          }
        }
        
      },
      MuiInputBase:{
          defaultProps:{  
              
          },
          styleOverrides:{
            root:{

            }
          }
        },
        // when in form-control
        MuiInputLabel:{
          defaultProps:{},
          styleOverrides:{
            root:{

       

                 

                 

            },
          }
        },
        MuiFormControl:{
          defaultProps:{},
          styleOverrides:{
          root:{
          
                 
             }
        }},
        MuiOutlinedInput:{
         defaultProps:{notched:false},
         styleOverrides:{
           root:{  


            "&.Mui-focused": {},
            "&:hover": {},
            "& .MuiOutlinedInput-notchedOutline": {},
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": { },
            "& input::placeholder": {},
           },    
         }
       },
       MuiStack:{
        styleOverrides:{
          root:{
           direction:"rtl"
          }
        }
       },
       MuiSelect:{
        defaultProps:{},
        styleOverrides:{
          root:{          
          }
        }
       },
       MuiMenuItem:{
         defaultProps:{},
        styleOverrides:{
          root:{
            direction:"rtl",
          }
        },

       },
       MuiButton:{
        defaultProps:{ variant:'contained'},
        styleOverrides:{
          root:{
            fontSize:"1em",
            fontWeight:700,
            boxShadow:"none",
            borderRadius:0
            
            
          },
    
        }
       },
    
       
   
       
    },
  
   },  
   coreHeb,
   datePikerHeb,

)

function MyApp({  Component,  pageProps: { session, ...pageProps }}: AppProps) {

  const [events, setEvents] = useState<Event[]>(eventData);


  // Admin Side

  // admin map State 
  const [AdminMapPositions , setAdminMapPositions] = useState<Positions>({x:0,y:0,Scale:0,disabled:false})
 
  // AdminSingleTipState 
  const [ singleTipPositions, setSingleTipPositions]=useState<Positions>({x:0,y:0})
  const [ seatTipInfo , setSeatTipInfo ] = useState<TipinfoType>({initValue:0,row:"",seatNumber:0})
  const resetSingleTip  = () :void=> { setSingleTipPositions({x:0,y:0}) ; setSeatTipInfo({initValue:0, row:"" , seatNumber:0}) }

  //AdminMiltiTipState
  const [multiTipInfo, setMultiTipInfo]=useState<MultiTipeInfoType>({
      first:0, 
      second:0,
      totalselected:0 ,
       row:"" ,
       err:"" ,
       seatNumber:0  ,
      selectdir:undefined
       })
  const [ multiTipPositions , setMutiTipPositions ]= useState<Positions>({x:0,y:0})
  const resetMultiTip = ():void=>{ setMutiTipPositions({x:0,y:0}) ; setMultiTipInfo(p=>({first:0, second:0,totalselected:0 , row:"" ,err:"" ,seatNumber:0  , selectdir:undefined})  ) }
  const resetErr = () : void=>{ setMultiTipInfo(p=>({...p,err:""}))}


// Clinet Side

  // client map
  const [ClientMapPositions , setClientMapPositions] =useState<Positions>({ x:0 ,y:0 ,Scale:undefined})

  //Clinet SingleTip
  const [clientTipPosition,setClientTipPosition]=useState<Positions>({x:0,y:0})
  const [clinetTipInfo , setClinetTipInfo]=useState<TipinfoType>({initValue:0,row:"",seatNumber:0})
  const resetClinetTip = ():void =>{ setClinetTipInfo({seatNumber:0,row:"",initValue:0}); setClientTipPosition({x:0,y:0}) }

  // media qurys
   const xxl = useMediaQuery('(min-width : 1600px)')
   const xl = useMediaQuery('(min-width : 1200px)')
   const lg = useMediaQuery('(min-width: 992px)')
   const md = useMediaQuery('(min-width: 768px)')
   const sm = useMediaQuery('(min-width : 576px)')
   const xs = useMediaQuery('(min-width : 489px)')
   const xxs = useMediaQuery('(min-width : 310px)')


return (
  <SessionProvider>
  <ThemeProvider theme={theme}>
  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='he'  >
  <multiSelectContext.Provider value={{multiTipPositions,setMutiTipPositions,resetMultiTip , multiTipInfo, setMultiTipInfo ,resetErr }} >
  <SingleTipContext.Provider value={{ singleTipPositions, setSingleTipPositions, seatTipInfo, setSeatTipInfo , resetSingleTip }}>
  <ClineTransformContext.Provider value={{ClientMapPositions ,setClientMapPositions}}>
  <AdminTransformContext.Provider value={{AdminMapPositions,setAdminMapPositions}}>
  <ClientTipContext.Provider value={{ clientTipPosition,setClientTipPosition, clinetTipInfo ,setClinetTipInfo,resetClinetTip }} >
  <MoviesContext.Provider value={{events, setEvents}}>
  <WidthContext.Provider value={{xxl,xl,lg,md,sm,xs,xxs}}>
     <Component {...pageProps} />
  </WidthContext.Provider>
  </MoviesContext.Provider>
  </ClientTipContext.Provider>
  </AdminTransformContext.Provider>
  </ClineTransformContext.Provider>
  </SingleTipContext.Provider>
  </multiSelectContext.Provider>
  </LocalizationProvider>
  </ThemeProvider>
  </SessionProvider>
  )
}




export default MyApp



