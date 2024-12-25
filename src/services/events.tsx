import axios from 'axios'
import useSWR from 'swr'

import { Seats } from '../constants/models/Events'

function useGetEvents () {
  const fetcher = (url: string) => axios.get(url).then(res => res.data)

  const { data, error } = useSWR(`/api/events`, fetcher)

  return {
    events: data,
    isLoading: !error && !data,
    isError: error
  }
}

function useGetEventById (id: string) {
  const fetcher = (url: string) => axios.get(url).then(res => res.data)
  const { data, error } = useSWR(`/api/events/${id}`, fetcher)

  return {
    movie: data,
    isLoading: !error && !data,
    isError: error
  }
}

async function useBookTicketByEventId (id: string, seatDetails: Seats) {
  return await axios.put(`/api/events/${id}`, {seatDetails})
}

export {
  useGetEvents,
  useGetEventById,
  useBookTicketByEventId
}