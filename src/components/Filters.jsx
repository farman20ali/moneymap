import React from 'react';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../utils/categories';
import { getUniqueMonths, getMonthYear } from '../utils/helpers';
import './Filters.css';

function Filters({ 
  transactions, 
  selectedMonth, 
  selectedCategory, 
  selectedType,
  onMonthChange, 
  onCategoryChange,
  onTypeChange 
}) {
  const uniqueMonths = getUniqueMonths(transactions);
  const categories = selectedType === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  return (
    <div className="filters">
      <div className="filter-group">
        <label htmlFor="type-filter">Type</label>
        <select
          id="type-filter"
          value={selectedType}
          onChange={(e) => onTypeChange(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Types</option>
          <option value="expense">Expenses Only</option>
          <option value="income">Income Only</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="month-filter">Month</label>
        <select
          id="month-filter"
          value={selectedMonth}
          onChange={(e) => onMonthChange(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Months</option>
          {uniqueMonths.map((month) => (
            <option key={month} value={month}>
              {getMonthYear(`${month}-01`)}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="category-filter">Category</label>
        <select
          id="category-filter"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="filter-select"
          disabled={selectedType === 'all'}
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Filters;
