// *ctrl + .  imports what you hover
import './App.css';
import ExpenseForm from './components/ExpenseForm';
import ExpenseFilter from './components/ExpenseFilter';
import ExpenseList from './components/ExpenseList';
import { useEffect, useState } from 'react';
import axios, { AxiosError, CanceledError } from 'axios';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

function App() {
  // *useEffect + axios
  // *DELETE
  const [users, setUsers] = useState<User[]>([]),
    handleDeleteUser = (user: User) => {
      const fetchedUsers = [...users];
      setUsers(users.filter((item) => item.id !== user.id));
      (async () => {
        try {
          await axios.delete(
            'https://jsonplaceholder.typicode.com/users/' + user.id
          );
        } catch (err) {
          setError((err as AxiosError).message);
          // *if something bad happens retrieve the fetched data to the screen
          setUsers(fetchedUsers);
          // *however it will not be appeared becaues i wrote else if {error} bottom 😁
        }
      })();
    };
  //  const handleDeleteUser = (id: number) => {
  //     setUsers(users.filter((user) => user.id !== id));
  //   };

  // console.log('user');
  // users.length !== 0 && console.log(users.at(0));
  // users.length !== 0 && console.log(users.at(0)?.id);
  // users.length !== 0 && console.log(users.filter((user) => user.id === 1));

  const spinner = (
    <div
      style={{ display: 'grid', justifyContent: 'center', fontSize: '2rem' }}
    >
      <div className="spinner-border text-danger" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  // *POST
  const addUser = () => {
    const originalUsers = [...users],
      me = {
        id: 0,
        name: 'Fred',
        username: 'illusion',
        email: 'faridthedev@gmail.com',
      };
    setUsers([...users, me]);

    (async () => {
      try {
        const res = await axios.post(
          'https://jsonplaceholder.typicode.com/users',
          me
        );
        setUsers([...users, res.data]);
        // const savedUser = res.data;
        // setUsers([...users, savedUser]);
      } catch (err) {
        setError((err as AxiosError).message);
        setUsers(originalUsers);
      } finally {
        console.log('Finished ✅');
      }
    })();
  };

  const [error, setError] = useState<string>(),
    [loading, setLoading] = useState(true);

  // const  toggleUsers = () => {
  //   if (!users.length && !loading && !error) {
  //     // console.log(
  //     //   `else if users.length === 0 && error === '' && loading === false `
  //     // );
  //     return (
  //       <h1
  //         style={{
  //           display: 'grid',
  //           justifyContent: 'center',
  //         }}
  //       >
  //         You've successfully deleted all the datas 🙂
  //       </h1>
  //     );
  //   } else if (loading) {
  //     // console.log('if renders');
  //     return spinner;
  //   } else if (error) {
  //     // console.log('else if error');
  //     return (
  //       <h1
  //         style={{
  //           display: 'grid',
  //           justifyContent: 'center',
  //           color: 'red',
  //         }}
  //       >
  //         {error} ☹️
  //       </h1>
  //     );
  //   } else {
  //     // console.log('table');
  //     return (
  //       <table className="table table-striped">
  //         <thead>
  //           <tr>
  //             <th>Name</th>
  //             <th>Username</th>
  //             <th>Email</th>
  //             <th></th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {users.map((user) => (
  //             <tr key={user.id}>
  //               <td>{user.name}</td>
  //               <td>{user.username}</td>
  //               <td>{user.email}</td>
  //               <td>
  //                 <button
  //                   onClick={() => handleDeleteUser(user)}
  //                   // onClick={() => handleDeleteUser(user.id)}
  //                   className="btn btn-outline-danger"
  //                 >
  //                   Delete ❌
  //                 </button>
  //               </td>
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>
  //     );
  //   }
  // };

  // *GET
  // *Synchronous fetch 📚
  // useEffect(() => {
  //   const controller = new AbortController();
  //   setLoading(true);
  //   axios
  //     .get<User[]>('https://jsonplaceholder.typicode.com/users', {
  //       signal: controller.signal,
  //     })
  //     .then((res) => {
  //       setUsers(res.data);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       if (err instanceof CanceledError) return;
  //       setError((err as AxiosError).message);
  //     })
  //     .finally(() => {
  //       console.log('Finished');
  //       setLoading(false);
  //     });
  //   return () => controller.abort();
  // }, []);

  // *Asynchronous fetch 📚
  // *We cant use async keyword after useEffect that's why we wrap it inside of useEffect 💡

  // *GET
  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        // const res = await axios.get<User[]>(
        //   'https://jsonplaceholder.typicode.com/users',
        //   { signal: controller.signal }
        // );
        // *By appending the ?_cache= + Date.now() to the API URL, it ensures that each request is unique and not cached by the browser.
        const res = await axios.get<User[]>(
          'https://jsonplaceholder.typicode.com/users?_cache=' + Date.now(),
          { signal: controller.signal }
        );
        setUsers(res.data);
        // console.log('res.data');
        // console.log(res.data.at(0)?.id);
        // console.log(res.data.filter((user) => user.id === 1));
      } catch (err) {
        if (err instanceof CanceledError) return;
        setError((err as AxiosError).message);
      } finally {
        setLoading(false);
        // console.log('finally');
      }
    })();

    // const timer = setTimeout(() => {
    //   fetchData();
    // }, 3000);

    // return () => {
    //   clearTimeout(timer);
    //   controller.abort();
    // };

    // *return is for removing if there is any pending request

    return () => controller.abort();
  }, []);

  // *UPDATE PATCH && PUT
  const handleUpdateUser = (user: User) => {
    const originalUsers = [...users];
    const updatedUsers = { ...users, name: user.name + '!' };
    setUsers(
      users.map((item) =>
        item.id === user.id ? { ...item, name: user.name + '!' } : item
      )
    );
    // !Patch is for updating the parametr of an obj
    // !Put is updating the whole object
    (async () => {
      try {
        await axios.patch(
          'https://jsonplaceholder.typicode.com/users/' + user.id,
          updatedUsers
        );
      } catch (err) {
        setError((err as AxiosError).message);
        setUsers(originalUsers);
      }
    })();
  };

  // *Expense = [Form, Filter, List]
  const [expenses, setExpenses] = useState([
    { id: 0, description: 'blah blah', amount: 9, category: 'Entertainment' },
    { id: 1, description: 'blah blah', amount: 11, category: 'Utilities' },
    { id: 2, description: 'blah blah', amount: 13, category: 'Groceries' },
  ]);
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const visibleExpense = selectedCategory
    ? expenses.filter((expense) => expense.category === selectedCategory)
    : expenses;

  return (
    <>
      <hr style={{ margin: '1rem' }} />

      <ExpenseForm
        submit={(expense) =>
          setExpenses([...expenses, { ...expense, id: expenses.length + 1 }])
        }
      />
      <hr style={{ margin: '1rem' }} />

      <ExpenseFilter
        selectedFilterCategory={(category) => setSelectedCategory(category)}
      />
      <hr style={{ margin: '1rem' }} />

      <ExpenseList
        expenses={visibleExpense}
        onDelete={(id) =>
          setExpenses(expenses.filter((expense) => expense.id !== id))
        }
      />
      <hr style={{ margin: '2rem 1rem' }} />

      {error && <h1 className="text-danger text-center">{error}</h1>}
      {loading && spinner}
      <button className="btn btn-outline-success" onClick={addUser}>
        Add ✅
      </button>
      <table className="table table-striped">
        <thead>
          <tr>
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
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => handleUpdateUser(user)}
                >
                  Update
                </button>
              </td>
              <td>
                <button
                  onClick={() => handleDeleteUser(user)}
                  // onClick={() => handleDeleteUser(user.id)}
                  className="btn btn-outline-danger"
                >
                  Delete ❌
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* {toggleUsers()} */}

      <hr style={{ margin: '2rem 1rem' }} />
    </>
  );
}

export default App;
