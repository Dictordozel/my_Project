'use strict';

/////////   Рассчитать - Сбросить 
let btnStartCalculate = document.getElementById('start');
let btnResetCalculate = document.getElementById('cancel');
/////////   Месячный доход  
let budgetMonthInput = document.querySelector('.salary-amount');
/////////   Дополнительный доход  
let incomeTitle = document.querySelector('.income-title');
let incomeItems = document.querySelectorAll('.income-items');
// //////   Возможный доход
let additionalIncomeItem = document.querySelectorAll('.additional_income-item');
// //////   Обязательные расходы
let expensesTitle = document.querySelector('.expenses-title');
let expensesItems = document.querySelectorAll('.expenses-items');
// //////   Возможные расходы
let additionalExpensesItem = document.querySelector('.additional_expenses-item');
/////////   Цель
let targetAmount = document.querySelector('.target-amount');
/////////   Депозит
let checkBoxDeposit = document.querySelector('#deposit-check');
/////////   Период  
let periodSelect = document.querySelector('.period-select');
let periodAmount = document.querySelector('.period-amount');
//////////  Кнопки +  
let btnIncomeAddPlus = document.getElementsByTagName('button')[0];
let btnExpensesAddPlus = document.getElementsByTagName('button')[1];

let budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
let budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
let expenseMonthValue = document.getElementsByClassName('expenses_month-value')[0];
let additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
let additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
let incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
let targetMonthValue = document.getElementsByClassName('target_month-value')[0];
/////////////////////////////////////////////////////////////////////////////////////////

let isNumber = function(n) {
return !isNaN(parseFloat(n)) && isFinite(n); 
};


const AppData = function() {

this.income = {};
this.addIncome = [];
this.incomeMonth = 0;
this.expenses = {};
this.addExpenses = [];
this.deposit = false;
this.percentDeposit = 0;
this.moneyDeposit = 0;
this.budget = 0;
this.budgetDay = 0;
this.budgetMonth = 0;
this.expensesMonth = 0;
};


AppData.prototype.start = function() {
    btnStartCalculate.style.display = 'none';
    btnResetCalculate.style.display = 'block';
    btnResetCalculate.addEventListener("click", this.resetData.bind(this));

    this.budget = +budgetMonthInput.value;


    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();

    this.getBuget();
    this.showResult();
    this.blockInputs();
};

AppData.prototype.showResult = function() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expenseMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeItem.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcSavedMoney();
    additionalIncomeValue.value = this.addIncome;

    periodSelect.addEventListener('change', this.changePeriod.bind(this));
};

AppData.prototype.changePeriod = function() {
   incomePeriodValue.value = this.calcSavedMoney();
};

AppData.prototype.addExpensesBlock = function() {
    let cloneExpensesItems = expensesItems[0].cloneNode (true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItems, btnExpensesAddPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if(expensesItems.length === 3) {
    btnExpensesAddPlus.style.display = 'none';
    }
};

AppData.prototype.addIncomeBlock = function() {
    let cloneIncomeItems = incomeItems[0].cloneNode (true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItems, btnIncomeAddPlus);
    incomeItems = document.querySelectorAll('.income-items');
    if(incomeItems.length === 3) {
    btnIncomeAddPlus.style.display = 'none';
    }
};

AppData.prototype.getExpenses = function() {
    expensesItems.forEach(function(item) {
    let itemExpenses = item.querySelector('.expenses-title').value;
    let cashExpenses = item.querySelector('.expenses-amount').value;
    if(itemExpenses !== '' && cashExpenses !== '') {
    this.expenses[itemExpenses] = cashExpenses;
    }
    }, this);
};

AppData.prototype.getAddExpenses = function() {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item) {
    item = item.trim();
    if(item !== '') {
    this.addExpenses.push(item);
    }
    }, this);
};

