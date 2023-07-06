import './App.css';
import ExpenseForm from './components/ExpenseForm';
import ExpenseFilter from './components/ExpenseFilter';
import ExpenseList from './components/ExpenseList';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

function App() {
  // *useEffect + axios

  const [users, setUsers] = useState<User[]>([]),
    handleDeleteUser = (id: number) => {
      setUsers(users.filter((user) => user.id !== id));
    },
    [error, setError] = useState(''),
    toggleUsers = () => {
      if (error) {
        return (
          <p
            style={{
              display: 'grid',
              justifyContent: 'center',
              color: 'red',
              fontSize: '2rem',
            }}
          >
            <strong>{error} ☹️</strong>
          </p>
        );
      } else if (users.length === 0 && error === '') {
        return (
          <p
            style={{
              display: 'grid',
              justifyContent: 'center',
              color: 'red',
              fontSize: '2rem',
            }}
          >
            <strong>All datas were deleted ☹️</strong>
          </p>
        );
      } else {
        return (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
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
                      onClick={() => handleDeleteUser(user.id)}
                      className="btn btn-outline-danger"
                    >
                      Delete ❌
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      }
    };

  useEffect(() => {
    axios
      .get<User[]>('https://jsonplaceholder.typicode.com/users')
      .then((res) => setUsers(res.data))
      .catch((err) => setError(err.message));
  }, []);

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

      {toggleUsers()}
      <hr style={{ margin: '2rem 1rem' }} />
    </>
  );
}

export default App;
