import { AdminEventType, DraftType, } from "@/types/pages-types/new-event-types";
import axios, { AxiosRequestConfig } from "axios";
import { Session } from "next-auth";
import useSWR, { Fetcher, Key as SWRKey, KeyedMutator, SWRConfiguration } from "swr";

type DataType = AdminEventType[]


type ReturendFetcherType<T> = {
  Events: T; // Allow `undefined` for when data is not yet loaded
  isEventsValidating: boolean;
  isEventsError: unknown;
  updateEvents: KeyedMutator<T>;
};


export const useAdminEvents = (session: Session | null): ReturendFetcherType<DataType> => {

  const fetcherKey: SWRKey = () => session?.user?.name ? '/api/admin/live-events/R/get-events' : null //no fetch if no session

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
    refreshInterval: 2 * 60 * 1000, // 2 minutes
    refreshWhenHidden: false,

  }


  const { data, error, isValidating, mutate } = useSWR(fetcherKey, fetcher, SWRconfig)

  return {
    Events: data,
    isEventsValidating: isValidating,
    isEventsError: error,
    updateEvents: mutate,
  }
}




