class AuthService {
  public authHeaders() {
    const token = localStorage.getItem('auth');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
}

export default new AuthService();
