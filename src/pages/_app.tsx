import type { AppProps } from 'next/app'

// 
import { useMediaQuery } from 'usehooks-ts';
import { useState } from 'react';
import { Event } from '../constants/models/Events';
import '../styles/global.css'

//Context
import { events as eventData } from '../constants/event';
import MoviesContext from '../context/Events'
import WidthContext from '../context/WidthContext';
/////
import AdminTransformContext  from '../context/admin-map-positions-context'
import ClineTransformContext from '@/context/client-map-positions-context'
///////
import SingleTipContext from '@/context/single-tip-context';
import multiSelectContext from '@/context/multi-select-context';
///////
import ClientSideTIpContext from '@/context/client-tip-context'
//Auth 
import { SessionProvider } from "next-auth/react"

//MUI ------
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue } from '@mui/material/colors';


//Day JS
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/he';
import { heIL as datePikerHeb } from '@mui/x-date-pickers/locales';

// Mui Componet
import { heIL as coreHeb } from '@mui/material/locale';
//Mui LOC
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

//---------

//Map
import '@tomtom-international/web-sdk-maps/dist/maps.css'

export interface Positions {x:number ,y:number , Scale?:number}
export interface TipinfoType {
  initValue:number,
  row:string,
  seatNumber:number
} 
export interface MultiTipeInfoType  {
  first:number
  second:number
  totalselected:number
  positionsSelected:number[]
  rowSelect:string
  err:string
}


const theme  = createTheme({ 
    
    direction:"rtl",
    palette:{
 
      primary:{main:blue[700]},
      secondary:{main:"#7E1891"},
      
      
    },
    components: {
        MuiInputBase:{
          defaultProps:{},
          styleOverrides:{}
        },
        // when in form-control
        MuiInputLabel:{
          defaultProps:{},
          styleOverrides:{
            root:{
              direction:"ltr"  ,
               width:"100%" , 
               textAlign:"end",
               fontSize:20,
              // position is set global color in component wraper 
              // "&.MuiFormLabel-root:not(.MuiFormLabel-filled):not(.Mui-focused)":{color:'pink'},
               "&.Mui-focused":{ left:30 , top:-10 ,  }, // them color
               "&.MuiFormLabel-filled:not(.Mui-focused)":{left:30, top:-6, }, // filed
                },
          }
        },
        MuiFormControl:{
          defaultProps:{},
          styleOverrides:{
          root:{   }
        }},
        MuiOutlinedInput:{
         defaultProps:{notched:false},
         styleOverrides:{
           root:{  
            direction:"rtl",
            padding:"0",
            margin:0.3,
            "&.Mui-focused": {},
            "&:hover": {},
            "& .MuiOutlinedInput-notchedOutline": {},
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": { },
            "& input::placeholder": {},
           },    
           input:{
            direction:"rtl",
            padding:15,
            "&:hover":{  },
            '&::placeholder':{color:blue[700],fontSize:20, fontWeight:700 , opacity:.7  } 
           }
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
        defaultProps:{'aria-label': 'Without label'},
        styleOverrides:{
          root:{
            direction:"rtl",
            
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
       
       
    },
   },  
   coreHeb,
   datePikerHeb
)



function MyApp({  Component,  pageProps: { session, ...pageProps }}: AppProps) {

  const [events, setEvents] = useState<Event[]>(eventData);

  // Admin Side

  // admin map State 
  const [AdminMapPositions , setAdminMapPositions] = useState<Positions>({x:0,y:0,Scale:0})
 
  // AdminSingleTipState 
  const [ singleTipPositions, setSingleTipPositions]=useState<Positions>({x:0,y:0})
  const [ seatTipInfo , setSeatTipInfo ] = useState<TipinfoType>({initValue:null,row:"",seatNumber:null})
  const resetSingleTip  = () :void=> { setSingleTipPositions({x:0,y:0}) ; setSeatTipInfo({initValue:null, row:null , seatNumber:null}) }

  //AdminMiltiTipState
  const [multiTipInfo, setMultiTipInfo]=useState<MultiTipeInfoType>({first:null, second:null,totalselected:null ,positionsSelected:[], rowSelect:null ,err:null })
  const [ multiTipPositions , setMutiTipPositions ]= useState<{x:number ,y:number}>({x:0,y:0})
  const resetMultiTip = ():void=>{ setMutiTipPositions({x:null,y:null}) ; setMultiTipInfo(p=>({ ...p ,first:null, second:null, rowSelect:null ,err:null, totalselected:0})  ) }
  const resetErr = () : void=>{ setMultiTipInfo(p=>({...p,err:null}))}


// Clinet Side

  // client map
  const [ClientMapPositions , setClientMapPositions] =useState<Positions>({ x:0 ,y:0 ,Scale:0})

  //Clinet SingleTip
  const [clientTipPosition,setClientTipPosition]=useState<Positions>({x:null,y:null})
  const [clinetTipInfo , setClinetTipInfo]=useState<TipinfoType>({initValue:null,row:null,seatNumber:null})
  const resetClinetTip = ():void =>{ setClinetTipInfo({seatNumber:null,row:null,initValue:null}); setClientTipPosition({x:null,y:null}) }

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
  <ClientSideTIpContext.Provider value={{ clientTipPosition,setClientTipPosition, clinetTipInfo ,setClinetTipInfo,resetClinetTip }} >
  <MoviesContext.Provider value={{events, setEvents}}>
  <WidthContext.Provider value={{xxl,xl,lg,md,sm,xs,xxs}}>
     <Component {...pageProps} />
  </WidthContext.Provider>
  </MoviesContext.Provider>
  </ClientSideTIpContext.Provider>
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



