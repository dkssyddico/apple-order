import httpClient from './httpClient';

class User {
  constructor(httpClient) {
    this.user = httpClient;
  }

  join = (newUserObj) => this.user.post('/users/join', newUserObj);

  login = (userInfo) => {
    return this.user.post('/users/login', userInfo);
  };

  logout = () => {
    return this.user.get('/users/logout');
  };

  getAll = () => this.user.get('/users');

  remove = (userId) => this.user.delete(`/users/${userId}`);

  getProfile = (userId) => this.user.get(`/users/${userId}`);

  changeUsername = (userData) => {
    let { userId, username } = userData;
    return this.user.put(`/users/${userId}/username`, { username });
  };

  changePassword = (userData) => {
    let { userId, currentPassword, newPassword } = userData;
    return this.user.put(`/users/${userId}/password`, {
      currentPassword,
      newPassword,
    });
  };
}

const userService = new User(httpClient);

export default userService;
