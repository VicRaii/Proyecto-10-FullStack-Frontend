const URL = "http://localhost:3000/api/v1/";

export const API = async ({
  endpoint,
  method = "GET",
  body,
  isJSON = true,
}) => {
  const headers = {};

  isJSON ? (headers["Content-Type"] = "application/json") : null;

  const res = await fetch(URL + endpoint, {
    body: isJSON ? JSON.stringify(body) : body,
    method,
    headers,
  });

  const response = await res.json();
  return response;
};
