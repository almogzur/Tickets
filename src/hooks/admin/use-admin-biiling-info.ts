import { UserPayPalInfo } from "@/types/pages-types/admin/user-biling-info-types";
import axios, { AxiosRequestConfig } from "axios";
import { Session } from "next-auth";
import useSWR, { Fetcher, Key as SWRKey, KeyedMutator, SWRConfiguration } from "swr";



type ReturendFetcherType<T> = {
     UserDBPayPalInfo: T; // Allow `undefined` for when data is not yet loaded
    isPayPalInfoValidating: boolean;
    isPayPalInfoError: unknown;
    updatePayPalInfo: KeyedMutator<T>;
};


export const useAdminBilingInfo = (session: Session | null): ReturendFetcherType<UserPayPalInfo> => {

  const fetcherKey: SWRKey = () => session?.user?.name ? '/api/admin/billing-info/paypal/get-billing' : null //no fetch if no session

  const fetcher: Fetcher<UserPayPalInfo> = async (key: string): Promise<UserPayPalInfo> => {

    const params = {
      name: session?.user?.name,
    }


    const FatchConfig: AxiosRequestConfig = {
      params: params,
      //withCredentials:true,
      //withXSRFToken:true
    }

    const response = await axios.get<UserPayPalInfo>(key, FatchConfig)
    // return the response to SWR Hook 

    return response.data

  }

  const SWRconfig: SWRConfiguration = {
    revalidateOnFocus: true,
    revalidateOnMount: true,
    refreshWhenHidden: false,
    

  }


  const { data, error, isValidating, mutate } = useSWR(fetcherKey, fetcher, SWRconfig)

  return {
    UserDBPayPalInfo: data,
    isPayPalInfoValidating: isValidating,
    isPayPalInfoError: error,
    updatePayPalInfo: mutate,
  }
}




