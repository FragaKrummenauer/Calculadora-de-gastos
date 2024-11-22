// Estrutura para representar uma despesa
interface Expense {
    description: string;
    amount: number;
    category: string;
}

// Referências para os elementos do DOM
const expenseList = document.getElementById("expense-list") as HTMLUListElement;
const totalElement = document.getElementById("total") as HTMLSpanElement;
const categoryFilter = document.getElementById("category-filter") as HTMLSelectElement;
const categoryInput = document.getElementById("category") as HTMLSelectElement;
const descriptionInput = document.getElementById("description") as HTMLInputElement;
const amountInput = document.getElementById("amount") as HTMLInputElement;

// Lista de despesas armazenadas
let expenses: Expense[] = [];

// Função para carregar despesas do localStorage
function loadExpenses() {
    const savedExpenses = localStorage.getItem("expenses");
    if (savedExpenses) {
        expenses = JSON.parse(savedExpenses);
    }
    renderExpenses(expenses);
}

// Função para salvar despesas no localStorage
function saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

// Função para renderizar as despesas filtradas
function renderExpenses(filteredExpenses: Expense[]) {
    expenseList.innerHTML = ""; // Limpa a lista antes de renderizar

    filteredExpenses.forEach((expense) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${expense.description} - ${expense.category}: R$ ${expense.amount.toFixed(2)}`;
        
        // Criar botão de remoção
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remover";
        removeButton.onclick = () => removeExpense(expense);
        listItem.appendChild(removeButton);
        
        expenseList.appendChild(listItem);
    });

    // Atualiza o total
    updateTotal(filteredExpenses);
}

// Função para atualizar o total de despesas
function updateTotal(filteredExpenses: Expense[]) {
    const total = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    totalElement.textContent = `R$ ${total.toFixed(2)}`;
}

// Função para adicionar uma nova despesa
function addExpense(event: Event) {
    event.preventDefault();

    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const category = categoryInput.value;

    if (description && !isNaN(amount) && amount > 0) {
        const newExpense: Expense = { description, amount, category };
        expenses.push(newExpense);
        saveExpenses();
        renderExpenses(expenses);

        // Limpa os campos de entrada
        descriptionInput.value = "";
        amountInput.value = "";
    } else {
        alert("Por favor, preencha todos os campos corretamente.");
    }
}

// Função para remover uma despesa
function removeExpense(expenseToRemove: Expense) {
    expenses = expenses.filter((expense) => expense !== expenseToRemove);
    saveExpenses();
    renderExpenses(expenses);
}

// Função para filtrar despesas por categoria
categoryFilter.addEventListener("change", () => {
    const selectedCategory = categoryFilter.value;
    let filteredExpenses = expenses;

    if (selectedCategory !== "all") {
        filteredExpenses = expenses.filter((expense) => expense.category === selectedCategory);
    }

    renderExpenses(filteredExpenses);
});

// Adiciona o ouvinte de evento ao formulário para adicionar despesas
const expenseForm = document.querySelector("form") as HTMLFormElement;
expenseForm.addEventListener("submit", addExpense);

// Carrega as despesas e renderiza a lista quando a página é carregada
loadExpenses();
