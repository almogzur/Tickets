import { UserPayPalInfoType } from "@/types/pages-types/admin/user-biling-info-types";
import axios, { AxiosRequestConfig } from "axios";
import { Session } from "next-auth";
import useSWR, { Fetcher, Key as SWRKey, KeyedMutator, SWRConfiguration } from "swr";




type ReturendFetcherType<T> = {
    UserDBPayPalInfo: T; // Allow `undefined` for when data is not yet loaded
    isPayPalInfoValidating: boolean;
    isPayPalInfoError: unknown;
    updatePayPalInfo: KeyedMutator<T|undefined>;
};


export const useAdminPaypalBilingInfo = (session: Session | null): ReturendFetcherType<UserPayPalInfoType> => {

  const fetcherKey: SWRKey = () => session?.user?.name ? '/api/admin/billing/paypal/get-paypal-info' : null //no fetch if no session

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
    UserDBPayPalInfo: data,
    isPayPalInfoValidating: isValidating,
    isPayPalInfoError: error,
    updatePayPalInfo: mutate,
  }
  
}

