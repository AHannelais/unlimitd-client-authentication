const getTokenFromLocalStorage = () => window.localStorage.getItem('token');

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem('token', accessToken);
  } else {
    localStorage.removeItem('token');
  }
};

export { setSession, getTokenFromLocalStorage };
