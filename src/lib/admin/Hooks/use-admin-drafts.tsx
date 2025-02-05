import { DraftType, } from "@/components/admin/newEvent/types/new-event-types";
import {  getAdminDraftsApiReturndType } from "@/pages/api/admin/drafts/R/get-drafts";
import axios, { AxiosRequestConfig } from "axios";
import { Session } from "next-auth";
import useSWR, { Fetcher, Key as SWRKey , KeyedMutator, SWRConfiguration} from "swr";

type DataType = DraftType[]


type ReturendFetcherType<T> = {
  Drafts: DataType | undefined; // Allow `undefined` for when data is not yet loaded
  isDraftsValidating: boolean;
  isDraftsError: unknown;
  updateDrafts: KeyedMutator<T>;
};


export const useAdminDrafts  = (session:Session|null) : ReturendFetcherType<DataType>=> { 

     const fetcherKey : SWRKey = ()=> session?.user?.name? '/api/admin/drafts/R/get-drafts' : null // will not fetch if no session

     const fetcher : Fetcher<DataType> = async ( key: string ) : Promise<DataType> => {

       const params : any = {
         name: session?.user?.name,
        }


       const FatchConfig : AxiosRequestConfig ={
        params:params,
        //withCredentials:true,
        //withXSRFToken:true
      }
          
       const response = await  axios.get<DataType>( key , FatchConfig )
        // return the response to SWR Hook 
        
       return response.data
      
     }

     const SWRconfig : SWRConfiguration = {}


    const { data, error, isValidating , mutate } = useSWR(fetcherKey, fetcher , SWRconfig)
   
    return {
      Drafts: data,
      isDraftsValidating: isValidating,
      isDraftsError: error,
      updateDrafts: mutate,
    }
}




