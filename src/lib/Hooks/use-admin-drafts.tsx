import { EventMongoseeDraftType } from "@/components/admin/newEvent/types/new-event-types";
import {  getAdminDraftsApiReturndType } from "@/pages/api/admin/drafts/R/get-drafts";
import axios, { AxiosRequestConfig } from "axios";
import { Session } from "next-auth";
import useSWR, { Fetcher, Key as SWRKey , KeyedMutator, SWRConfiguration} from "swr";

type DataType = EventMongoseeDraftType[]


type ReturendFetcherType<T> = {
  Drafts: DataType | undefined; // Allow `undefined` for when data is not yet loaded
  isUserValidating: boolean;
  isUserError: unknown;
  updateUser: KeyedMutator<T>;
};


export const useAdminDrafts  = (session:Session|null) : ReturendFetcherType<DataType>=> { 

     const fetcherKey : SWRKey = ()=> session?.user?.name? '/api/admin/drafts/R/get-admin-data' : null // will not fetch if no session

     const fetcher : Fetcher<DataType> = async ( key: string ) : Promise<DataType> => {

       const params : any = {
         name: session?.user?.name,
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
      Drafts: data,
      isUserValidating: isValidating,
      isUserError: error,
      updateUser: mutate,
    }
}




