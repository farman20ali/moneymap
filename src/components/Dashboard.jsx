import React from 'react';
import { formatCurrency, calculateTotal, calculatePercentageChange, getMonthKey } from '../utils/helpers';
import './Dashboard.css';

function Dashboard({ transactions }) {
  const currentMonth = getMonthKey(new Date().toISOString());
  const lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);
  const lastMonthKey = getMonthKey(lastMonth.toISOString());

  const currentMonthTransactions = transactions.filter(t => getMonthKey(t.date) === currentMonth);
  const lastMonthTransactions = transactions.filter(t => getMonthKey(t.date) === lastMonthKey);

  const totalIncome = calculateTotal(transactions, 'income');
  const totalExpense = calculateTotal(transactions, 'expense');
  const balance = totalIncome - totalExpense;

  const currentMonthIncome = calculateTotal(currentMonthTransactions, 'income');
  const currentMonthExpense = calculateTotal(currentMonthTransactions, 'expense');
  const currentMonthBalance = currentMonthIncome - currentMonthExpense;

  const lastMonthIncome = calculateTotal(lastMonthTransactions, 'income');
  const lastMonthExpense = calculateTotal(lastMonthTransactions, 'expense');

  const incomeChange = calculatePercentageChange(currentMonthIncome, lastMonthIncome);
  const expenseChange = calculatePercentageChange(currentMonthExpense, lastMonthExpense);

  const recurringExpenses = transactions.filter(t => t.recurring && t.type === 'expense');
  const recurringIncome = transactions.filter(t => t.recurring && t.type === 'income');

  const stats = [
    {
      title: 'Total Balance',
      value: formatCurrency(balance),
      change: null,
      icon: '💰',
      className: balance >= 0 ? 'positive' : 'negative'
    },
    {
      title: 'This Month Income',
      value: formatCurrency(currentMonthIncome),
      change: incomeChange,
      icon: '📈',
      className: 'income'
    },
    {
      title: 'This Month Expense',
      value: formatCurrency(currentMonthExpense),
      change: expenseChange,
      icon: '📉',
      className: 'expense'
    },
    {
      title: 'This Month Net',
      value: formatCurrency(currentMonthBalance),
      change: null,
      icon: '📊',
      className: currentMonthBalance >= 0 ? 'positive' : 'negative'
    }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Personal Finance Dashboard</h1>
        <p className="dashboard-subtitle">Track your income, expenses, and savings</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className={`stat-card ${stat.className}`}>
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-content">
              <p className="stat-title">{stat.title}</p>
              <p className="stat-value">{stat.value}</p>
              {stat.change !== null && (
                <p className={`stat-change ${stat.change >= 0 ? 'positive' : 'negative'}`}>
                  {stat.change >= 0 ? '↑' : '↓'} {Math.abs(stat.change).toFixed(1)}% from last month
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {(recurringExpenses.length > 0 || recurringIncome.length > 0) && (
        <div className="recurring-section">
          <h3>🔄 Recurring Transactions</h3>
          <div className="recurring-grid">
            {recurringIncome.length > 0 && (
              <div className="recurring-card income">
                <h4>Recurring Income</h4>
                <p className="recurring-amount">
                  {formatCurrency(calculateTotal(recurringIncome, 'income'))}
                </p>
                <p className="recurring-count">{recurringIncome.length} transaction(s)</p>
              </div>
            )}
            {recurringExpenses.length > 0 && (
              <div className="recurring-card expense">
                <h4>Recurring Expenses</h4>
                <p className="recurring-amount">
                  {formatCurrency(calculateTotal(recurringExpenses, 'expense'))}
                </p>
                <p className="recurring-count">{recurringExpenses.length} transaction(s)</p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="insights-section">
        <h3>💡 Financial Insights</h3>
        <div className="insights-grid">
          <div className="insight-card">
            <div className="insight-icon">🎯</div>
            <div className="insight-content">
              <h4>Savings Rate</h4>
              <p className="insight-value">
                {totalIncome > 0 ? ((balance / totalIncome) * 100).toFixed(1) : 0}%
              </p>
              <p className="insight-description">
                {balance / totalIncome >= 0.2 
                  ? 'Great job! You\'re saving well.' 
                  : 'Try to save at least 20% of your income.'}
              </p>
            </div>
          </div>
          
          <div className="insight-card">
            <div className="insight-icon">📅</div>
            <div className="insight-content">
              <h4>Average Daily Spending</h4>
              <p className="insight-value">
                {formatCurrency(currentMonthExpense / new Date().getDate())}
              </p>
              <p className="insight-description">Based on this month's data</p>
            </div>
          </div>

          <div className="insight-card">
            <div className="insight-icon">🏆</div>
            <div className="insight-content">
              <h4>Total Transactions</h4>
              <p className="insight-value">{transactions.length}</p>
              <p className="insight-description">
                {currentMonthTransactions.length} this month
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
