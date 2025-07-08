import {  UpdateDraftType, } from "@/types/pages-types/admin/admin-event-types";
import axios, { AxiosRequestConfig } from "axios";
import { Session } from "next-auth";
import useSWR, { Fetcher, Key as SWRKey , KeyedMutator, SWRConfiguration} from "swr";

 
type FeatherType = UpdateDraftType[] 

type ReturnedFetcherType<T> = {
  Drafts: T ; // Allow `undefined` for when data is not yet loaded
  isDraftsValidating: boolean;
  isDraftsError: unknown;
  updateDrafts: KeyedMutator<T>;
};


export const useAdminDrafts  = (session:Session|null) : ReturnedFetcherType< FeatherType > => { 

     const fetcherKey : SWRKey = ()=> session?.user?.name? '/api/admin/drafts/get-drafts' : null // will not fetch if no session

     const fetcher  = async ( key: string ) : Promise<UpdateDraftType|void> => {

       const params : any = {
         name: session?.user?.name,
        }


       const FetchConfig : AxiosRequestConfig ={
        params:params,
        
        //withCredentials:true,
        //withXSRFToken:true
      }
      try{ 
           
       const response = await  axios.get<UpdateDraftType>( key , FetchConfig )
        if(response.status === 200){
          return response.data
        }
      }
      catch (err){ }
     
       
     }

     const SWRconfig : SWRConfiguration = {
       revalidateOnFocus:true,
       revalidateOnMount:true,
      refreshWhenHidden:false,
     }

    const { data, error, isValidating , mutate } = useSWR< any,any  >(fetcherKey, fetcher , SWRconfig)
   
    return {
      Drafts: data,
      isDraftsValidating: isValidating,
      isDraftsError: error,
      updateDrafts: mutate,
    }

}




