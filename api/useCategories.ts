import { useContext, useEffect, useState } from "react";
import { JWTContext } from "../App";

export function useCategories(
  id?: number
): [
  { name: string; id: number }[],
  (name: string) => void,
  () => void,
  (name: string) => void
] {
  const { JWT } = useContext(JWTContext);

  const [categories, setCategories] = useState<
    Array<{ name: string; id: number }>
  >([]);

  const editCategory = (name: string) => {
    fetch(`http://91.206.245.239:5000/api/v1/categories/${id}`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + JWT,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    }).then((res) => (res.status === 200 ? updateCategories() : null));
  };

  const updateCategories = () => {
    fetch("http://91.206.245.239:5000/api/v1/categories", {
      headers: {
        Authorization: "Bearer " + JWT,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setCategories(res);
      });
  };

  const addCategory = (name: string) => {
    fetch("http://91.206.245.239:5000/api/v1/categories", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + JWT,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    }).then((res) => (res.status === 201 ? updateCategories() : null));
  };

  useEffect(() => {
    updateCategories();
  }, []);

  return [categories, addCategory, updateCategories, editCategory];
}
