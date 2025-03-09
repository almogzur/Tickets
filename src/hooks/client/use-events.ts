import {  ClientEventType,  NewEventType, } from "@/types/pages-types/admin/admin-event-types";
import axios, { AxiosRequestConfig } from "axios";
import { Session } from "next-auth";
import useSWR, { Fetcher, Key as SWRKey, KeyedMutator, SWRConfiguration } from "swr";




type ReturendFetcherType<T> = {
  Events: T[]; // Allow `undefined` for when data is not yet loaded
  isEventsValidating: boolean;
  isEventsError: unknown;
  updateEvents: KeyedMutator<T>;
};


export const useClientEvents = (): ReturendFetcherType<ClientEventType> => {

  const fetcherKey: SWRKey = () =>  '/api/client/events/get-client-events '

  const fetcher: Fetcher<ClientEventType> = async (key: string): Promise<ClientEventType> => {

    const response = await axios.get<ClientEventType>(key)
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




