import { AbstractComponent } from '../framework/view/abstract-component.js';
export class ExpenseFilterView extends AbstractComponent {
    get template() {
        return `
            <div class="expense-filter">
                <label for="category-filter">Фильтр по категориям:</label>
                <select id="category-filter">
                    <option value="Все">Все</option>
                    <option value="Еда">Еда</option>
                    <option value="Транспорт">Транспорт</option>
                    <option value="Развлечения">Развлечения</option>
                    <option value="Другое">Другое</option>
                </select>
                <label><input type="checkbox" id="max-amount-filter" /> Показывать расходы более 5000</label>
            </div>
        `;
    }

    setFilterChangeHandler(handler) {
        this.element.querySelector('#category-filter').addEventListener('change', handler);
        this.element.querySelector('#max-amount-filter').addEventListener('change', handler);
    }
}