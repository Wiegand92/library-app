const localValue = JSON.parse(localStorage.getItem('loggedIn'));

const initialState = {
  isLogged: localValue !== null ? localValue : false,
  showLoginForm: false
};

const isLogged = (state = initialState, action) => {
  switch(action.type){
    case 'logIn':
      return {...state, isLogged: action.state};
    case 'logOut':
      return {...state, isLogged: action.state};
    case 'showLoginForm':
      return {...state, showLoginForm: action.state};
    case 'hideLoginForm':
      return {...state, showLoginForm: action.state};
    default:
      return state;
  };
};

export default isLogged;