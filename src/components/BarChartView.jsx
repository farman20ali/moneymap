import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { groupByMonth, formatCurrency, getMonthYear } from '../utils/helpers';
import './BarChartView.css';

function BarChartView({ transactions }) {
  const monthlyData = groupByMonth(transactions);

  const chartData = monthlyData.map(item => ({
    month: getMonthYear(`${item.month}-01`).split(' ').map((word, idx) => 
      idx === 0 ? word.slice(0, 3) : word.slice(2)
    ).join(' '),
    fullMonth: getMonthYear(`${item.month}-01`),
    income: item.income,
    expense: item.expense,
    net: item.income - item.expense
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="custom-tooltip bar-tooltip">
          <p className="label">{data.fullMonth}</p>
          <p className="income-line">
            <span className="tooltip-label">Income:</span>
            <span className="tooltip-value income">{formatCurrency(data.income)}</span>
          </p>
          <p className="expense-line">
            <span className="tooltip-label">Expense:</span>
            <span className="tooltip-value expense">{formatCurrency(data.expense)}</span>
          </p>
          <p className="net-line">
            <span className="tooltip-label">Net:</span>
            <span className={`tooltip-value ${data.net >= 0 ? 'income' : 'expense'}`}>
              {formatCurrency(data.net)}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  if (chartData.length === 0) {
    return (
      <div className="chart-container">
        <h3>Monthly Overview</h3>
        <div className="no-data">
          <p>No transaction data available</p>
        </div>
      </div>
    );
  }

  const totalIncome = chartData.reduce((sum, item) => sum + item.income, 0);
  const totalExpense = chartData.reduce((sum, item) => sum + item.expense, 0);
  const netTotal = totalIncome - totalExpense;

  return (
    <div className="chart-container">
      <h3>Monthly Income vs Expenses</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="month" 
            tick={{ fill: '#7f8c8d', fontSize: 12 }}
          />
          <YAxis 
            tick={{ fill: '#7f8c8d', fontSize: 12 }}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="circle"
          />
          <Bar 
            dataKey="income" 
            fill="#27ae60" 
            name="Income"
            radius={[8, 8, 0, 0]}
          />
          <Bar 
            dataKey="expense" 
            fill="#e74c3c" 
            name="Expense"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
      <div className="chart-summary">
        <div className="summary-item">
          <span className="summary-label">Total Income</span>
          <span className="summary-value income">{formatCurrency(totalIncome)}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Total Expense</span>
          <span className="summary-value expense">{formatCurrency(totalExpense)}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Net Balance</span>
          <span className={`summary-value ${netTotal >= 0 ? 'income' : 'expense'}`}>
            {formatCurrency(netTotal)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default BarChartView;
