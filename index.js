'use strict';

///////   Рассчитать - Сбросить //////

let btnStartCalculate = document.getElementById('start');
let btnResetCalculate = document.getElementById('cancel');

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
    this.expenses[itemExpenses] = cashExpenses;
    }
    }, this);
    },

    getAddExpenses: function() {
    
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item) {
        item = item.trim();
        if(item !== '') {
            this.addExpenses.push(item);
        }
    }, this);

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
    this.income[itemIncome] = cashIncome;
    }
    }, this);
    for(let key in this.income) {
        this.incomeMonth += +this.income[key];
    }
    
    },

    getAddIncome: function() {

    additionalIncomeItem.forEach(function(item) {
        let itemValue = item.value.trim();
        if(itemValue !== '') {
        this.addIncome.push(itemValue);
        }
    }, this);

    },

    start: function() {


        if(budgetMonthInput.value === ''){
            alert('Ошибка! Поле "Месячный доход" должно быть заполнено!');
            return;
        }
        btnStartCalculate.style.display = 'none';
        btnResetCalculate.style.display = 'block';
        btnResetCalculate.addEventListener('click', this.resetData);


        this.budget = +budgetMonthInput.value;
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();

        this.getBuget();
        this.showResult();
        this.blockInputs();


    },

    showResult: function() {

    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expenseMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeItem.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcSavedMoney();
    additionalIncomeValue.value = this.addIncome;

    periodSelect.addEventListener('change', function() {
    incomePeriodValue.value = appData.calcSavedMoney();
    periodAmount.textContent = periodSelect.value;         
    });
    },

    getBuget: function() {
        
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    },

    getTargetMonth: function() {

        let targetMonth = Math.ceil(targetAmount.value / this.budgetMonth);
        return targetMonth;          
    },

    getExpensesMonth: function() {
    
        for(let key in this.expenses) {
        this.expensesMonth += +this.expenses[key];     
        }
    },

    getInfoDeposit: function() {
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
    },

    calcSavedMoney: function() {
        return this.budgetMonth * periodSelect.value;
    }, 

    blockInputs: function() {
    let allTextinputs = document.querySelectorAll('[type="text"]');
    allTextinputs.forEach(function(item) {
    item.disabled = true;
    });

    let btnPlus = document.querySelectorAll('.btn_plus');
    btnPlus.forEach(function(item) {
    item.disabled = true;
    });
  
    },

    resetData: function() {

        btnStartCalculate.style.display = 'block';
        btnResetCalculate.style.display = 'none';

        let leftDataInputs = document.querySelector('.data').querySelectorAll('input[type="text"]');
        console.log(leftDataInputs);
        leftDataInputs.forEach(function(item) {
        item.disabled = false;
        });

        let allInputs = document.querySelectorAll('input[type="text"]');
        allInputs.forEach(function(item){
        item.value = '';
        });
        periodSelect.value = '1';
        periodAmount.textContent = '1';

        

    }

};


btnExpensesAddPlus.addEventListener('click', appData.addExpensesBlock);
btnIncomeAddPlus.addEventListener('click', appData.addIncomeBlock);
   
btnStartCalculate.addEventListener('click', appData.start.bind(appData));

periodSelect.addEventListener('input', function() {
    periodAmount.innerHTML = periodSelect.value;        
    });


    let depositCheck = document.querySelector('.deposit-checkmark');
    console.log(depositCheck);
















