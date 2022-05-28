import { useContext, useEffect, useState } from "react";
import { JWTContext } from "../App";

interface Event {
  id: number;
  date: string;
  title: string;
  tags: string[];
}
export function useRecents(): [Array<Event[]>, (date: Date) => Promise<void>] {
  const { JWT } = useContext(JWTContext);

  const [recents, setRecents] = useState<Array<Event[]>>([]);

  const fetchRecents = async (date: Date) => {
    const data: Event[] = [];
    const requests = [0, -1, -2].map((offset) => {
      return fetch(
        `http://91.206.245.239:5000/api/v1/events?date=${
          date.getTime() + offset * 86400000
        }&positive=true`,
        {
          headers: {
            Authorization: "Bearer " + JWT,
          },
        }
      ).then((request) => request.json());
    });

    (await Promise.all(requests)).forEach((response) => {
      data.push(
        response.map((event: any) => {
          return {
            id: event.id,
            date: event.date,
            title: event.name,
            tags: event.tags.map((tag: any) => tag.tag.name),
          };
        })
      );
    });
    setRecents(data);
  };
  return [recents, fetchRecents];
}
