let expenses = [];

let noExpenseRow = document.querySelector('.table .no-expense');
let tableBody = document.querySelector('.table tbody');

let notification = document.querySelector('.alert');

notification.style.display = 'none';

function displayExpenses() {

    if (expenses.length < 1) {
        let tr = document.createElement('tr');
        let td = document.createElement('td');
        td.setAttribute('colspan', '3');
        tr.append(td);
        td.textContent = 'No Expenses added yet!';
        tableBody.append(tr);
    }

  expenses.some((e) => {
    let tr = document.createElement('tr');
    let tdName = document.createElement('td');
    let tdDate = document.createElement('td');
    let tdAmount = document.createElement('td');
    let tdDel = document.createElement('td');

    let delButton = document.createElement('button');
    delButton.classList.add('btn', 'del-btn');
    let span = document.createElement('span');
    span.innerHTML = "<i class='fa-regular fa-circle-xmark text-danger'></i>";

    delButton.append(span);
    tdDel.append(delButton);

    tdName.textContent = e.name;
    tdDate.textContent = e.date;
    tdAmount.textContent = e.amount;
    tr.append(tdName);
    tr.append(tdDate);
    tr.append(tdAmount);
    tr.append(tdDel);
    tableBody.append(tr);

    
  });

  noExpenseRow.classList.add('d-none');
  runDelete();
}

// add expense
let addExpense = document.querySelector('.button-add-expense');
let expenseName = document.querySelector('#expenseName');
let expenseDate = document.querySelector('#date');
let expenseAmount = document.querySelector('#amount');

let form = document.querySelector('form');

// reset form
form.addEventListener('submit', (e) => {
  e.preventDefault();
});

// checks amount to only accepts number

let numberRegex = /^[0-9]+$/;

expenseAmount.addEventListener('input', () => {
  if (!expenseAmount.value.match(numberRegex)) {
    expenseAmount.value = '';
  }
});

addExpense.addEventListener('click', () => {
  if (!expenseName.value || !expenseDate.value || !expenseAmount.value) {
    return;
  }

  let checkExpense = expenses.some((e) => {
    if (
      e.name === expenseName.value &&
      e.date === expenseDate.value &&
      e.amount === expenseAmount.value ) 
        {
            return true;
        }
  });

  if (checkExpense) {
    notification.style.display = 'block';
    return;
  }

  let newExpense = {
    name: expenseName.value,
    date: expenseDate.value,
    amount: expenseAmount.value,
  };
  expenses.push(newExpense);
  notification.style.display = 'none';
  expenseName.value = '';
  expenseDate.value = '';
  expenseAmount.value = '';
  tableBody.replaceChildren();
  displayExpenses();
});

// Delete

function runDelete() {
    let deleteExpenses = document.querySelectorAll('.del-btn');
    
    for (let i = 0; i < deleteExpenses.length; i++) {
        deleteExpenses[i].addEventListener('click', () => {
            expenses.splice(i, 1);
            tableBody.replaceChildren();
            displayExpenses();
        });
    }
}
