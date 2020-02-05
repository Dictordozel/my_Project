'use strict';



let btnStartCalculate = document.getElementById('start');
console.log(btnStartCalculate);

//////   Месячный доход  //////

let budgetMonthInput = document.querySelector('.salary-amount');
console.log(budgetMonthInput);

//////   Дополнительный доход  //////

let incomeTitle = document.querySelector('.income-title');
console.log(incomeTitle);

let incomeAmount = document.querySelector('.income-amount');
console.log(incomeAmount);

//////   Возможный доход  //////

let additionalIncomeItem = document.querySelectorAll('.additional_income-item');
console.log(additionalIncomeItem);

//////   Обязательные расходы  //////

let expensesTitle = document.querySelector('.expenses-title');
console.log(expensesTitle);

let expensesAmount = document.querySelector('.expenses-amount');
console.log(expensesAmount);

//////   Возможные расходы  ///////

let additionalExpensesItem = document.querySelector('.additional_expenses-item');
console.log(expensesAmount);

//////   Цель  ////////

let targetAmount = document.querySelector('.target-amount');
console.log(targetAmount);

//////   Депозит  ////////

let checkBoxDeposit = document.querySelector('#deposit-check');
console.log(checkBoxDeposit);

//////   Период  ///////

let periodSelect = document.querySelector('.period-select');
console.log(periodSelect);

///////  Кнопки +  //////////////////////////////////////////////////////////////////

let btnIncomeAddPlus = document.getElementsByTagName('button')[0];
console.log(btnIncomeAddPlus);

let btnExpensesAddPlus = document.getElementsByTagName('button')[1];
console.log(btnExpensesAddPlus);

///////////////////////////////////////////////////////////////////////////////////////

let budgetMonth = document.getElementsByClassName('budget_month-value')[0];
console.log(budgetMonth);

let budgetDay = document.getElementsByClassName('budget_day-value')[0];
console.log(budgetDay);

let expenseMonth = document.getElementsByClassName('expenses_month-value')[0];
console.log(expenseMonth);

let additionalIncome = document.getElementsByClassName('additional_income-value')[0];
console.log(additionalIncome);

let additionalExpenses = document.getElementsByClassName('additional_expenses-value')[0];
console.log(additionalExpenses);

let incomePeriod = document.getElementsByClassName('income_period-value')[0];
console.log(incomePeriod);

let targetMonth = document.getElementsByClassName('target_month-value')[0];
console.log(targetMonth);