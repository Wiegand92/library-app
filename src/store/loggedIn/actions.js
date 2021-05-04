export const logIn = () => (dispatch, getState) => {
  localStorage.setItem('loggedIn', 'true');
  dispatch({
    type: 'logIn',
    state: true
  });
};

export const logOut = () => (dispatch, getState) => {
  localStorage.setItem('loggedIn', 'false');
  dispatch({
    type: 'logOut',
    state: false
  });
};

export const showLoginForm = () => (dispatch, getState) => {
  dispatch({
    type: 'showLoginForm',
    state: true
  })
};

export const hideLoginForm = () => (dispatch, getState) => {
  dispatch({
    type: 'hideLoginForm',
    state: false
  })
};
