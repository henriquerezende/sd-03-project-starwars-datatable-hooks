const url = 'https://swapi-trybe.herokuapp.com/api/planets/';

const requestData = () =>
  fetch(url).then((response) =>
    response
      .json()
      .then((json) => (
        response.ok ? Promise.resolve(json) : Promise.reject(json)
      )),
  );

export default requestData