export default async function getPlanets() {
  return fetch('https://swapi-trybe.herokuapp.com/api/planets/')
    .then((planetList) => planetList
      .json()
      .then((json) => (planetList.ok ? Promise.resolve(json) : Promise.reject(json))));
}
