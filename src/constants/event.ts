import { Event } from "./models/Events";
import arzi from '../../data/covers/arzi.jpeg'
import eden from '../../data/covers/edan.jpg'
import koko from "../../data/covers/koko.jpeg"
import poriat from '../../data/covers/poriat.jpeg'
import noa from '../../data/covers/noa.jpeg'


import Eilat_1 from '../constants/theathers/eilat_1'
import Eilat_2 from "./theathers/eilat_2";

export const events: Event[] = [
  {
    id: 1,
    name: '  הופעה של .....  ',
    adText :" מופע של פעם בחיים באו להתרגש איתנו  ",
    ticketCost: 200,
    citizenTicketCost :1,
    cover:arzi,
    theater:Eilat_1
  },
  {
   id: 2,
   name: 'עידן רייכל ',
   adText :" מופע של פעם בחיים באו להתרגש איתנו  ",
   cover:eden,
   ticketCost: 200,
 theater :Eilat_2,
   citizenTicketCost:1
  
  //  
  //    id: 3,
     
  //    name: ' נועה קיריל  ',
  //    adText :" מופע של פעם בחיים באו להתרגש איתנו  ",
  //    ticketCost: 200,
  //    cover:noa,

  //     seats: { theather1 }
    
  //  },
  //  {
  //    id: 4,
  //    name: '  שלומי קוריאט מלך הבידור   ',
  //    adText :" מופע של פעם בחיים באו להתרגש איתנו  ",
  //    ticketCost: 200,
  //    cover:poriat,
  //    seats: {
  //      A: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //      B: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //      C: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //      D: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //      E: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //      F: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //      G: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  //    }
  //  },
  //  {
  //    id: 5,
  //    name: 'קוקו מאילת ',
  //    adText :" מופע של פעם בחיים באו להתרגש איתנו  ",
  //    ticketCost: 200,
  //    cover:koko,
  //    seats: {
  //      A: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //      B: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //      C: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //      D: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //      E: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //      F: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //      G: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  //    }
  }
]