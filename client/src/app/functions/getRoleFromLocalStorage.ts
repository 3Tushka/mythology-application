export function getRoleFromLocalStorage(this: any) {
  const token = localStorage.getItem('token');
  if (token) {
    const base64Url = token.split('.')[1]; // Get payload part of the JWT token
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Convert Base64Url to Base64
    const payload = JSON.parse(window.atob(base64)); // Decode Base64 and parse JSON

    this.userId = payload.userId;
    if (payload.roles[0].value === 'admin') {
      (this as any).isAdmin = true;
    } else {
      (this as any).isAdmin = false;
    }
  }
}
