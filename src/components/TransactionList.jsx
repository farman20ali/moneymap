import React, { useState } from 'react';
import { getCategoryDetails } from '../utils/categories';
import { formatCurrency, formatDate } from '../utils/helpers';
import './TransactionList.css';

function TransactionList({ transactions, onDelete, onEdit }) {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const startEdit = (transaction) => {
    setEditingId(transaction.id);
    setEditForm(transaction);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = () => {
    onEdit(editingId, editForm);
    setEditingId(null);
    setEditForm({});
  };

  const handleEditChange = (field, value) => {
    setEditForm({
      ...editForm,
      [field]: field === 'amount' ? parseFloat(value) : value
    });
  };

  if (transactions.length === 0) {
    return (
      <div className="transaction-list empty">
        <div className="empty-state">
          <div className="empty-icon">📊</div>
          <h3>No transactions yet</h3>
          <p>Start by adding your first transaction above</p>
        </div>
      </div>
    );
  }

  return (
    <div className="transaction-list">
      <div className="list-header">
        <h2>Transaction History</h2>
        <span className="transaction-count">{transactions.length} transactions</span>
      </div>
      
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Category</th>
              <th>Note</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => {
              const category = getCategoryDetails(transaction.category, transaction.type);
              const isEditing = editingId === transaction.id;

              return (
                <tr key={transaction.id} className={transaction.type}>
                  <td>
                    {isEditing ? (
                      <input
                        type="date"
                        value={editForm.date}
                        onChange={(e) => handleEditChange('date', e.target.value)}
                        className="edit-input"
                      />
                    ) : (
                      formatDate(transaction.date)
                    )}
                  </td>
                  <td>
                    <span className={`type-badge ${transaction.type}`}>
                      {transaction.type === 'income' ? '💰' : '💸'} 
                      {transaction.type}
                      {transaction.recurring && ' 🔄'}
                    </span>
                  </td>
                  <td>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm.category}
                        onChange={(e) => handleEditChange('category', e.target.value)}
                        className="edit-input"
                      />
                    ) : (
                      <span className="category-label">{category.label}</span>
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm.note || ''}
                        onChange={(e) => handleEditChange('note', e.target.value)}
                        className="edit-input"
                        placeholder="Note..."
                      />
                    ) : (
                      <span className="note">{transaction.note || '-'}</span>
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <input
                        type="number"
                        value={editForm.amount}
                        onChange={(e) => handleEditChange('amount', e.target.value)}
                        className="edit-input amount-input"
                        step="0.01"
                      />
                    ) : (
                      <span className={`amount ${transaction.type}`}>
                        {transaction.type === 'income' ? '+' : '-'}
                        {formatCurrency(transaction.amount)}
                      </span>
                    )}
                  </td>
                  <td>
                    <div className="actions">
                      {isEditing ? (
                        <>
                          <button
                            onClick={saveEdit}
                            className="action-btn save"
                            title="Save"
                          >
                            ✓
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="action-btn cancel"
                            title="Cancel"
                          >
                            ✕
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => startEdit(transaction)}
                            className="action-btn edit"
                            title="Edit"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm('Are you sure you want to delete this transaction?')) {
                                onDelete(transaction.id);
                              }
                            }}
                            className="action-btn delete"
                            title="Delete"
                          >
                            🗑️
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionList;
