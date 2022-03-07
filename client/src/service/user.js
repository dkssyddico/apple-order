import httpClient from './httpClient';

class User {
  constructor(httpClient) {
    this.user = httpClient;
  }

  join = (newUserObj) => this.user.post('/users/join', newUserObj);

  login = (userInfo) => {
    return this.user.post('/users/login', userInfo);
  };

  checkLogin = () => {
    return this.user.get('/users/checkLogin');
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

  getFavorite = (userId) => {
    return this.user.get(`/users/${userId}/favorite`);
  };

  addFavorite = (data) => {
    let { userId, productId } = data;
    return this.user.post(`/users/${userId}/favorite`, { productId });
  };

  deleteFavorite = (data) => {
    let { userId, productId } = data;
    return this.user.delete(`/users/${userId}/favorite/${productId}`);
  };
}

const userService = new User(httpClient);

export default userService;
