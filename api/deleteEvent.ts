export async function deleteEvent(jwtToken: string, id: number) {
  const rawReq = await fetch(`http://91.206.245.239:5000/api/v1/events/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + jwtToken,
      "Content-Type": "application/json",
    },
  });
  console.log(rawReq.status);
  if (rawReq.status !== 200) {
    throw new Error((await rawReq.json()).message);
  }
}
