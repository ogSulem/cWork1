import { AbstractComponent } from '../framework/view/abstract-component.js';

export class MainFrameComponent extends AbstractComponent {
    constructor() {
        super();
    }

    get template() {
        return `
      <div class="container">
        <h1>Учет расходов</h1>
        <div class="expense-form-container"></div>
        <div class="expense-filter-container"></div>
        <div class="expense-list-container">
          <h2>Список расходов</h2>
          <ul id="expense-list"></ul>
        </div>
      </div>
    `;
    }

    get formContainer() {
        return this.element.querySelector('.expense-form-container');
    }

    get filterContainer() {
        return this.element.querySelector('.expense-filter-container');
    }

    get listContainer() {
        return this.element.querySelector('#expense-list');
    }
}