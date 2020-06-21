// const apiRoot = 'https://gentle-hamlet-89215.herokuapp.com/api/v1'

const apiRoot = process.env.NODE_ENV === 'production'
  ? 'https://gentle-hamlet-89215.herokuapp.com/api/v1' : 'http://localhost:5000/api/users/register';

const api = {
  createUser: (user) => fetch(`${apiRoot}/users`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    throw new Error('Something went wrong');
  })
    .catch((error) => console.log(error)),
};

export default api;
