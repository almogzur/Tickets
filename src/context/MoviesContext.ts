import React from "react";
import { Event } from "../constants/models/Events";
import { events} from "../constants/event";

export default React.createContext<MovieContextModal>({ events: events });

interface MovieContextModal {
  events: Event[],
  setEvents?: Function
}