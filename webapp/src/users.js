import api from '../src/adapter';

export const CREATE_USER = 'CREATE_USER';

export const createUser = (user) => (dispatch) => api.createUser(user)
  .then((json) => dispatch({
    type: CREATE_USER,
    payload: json,
  }));
