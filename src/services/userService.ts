// import apiClient from './apiClient';
import create from './httpService';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

// class userService {
//   getAllUsers() {
//     const controller = new AbortController();

//     const req = apiClient.get<User[]>('/users', {
//       signal: controller.signal,
//     });
//     return { req, cancel: () => controller.abort() };
//   }

//   deleteUser(id: number) {
//     //  apiClient.delete('/users/' + user.id);
//     return apiClient.delete('/users/' + id);
//   }

//   createUser(user: User) {
//     // apiClient.post('/users', newUser);
//     return apiClient.post('/users', user);
//   }

//   updateUser(user: User) {
//     //  apiClient.patch('/users/' + user.id, updatedUsers);
//     return apiClient.patch('/users/' + user.id, user);
//   }
// }

// export default new userService();

// *create(endpoint) =  create('/users')
export default create('/users');
