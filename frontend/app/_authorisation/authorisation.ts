type userAuthorizeType = {
  username: string;
  isUserAuthorized: boolean;
  error: Error;
};

export async function userAuthorize(): Promise<userAuthorizeType> {
  const jwtToken = localStorage.getItem("jwt");
  const response = await fetch("http://localhost:5001/get-user-email", {
    method: "GET",
    mode: "cors",
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      "Content-Type": "application/json",
    },
  });

  let jsonResponse = (await response.json()) as userAuthorizeType;

  // check this if condition, and make it compatible with backend if needed.
  if (!jsonResponse.error) jsonResponse.isUserAuthorized = true;
  else jsonResponse.isUserAuthorized = false;

  return jsonResponse;
}
