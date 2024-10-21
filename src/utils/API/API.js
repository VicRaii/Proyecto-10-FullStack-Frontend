const URL =
  "https://proyecto-10-full-stack-7cq8sqcm0-vicraiis-projects.vercel.app/?vercelToolbarCode=uSBvuJ9AF3v4vjs/api/v1/";

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

  isJSON ? (headers["Content-Type"] = "application/json") : null;

  const res = await fetch(URL + endpoint, {
    body: isJSON ? JSON.stringify(body) : body,
    method,
    headers,
  });

  const response = await res.json();
  return response;
};
