import { exps } from '../mock/exps.js';
import { generateID } from '../utils.js';

export default class ExpenseModel {
    #boardExps = exps;
    #observers = [];

    get exps() {
        return this.#boardExps;
    }

    addExpense(expenseData) {
        const newExp = {
            id: generateID(this.#boardExps),
            ...expenseData
        };
        this.#boardExps.push(newExp);
        this._notifyObservers();
        return newExp;
    }

    updateExpense(id, newData) {
        const index = this.#boardExps.findIndex(exp => exp.id === id);
        if (index !== -1) {
            this.#boardExps[index] = { ...this.#boardExps[index], ...newData };
            this._notifyObservers();
        }
    }

    removeExpense(id) {
        this.#boardExps = this.#boardExps.filter(exp => exp.id !== id);
        this._notifyObservers();
    }

    addObserver(observer) {
        this.#observers.push(observer);
    }

    removeObserver(observer) {
        this.#observers = this.#observers.filter((obs) => obs !== observer);
    }

    _notifyObservers() {
        this.#observers.forEach((observer) => observer());
    }
}