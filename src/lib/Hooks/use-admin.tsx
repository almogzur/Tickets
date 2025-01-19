import { infoFiledsType, TicketType } from "@/components/admin/newEvent/types/new-event-types";
import axios, { AxiosRequestConfig } from "axios";
import { Session } from "next-auth";
import useSWR, { Fetcher, Key as SWRKey , KeyedMutator, SWRConfiguration} from "swr";

type DataType = unknown


type ReturendFetcherType<T> = {
  Data: T | undefined; // Allow `undefined` for when data is not yet loaded
  isUserValidating: boolean;
  isUserError: unknown;
  updateUser: KeyedMutator<T>;
};


export const useAdminData  = (session:Session|null) : ReturendFetcherType<DataType>=> { 

    const fetcherKey : SWRKey = ()=> session?.user?.name? '/api/admin/get-admin-data' : null // will not fetch if no session

     const fetcher : Fetcher<DataType> = async ( key: string ) : Promise<DataType> => {

       const params : any = {
         name: session?.user?.name,
         a:"dsadsa"
        
        }


       const FatchConfig : AxiosRequestConfig ={
        params:params,
        //withCredentials:true,
        //withXSRFToken:true
      }
          
       const response = await  axios.get( key , FatchConfig )
        // return the response to SWR Hook 
       return response.data
      
     }

     const SWRconfig : SWRConfiguration = {}


    const { data, error, isValidating , mutate } = useSWR(fetcherKey, fetcher , SWRconfig)
   
    return {
      Data: data,
      isUserValidating: isValidating,
      isUserError: error,
      updateUser: mutate,
    }
}




