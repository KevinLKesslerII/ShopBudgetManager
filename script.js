// Data storage
let sales = JSON.parse(localStorage.getItem('sales')) || [];
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let fixedExpenses = JSON.parse(localStorage.getItem('fixedExpenses')) || [];

// Function to add a sale
function addSale() {
    const saleAmount = document.getElementById('saleAmount').value;
    const saleDate = document.getElementById('saleDate').value;

    if (saleAmount && saleDate) {
        const newSale = {
            amount: parseFloat(saleAmount),
            date: saleDate
        };
        sales.push(newSale);
        localStorage.setItem('sales', JSON.stringify(sales));
        updateDashboard();
    }
}

// Function to add an expense
function addExpense() {
    const expenseName = document.getElementById('expenseName').value;
    const expenseAmount = document.getElementById('expenseAmount').value;
    const expenseDate = document.getElementById('expenseDate').value;

    if (expenseName && expenseAmount && expenseDate) {
        const newExpense = {
            name: expenseName,
            amount: parseFloat(expenseAmount),
            date: expenseDate,
            paid: false // Default to not paid
        };
        expenses.push(newExpense);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        updateDashboard();
    }
}


// Function to add a fixed expense
function addFixedExpense() {
    const fixedExpenseName = document.getElementById('fixedExpenseName').value;
    const fixedExpenseAmount = document.getElementById('fixedExpenseAmount').value;

    if (fixedExpenseName && fixedExpenseAmount) {
        const newFixedExpense = {
            name: fixedExpenseName,
            amount: parseFloat(fixedExpenseAmount)
        };
        fixedExpenses.push(newFixedExpense);
        localStorage.setItem('fixedExpenses', JSON.stringify(fixedExpenses));
        updateDashboard();
    }
}

// Update dashboard totals
function updateDashboard() {
    const totalSales = sales.reduce((sum, record) => sum + record.amount, 0);
    const totalExpenses = expenses.reduce((sum, record) => sum + record.amount, 0) +
        fixedExpenses.reduce((sum, record) => sum + record.amount, 0);
    const netIncome = totalSales - totalExpenses;

    document.getElementById('totalSales').textContent = `$${totalSales.toFixed(2)}`;
    document.getElementById('totalExpenses').textContent = `$${totalExpenses.toFixed(2)}`;
    const netIncomeElement = document.getElementById('netIncome');
    netIncomeElement.textContent = `$${netIncome.toFixed(2)}`;
    if (netIncome < 0) {
        netIncomeElement.style.color = 'red';
    } else {
        netIncomeElement.style.color = 'black';
    }

    updateMonthlyAndYTD();
}

//Monthly adn YTD totals
function updateMonthlyAndYTD() {
    const currentYear = new Date().getFullYear();
    const monthlySales = sales.filter(sale => {
        const saleYear = new Date(sale.date).getFullYear();
        const saleMonth = new Date(sale.date).getMonth();
        const currentMonth = new Date().getMonth();
        return saleYear === currentYear && saleMonth === currentMonth;
    }).reduce((sum, record) => sum + record.amount, 0);

    const salesYTD = sales.filter(sale => {
        const saleYear = new Date(sale.date).getFullYear();
        return saleYear === currentYear;
    }).reduce((sum, record) => sum + record.amount, 0);

    document.getElementById('monthlySales').textContent = `$${monthlySales.toFixed(2)}`;
    document.getElementById('salesYTD').textContent = `$${salesYTD.toFixed(2)}`;
}

// Clear all data
function clearAllData() {
    localStorage.removeItem('sales');
    localStorage.removeItem('expenses');
    localStorage.removeItem('fixedExpenses');
    sales = [];
    expenses = [];
    fixedExpenses = [];
    updateDashboard();
}

// Update expense paid status
function updateExpensePaidStatus(index, isPaid) {
    if (expenses[index]) {
        expenses[index].paid = isPaid; // Update the 'paid' status
        localStorage.setItem('expenses', JSON.stringify(expenses));
        updateDashboard();
    }
}

// Initialization
document.addEventListener('DOMContentLoaded', updateDashboard);
