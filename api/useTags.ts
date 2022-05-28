import { useContext, useEffect, useState } from "react";
import { JWTContext } from "../App";

interface Tag {
  name: string;
  id: number;
  type: "PLACE" | "PERSON" | "ACTIVITY" | "OTHER";
}

export function useTags() {
  const { JWT } = useContext(JWTContext);
  const [tags, setTags] = useState<Tag[]>([]);

  const updateTags = async () => {
    const rawReq = await fetch("http://91.206.245.239:5000/api/v1/tags", {
      headers: {
        Authorization: "Bearer " + JWT,
      },
    });
    const data = await rawReq.json();
    setTags(data);
  };

  useEffect(() => {
    updateTags();
  }, []);

  return [tags];
}
