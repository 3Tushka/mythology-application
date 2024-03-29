export function checkToken() {
  const token = localStorage.getItem('token');
  if (!token) {
    return;
  }

  const tokenPayload = JSON.parse(atob(token.split('.')[1]));

  const expiryDate = new Date(0);
  expiryDate.setUTCSeconds(tokenPayload.exp);

  if (expiryDate < new Date()) {
    localStorage.removeItem('token');
  }
}
