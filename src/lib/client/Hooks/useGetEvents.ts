
import { EventsType } from "@/pages/api/client/events/R/get-events";
import axios, { AxiosRequestConfig } from "axios";
import useSWR, { Fetcher, Key as SWRKey , KeyedMutator, SWRConfiguration} from "swr";

type T  = EventsType[]

type ReturendFetcherType<T> = {
  Events: T  // Allow `undefined` for when data is not yet loaded
  isEventsValidating: boolean;
  isEventsError: unknown;
  updateEvents: KeyedMutator<T>;
};


 const useClientEvents  = () : ReturendFetcherType<T>=> { 

     const fetcherKey : SWRKey = ()=> '/api/client/events/R/get-events'  // will not fetch if no session

    const fetcher : Fetcher<T> = async ( key: string ) : Promise<T> => {

       const FatchConfig : AxiosRequestConfig ={ }
          
       const response = await  axios.get<T>( key , FatchConfig )
        // return the response to SWR Hook 
        
       return response.data
      
     }

     const SWRconfig : SWRConfiguration = {}


    const { data, error, isValidating , mutate } = useSWR(fetcherKey, fetcher , SWRconfig)
   
    return {
      Events: data,
      isEventsValidating: isValidating,
      isEventsError: error,
      updateEvents: mutate,
    }
}

export default useClientEvents




