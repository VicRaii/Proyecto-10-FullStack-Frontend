const URL = 'https://proyecto-10-full-stack.vercel.app/api/v1'
// const URL = 'http://localhost:3000/api/v1' //! BORRAR AL TERMINAR PRUEBAS

export const API = async ({
  endpoint,
  method = 'GET',
  body,
  isJSON = true,
  token = null
}) => {
  const headers = {
    Authorization: `Bearer ${token}`
  }

  if (isJSON) {
    headers['Content-Type'] = 'application/json'
  }

  const res = await fetch(URL + endpoint, {
    body: isJSON ? JSON.stringify(body) : body,
    method,
    headers: isJSON ? headers : { Authorization: `Bearer ${token}` },
    credentials: 'include'
  })

  const response = await res.json()
  return response
}
