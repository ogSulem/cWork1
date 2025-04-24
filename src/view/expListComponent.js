import { AbstractComponent } from '../framework/view/abstract-component.js';

export class ExpenseListView extends AbstractComponent {
    get template() {
        return `<ul class="expense-list"></ul>`;
    }
}
