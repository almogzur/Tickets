import type { AppProps } from 'next/app'


// 
import { useMediaQuery } from 'usehooks-ts';
import { useEffect, useState } from 'react';
import { Event } from '../constants/models/Events';
import '../styles/global.css'

//Context
import { events as eventData } from '../constants/event';
import MoviesContext from '../context/MoviesContext'
import WidthContext from '../context/WidthContext';
import SeatsPositionContext  from '../context/map-position-context'
import TipContext from '@/context/Tip-context';

//Auth 
import { SessionProvider } from "next-auth/react"

//MUI 
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple , yellow } from '@mui/material/colors';

//Mui LOC
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
    //Day JS
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/he';
import { heIL as datePikerHeb } from '@mui/x-date-pickers/locales';

    // Mui Componet
import { heIL as coreHeb } from '@mui/material/locale';


//Map
import '@tomtom-international/web-sdk-maps/dist/maps.css'



const theme = createTheme({ 
    palette:{
      mode:"dark",
      primary:{main:purple[700]  },
      secondary:yellow
    },
    components: {
       MuiOutlinedInput:{
         defaultProps:{  notched:false }, 
         styleOverrides:{
           root:{  
            direction:"rtl",
            padding:"0",
            margin:3,
            "&.Mui-focused": {},
            "&:hover": {}
           },    
           input:{
            padding:15,
           "&:hover":{  }
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
       
    },
   },
   
   coreHeb,
   datePikerHeb


)

function MyApp({ 
  Component,
  pageProps: { session, ...pageProps },
  }: AppProps) {


  const [events, setEvents] = useState<Event[]>(eventData);

  const [x,setX] = useState(0)  
  const [y,setY] = useState(0)  
  const [S,setS] = useState(0)
  const [ tipX, setTipX]=useState(null)
  const [ tipY, setTipY]= useState(null)
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
          <TipContext.Provider value={{tipX, tipY ,setTipX,setTipY}}>
          <SeatsPositionContext.Provider value={{x,y,S,setX,setY,setS}}>
          <MoviesContext.Provider value={{events, setEvents}}>
          <WidthContext.Provider value={{xxl,xl,lg,md,sm,xs,xxs}}>
           <Component {...pageProps} />
          </WidthContext.Provider>
          </MoviesContext.Provider>
          </SeatsPositionContext.Provider>
          </TipContext.Provider>
          </LocalizationProvider>
        </ThemeProvider>
      </SessionProvider>
  )
}




export default MyApp



