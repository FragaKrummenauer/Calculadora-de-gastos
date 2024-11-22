// Seleção de elementos DOM
var form = document.querySelector("form");
var categoryInput = document.querySelector("#category");
var descriptionInput = document.querySelector("#description");
var amountInput = document.querySelector("#amount");
var expenseList = document.querySelector("#expense-list ul");
var totalDisplay = document.querySelector("#total");
// Lista de despesas
var expenses = [];
// Atualiza o resumo (total gasto)
function updateSummary() {
    var total = expenses.reduce(function (sum, expense) { return sum + expense.amount; }, 0);
    totalDisplay.textContent = "R$ ".concat(total.toFixed(2));
}
// Adiciona uma despesa na lista
function addExpense(expense) {
    // Adicionar à lista de despesas
    expenses.push(expense);
    // Atualizar o DOM
    var listItem = document.createElement("li");
    listItem.innerHTML = "\n        <span>".concat(expense.description, " - ").concat(expense.category, "</span>\n        <strong>R$ ").concat(expense.amount.toFixed(2), "</strong>\n    ");
    expenseList.appendChild(listItem);
    // Atualizar o resumo
    updateSummary();
}
// Lida com o envio do formulário
form.addEventListener("submit", function (event) {
    event.preventDefault();
    // Obter valores do formulário
    var category = categoryInput.value;
    var description = descriptionInput.value.trim();
    var amount = parseFloat(amountInput.value);
    if (!description || isNaN(amount) || amount <= 0) {
        alert("Por favor, preencha todos os campos corretamente!");
        return;
    }
    // Criar objeto de despesa
    var expense = { category: category, description: description, amount: amount };
    // Adicionar despesa
    addExpense(expense);
    // Limpar formulário
    form.reset();
});
