export function getTokenFromLocalStorage() {
  return localStorage.getItem('auth-token');
}

export function setSession(accessToken: string | null) {
  if (accessToken) {
    localStorage.setItem('auth-token', accessToken);
  } else {
    localStorage.removeItem('auth-token');
  }
}
