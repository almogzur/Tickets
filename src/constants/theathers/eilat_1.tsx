import { CSSProperties } from "react"
import {Seats, SeatStyles} from '@/constants/models/Events'
import { TheaterType } from "@/pages/admin/new-event"

const positionAtr : CSSProperties = { 
   position:"relative",
   width:"fit-content",
   height:"fit-content",
   display:"flex",
   flexDirection:"column"
}
 const Eilat1_mainSeats : Seats = {
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
 const Eilat1_sideSeats : Seats = {
 "שירה 1 קומה 1":[0,0,0,0,0],
 "שירה 1 קומה 2":[0,0,0,0,0],
 "שירה 2 קומה 1":[0,0,0,0],
 "שירה 2 קומה 2":[0,0,0,0],
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
 const Eilat1_sideStyles : SeatStyles = {

   "שירה 1 קומה 1": {top:-220, left:-20 , ...positionAtr , },  
   "שירה 1 קומה 2": {top:-275 ,left:-50 , ...positionAtr  },

   "שירה 2 קומה 1": {top:-220 ,left:-20, ...positionAtr},
   "שירה 2 קומה 2": {top:-264 ,left:-50 ,...positionAtr},

   "שירה 3 קומה 1":{top:-221 , left:-20, ...positionAtr},
   "שירה 3 קומה 2":{top:-265 , left:-50, ...positionAtr},

   "קומי 1 קומה 1":{top:-506 , left:450 , ...positionAtr },
   "קומי 1 קומה 2":{top:-561 , left:480, ...positionAtr },

   "קומי 2 קומה 1":{top:-505 , left:450 ,...positionAtr},
   "קומי 2 קומה 2":{top:-549 , left:480 ,...positionAtr},

   "קומי 3 קומה 1":{top:-506 , left:450, ...positionAtr},
   "קומי 3 קומה 2":{top:-550 , left:480, ... positionAtr},

   "אופרה 1א שורה 1 קומה 1":{top:-550 , left:135 , ...positionAtr,flexDirection:"row" , },
   "אופרה 1א שורה 2 קומה 1":{top:-545 , left:135 , ...positionAtr,flexDirection:"row" ,},

   "אופרה 1ב שורה 1 קומה 1": {top:-572 , left:247 , ...positionAtr,flexDirection:"row"  },
   "אופרה 1ב שורה 2 קומה 1": {top:-567 , left:258 , ...positionAtr,flexDirection:"row" ,  },


   "אופרה 2א שורה 1 קומה 2": {top:-545 , left:135 , ...positionAtr,flexDirection:"row" ,},
   "אופרה 2א שורה 2 קומה 2": {top:-540 , left:135 , ...positionAtr,flexDirection:"row" , },

   "אופרה 2א שורה 3 קומה 3": {top:-535 , left:135 , ...positionAtr,flexDirection:"row" ,},


   "אופרה 2ב שורה 1 קומה 2": {top:-579 , left:247 , ...positionAtr,flexDirection:"row" ,},
   "אופרה 2ב שורה 2 קומה 2": {top:-574 , left:258 , ...positionAtr,flexDirection:"row",  },

   "אופרה 2ב שורה 3 קומה 3": {top:-570 , left:247 , ...positionAtr,flexDirection:"row" , },
}
 const Eilat1_sideTextStyles : SeatStyles={
   "שירה 1 קומה 1":{position:"relative", top:-240 , left:-25   , fontSize:6   , fontWeight:700 ,  width:20 },
   "שירה 1 קומה 2":{position:"relative", top:-240 , left:-54  ,  fontSize:6 , fontWeight:700 , width:20  },

   "שירה 2 קומה 1":{position:"relative", top:-132 , left:-25  , fontSize:6 , fontWeight:700 , width:20  },
   "שירה 2 קומה 2":{position:"relative", top:-132 , left:-54 ,  fontSize:6 , fontWeight:700 , width:20 },

   "שירה 3 קומה 1":{position:"relative", top:-45 , left:-25 ,   fontSize:6 , fontWeight:700 , width:20 },
   "שירה 3 קומה 2":{position:"relative", top:-45 , left:-54 ,   fontSize:6 , fontWeight:700  ,width:20},

   "קומי 1 קומה 1":{position:"relative", top:-240 , left:445 ,  fontSize:6 , fontWeight:700  ,width:20},
   "קומי 1 קומה 2":{position:"relative", top:-240 , left:480 ,   fontSize:6 , fontWeight:700  ,width:20},

   "קומי 2 קומה 1":{position:"relative", top:-130 , left:445 ,   fontSize:6 , fontWeight:700  ,width:20},
   "קומי 2 קומה 2":{position:"relative", top:-130 , left:480 ,  fontSize:6 , fontWeight:700  ,width:20},

   "קומי 3 קומה 1":{position:"relative", top:-45 , left:445 ,  fontSize:6 , fontWeight:700  ,width:20},
   "קומי 3 קומה 2":{position:"relative", top:-45 , left:480 ,   fontSize:6 , fontWeight:700  ,width:20},


   "אופרה 1א שורה 1 קומה 1":{position:"relative", top:22 , left:80   , fontSize:7 , fontWeight:700 ,width:55, textAlign:'center' , lineHeight:1 },

   "אופרה 1א שורה 2 קומה 1":{position:"relative", top:38 , left:80 , fontSize:7 , fontWeight:700, width:55 ,textAlign:'center',lineHeight:1   },

   "אופרה 1ב שורה 1 קומה 1":{position:"relative", top:23 , left:305   , fontSize:7 , fontWeight:700, width:55  ,textAlign:'center' ,lineHeight:1  },
   "אופרה 1ב שורה 2 קומה 1":{position:"relative", top:38 , left:305   , fontSize:7 , fontWeight:700 , width:55  ,textAlign:'center' ,lineHeight:1 },



   "אופרה 2א שורה 1 קומה 2": {position:"relative", top:70 , left:50   , fontSize:7, fontWeight:700  },
   "אופרה 2א שורה 2 קומה 2" :{position:"relative", top:86 , left:50  , fontSize:7, fontWeight:700 },

   "אופרה 2א שורה 3 קומה 3": {position:"relative", top:105 , left:50  , fontSize:7 , fontWeight:700 },



   "אופרה 2ב שורה 1 קומה 2": {position:"relative", top:70 , left:315   , fontSize:7 , fontWeight:700 },
   "אופרה 2ב שורה 2 קומה 2": {position:"relative", top:86 , left:315   , fontSize:7 , fontWeight:700 },
   "אופרה 2ב שורה 3 קומה 3": {position:"relative", top:104 , left:315   , fontSize:7 , fontWeight:700 },



}
const ThaeaterName="תיאטראות אילת"
const TheaterLocation = {alt:"",lot:"",city:"אילת", address:"שדרות התמרים הקניון האדום" }
const TheaterMainPhone = '09-8888888'

const Eilat_1 :  TheaterType ={ 
   mainSeats: Eilat1_mainSeats ,
    sideSeats: Eilat1_sideSeats,
     textsStyle: Eilat1_sideTextStyles ,
      styles:  Eilat1_sideStyles,
      ThaeaterName,
      TheaterLocation,
      TheaterMainPhone
   }

export default   Eilat_1

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

