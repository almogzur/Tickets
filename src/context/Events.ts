import {createContext, Dispatch, SetStateAction} from "react";
import { Event } from "../constants/models/Events";


/* Since setEvents is a required function, you must provide a placeholder value during the context creation.
 A common practice is to use a no-op function or throw an error when setEvents is called without a provider, 
*/
interface MovieContextType {
  events: Event[],
  setEvents:Dispatch<SetStateAction<Event[]>>
}

export default createContext<MovieContextType>({
  setEvents : ()=> {
        throw new Error('Function not implemented.')
  },
  events: []
})

