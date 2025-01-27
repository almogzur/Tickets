import type { AppProps } from 'next/app'
 
import { useMediaQuery } from 'usehooks-ts';
import { useState } from 'react';
import '../styles/global.css'



//Context
import WidthContext from '../context/WidthContext';
/////
import ClineTransformContext from '@/context/client/client-map-positions-context'
import ClientTipContext from '@/context/client/c-tip-context'
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

// Geo Location  Map  Css
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import { Positions, TheaterTipinfoType } from '@/components/admin/newEvent/theater/types/theater-types';
import { EventsType } from './api/client/events/R/get-events';


export const FullDateOptions :Intl.DateTimeFormatOptions = {
  year:'numeric',
  month: 'long',
  weekday:'long',
  day: '2-digit',
  hour:'2-digit',
  minute:"2-digit",
};
export const samiDateOptions :Intl.DateTimeFormatOptions = {
        year:'2-digit',
        month: '2-digit',
        day: '2-digit',
};



const theme  = createTheme({    
    direction:"rtl",
    palette:{
      primary:{main:blue[700]},
      secondary:{main:"#fe2769"},
      warning:{main:"#fdb931"},
      info:{main:"#8e569f"}
      
   
    },
    typography:{
      fontFamily:[
        'Rubik Dirt'
      ].join(",")
    },
  

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
            borderRadius:0,
            p:0
            
            
          },
    
        }
       },
    
       
   
       
    },
  
   },  
   coreHeb,
   datePikerHeb,

)



const MyApp = ({ Component, pageProps: { nonce, session, ...pageProps } }: AppProps)=> {

  const [events, setEvents] = useState<EventsType[]>();
  //const [cachedNonce] = useState(nonce);

  // client map
  const [ClientMapPositions , setClientMapPositions] =useState<Positions>({ x:0 ,y:0 ,Scale:undefined})

  //Clinet SingleTip
  const [clientTipPosition,setClientTipPosition]=useState<Positions>({x:0,y:0})
  const [clinetTipInfo , setClinetTipInfo]=useState<TheaterTipinfoType>({initValue:0,row:"",seatNumber:0})
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


  <SessionProvider session={session}>
  <ThemeProvider theme={theme}>
  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='he'  >
  <ClineTransformContext.Provider value={{ClientMapPositions ,setClientMapPositions}}>
  <ClientTipContext.Provider value={{ clientTipPosition,setClientTipPosition, clinetTipInfo ,setClinetTipInfo,resetClinetTip }} >
  <WidthContext.Provider value={{xxl,xl,lg,md,sm,xs,xxs}}>
 
      <Component {...pageProps} />

  </WidthContext.Provider>
  </ClientTipContext.Provider>
  </ClineTransformContext.Provider>
  </LocalizationProvider>
  </ThemeProvider>
  </SessionProvider>



  )
}



export default MyApp

