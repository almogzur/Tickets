import { CSSProperties } from "react"
import {Seats, SeatStyles} from '@/constants/models/Events'
import { Colors } from "@/lib/colors"


const positionAtr : CSSProperties = { 
   position:"relative",
   width:"fit-content",
   height:"fit-content",
   display:"flex",
   flexDirection:"column"
}
export const mainSeats : Seats = {
    "שורה 1" : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    "שורה 2" : [0,0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    "שורה 3" : [0,0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    "שורה 4" : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
    "שורה 5" : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
    "שורה 6" : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
    "שורה 7" : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    "שורה 8" : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 "שורה 9": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 "שורה 10": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 "שורה 11": [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
            "שורה 12" : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              "שורה 13" : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                 "שורה 14" : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
                         "שורה 15": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                          "שורה 16"  : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                          "שורה 17" : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                "שורה 18" : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
                                   "שורה 19" : [ 0, 0, 0, 0, 0, 0, 0, ],
                                   "שורה 20" : [ 0, 0, 0 ,0, 0, 0, 0, ],
} 
export const sideSeats : Seats = {
 "שירה 1 קומה 1":[0,0,0,0,0],
 "שירה 1 קומה 2":[0,0,0,0,0],
 "שירה 2 קומה 1":[0,0,0,0],
 "2 שירה 2 קומה":[0,0,0,0],
 "שירה 3 קומה 1":[0,0,0,0],
 "שירה 3 קומה 2":[0,0,0,0],
 "קומי 1 קומה 1":[0,0,0,0,0],
 "קומי 1 קומה 2":[0,0,0,0,0],
 "קומי 2 קומה 1":[0,0,0,0],
 "קומי 2 קומה 2":[0,0,0,0],
 "קומי 3 קומה 1":[0,0,0,0],
 "קומי 3 קומה 2":[0,0,0,0],
 "אופרה 1א שורה 1 קומה 1":[0,0,0,0,0],
 "אופרה 1א שורה 2 קומה 1":[0,0,0,0],
 "אופרה 1ב שורה 1 קומה 1":[0,0,0,0,0],
 "אופרה 1ב שורה 2 קומה 1":[0,0,0,0],
 

 "אופרה 2א שורה 1 קומה 2": [0,0,0,0,0],
 "אופרה 2א שורה 2 קומה 2" :[0,0,0,0],
 "אופרה 2א שורה 3 קומה 3": [0,0,0,0,0],

 "אופרה 2ב שורה 1 קומה 2": [0,0,0,0,0],
 "אופרה 2ב שורה 2 קומה 2": [0,0,0,0],
 "אופרה 2ב שורה 3 קומה 3": [0,0,0,0,0],
}
export const sideSeatsStyles : SeatStyles = {

   "שירה 1 קומה 1": {top:-160, left:-30 , ...positionAtr , },  
   "שירה 1 קומה 2": {top:-200 ,left:-70 , ...positionAtr  },

   "שירה 2 קומה 1": {top:-160 ,left:-30, ...positionAtr},
   "2 שירה 2 קומה": {top:-192 ,left:-70 ,...positionAtr},

   "שירה 3 קומה 1":{top:-160 , left:-30, ...positionAtr},
   "שירה 3 קומה 2":{top:-192 , left:-70, ...positionAtr},

   "קומי 1 קומה 1":{top:-368 , left:310 , ...positionAtr },
   "קומי 1 קומה 2":{top:-408 , left:350, ...positionAtr },

   "קומי 2 קומה 1":{top:-368 , left:310 ,...positionAtr},
   "קומי 2 קומה 2":{top:-400 , left:350 ,...positionAtr},

   "קומי 3 קומה 1":{top:-368 , left:310, ...positionAtr},
   "קומי 3 קומה 2":{top:-400 , left:350, ... positionAtr},

   "אופרה 1א שורה 1 קומה 1":{top:-400 , left:70 , ...positionAtr,flexDirection:"row" , },
   "אופרה 1א שורה 2 קומה 1":{top:-395 , left:75 , ...positionAtr,flexDirection:"row" ,},

   "אופרה 1ב שורה 1 קומה 1": {top:-416 , left:170 , ...positionAtr,flexDirection:"row"  },
   "אופרה 1ב שורה 2 קומה 1": {top:-411 , left:175 , ...positionAtr,flexDirection:"row" ,  },


   "אופרה 2א שורה 1 קומה 2": {top:-385 , left:70 , ...positionAtr,flexDirection:"row" ,},
   "אופרה 2א שורה 2 קומה 2": {top:-380 , left:75 , ...positionAtr,flexDirection:"row" , },

   "אופרה 2א שורה 3 קומה 3": {top:-375 , left:70 , ...positionAtr,flexDirection:"row" ,},


   "אופרה 2ב שורה 1 קומה 2": {top:-409 , left:170 , ...positionAtr,flexDirection:"row" ,},
   "אופרה 2ב שורה 2 קומה 2": {top:-404 , left:175 , ...positionAtr,flexDirection:"row",  },

   "אופרה 2ב שורה 3 קומה 3": {top:-399 , left:170 , ...positionAtr,flexDirection:"row" , },
}
export const sideSeateTextStyles : SeatStyles={
"שירה 1 קומה 1":{position:"relative", top:-170 , left:-45 , color:'black'  , fontSize:6   , fontWeight:700  },
"שירה 1 קומה 2":{position:"relative", top:-170 , left:-87 , color:'black' ,  fontSize:6 , fontWeight:700  },

"שירה 2 קומה 1":{position:"relative", top:-90 , left:-45 , color:'black'  , fontSize:6 , fontWeight:700  },
"2 שירה 2 קומה":{position:"relative", top:-90 , left:-87 , color:'black' , fontSize:6 , fontWeight:700  },

"שירה 3 קומה 1":{position:"relative", top:-27 , left:-45 , color:'black' ,  fontSize:6 , fontWeight:700  },
"שירה 3 קומה 2":{position:"relative", top:-27 , left:-87 , color:'black' ,  fontSize:6 , fontWeight:700  },

"קומי 1 קומה 1":{position:"relative", top:-170 , left:295 , color:'black' ,  fontSize:6 , fontWeight:700  },
"קומי 1 קומה 2":{position:"relative", top:-170 , left:335 , color:'black' ,  fontSize:6 , fontWeight:700  },

"קומי 2 קומה 1":{position:"relative", top:-90 , left:295 , color:'black' ,  fontSize:6 , fontWeight:700  },
"קומי 2 קומה 2":{position:"relative", top:-90 , left:335 , color:'black' , fontSize:6 , fontWeight:700  },

"קומי 3 קומה 1":{position:"relative", top:-27 , left:295 , color:'black' , fontSize:6 , fontWeight:700  },
"קומי 3 קומה 2":{position:"relative", top:-27 , left:335 , color:'black' ,  fontSize:6 , fontWeight:700  },


"אופרה 1א שורה 1 קומה 1":{position:"relative", top:15 , left:0 , color:'black'  , fontSize:6 , fontWeight:700 },

"אופרה 1א שורה 2 קומה 1":{position:"relative", top:30 , left:0 , color:'black'  , fontSize:6 , fontWeight:700 },

"אופרה 1ב שורה 1 קומה 1":{position:"relative", top:15 , left:215 , color:'black'  , fontSize:6 , fontWeight:700 },
"אופרה 1ב שורה 2 קומה 1":{position:"relative", top:30 , left:215 , color:'black'  , fontSize:6 , fontWeight:700 },






"אופרה 2א שורה 1 קומה 2": {position:"relative", top:61 , left:0 , color:'black'  , fontSize:6 , fontWeight:700 },
"אופרה 2א שורה 2 קומה 2" :{position:"relative", top:75 , left:0 , color:'black'  , fontSize:6 , fontWeight:700 },

"אופרה 2א שורה 3 קומה 3": {position:"relative", top:88 , left:0 , color:'black'  , fontSize:6 , fontWeight:700 },









"אופרה 2ב שורה 1 קומה 2": {position:"relative", top:61 , left:215 , color:'black'  , fontSize:6 , fontWeight:700 },
"אופרה 2ב שורה 2 קומה 2": {position:"relative", top:75 , left:215 , color:'black'  , fontSize:6 , fontWeight:700 },
"אופרה 2ב שורה 3 קומה 3": {position:"relative", top:88 , left:215 , color:'black'  , fontSize:6 , fontWeight:700 },

}

// export const theatherSurroundSeatsMobileTextPositons={
// "שירה 1 קומה 1":{top:0,left:0},
// "שירה 1 קומה 2":{top:0,left:0},
// "שירה 2 קומה 1":{top:0,left:0},
// "2 שירה 2 קומה":{top:0,left:0},
// "שירה 3 קומה 1":{top:0,left:0},
// "שירה 3 קומה 2":{top:0,left:0},
// "קומי 1 קומה 1":{top:0,left:0},
// "קומי 1 קומה 2":{top:0,left:0},
// "קומי 2 קומה 1":{top:0,left:0},
// "קומי 2 קומה 2":{top:0,left:0},
// "קומי 3 קומה 1":{top:0,left:0},
// "קומי 3 קומה 2":{top:0,left:0},
// "אופרה 1א שורה 1 קומה 1":{top:0,left:0},
// "אופרה 1א שורה 2 קומה 1":{top:0,left:0},
// "אופרה 1ב שורה 1 קומה 1":{top:0,left:0},
// "אופרה 1ב שורה 2 קומה 2":{top:0,left:0},
// "אופרה 2א שורה 1 קומה 1": {top:0,left:0},
// "אופרה 2א שורה 2 קומה 1" :{top:0,left:0},
// "אופרה 2א שורה 3 קומה 2": {top:0,left:0},
// "אופרה 2ב שורה 1 קומה 1": {top:0,left:0},
// "אופרה 2ב שורה 2 קומה 1": {top:0,left:0},
// "אופרה 2ב שורה 3 קומה 2": {top:0,left:0},
// }

