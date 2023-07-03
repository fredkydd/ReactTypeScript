import './App.css';
import ExpenseForm from './components/ExpenseForm';
import ExpenseFilter from './components/ExpenseFilter';
import ExpenseList from './components/ExpenseList';
import { useState } from 'react';

function App() {
  const [expenses, setExpenses] = useState([
      { id: 0, description: 'blah blah', amount: 9, category: 'Entertainment' },
      { id: 1, description: 'blah blah', amount: 11, category: 'Utilities' },
      { id: 2, description: 'blah blah', amount: 13, category: 'Groceries' },
    ]),
    [selectedCategory, setSelectedCategory] = useState<string>(),
    visibleExpense = selectedCategory
      ? expenses.filter((expense) => expense.category === selectedCategory)
      : expenses;

  return (
    <>
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
        // expenses={expenses}
        expenses={visibleExpense}
        onDelete={(id) =>
          setExpenses(expenses.filter((expense) => expense.id !== id))
        }
      />
    </>
  );
}

export default App;
