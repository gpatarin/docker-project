import API from "../API";

export async function fetchPolls() {
  return (await API.get('/api/get')).data;
}
