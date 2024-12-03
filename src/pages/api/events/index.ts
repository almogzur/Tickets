import type { NextApiRequest, NextApiResponse } from 'next'

import { Event } from '../../../constants/models/Events'
import { events } from '../../../constants/event'


export default function handler(req: NextApiRequest,res: NextApiResponse<Event[]>) {
  if (req.method === 'GET') {
    res.status(200).json(events)
  }
}
