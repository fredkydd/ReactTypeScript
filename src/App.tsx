// *ctrl + .  imports what you hover
// *npm i
// *npm i --save-dev @types/axios
// import './App.css';
// import { useEffect, useState } from 'react';
// import { CanceledError } from 'axios';
import styles from './App.module.css';
// import apiClient from './services/apiClient';
import userService, { User } from './services/userService';
import useUsers from './hooks/useUsers';

function App() {
  const { users, error, loading, setUsers, setError } = useUsers();
  // const [users, setUsers] = useState<User[]>([]);
  // const [error, setError] = useState<string>();
  // const [loading, setLoading] = useState(false);

  // *CRUD => Create (axios.post)
  const addUser = () => {
    const originalUsers = [...users],
      newUser = {
        id: 18,
        name: 'Fred',
        username: 'illusion',
        email: 'faridthedev@gmail.com',
      };
    setUsers([...users, newUser]);

    // apiClient
    //   .post('/users', newUser)
    // userService.createUser(newUser);
    userService
      .create(newUser)
      .then(({ data: Users }) => setUsers([...users, Users]))
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      })
      .finally(() => console.log('Creating a post successfully finished'));
  };

  // *CRUD => Read (axios.get)
  // useEffect(() => {
  //   setLoading(true);

  //   // apiClient
  //   //   .get<User[]>('/users', {
  //   //     signal: controller.signal,
  //   //   })
  //   // const { req, cancel } = userService.getAllUsers();
  //   // !T is generic type parameter we should specify the type of object as <User>
  //   const { req, cancel } = userService.getAll<User>();
  //   req
  //     .then((res) => {
  //       setUsers(res.data);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       if (err instanceof CanceledError) return;
  //       setError(err.message);
  //     })
  //     .finally(() => {
  //       console.log('Reading the data Finished');
  //       setLoading(false);
  //     });
  //   return () => cancel();
  // }, []);

  // *CRUD => Update (axios.put) (axios.patch)
  const handleUpdateUser = (user: User) => {
    const originalUsers = [...users];
    const updatedUsers = { ...user, name: user.name + '!' };

    setUsers(users.map((item) => (item.id === user.id ? updatedUsers : item)));

    // apiClient
    //   .patch('/users/' + user.id, updatedUsers)
    //  userService.updateUser(updatedUsers);
    userService
      .update(updatedUsers)
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      })
      .finally(() => console.log('ID' + user.id + ' has been updated'));
  };

  // *CRUD => Delete (axios.delete)
  const handleDeleteUser = (user: User) => {
    const originalUsers = [...users];

    setUsers(users.filter((item) => item.id !== user.id));

    // apiClient
    //   .delete('/users/' + user.id)
    // userService.deleteUser(user.id);
    userService
      .delete(user.id)
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      })
      .finally(() => console.log('ID' + user.id + ' has already been deleted'));
  };

  return (
    <>
      {error && <h1 className="text-danger text-center">{error}</h1>}
      {loading && (
        <div
          style={{
            display: 'grid',
            justifyContent: 'center',
            fontSize: '2rem',
          }}
        >
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <div className={styles.center}>
        <button className="btn btn-outline-success" onClick={addUser}>
          Add ✅
        </button>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <td>ID</td>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => handleUpdateUser(user)}
                >
                  Update ✒️
                </button>
              </td>
              <td>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => handleDeleteUser(user)}
                >
                  Delete ❌
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
