import { AbstractComponent } from '../framework/view/abstract-component.js';

export class ExpenseFormView extends AbstractComponent {
    get template() {
        return `
      <div class="expense-form">
        <h2>Добавить расходы</h2>
        <form id="expense-form">
          <label for="expense-name">Наименование расхода:</label>
          <input type="text" id="expense-name" placeholder="Например, еда" required />
          <label for="expense-amount">Стоимость:</label>
          <input type="number" id="expense-amount" placeholder="Amount" required />
          <fieldset>
            <legend>Категория:</legend>
            <label><input type="radio" name="expense-category" value="Еда" required /> Еда</label>
            <label><input type="radio" name="expense-category" value="Транспорт" required /> Транспорт</label>
            <label><input type="radio" name="expense-category" value="Развлечения" required />Развлечения</label>
            <label><input type="radio" name="expense-category" value="Другое" required /> Другое</label>
          </fieldset>
          <button type="submit">Добавить расходы</button>
        </form>
      </div>
    `;
    }

    setSubmitHandler(handler) {
        this.element.querySelector('#expense-form').addEventListener('submit', (evt) => {
            evt.preventDefault();
            handler();
        });
    }

    fillForm(data) {
        const form = this.element.querySelector('#expense-form');
        form.querySelector('#expense-name').value = data.name;
        form.querySelector('#expense-amount').value = data.amount;
        const radio = form.querySelector(`input[value="${data.category}"]`);
        if (radio) radio.checked = true;
    }

    getFormData() {
        const form = this.element.querySelector('#expense-form');
        return {
            name: form.querySelector('#expense-name').value,
            amount: parseInt(form.querySelector('#expense-amount').value),
            category: form.querySelector('input[name="expense-category"]:checked')?.value
        };
    }

    clearForm() {
        const form = this.element.querySelector('#expense-form');
        form.reset();
    }
}