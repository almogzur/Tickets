import axios from "axios";
import useSWR, { Fetcher, KeyedMutator, SWRConfiguration } from "swr";
import { ClientEventType } from "@/types/pages-types/admin/admin-event-types";

type ReturendFetcherType<T> = {
  Event: T | undefined;
  isEventValidating: boolean;
  isEventError: unknown;
  updateEvent: KeyedMutator<T>;
};

export const useClientEvent = (id: string): ReturendFetcherType<ClientEventType | undefined> => {

  const fetcherKey =  ()=>  id  !== undefined  ?  `/api/client/events/get-event-by-id?event_id=${id}` : null 

  const fetcher = async (key: string) => {
    try {
      const response = await axios.get(key);

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log("Error fetching event:", error);
     return
    }
  };

  const { data, error, isValidating, mutate } = useSWR(fetcherKey, fetcher,);

  return {
    Event: data,
    isEventValidating: isValidating,
    isEventError: error,
    updateEvent: mutate,
  };
};