(() => {
    const expenseForm = document.getElementById('expense-form');
    const descInput = document.getElementById('desc-input');
    const categorySelect = document.getElementById('category-select');
    const amountInput = document.getElementById('amount-input');
    const expensesTableBody = document.querySelector('#expenses-table tbody');
    const totalAmountEl = document.getElementById('total-amount');

    let expenses = [];

    function formatAmount(num) {
      return num.toFixed(2);
    }

    function calculateTotal() {
      return expenses.reduce((sum, item) => sum + item.amount, 0);
    }

    function updateTotal() {
      totalAmountEl.textContent = formatAmount(calculateTotal());
    }

    function createExpenseRow(expense, index) {
      const tr = document.createElement('tr');

      const tdDesc = document.createElement('td');
      tdDesc.textContent = expense.description;
      tr.appendChild(tdDesc);

      const tdCategory = document.createElement('td');
      tdCategory.textContent = expense.category;
      tr.appendChild(tdCategory);

      const tdAmount = document.createElement('td');
      tdAmount.textContent = formatAmount(expense.amount);
      tdAmount.className = 'amount';
      tdAmount.style.textAlign = 'right';
      tr.appendChild(tdAmount);

      const tdRemove = document.createElement('td');
      const removeBtn = document.createElement('button');
      removeBtn.setAttribute('aria-label', `Remove expense ${expense.description} for $${formatAmount(expense.amount)}`);
      removeBtn.className = 'remove-btn';
      removeBtn.innerHTML = `
        <svg stroke="currentColor" fill="none" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>`;
      removeBtn.addEventListener('click', () => {
        expenses.splice(index, 1);
        renderExpenses();
      });
      tdRemove.appendChild(removeBtn);
      tr.appendChild(tdRemove);

      return tr;
    }

    function renderExpenses() {
      expensesTableBody.innerHTML = '';
      expenses.forEach((exp, i) => {
        expensesTableBody.appendChild(createExpenseRow(exp, i));
      });
      updateTotal();
    }

    function resetForm() {
      expenseForm.reset();
      descInput.focus();
    }

    expenseForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Simple validation
      const description = descInput.value.trim();
      const category = categorySelect.value;
      const amount = parseFloat(amountInput.value);

      if (!description) {
        alert('Please enter a description.');
        descInput.focus();
        return;
      }
      if (!category) {
        alert('Please select a category.');
        categorySelect.focus();
        return;
      }
      if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount greater than zero.');
        amountInput.focus();
        return;
      }

      expenses.push({ description, category, amount });
      renderExpenses();
      resetForm();
    });

    // Initial render (empty)
    renderExpenses();
  })();