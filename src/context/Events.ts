import React from "react";
import { Event } from "../constants/models/Events";
import { events } from "../constants/event";

interface MovieContextModal {
  events: Event[],
  setEvents?: React.Dispatch<React.SetStateAction<Event[]>>
}

export default React.createContext<MovieContextModal>({ events: events });

