// !This is a custom HOOK by Me
import { CanceledError } from 'axios';
import userService, { User } from '../services/userService';
import { useState, useEffect } from 'react';

const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const { req, cancel } = userService.getAll<User>();
    req
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      })
      .finally(() => {
        console.log('Reading the data Finished');
        setLoading(false);
      });
    return () => cancel();
  }, []);
  return { users, error, loading, setUsers, setError };
};
export default useUsers;
