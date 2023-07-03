// import styles from './ExpenseFilter.module.css';
import categories from '../categories';

interface Props {
  selectedFilterCategory: (category: string) => void;
}

const ExpenseFilter = ({ selectedFilterCategory }: Props) => {
  return (
    <>
      <select
        className="form-select text-success"
        onChange={(event) => selectedFilterCategory(event.target.value)}
      >
        <option value="" className="text-secondary">
          Select your category 🙂
        </option>
        {categories.map((category) => (
          <option className="text-dark" value={category} key={category}>
            {category}
          </option>
        ))}
      </select>
    </>
  );
};

export default ExpenseFilter;
