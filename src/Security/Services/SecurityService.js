import axios from "../../Shared/axios-interceptor/interceptor";

export async function authenticateCredentails(user) {
  console.log(user);
  return await( await axios.post("/users/authenticate", user)).data;
}
