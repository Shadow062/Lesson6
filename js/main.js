'use strict';

let startBtn = document.getElementById("start"),
    budgetValue = document.getElementsByClassName('budget-value')[0],
    dayBudgetValue = document.getElementsByClassName('daybudget-value')[0],
    levelValue = document.getElementsByClassName('level-value')[0],
    expensesValue = document.getElementsByClassName('expenses-value')[0],
    optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
    incomeValue = document.getElementsByClassName('income-value')[0],
    monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0],
    yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0],


    dateTime = document.querySelector('.date-time'),
    budgetTime = document.querySelector('.budget-time'),
    expensesItem = document.getElementsByClassName('expenses-item'),
    dateTimeBtn = document.getElementsByTagName('button')[0],
    expensesBtn = document.getElementsByTagName('button')[1],
    optionalExpensesBtn = document.getElementsByTagName('button')[2],
    countBtn = document.getElementsByTagName('button')[3],
    optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
    incomeItem = document.querySelector('.choose-income'),
    checkSavings = document.querySelector('#savings'),
    sumValue = document.querySelector('.choose-sum'),
    percentValue = document.querySelector('.choose-percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');

let money,
    moneyPerDay,
    time;


dateTimeBtn.addEventListener('click', function () {
    time = dateTime.value;

    if (time == "" || time == null) {
        alert("Ошибочка... Введите данные правильно!");
    }

    appData.timeData = time;
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDate();
});

dateTimeBtn.addEventListener('click', function () {
    money = +budgetTime.value;

    if (isNaN(money) || money == "" || money == null) {
        alert("Ошибочка... Введите данные правильно!");
    }

    moneyPerDay = money;
    appData.budget = money;
    budgetValue.textContent = money.toFixed();
});

// Отключаем кнопку рассчитать
// countBtn.disabled = true;
// countBtn.style.background = '#ff964b5c';


// startBtn.addEventListener('click', function () {
//     time = prompt("Введите дату в формате YYYY-MM-DD", "");
//     money = +prompt("Ваш бюджет на месяц?", "");

//     while (isNaN(money) || money == "" || money == null) {
//         money = +prompt("Ваш бюджет на месяц?", "");
//     }

//     moneyPerDay = money;
//     appData.budget = money;
//     appData.timeData = time;
//     budgetValue.textContent = money.toFixed();
//     yearValue.value = new Date(Date.parse(time)).getFullYear();
//     monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
//     dayValue.value = new Date(Date.parse(time)).getDate();

//     // Включаем кнопку после прописания дату и бюджет
//     countBtn.disabled = false;
//     countBtn.style.background = '';
// });

expensesBtn.addEventListener('click', function () {
    let sum = 0;

    for (let i = 0; i < expensesItem.length; i++) {
        let a = expensesItem[i].value,
            b = expensesItem[++i].value;
        moneyPerDay -= b;

        if (typeof (a) === 'string' && typeof (a) != null && typeof (b) != null && a != "" && b != "" && a.length < 50) {
            appData.expenses[a] = b;
            sum += +b;
        } else {
            console.log('Введите, пожалуйста, корректные данные');
        }
        if (moneyPerDay < 0) {
            dayBudgetValue.textContevnt = 'Вашего уровня дохода не достаточно';
        }
    }

    expensesValue.textContent = sum;
});


optionalExpensesBtn.addEventListener('click', function () {
    for (let i = 0; i <= optionalExpensesItem.length; i++) {
        let questionOptExpenses = optionalExpensesItem[i].value;
        appData.optionalExpenses[i] = questionOptExpenses;
        optionalExpensesValue.textContent += appData.optionalExpenses[i] + '';
    }
});

countBtn.addEventListener('click', function () {

    if (appData.budget != undefined && moneyPerDay > 0) {
        appData.moneyPerDay = ((moneyPerDay) / 30).toFixed();
        dayBudgetValue.textContent = appData.moneyPerDay;

        if (appData.moneyPerDay <= 100) {
            levelValue.textContent = "Это минимальный уровень достатка!";
        } else if (appData.moneyPerDay >= 100 && appData.moneyPerDay < 2000) {
            levelValue.textContent = "Это средний уровень достатка!";
        } else if (appData.moneyPerDay >= 2000) {
            levelValue.textContent = "Это высокий уровень достатка!";
        } else {
            levelValue.textContent = "Ошибочка...!";
        }
    } else {
        dayBudgetValue.textContent = 'Произошла ошибка...!';
    }
});

incomeItem.addEventListener('change', function () {
    let items = incomeItem.value;

    if (typeof (items) != "string" || items == "" || typeof (items) == null) {
        incomeValue.textContent = "Вы ввели некорректные данные или не ввели их вовсе";
    } else {
        appData.income = items.split(", ");
    }

    incomeValue.textContent = appData.income;
});

checkSavings.addEventListener('click', function () {
    if (appData.savings == true) {
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});


sumValue.addEventListener('input', function () {
    if (appData.savings == true) {
        let sum = +sumValue.value,
            percent = +percentValue.value;

        appData.monthIncome = sum / 100 / 12 * percent;
        appData.yearIncome = sum / 100 * percent;

        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

percentValue.addEventListener('input', function () {
    if (appData.savings == true) {
        let sum = +sumValue.value,
            percent = +percentValue.value;

        appData.monthIncome = sum / 100 / 12 * percent;
        appData.yearIncome = sum / 100 * percent;

        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false
};

// chooseIncome: function () {

//     //запрещаем оставлять строку пустую или отменять..

//     appData.income.push(prompt("Может что-то еще?"));
//     appData.income.sort();
// }

// appData.income.forEach(function (itemmassive, i) {
//     alert("Способы доп. заработка: " + (i + 1) + " - " + itemmassive);


// for (let key in appData) {
//     console.log("Наша программа включает в себя данные: " + key + " - " + appData[key]); //перебираем свойство объекта
// }