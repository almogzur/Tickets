import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { ClientEventType } from "@/types/pages-types/admin/admin-event-types";

interface EventsContextType {
    ClientEvents: ClientEventType[];
    setClientEvents: (events: ClientEventType[]) => void;
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

export function EventsProvider({ children }: { children: ReactNode }) {
    const [ClientEvents, setClientEvents] = useState<ClientEventType[]>([]);

    // Load events from localStorage after mounting
    return (
        <EventsContext.Provider value={{ ClientEvents, setClientEvents }}>
            {children}
        </EventsContext.Provider>
    );
}

export function useEvents() {
    const context = useContext(EventsContext);
    if (!context) {
        throw new Error("useEvents must be used within an EventsProvider");
    }
    return context;
}
