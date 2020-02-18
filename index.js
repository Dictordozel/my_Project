'use strict';

/////////   Рассчитать - Сбросить 
const btnStartCalculate = document.getElementById('start'),
btnResetCalculate = document.getElementById('cancel'),
/////////   Месячный доход  
budgetMonthInput = document.querySelector('.salary-amount'),
// //////   Возможный доход
additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
// //////   Возможные расходы
additionalExpensesItem = document.querySelector('.additional_expenses-item'),
/////////   Цель
targetAmount = document.querySelector('.target-amount'),
/////////   Депозит
checkBoxDeposit = document.querySelector('#deposit-check'),
depositBank = document.querySelector('.deposit-bank'),
depositAmount = document.querySelector('.deposit-amount'),
depositPercent = document.querySelector('.deposit-percent'),
/////////   Период  
periodSelect = document.querySelector('.period-select'),
periodAmount = document.querySelector('.period-amount'),
//////////  Кнопки +  
btnIncomeAddPlus = document.getElementsByTagName('button')[0],
btnExpensesAddPlus = document.getElementsByTagName('button')[1],
//////////  Result
budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
expenseMonthValue = document.getElementsByClassName('expenses_month-value')[0],
additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
targetMonthValue = document.getElementsByClassName('target_month-value')[0];
// //////   Обязательные расходы
let expensesTitle = document.querySelector('.expenses-title'),
expensesItems = document.querySelectorAll('.expenses-items'),
/////////   Дополнительный доход  
incomeTitle = document.querySelector('.income-title'),
incomeItems = document.querySelectorAll('.income-items');
/////////////////////////////////////////////////////////////////////////////////////////

const isNumber = (n) => {
return !isNaN(parseFloat(n)) && isFinite(n); 
};


class AppData {

constructor() {
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
}


start() {
    btnStartCalculate.style.display = 'none';
    btnResetCalculate.style.display = 'block';
    btnResetCalculate.addEventListener("click", this.resetData.bind(this));
    checkBoxDeposit.disabled = true;
    depositBank.disabled = true;

    this.budget = +budgetMonthInput.value;

    this.getExpInc();
    //this.getExpenses();
    //this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getInfoDeposit();
    this.getBuget();
    this.showResult();
    this.blockInputs();
}

showResult() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expenseMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeItem.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcSavedMoney();
    additionalIncomeValue.value = this.addIncome;

    periodSelect.addEventListener('change', this.changePeriod.bind(this));
}

changePeriod() {
   incomePeriodValue.value = this.calcSavedMoney();
}

