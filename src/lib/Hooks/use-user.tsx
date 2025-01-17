import axios from "axios";
import useSWR, { Fetcher, KeyedMutator, SWRConfiguration } from "swr";
import {SWRResponse} from 'swr'

type T = unknown

type ReturendFetcherType<T> = {
    User: T | undefined; // Allow `undefined` for when data is not yet loaded
    isUserValidating: boolean;
    isUserError: unknown;
    updateUser: KeyedMutator<T>;
  };
  
  const fetcher: Fetcher<T> = 
    (key: string): Promise<T> =>
         axios.get(key).then((res) => {
            if (res.status === 400) {
              alert(`SWR ${key} Failed fectnig data ...`)
             }
              return res.data.json();
        })

export function useUser <T>(name:string):ReturendFetcherType<T> {

    const config : SWRConfiguration = {}

    const { data, error, isValidating , mutate } = useSWR(`/api/user/${name}`, fetcher , config)
   
    return {
      User: data,
      isUserValidating: isValidating,
      isUserError: error,
      updateUser: mutate,
    }
  }


