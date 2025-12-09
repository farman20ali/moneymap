// Expense categories with icons
export const EXPENSE_CATEGORIES = [
  { value: 'food', label: '🍔 Food & Dining', color: '#FF6B6B' },
  { value: 'transportation', label: '🚗 Transportation', color: '#4ECDC4' },
  { value: 'shopping', label: '🛍️ Shopping', color: '#95E1D3' },
  { value: 'entertainment', label: '🎬 Entertainment', color: '#F38181' },
  { value: 'bills', label: '💡 Bills & Utilities', color: '#AA96DA' },
  { value: 'healthcare', label: '⚕️ Healthcare', color: '#FCBAD3' },
  { value: 'education', label: '📚 Education', color: '#F9ED69' },
  { value: 'travel', label: '✈️ Travel', color: '#08D9D6' },
  { value: 'investment', label: '📈 Investment', color: '#FF2E63' },
  { value: 'other', label: '📦 Other', color: '#A8DADC' }
];

// Income categories
export const INCOME_CATEGORIES = [
  { value: 'salary', label: '💼 Salary', color: '#52B788' },
  { value: 'freelance', label: '💻 Freelance', color: '#74C69D' },
  { value: 'investment', label: '📊 Investment Returns', color: '#95D5B2' },
  { value: 'business', label: '🏢 Business', color: '#B7E4C7' },
  { value: 'other', label: '💰 Other Income', color: '#D8F3DC' }
];

// Get category details by value
export const getCategoryDetails = (categoryValue, type = 'expense') => {
  const categories = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
  return categories.find(cat => cat.value === categoryValue) || 
         (type === 'income' ? INCOME_CATEGORIES[INCOME_CATEGORIES.length - 1] : EXPENSE_CATEGORIES[EXPENSE_CATEGORIES.length - 1]);
};

// Get all category colors for charts
export const getCategoryColors = (type = 'expense') => {
  const categories = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
  return categories.reduce((acc, cat) => {
    acc[cat.value] = cat.color;
    return acc;
  }, {});
};
