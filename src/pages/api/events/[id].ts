import type { NextApiRequest, NextApiResponse } from 'next'

import { Event } from '../../../constants/models/Events'
import { events } from '../../../constants/event'

export default function handler(req: NextApiRequest,res: NextApiResponse<Event|undefined>) {
  const { id } = req.query
  
  if (req.method === 'GET') {
    if (typeof id === 'string') {
      const movie = events.find(movie => movie.id === parseInt(id))
      res.status(200).json(movie)
    }
  } else if (req.method === 'PUT') {
    if (typeof id === 'string') {
      const movieIndex = events.findIndex(movie => movie.id === parseInt(id))
      events[movieIndex].seats = req.body.seatDetails;
      res.status(200).json(events[movieIndex])
    }
  }
}
