# 📊 Personal Finance Dashboard

A modern, feature-rich personal finance tracker built with React and Recharts. Track your income, expenses, visualize spending patterns, and manage your budget—all without needing a backend. Data is stored locally in your browser for privacy and convenience.

![Finance Dashboard](https://img.shields.io/badge/React-18.2.0-blue) ![License](https://img.shields.io/badge/license-MIT-green)

---

## ✨ Features

### 🎯 Core Functionality
- **Income & Expense Tracking**: Add, edit, and delete transactions with ease
- **Rich Transaction Details**: Amount, category, date, notes, and recurring flag
- **Smart Filtering**: Filter by month, category, or transaction type
- **Persistent Storage**: All data stored in browser localStorage (no backend needed)

### 📈 Advanced Features
- **Interactive Charts**: 
  - Pie charts showing category distribution
  - Bar charts for monthly income vs expenses comparison
  - Responsive and interactive visualizations
  
- **Financial Insights**:
  - Real-time savings rate calculation
  - Month-over-month comparison
  - Average daily spending
  - Recurring transaction tracking
  
- **Data Management**:
  - Export data to CSV format
  - Import/Export JSON backup
  - Clear all data option
  
- **Professional UI**:
  - Modern gradient design
  - Responsive mobile-first layout
  - Smooth animations and transitions
  - Color-coded transaction types

### 🔮 Future-Ready Architecture
The app is designed with a **middleware pattern** that makes it easy to swap localStorage with API endpoints when you need a backend. All data operations are centralized in utility functions, making the transition seamless.

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone or download the repository**
```bash
cd finance-manager
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm start
```

The app will open at `http://localhost:3000`

---

## 📦 Project Structure

```
src/
├── components/
│   ├── AddTransactionForm.jsx    # Form to add income/expense
│   ├── AddTransactionForm.css
│   ├── TransactionList.jsx       # Display & manage transactions
│   ├── TransactionList.css
│   ├── Filters.jsx                # Filter controls
│   ├── Filters.css
│   ├── Dashboard.jsx              # Stats dashboard
│   ├── Dashboard.css
│   ├── PieChartView.jsx          # Category distribution chart
│   ├── PieChartView.css
│   ├── BarChartView.jsx          # Monthly comparison chart
│   └── BarChartView.css
├── hooks/
│   └── useLocalStorage.js         # Custom hook for localStorage
├── utils/
│   ├── categories.js              # Category definitions
│   └── helpers.js                 # Utility functions
├── App.jsx                        # Main app component
├── App.css
├── index.js
└── index.css
```

---

## 🎨 Categories

### Expense Categories
- 🍔 Food & Dining
- 🚗 Transportation
- 🛍️ Shopping
- 🎬 Entertainment
- 💡 Bills & Utilities
- ⚕️ Healthcare
- 📚 Education
- ✈️ Travel
- 📈 Investment
- 📦 Other

### Income Categories
- 💼 Salary
- 💻 Freelance
- 📊 Investment Returns
- 🏢 Business
- 💰 Other Income

---

## 🌐 Deployment to GitHub Pages

### Step 1: Update package.json

Edit the `homepage` field in `package.json`:
```json
"homepage": "https://your-github-username.github.io/your-repo-name"
```

### Step 2: Build and Deploy

Run the following commands:
```bash
# Build the production version
npm run build

# Deploy to GitHub Pages
npm run deploy
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select the `gh-pages` branch
4. Click **Save**

Your app will be live at `https://your-github-username.github.io/your-repo-name/`

---

## 💾 Data Storage

### LocalStorage
All transaction data is stored in your browser's localStorage. This means:
- ✅ No backend or database needed
- ✅ Complete privacy - data never leaves your device
- ✅ Works offline
- ⚠️ Data is browser-specific (not synced across devices)
- ⚠️ Clearing browser data will delete transactions

### Backup Your Data
Use the **Export JSON** feature regularly to backup your data. You can later import it using the **Import JSON** button.

---

## 🔄 Future Backend Integration

The app is architected to easily integrate a backend. Here's how:

### Current LocalStorage Hook:
```javascript
// hooks/useLocalStorage.js
function useLocalStorage(key, defaultValue) {
  // localStorage logic
}
```

### Future API Hook:
```javascript
// hooks/useApiStorage.js
function useApiStorage(endpoint, defaultValue) {
  // API fetch/post logic
  // Same interface as useLocalStorage
}
```

Simply swap the hook in `App.jsx`:
```javascript
// From:
import useLocalStorage from './hooks/useLocalStorage';

// To:
import useApiStorage from './hooks/useApiStorage';
```

All utility functions in `utils/helpers.js` work with any data source.

---

## 🛠️ Technologies Used

- **React 18**: Modern React with hooks
- **Recharts**: Powerful charting library
- **LocalStorage API**: Client-side data persistence
- **CSS3**: Modern styling with gradients and animations
- **gh-pages**: Automated GitHub Pages deployment

---

## 📱 Responsive Design

The dashboard is fully responsive and works great on:
- 💻 Desktop (1400px+)
- 📱 Tablets (768px - 1024px)
- 📱 Mobile phones (< 768px)

---

## 🎯 Recommended Features Included

Based on market research of popular finance apps:

1. ✅ **Budget Tracking** - View total spending and income
2. ✅ **Visual Analytics** - Interactive charts and graphs
3. ✅ **Category Management** - Predefined categories with icons
4. ✅ **Recurring Transactions** - Track subscriptions and regular income
5. ✅ **Data Export** - CSV export for Excel/Google Sheets
6. ✅ **Month-over-Month Comparison** - Track financial trends
7. ✅ **Savings Rate Calculator** - Automatic savings percentage
8. ✅ **Transaction Search/Filter** - Find transactions quickly
9. ✅ **Edit/Delete Transactions** - Full CRUD operations
10. ✅ **Financial Insights** - Smart recommendations

---

## 🤝 Contributing

This is a solo project, but feel free to fork and customize it for your needs!

---

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

---

## 💡 Tips

1. **Regular Backups**: Export your data regularly using the Export JSON feature
2. **Browser Compatibility**: Works best in modern browsers (Chrome, Firefox, Safari, Edge)
3. **Privacy**: All data stays in your browser - no tracking or data collection
4. **Performance**: Can handle thousands of transactions efficiently

---

## 🐛 Troubleshooting

### Data Not Persisting?
- Check if localStorage is enabled in your browser
- Some browsers in private/incognito mode may not persist data

### Charts Not Showing?
- Ensure you have transactions added
- Try refreshing the page

### Deployment Issues?
- Make sure `homepage` in package.json matches your GitHub repo
- Check that GitHub Pages is enabled in repository settings

---

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the code comments for implementation details
3. Create an issue in the repository

---

**Built with ❤️ using React and Recharts**

*Start tracking your finances today! 💰📊*