AppData.prototype.getIncome = function() {
    incomeItems.forEach(function(item) {
    let itemIncome = item.querySelector('.income-title').value;
    let cashIncome = item.querySelector('.income-amount').value;
    if(itemIncome !== '' && cashIncome !== '') {
    this.income[itemIncome] = cashIncome;
    }
    }, this);
    for(let key in this.income) {
    this.incomeMonth += +this.income[key];
    }
};

AppData.prototype.getAddIncome = function() {
    additionalIncomeItem.forEach(function(item) {
    let itemValue = item.value.trim();
    if(itemValue !== '') {
    this.addIncome.push(itemValue);
    }
    }, this);
};

AppData.prototype.getBuget = function() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
};

AppData.prototype.getTargetMonth = function() {
    let targetMonth = Math.ceil(targetAmount.value / this.budgetMonth);
    return targetMonth;          
};

AppData.prototype.getExpensesMonth = function() {
    for(let key in this.expenses) {
    this.expensesMonth += +this.expenses[key];     
    }
};

AppData.prototype.getInfoDeposit = function() {
    if(this.deposit) {
        
    let yearPercent;

    do {
    yearPercent = prompt('Какой годовой процент вашего депозита?', '10');
    }
    while (!isNumber(yearPercent));
    this.percentDeposit = yearPercent;
                    
    let depositSum;
        
    do {
    depositSum = prompt('Какая сумма депозита?', '15000');
    }
    while (!isNumber(depositSum));
    this.moneyDeposit = depositSum;
    }
};

AppData.prototype.calcSavedMoney = function() {
    return this.budgetMonth * periodSelect.value;
}; 

AppData.prototype.blockInputs = function() {
    let allTextinputs = document.querySelectorAll('[type="text"]');
    allTextinputs.forEach(function(item) {
    item.disabled = true;
    });

    let btnPlus = document.querySelectorAll('.btn_plus');
    btnPlus.forEach(function(item) {
    item.disabled = true;
    });
};

AppData.prototype.resetData = function() {
    btnStartCalculate.style.display = 'block';
    btnResetCalculate.style.display = 'none';
    btnStartCalculate.disabled = true;

    let leftDataInputs = document.querySelector('.data').querySelectorAll('input[type="text"]');
    leftDataInputs.forEach(function(item) {
    item.disabled = false;
    });

    let allInputs = document.querySelectorAll('input[type="text"]');
    allInputs.forEach(function(item){
    item.value = '';
    });

    let btnPlus = document.querySelectorAll('.btn_plus');
    btnPlus.forEach(function(item) {
    item.disabled = false;
    });

    periodSelect.value = '1';
    periodAmount.textContent = '1';
    
    this.resetInputs('.income-items', '.income');
    this.resetInputs('.expenses-items', '.expenses');

    this.income = {};
    this.addIncome = [];
    this.incomeMonth = 0;
    this.expenses = {};
    this.addExpenses = [];
    checkBoxDeposit.checked = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
};

AppData.prototype.resetInputs = function(item, itemsParent) {
    let dopInputs = document.querySelectorAll(item);
    let Parent = document.querySelector(itemsParent);
    for(let i = 1; i < dopInputs.length; i++) {
    Parent.removeChild(dopInputs[i]);
    }
}; 

AppData.prototype.eventListeners = function() {
    budgetMonthInput.addEventListener('input', function(elem) {
    if(elem.target.value.trim() !== '') {
    btnStartCalculate.disabled = false;
    } else {
    btnStartCalculate.disabled = true;   
    }
    });   
    btnStartCalculate.addEventListener('click', this.start.bind(this));
    btnExpensesAddPlus.addEventListener('click', this.addExpensesBlock);
    btnIncomeAddPlus.addEventListener('click', this.addIncomeBlock);                  
    periodSelect.addEventListener('input', function() {
    periodAmount.textContent = periodSelect.value;  
    });        
};

btnStartCalculate.disabled = true;

const appData = new AppData();
appData.eventListeners();