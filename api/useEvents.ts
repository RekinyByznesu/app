import { useContext, useEffect, useState } from "react";
import { JWTContext } from "../App";

interface Event {
  date: Date;
  name: string;
  data: {
    id: number;
    title: string;
    description: string;
    date: Date;
    tags: string[];
    categories: string[];
    emotions: string[];
    positive: boolean;
    solution: string | null;
  }[];
}

export function useEvents(): [
  Event[],
  (date: Date) => Promise<void>,
  () => void
] {
  const { JWT } = useContext(JWTContext);

  const [events, setEvents] = useState<Event[]>([]);

  const clearEvents = () => setEvents([]);

  const addNewDay = async (date: Date) => {
    const rawReq = await fetch(
      `http://91.206.245.239:5000/api/v1/events?date=${date.getTime()}`,
      {
        headers: {
          Authorization: "Bearer " + JWT,
        },
      }
    );
    const data = await rawReq.json();
    setEvents([
      ...events,
      {
        date: date,
        name: date.toLocaleDateString(),
        data: data.map((event: any) => ({
          id: event.id,
          title: event.name,
          date: new Date(event.date),
          description: event.description,
          positive: event.positive,
          categories: event.categories.map(
            (category: any) => category.category.name
          ),
          emotions: event.emotions,
          solution: event.solution,
          tags: event.tags.map((tag: any) => tag.tag.name),
        })),
      },
    ]);
  };

  return [events, addNewDay, clearEvents];
}
