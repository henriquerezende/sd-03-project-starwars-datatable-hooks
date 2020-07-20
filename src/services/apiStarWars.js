const URL_API = 'https://swapi-trybe.herokuapp.com/api/planets/';

const apiStarWars = () => fetch(`${URL_API}`).then((response) => response
  .json()
  .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));


export default apiStarWars;