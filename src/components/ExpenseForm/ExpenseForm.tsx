// *npm i react-hook-form
// *npm i @hookform/resolvers
// *npm i zod

// import styles from './ExpenseForm.module.css';
import categories from '../categories';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  description: z
    .string({ invalid_type_error: 'Product name must be added' })
    .min(3, { message: 'Add a product name at least 3 letters' })
    .max(50, { message: 'Maxmimum number of the name must be 50 letters' }),
  amount: z
    .number({ invalid_type_error: 'Only numbers allowed' })
    .min(0.01, { message: 'It must be at least 0.01$' })
    .max(100_000, { message: 'Maximum amount can be 100.000$' }),
  category: z.enum(categories, {
    errorMap: () => ({
      message: 'Category must be chosen',
    }),
  }),
});

type ExpenseFormData = z.infer<typeof schema>;

interface Props {
  submit: (data: ExpenseFormData) => void;
}

const ExpenseForm = ({ submit }: Props) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<ExpenseFormData>({ resolver: zodResolver(schema) });

  return (
    <>
      <h3 className="text-info d-grid justify-content-center mt-3">
        🧮 Expense Form 🧮
      </h3>
      <form
        className="d-grid justify-content-center"
        onSubmit={handleSubmit((data) => {
          submit(data);
          reset();
        })}
      >
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            {...register('description')}
            placeholder="Peach"
            type="text"
            id="description"
            className="form-control text-dark"
          />
          {errors.description && (
            <p className="text-danger">{errors.description.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">
            Amount
          </label>
          <input
            {...register('amount', { valueAsNumber: true })}
            placeholder="8"
            id="amount"
            type="number"
            className="form-control text-dark"
          />
        </div>
        {errors.amount && (
          <p className="text-danger">{errors.amount.message}</p>
        )}

        <select
          {...register('category')}
          className="form-select mb-3 text-warning"
        >
          <option value="">Select your category 🙂</option>
          {categories.map((category) => (
            <option className="text-dark" key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-danger">{errors.category.message}</p>
        )}

        <button type="submit" className="btn btn-outline-success">
          Add 🏀
        </button>
      </form>
    </>
  );
};

export default ExpenseForm;
