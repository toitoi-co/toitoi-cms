export const SET_PASSWORD = 'SET_PASSWORD'

export function setPassword() {
  //make some API request here to set password

  //placeholder, set request = true
  const request = true

  return {
    type: SET_PASSWORD,
    payload: request
  }
}
