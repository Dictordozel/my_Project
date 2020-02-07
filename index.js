'use strict';

///////   Рассчитать  //////

let btnStartCalculate = document.getElementById('start');

//////   Месячный доход  //////

let budgetMonthInput = document.querySelector('.salary-amount');

//////   Дополнительный доход  //////

let incomeTitle = document.querySelector('.income-title');

let incomeItems = document.querySelectorAll('.income-items');

// //////   Возможный доход  //////

let additionalIncomeItem = document.querySelectorAll('.additional_income-item');
//let additionalIncomeValue = document.querySelectorAll('.additional_income-value');

// //////   Обязательные расходы  //////

let expensesTitle = document.querySelector('.expenses-title');

let expensesItems = document.querySelectorAll('.expenses-items');

// //////   Возможные расходы  ///////

let additionalExpensesItem = document.querySelector('.additional_expenses-item');

// //////   Цель  ////////

let targetAmount = document.querySelector('.target-amount');

// //////   Депозит  ////////

let checkBoxDeposit = document.querySelector('#deposit-check');

//////   Период  ///////

let periodSelect = document.querySelector('.period-select');

let periodAmount = document.querySelector('.period-amount');

///////  Кнопки +  //////////////////////////////////////////////////////////////////

let btnIncomeAddPlus = document.getElementsByTagName('button')[0];

let btnExpensesAddPlus = document.getElementsByTagName('button')[1];

/////////////////////////////////////////////////////////////////////////////////////////

let budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];

let budgetDayValue = document.getElementsByClassName('budget_day-value')[0];

let expenseMonthValue = document.getElementsByClassName('expenses_month-value')[0];

let additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];

let additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];

let incomePeriodValue = document.getElementsByClassName('income_period-value')[0];

let targetMonthValue = document.getElementsByClassName('target_month-value')[0];

//////////////////////////// Проверка на число   /////////////////////////////

let isNumber = function(n) {
return !isNaN(parseFloat(n)) && isFinite(n); 
};

// OBJECT //////////////////////////////////////////////////////////////////////////

let appData = {
    income: {},
    addIncome: [],
    incomeMonth: 0,
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,

    addExpensesBlock: function() {

    let cloneExpensesItems = expensesItems[0].cloneNode (true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItems, btnExpensesAddPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if(expensesItems.length === 3) {
    btnExpensesAddPlus.style.display = 'none';
    }
    },

    getExpenses: function() {

    expensesItems.forEach(function(item) {
    let itemExpenses = item.querySelector('.expenses-title').value;
    let cashExpenses = item.querySelector('.expenses-amount').value;
    if(itemExpenses !== '' && cashExpenses !== '') {
    appData.expenses[itemExpenses] = cashExpenses;
    }
    });
    },

    getAddExpenses: function() {
    
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item) {
        item = item.trim();
        if(item !== '') {
            appData.addExpenses.push(item);
        }
    });

    },

    addIncomeBlock: function() {
    
    let cloneIncomeItems = incomeItems[0].cloneNode (true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItems, btnIncomeAddPlus);
    incomeItems = document.querySelectorAll('.income-items');
    if(incomeItems.length === 3) {
    btnIncomeAddPlus.style.display = 'none';
    }
    },

    getIncome: function() {

    incomeItems.forEach(function(item) {
    let itemIncome = item.querySelector('.income-title').value;
    let cashIncome = item.querySelector('.income-amount').value;
    if(itemIncome !== '' && cashIncome !== '') {
    appData.income[itemIncome] = cashIncome;
    }
    });
    for(let key in appData.income) {
        appData.incomeMonth += +appData.income[key];
    }
    
    },

    getAddIncome: function() {

    additionalIncomeItem.forEach(function(item) {
        let itemValue = item.value.trim();
        if(itemValue !== '') {
        appData.addIncome.push(itemValue);
        }
    });

    },

    start: function() {

        if(budgetMonthInput.value === ''){
            alert('Ошибка! Поле "Месячный доход" должно быть заполнено!');
            return;
        }

        appData.budget = +budgetMonthInput.value;

        appData.getExpenses();
        appData.getIncome();

        appData.getExpensesMonth();

        appData.getAddExpenses();
        appData.getAddIncome();

        appData.getBuget();
        appData.showResult();
    },

    showResult: function() {

    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = appData.budgetDay;
    expenseMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    additionalIncomeItem.value = appData.addIncome.join(', ');
    targetMonthValue.value = appData.getTargetMonth();
    incomePeriodValue.value = appData.calcSavedMoney();
    additionalIncomeValue.value = appData.addIncome;

    periodSelect.addEventListener('change', function() {
        incomePeriodValue.value = appData.calcSavedMoney();
        periodAmount.innerHTML = periodSelect.value;
        
    });
        
    },

    getBuget: function() {
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },

    getTargetMonth: function() {

        let targetMonth = Math.ceil(targetAmount.value / appData.budgetMonth);
        return targetMonth;          
    },

    getExpensesMonth: function() {
    
        for(let key in appData.expenses) {
        appData.expensesMonth += +appData.expenses[key];     
        }
    },

    getInfoDeposit: function() {
        if(appData.deposit) {
            
            let yearPercent;

            do {
            yearPercent = prompt('Какой годовой процент вашего депозита?', '10');
        }
            while (!isNumber(yearPercent));
            appData.percentDeposit = yearPercent;
                        
            let depositSum;
            
            do {
                depositSum = prompt('Какая сумма депозита?', '15000');
        }
            while (!isNumber(depositSum));
            appData.moneyDeposit = depositSum;
        }
    },

    calcSavedMoney: function() {
        return appData.budgetMonth * periodSelect.value;
    }    
};

btnStartCalculate.addEventListener('click', appData.start);

btnExpensesAddPlus.addEventListener('click', appData.addExpensesBlock);
btnIncomeAddPlus.addEventListener('click', appData.addIncomeBlock); 

periodSelect.addEventListener('input', function() {
periodAmount.innerHTML = periodSelect.value;        
});