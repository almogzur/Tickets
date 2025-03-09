import { UserIsracardInfoType, UserPayPalInfoType } from "@/types/pages-types/admin/user-biling-info-types";
import axios, { AxiosRequestConfig } from "axios";
import { Session } from "next-auth";
import useSWR, { Fetcher, Key as SWRKey, KeyedMutator, SWRConfiguration } from "swr";




type ReturendFetcherType<T> = {
    UserDBIsracardlInfo: T; // Allow `undefined` for when data is not yet loaded
    isIsracardInfoValidating: boolean;
    isIsracardInfoError: unknown;
    updateIsracardInfo: KeyedMutator<T|undefined>;
};


export const useAdminIsracardBilingInfo = (session: Session | null): ReturendFetcherType<UserIsracardInfoType> => {

  const fetcherKey: SWRKey = () => session?.user?.name ? '/api/admin/billing/isracard/get-isracard-info' : null //no fetch if no session

  const fetcher = async (key: string) : Promise<UserPayPalInfoType|undefined> => {

    const params = {
      name: session?.user?.name,
    }


    const FatchConfig: AxiosRequestConfig = {
      params: params,
      //withCredentials:true,
      //withXSRFToken:true
    }

    try{ 
      const response = await axios.get<any,any>(key, FatchConfig)
      if(response.status=== 200){
        return response.data
      }
      return 
     }
    catch (err){  
      return 
    }
  
    // return the response to SWR Hook 


  }

  const SWRconfig: SWRConfiguration = {
    revalidateOnFocus: true,
    revalidateOnMount: true,
    refreshWhenHidden: false,
    

  }

  const { data, error, isValidating, mutate } = useSWR<  any,any >(fetcherKey, fetcher, SWRconfig)

  return {
    UserDBIsracardlInfo: data,
    isIsracardInfoValidating: isValidating,
    isIsracardInfoError: error,
    updateIsracardInfo: mutate,
  }
  
}

