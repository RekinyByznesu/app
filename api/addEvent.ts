export async function addEvent(
  jwtToken: string,
  name: string,
  description: string,
  positive: boolean,
  date: Date,
  emotions: string[],
  categories: number[],
  tags: number[]
) {
  const rawReq = await fetch(`http://91.206.245.239:5000/api/v1/events`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + jwtToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      description,
      positive,
      date: date.getTime(),
      emotions,
      categories,
      tags,
    }),
  });
  if (rawReq.status !== 201) {
    throw new Error((await rawReq.json()).message);
  }
}
