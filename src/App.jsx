import React, { useState } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import Dashboard from './components/Dashboard';
import AddTransactionForm from './components/AddTransactionForm';
import Filters from './components/Filters';
import TransactionList from './components/TransactionList';
import PieChartView from './components/PieChartView';
import BarChartView from './components/BarChartView';
import { filterByMonth, filterByCategory, exportToCSV } from './utils/helpers';
import './App.css';

function App() {
  const [transactions, setTransactions] = useLocalStorage('transactions', []);
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);

  const handleAddTransaction = (transaction) => {
    setTransactions([transaction, ...transactions]);
    setShowForm(false);
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const handleEditTransaction = (id, updatedData) => {
    setTransactions(transactions.map(t => 
      t.id === id ? { ...t, ...updatedData } : t
    ));
  };

  const handleExport = () => {
    const dataToExport = filteredTransactions.map(t => ({
      Date: t.date,
      Type: t.type,
      Category: t.category,
      Amount: t.amount,
      Note: t.note || '',
      Recurring: t.recurring ? 'Yes' : 'No'
    }));
    
    const timestamp = new Date().toISOString().split('T')[0];
    exportToCSV(dataToExport, `finance-export-${timestamp}.csv`);
  };

  const handleDeleteAll = () => {
    // Create custom confirmation dialog
    const confirmed = window.confirm(
      '⚠️ DELETE ALL TRANSACTIONS?\n\n' +
      'This will permanently delete all ' + transactions.length + ' transaction(s).\n' +
      'This action CANNOT be undone!\n\n' +
      'Click OK to delete everything, or Cancel to go back.'
    );
    
    if (confirmed) {
      setTransactions([]);
      alert('✅ All transactions have been deleted.');
    }
  };

  const handleClearFilters = () => {
    setSelectedMonth('all');
    setSelectedCategory('all');
    setSelectedType('all');
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        if (Array.isArray(imported)) {
          setTransactions([...imported, ...transactions]);
          alert(`Successfully imported ${imported.length} transactions!`);
        }
      } catch (error) {
        alert('Error importing file. Please make sure it\'s a valid JSON file.');
      }
    };
    reader.readAsText(file);
    event.target.value = ''; // Reset input
  };

  // Apply filters
  let filteredTransactions = [...transactions];
  
  // Filter by type first
  if (selectedType !== 'all') {
    filteredTransactions = filteredTransactions.filter(t => t.type === selectedType);
  }
  
  // Then filter by month and category
  filteredTransactions = filterByMonth(filteredTransactions, selectedMonth);
  filteredTransactions = filterByCategory(filteredTransactions, selectedCategory);

  // Sort by date (newest first)
  filteredTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className={`app ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <Dashboard transactions={transactions} />

      <div className="toolbar">
        <div className="toolbar-left">
          <button 
            className="toolbar-btn primary"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? '✕ Close Form' : '+ Add Transaction'}
          </button>
          <button 
            className="toolbar-btn theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
        <div className="toolbar-actions">
          <button 
            className="toolbar-btn secondary"
            onClick={handleClearFilters}
            disabled={selectedMonth === 'all' && selectedCategory === 'all' && selectedType === 'all'}
          >
            🔄 Clear Filters
          </button>
          <button 
            className="toolbar-btn secondary"
            onClick={handleExport}
            disabled={transactions.length === 0}
          >
            📥 Export CSV
          </button>
          <label className="toolbar-btn secondary import-btn">
            📤 Import JSON
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              style={{ display: 'none' }}
            />
          </label>
          <button 
            className="toolbar-btn danger"
            onClick={handleDeleteAll}
            disabled={transactions.length === 0}
          >
            🗑️ Delete Everything
          </button>
        </div>
      </div>

      {showForm && (
        <div className="form-container">
          <AddTransactionForm onAdd={handleAddTransaction} />
        </div>
      )}

      <Filters
        transactions={transactions}
        selectedMonth={selectedMonth}
        selectedCategory={selectedCategory}
        selectedType={selectedType}
        onMonthChange={setSelectedMonth}
        onCategoryChange={setSelectedCategory}
        onTypeChange={(type) => {
          setSelectedType(type);
          setSelectedCategory('all'); // Reset category when type changes
        }}
      />

      {transactions.length > 0 && (
        <div className="charts-section">
          <div className="charts-grid">
            <BarChartView transactions={filteredTransactions} />
            <div className="pie-charts">
              <PieChartView 
                transactions={filteredTransactions}
                type={selectedType === 'all' ? 'expense' : selectedType}
              />
              {selectedType === 'all' && (
                <PieChartView transactions={filteredTransactions} type="income" />
              )}
            </div>
          </div>
        </div>
      )}

      <TransactionList
        transactions={filteredTransactions}
        onDelete={handleDeleteTransaction}
        onEdit={handleEditTransaction}
      />

      <footer className="app-footer">
        <p>
          Personal Finance Dashboard © 2026 | 
          Built with React + Recharts | 
          Data stored locally in your browser
        </p>
        <p className="footer-note">
          💡 Tip: Your data is stored in localStorage. Export regularly to backup your data.
        </p>
      </footer>
    </div>
  );
}

export default App;
