import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { groupByCategory, formatCurrency } from '../utils/helpers';
import { getCategoryColors } from '../utils/categories';
import './PieChartView.css';

function PieChartView({ transactions, type = 'expense' }) {
  const filteredTransactions = transactions.filter(t => t.type === type);
  const categoryData = groupByCategory(filteredTransactions);
  const colors = getCategoryColors(type);

  const chartData = categoryData.map(item => ({
    name: item.category,
    value: item.total,
    count: item.count
  }));

  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      const percentage = ((data.value / total) * 100).toFixed(1);
      return (
        <div className="custom-tooltip">
          <p className="label">{data.name}</p>
          <p className="value">{formatCurrency(data.value)}</p>
          <p className="percentage">{percentage}% ({data.payload.count} transactions)</p>
        </div>
      );
    }
    return null;
  };

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    if (percent < 0.05) return null; // Don't show label if less than 5%
    
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize="12"
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  if (chartData.length === 0) {
    return (
      <div className="chart-container">
        <h3>Category Distribution</h3>
        <div className="no-data">
          <p>No {type} data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chart-container">
      <h3>{type === 'income' ? 'Income' : 'Expense'} Distribution by Category</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[entry.name] || '#999'} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            formatter={(value) => value.charAt(0).toUpperCase() + value.slice(1)}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="chart-summary">
        <div className="summary-item">
          <span className="summary-label">Total {type}:</span>
          <span className={`summary-value ${type}`}>{formatCurrency(total)}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Categories:</span>
          <span className="summary-value">{chartData.length}</span>
        </div>
      </div>
    </div>
  );
}

export default PieChartView;
