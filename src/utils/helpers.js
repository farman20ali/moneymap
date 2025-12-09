/**
 * Format currency with symbol
 * @param {number} amount 
 * @returns {string}
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

/**
 * Format date to readable string
 * @param {string} dateString 
 * @returns {string}
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

/**
 * Get month name from date string
 * @param {string} dateString 
 * @returns {string}
 */
export const getMonthYear = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long'
  });
};

/**
 * Get month/year key for grouping
 * @param {string} dateString 
 * @returns {string}
 */
export const getMonthKey = (dateString) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
};

/**
 * Export data to CSV
 * @param {Array} data 
 * @param {string} filename 
 */
export const exportToCSV = (data, filename = 'export.csv') => {
  if (!data || data.length === 0) return;

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Escape commas and quotes in values
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    )
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Calculate percentage change
 * @param {number} current 
 * @param {number} previous 
 * @returns {number}
 */
export const calculatePercentageChange = (current, previous) => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
};

/**
 * Get unique months from transactions
 * @param {Array} transactions 
 * @returns {Array}
 */
export const getUniqueMonths = (transactions) => {
  const months = transactions.map(t => getMonthKey(t.date));
  return [...new Set(months)].sort().reverse();
};

/**
 * Filter transactions by month
 * @param {Array} transactions 
 * @param {string} monthKey 
 * @returns {Array}
 */
export const filterByMonth = (transactions, monthKey) => {
  if (!monthKey || monthKey === 'all') return transactions;
  return transactions.filter(t => getMonthKey(t.date) === monthKey);
};

/**
 * Filter transactions by category
 * @param {Array} transactions 
 * @param {string} category 
 * @returns {Array}
 */
export const filterByCategory = (transactions, category) => {
  if (!category || category === 'all') return transactions;
  return transactions.filter(t => t.category === category);
};

/**
 * Calculate total by type
 * @param {Array} transactions 
 * @param {string} type 
 * @returns {number}
 */
export const calculateTotal = (transactions, type = 'expense') => {
  return transactions
    .filter(t => t.type === type)
    .reduce((sum, t) => sum + t.amount, 0);
};

/**
 * Group transactions by category
 * @param {Array} transactions 
 * @returns {Array}
 */
export const groupByCategory = (transactions) => {
  const grouped = transactions.reduce((acc, transaction) => {
    const category = transaction.category;
    if (!acc[category]) {
      acc[category] = {
        category,
        total: 0,
        count: 0
      };
    }
    acc[category].total += transaction.amount;
    acc[category].count += 1;
    return acc;
  }, {});

  return Object.values(grouped);
};

/**
 * Group transactions by month
 * @param {Array} transactions 
 * @returns {Array}
 */
export const groupByMonth = (transactions) => {
  const grouped = transactions.reduce((acc, transaction) => {
    const monthKey = getMonthKey(transaction.date);
    if (!acc[monthKey]) {
      acc[monthKey] = {
        month: monthKey,
        income: 0,
        expense: 0
      };
    }
    if (transaction.type === 'income') {
      acc[monthKey].income += transaction.amount;
    } else {
      acc[monthKey].expense += transaction.amount;
    }
    return acc;
  }, {});

  return Object.values(grouped).sort((a, b) => a.month.localeCompare(b.month));
};
