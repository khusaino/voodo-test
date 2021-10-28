const url = 'http://jsonplaceholder.typicode.com/'

export const request = (api) => {
  return fetch(url + api).then( response => response.json())
}