import {  ClientEventType, NewDraftType, NewEventType, } from "@/types/pages-types/admin/admin-event-types";
import axios, { AxiosRequestConfig } from "axios";
import { Session } from "next-auth";
import useSWR, { Fetcher, Key as SWRKey, KeyedMutator, SWRConfiguration } from "swr";

type DataType = ClientEventType[]


type ReturendFetcherType<T> = {
  Events: T; // Allow `undefined` for when data is not yet loaded
  isEventsValidating: boolean;
  isEventsError: unknown;
  updateEvents: KeyedMutator<T>;
};


export const useAdminEvents = (session: Session | null): ReturendFetcherType<DataType> => {

  const fetcherKey: SWRKey = () => session?.user?.name ? '/api/admin/live-events/get-admin-events' : null //no fetch if no session

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
    revalidateOnFocus: false,
    revalidateOnMount: true,
    refreshWhenHidden: false,
    revalidateIfStale:false,
    revalidateOnReconnect: false,
    refreshInterval: undefined,
    shouldRetryOnError: false,
    dedupingInterval: 0,
    focusThrottleInterval: 0,
    loadingTimeout: 0,
    errorRetryInterval: 0,
    

  }


  const { data, error, isValidating, mutate } = useSWR(fetcherKey, fetcher, SWRconfig)

  return {
    Events: data,
    isEventsValidating: isValidating,
    isEventsError: error,
    updateEvents: mutate,
  }
}




