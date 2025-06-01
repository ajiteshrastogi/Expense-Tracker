document.addEventListener("DOMContentLoaded", () => {
    const expenseForm = document.getElementById("expense-form");
    const expenseNameInput = document.getElementById("expense-name");
    const expenseAmountInput = document.getElementById("expense-amount");
    const expenseList = document.getElementById("expense-list");
    const totalAmountDisplay = document.getElementById("total-amount");

    let expensesArray = JSON.parse(localStorage.getItem("expense")) || [];
    let totalAmount = calculateTotal();

    renderExpenses();
    updateTotal(); 


    expenseForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name =  expenseNameInput.value.trim();
        const amount = parseFloat(expenseAmountInput.value.trim());

        if(name !== "" && !isNaN(amount) && amount>0){

            const newExpense = {
                id : Date.now(),
                name: name,
                amount: amount,
            }

            expensesArray.push(newExpense);
            saveExpensesTolocal();
            renderExpenses();
            updateTotal();

            //clear input
            expenseNameInput.value = "";
            expenseAmountInput.value = "";
        }
    });

    function renderExpenses() {
        expenseList.innerHTML = "";
        expensesArray.forEach((expense)=>{
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="expense-info">
                    <span class="expense-name"><i class="fas fa-receipt"></i> ${expense.name}</span>
                    <span class="expense-amount">₹${expense.amount.toFixed(2)}</span>
                </div>
                <button data-id="${expense.id}">Delete</button>
                `;

            expenseList.appendChild(li)
        })
    }

    function calculateTotal() {
        return expensesArray.reduce((sum, expense) => sum + expense.amount, 0);
        // return expensesArray[expensesArray.length -1].amount + updateTotal()
    }

    function saveExpensesTolocal() {
        localStorage.setItem("expense", JSON.stringify(expensesArray));
    }

    function updateTotal() {
        totalAmount = calculateTotal();
        totalAmountDisplay.textContent = totalAmount.toFixed(2);
    }

    expenseList.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
        const expenseId = parseInt(e.target.getAttribute("data-id"));
        expensesArray = expensesArray.filter((expense) => expense.id !== expenseId);

        saveExpensesTolocal();
        renderExpenses();
        updateTotal();
        }
    });

});
