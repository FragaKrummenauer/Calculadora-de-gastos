// Interfaces para tipos
interface Expense {
    category: string;
    description: string;
    amount: number;
}

// Seleção de elementos DOM
const form = document.querySelector("form") as HTMLFormElement;
const categoryInput = document.querySelector("#category") as HTMLSelectElement;
const descriptionInput = document.querySelector("#description") as HTMLInputElement;
const amountInput = document.querySelector("#amount") as HTMLInputElement;
const expenseList = document.querySelector("#expense-list ul") as HTMLUListElement;
const totalDisplay = document.querySelector("#total") as HTMLSpanElement;

// Lista de despesas
let expenses: Expense[] = [];

// Atualiza o resumo (total gasto)
function updateSummary(): void {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    totalDisplay.textContent = `R$ ${total.toFixed(2)}`;
}

// Adiciona uma despesa na lista
function addExpense(expense: Expense): void {
    // Adicionar à lista de despesas
    expenses.push(expense);

    // Atualizar o DOM
    const listItem = document.createElement("li");
    listItem.innerHTML = `
        <span>${expense.description} - ${expense.category}</span>
        <strong>R$ ${expense.amount.toFixed(2)}</strong>
    `;
    expenseList.appendChild(listItem);

    // Atualizar o resumo
    updateSummary();
}

// Lida com o envio do formulário
form.addEventListener("submit", (event: SubmitEvent) => {
    event.preventDefault();

    // Obter valores do formulário
    const category = categoryInput.value;
    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value);

    if (!description || isNaN(amount) || amount <= 0) {
        alert("Por favor, preencha todos os campos corretamente!");
        return;
    }

    // Criar objeto de despesa
    const expense: Expense = { category, description, amount };

    // Adicionar despesa
    addExpense(expense);

    // Limpar formulário
    form.reset();
});