addExpensesBlock() {
    const cloneExpensesItems = expensesItems[0].cloneNode (true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItems, btnExpensesAddPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if(expensesItems.length === 3) {
    btnExpensesAddPlus.style.display = 'none';
    }
}

addIncomeBlock() {
    const cloneIncomeItems = incomeItems[0].cloneNode (true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItems, btnIncomeAddPlus);
    incomeItems = document.querySelectorAll('.income-items');
    if(incomeItems.length === 3) {
    btnIncomeAddPlus.style.display = 'none';
    }
}


getExpInc() {

const count = (item, index) => {
    const startStr = item.className.split('-')[0]; 
    const itemTitle = item.querySelector(`.${startStr}-title`).value;
    const itemAmount = item.querySelector(`.${startStr}-amount`).value;
    if(itemTitle !== '' && itemAmount !== '') {
    this[startStr][itemTitle + index] = itemAmount;
    }
};

    expensesItems.forEach(count);
    incomeItems.forEach(count);

    for(const key in this.income) {
    this.incomeMonth += +this.income[key];
    }
}

getAddExpenses() {
    const addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach((item) => {
    item = item.trim();
    if(item !== '') {
    this.addExpenses.push(item);
    }
    });
}

getAddIncome() {
    additionalIncomeItem.forEach((item) => {
    const itemValue = item.value.trim();
    if(itemValue !== '') {
    this.addIncome.push(itemValue);
    }
    });
}

getBuget() {
    const monthDeposit = this.moneyDeposit * (this.percentDeposit /100);
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
}

getTargetMonth() {
    const targetMonth = Math.ceil(targetAmount.value / this.budgetMonth);
    return targetMonth;          
}

getExpensesMonth() {
    for(const key in this.expenses) {
    this.expensesMonth += +this.expenses[key];     
    }
}

getInfoDeposit() {
    if(this.deposit) {
        this.percentDeposit = depositPercent.value;
        this.moneyDeposit = depositAmount.value;
    }
}

calcSavedMoney() {
    return this.budgetMonth * periodSelect.value;
} 

blockInputs() {
    const allTextinputs = document.querySelectorAll('[type="text"]');
    allTextinputs.forEach((item) => {
    item.disabled = true;
    });

    const btnPlus = document.querySelectorAll('.btn_plus');
    btnPlus.forEach((item) => {
    item.disabled = true;
    });
}

resetData() {
    btnStartCalculate.style.display = 'block';
    btnResetCalculate.style.display = 'none';
    btnStartCalculate.disabled = true;
    checkBoxDeposit.disabled = false;
    depositBank.disabled = false;

    const leftDataInputs = document.querySelector('.data').querySelectorAll('input[type="text"]');
    leftDataInputs.forEach((item) => {
    item.disabled = false;
    });

    const allInputs = document.querySelectorAll('input[type="text"]');
    allInputs.forEach((item) => {
    item.value = '';
    });

    const btnPlus = document.querySelectorAll('.btn_plus');
    btnPlus.forEach((item) => {
    item.disabled = false;
    item.style.display = 'block';
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
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.deposit = false;
    this.percentDeposit = 0;

    
    checkBoxDeposit.checked = false;
    depositPercent.style.display = 'none';
    depositBank.style.display = 'none';
    depositBank.value = '';
    depositAmount.style.display = 'none';
    depositPercent.value = '';

}

resetInputs(item, itemsParent) {
    const dopInputs = document.querySelectorAll(item);
    const Parent = document.querySelector(itemsParent);
    for(let i = 1; i < dopInputs.length; i++) {
    Parent.removeChild(dopInputs[i]);
    }
}



changePercent() {
    depositPercent.value = '';
    const valueSelect = this.value;
    if(valueSelect === 'other') {
        depositPercent.style.display = 'inline-block';
    } else {
        depositPercent.value = valueSelect;
        depositPercent.style.display = 'none';
    }
}


depositHandler() {
    if(checkBoxDeposit.checked) {
    depositBank.style.display = 'inline-block';
    depositAmount.style.display = 'inline-block';
    this.deposit = true;
    depositBank.addEventListener('change', this.changePercent);
    } else {
    depositPercent.style.display = 'none';
    depositBank.style.display = 'none';
    depositAmount.style.display = 'none';
    depositBank.value = ''; 
    depositAmount.value = '';
    this.deposit = false;
    depositBank.removeEventListener('change', this.changePercent);   
    }

}

eventListeners() {
    budgetMonthInput.addEventListener('input', (elem) => {
    if(elem.target.value.trim() !== '') {
    btnStartCalculate.disabled = false; 
    } else {
    btnStartCalculate.disabled = true;    
    }
    });

    btnStartCalculate.addEventListener('click', this.start.bind(this));
    btnExpensesAddPlus.addEventListener('click', this.addExpensesBlock);
    btnIncomeAddPlus.addEventListener('click', this.addIncomeBlock);                  
    periodSelect.addEventListener('input', () => {
        periodAmount.textContent = periodSelect.value;  
    }); 
    
    checkBoxDeposit.addEventListener('change', this.depositHandler.bind(this));

    depositPercent.addEventListener('input', () => {
        if(!isNumber(depositPercent.value) || depositPercent.value.trim() === ''){
            btnStartCalculate.disabled = true;
            depositPercent.value = '';
            alert('Вы ввели некорректные данные! Введите еще раз!');
        } else {
            btnStartCalculate.disabled = false;
        }

        if( depositPercent.value < 0 || depositPercent.value >= 100 ) {
            alert('Введите данные в промежутке от 0 до 100');
            depositPercent.value = '';
        } 
    });
}

}

btnStartCalculate.disabled = true;

const appData = new AppData();
appData.eventListeners();