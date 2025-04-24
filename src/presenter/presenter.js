import { ExpenseFormView } from "../view/expFormComponent.js";
import { MainFrameComponent } from "../view/mainFrameComponent.js";
import ExpenseModel from "../model/exps-model.js";
import { ExpenseFilterView } from "../view/expFilterComponent.js";
import { render, RenderPosition } from "../framework/render.js";
import { ExpenseListView } from "../view/expListComponent.js";
import { ExpenseItemView } from "../view/expItemComponent.js";

export class ExpensePresenter {
    constructor(container) {
        this._container = container;
        this._model = new ExpenseModel();
        this._mainFrame = new MainFrameComponent();
        this._formView = new ExpenseFormView();
        this._filterView = new ExpenseFilterView();
        this._listView = null;

        this._init();
        this._model.addObserver(this._handleModelChange.bind(this));
        this._currentFilter = { category: 'Все', maxAmount: false };
        this._editingExpenseId = null;
    }

    _init() {
        render(this._mainFrame, this._container);
        render(this._formView, this._mainFrame.formContainer);
        render(this._filterView, this._mainFrame.filterContainer);

        this._filterView.setFilterChangeHandler(this._handleFilterChange.bind(this));

        this._renderList();

        this._formView.setSubmitHandler(this._handleFormSubmit.bind(this));
    }

    _handleFilterChange() {
        this._currentFilter = {
            category: this._filterView.element.querySelector('#category-filter').value,
            maxAmount: this._filterView.element.querySelector('#max-amount-filter').checked
        };
        this._applyFilter();
    }

    _applyFilter() {
        let filteredExps = this._model.exps;
        if (this._currentFilter.category !== 'Все') {
            filteredExps = filteredExps.filter(exp => exp.category === this._currentFilter.category);
        }
        if (this._currentFilter.maxAmount) {
            filteredExps = filteredExps.filter(exp => exp.amount > 5000);
        }
        this._renderExpenses(filteredExps);
    }

    _renderList() {
        this._listView = new ExpenseListView();
        render(this._listView, this._mainFrame.listContainer);
        this._renderExpenses();
    }

    _handleModelChange() {
        this._clearList();
        this._renderExpenses();
        this._applyFilter();
    }

    _clearList() {
        this._listView.element.innerHTML = '';
    }

    _renderExpenses(expenses = this._model.exps) {
        this._clearList();
        expenses.forEach(expense => {
            const item = new ExpenseItemView(expense);
            item.setDeleteHandler(() => this._handleDeleteExpense(expense.id));
            render(item, this._listView.element);
        });
    }

    _handleFormSubmit() {
        const data = this._formView.getFormData();

        if (!data.name || !data.amount || !data.category) {
            alert("Пожалуйста, заполните все поля");
            return;
        }

        if (this._editingExpenseId !== null) {
            this._model.updateExpense(this._editingExpenseId, {
                name: data.name,
                amount: Number(data.amount),
                category: data.category
            });
            this._editingExpenseId = null;
        } else {
            this._model.addExpense({
                name: data.name,
                amount: Number(data.amount),
                category: data.category
            });
        }

        this._formView.clearForm();
    }


    _handleDeleteExpense(id) {
        this._model.removeExpense(id);
    }

    _renderExpenses(expenses = this._model.exps) {
        this._clearList();
        expenses.forEach(expense => {
            const item = new ExpenseItemView(expense);
            item.setDeleteHandler(() => this._handleDeleteExpense(expense.id));
            item.setEditHandler((expense) => this._handleEditExpense(expense));
            render(item, this._listView.element);
        });
    }

    _handleEditExpense(expense) {
        this._editingExpenseId = expense.id;

        this._formView.fillForm({
            name: expense.name,
            amount: expense.amount,
            category: expense.category
        });
    }

}