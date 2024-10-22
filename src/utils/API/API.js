const URL = "https://proyecto-10-full-stack.vercel.app/api/v1";

export const API = async ({
  endpoint,
  method = "GET",
  body,
  isJSON = true,
  token = null,
}) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  if (isJSON) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(URL + endpoint, {
    body: isJSON ? JSON.stringify(body) : body,
    method,
    headers,
    credentials: "include",
  });

  const response = await res.json();
  return response;
};
