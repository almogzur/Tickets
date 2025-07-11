import type { AppProps } from 'next/app'
 
import { useMediaQuery } from 'usehooks-ts';
import '../styles/global.css'



//Context
import WidthContext from '../context/WidthContext';
/////
//Auth 
import { SessionProvider } from "next-auth/react"

//MUI ------
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue, red } from '@mui/material/colors';

//Day JS
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/he';
import { heIL as datePikerHeb } from '@mui/x-date-pickers/locales';

// Mui components
import { heIL as coreHeb } from '@mui/material/locale';
//Mui LOC
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

// Geo Location  Map  Css
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { ClientEventType } from '@/types/pages-types/admin/admin-event-types';


export const FullDateOptions :Intl.DateTimeFormatOptions = {
  year:'numeric',
  month: 'long',
  weekday:'long',
  day: '2-digit',
  hour:'2-digit',
  minute:"2-digit",
};
export const samlDateOptions :Intl.DateTimeFormatOptions = {
        year:'2-digit',
        month: '2-digit',
        day: '2-digit',
};

import { useRouter } from 'next/router';

import ClientLayout from "@/layouts/client";
import AdminLayout from '@/layouts/admin';




const theme  = createTheme({    
    direction:"rtl",
    palette:{
      primary:{main:blue[700]},
    //  secondary:{main:"#fe2769"},
    secondary:{main:red["A700"]},

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
  
  const router = useRouter();

  // media queys
   const xxl = useMediaQuery('(min-width : 1600px)')
   const xl = useMediaQuery('(min-width : 1200px)')
   const lg = useMediaQuery('(min-width: 992px)')
   const md = useMediaQuery('(min-width: 768px)')
   const sm = useMediaQuery('(min-width : 576px)')
   const xs = useMediaQuery('(min-width : 489px)')
   const xxs = useMediaQuery('(min-width : 310px)')
   
   // layout Props
   const [pageName,setPageName] = useState<string>("")
   const [noScroll,setNoScroll]= useState<boolean>(false)



    // to prevent  /admin/ * example : 'admin/slug'   
   // slugs Catches where is 404 job 
   // while the if (status === 'unauthenticated' ){  is returning  from admin layout  and the 404 is return too  } 
   const adminPages = [
     "billing",
     "clients",
     "drafts",
     "events",
     "new-event",
     "register",
     "settings",
     "stats",
     "supervisor",
     "ticket-actions",
   ] 
  
   interface WrapperPropsType  {
    children?:ReactNode,
    noScroll?:boolean,
    pageName?:string
    setPageName?:Dispatch<SetStateAction<string>>
    setNoScroll?:Dispatch<SetStateAction<boolean>>
   }
   
   const path = router.pathname || router.asPath; // Use pathname or fallback to asPath
   const isAdminRoute = path === '/admin' || adminPages.some(page => path.startsWith(`/admin/${page}`));
   const Wrapper = isAdminRoute ? AdminLayout : ClientLayout;
   const WrapperProps : WrapperPropsType ={ pageName , noScroll , setPageName , setNoScroll  }

return (
<>
  <SessionProvider session={session}>
  <ThemeProvider theme={theme}>
  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='he'  >
  <WidthContext.Provider value={{xxl,xl,lg,md,sm,xs,xxs}}>
      <Wrapper {...WrapperProps} >  
           <Component {...pageProps} /> 
     </Wrapper>
  </WidthContext.Provider>
  </LocalizationProvider>
  </ThemeProvider>
  </SessionProvider>
  </>
  )
}

export default MyApp

