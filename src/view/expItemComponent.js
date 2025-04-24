import { AbstractComponent } from '../framework/view/abstract-component.js';

export class ExpenseItemView extends AbstractComponent {
    constructor(expense) {
        super();
        this._expense = expense;
    }

    get template() {
        return `
    <li class="expense-item" data-id="${this._expense.id}">
      <span class="expense-name">${this._expense.name}</span>
      <span class="expense-amount">${this._expense.amount} руб.</span>
      <span class="expense-category">${this._expense.category}</span>
      <button class="edit-btn" data-id="${this._expense.id}">Ред.</button>
      <button class="delete-btn" data-id="${this._expense.id}">×</button>
    </li>
  `;
    }

    setEditHandler(handler) {
        this.element.querySelector('.edit-btn').addEventListener('click', () => handler(this._expense));
    }

    setDeleteHandler(handler) {
        this.element.querySelector('.delete-btn').addEventListener('click', (evt) => {
            evt.preventDefault();
            handler(this._expense.id);
        });
    }
}