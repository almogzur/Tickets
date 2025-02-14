import { UserPayPalInfo } from "@/types/pages-types/admin/user-biling-info-types";
import axios, { AxiosRequestConfig } from "axios";
import { Session } from "next-auth";
import useSWR, { Fetcher, Key as SWRKey, KeyedMutator, SWRConfiguration } from "swr";

type DataType = UserPayPalInfo


type ReturendFetcherType<DataType> = {
    PayPalInfo: DataType; // Allow `undefined` for when data is not yet loaded
    isPayPalInfoValidating: boolean;
    isPayPalInfoError: unknown;
    updatePayPalInfo: KeyedMutator<DataType>;
};


export const useAdminBilingInfo = (session: Session | null): ReturendFetcherType<DataType> => {

  const fetcherKey: SWRKey = () => session?.user?.name ? '/api/admin/billing-info/paypal/get-billing' : null //no fetch if no session

  const fetcher: Fetcher<DataType> = async (key: string): Promise<DataType> => {

    const params: any = {
      name: session?.user?.name,
    }


    const FatchConfig: AxiosRequestConfig = {
      params: params,
      //withCredentials:true,
      //withXSRFToken:true
    }

    const response = await axios.get<DataType>(key, FatchConfig)
    // return the response to SWR Hook 

    return response.data

  }

  const SWRconfig: SWRConfiguration = {
    revalidateOnFocus: true,
    revalidateOnMount: true,
    refreshInterval: 10 * 60 * 1000, // 2 minutes
    refreshWhenHidden: false,

  }


  const { data, error, isValidating, mutate } = useSWR(fetcherKey, fetcher, SWRconfig)

  return {
    PayPalInfo: data,
    isPayPalInfoValidating: isValidating,
    isPayPalInfoError: error,
    updatePayPalInfo: mutate,
  }
}




