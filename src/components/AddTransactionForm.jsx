import React, { useState } from 'react';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../utils/categories';
import './AddTransactionForm.css';

function AddTransactionForm({ onAdd }) {
  const [formData, setFormData] = useState({
    type: 'expense',
    amount: '',
    category: EXPENSE_CATEGORIES[0].value,
    date: new Date().toISOString().split('T')[0],
    note: '',
    recurring: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // When type changes, update category to first of new type
    if (name === 'type') {
      setFormData({
        ...formData,
        type: value,
        category: value === 'income' ? INCOME_CATEGORIES[0].value : EXPENSE_CATEGORIES[0].value
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    const transaction = {
      id: Date.now(),
      type: formData.type,
      amount: parseFloat(formData.amount),
      category: formData.category,
      date: formData.date,
      note: formData.note,
      recurring: formData.recurring,
      createdAt: new Date().toISOString()
    };

    onAdd(transaction);

    // Reset form
    setFormData({
      type: 'expense',
      amount: '',
      category: EXPENSE_CATEGORIES[0].value,
      date: new Date().toISOString().split('T')[0],
      note: '',
      recurring: false
    });
  };

  const categories = formData.type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  return (
    <div className="add-transaction-form">
      <h2>Add Transaction</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="type">Type</label>
          <div className="type-toggle">
            <button
              type="button"
              className={formData.type === 'expense' ? 'active expense' : 'expense'}
              onClick={() => handleChange({ target: { name: 'type', value: 'expense' } })}
            >
              💸 Expense
            </button>
            <button
              type="button"
              className={formData.type === 'income' ? 'active income' : 'income'}
              onClick={() => handleChange({ target: { name: 'type', value: 'income' } })}
            >
              💰 Income
            </button>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount ($)</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
            min="0"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="note">Note (Optional)</label>
          <textarea
            id="note"
            name="note"
            value={formData.note}
            onChange={handleChange}
            placeholder="Add a note..."
            rows="3"
          />
        </div>

        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              name="recurring"
              checked={formData.recurring}
              onChange={handleChange}
            />
            <span>🔄 Recurring transaction</span>
          </label>
        </div>

        <button type="submit" className="submit-btn">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default AddTransactionForm;
