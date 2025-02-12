"use strict";

const EmptyCartException = require("./exceptions/EmptyCartException.js");
const UpdateCartException = require("./exceptions/UpdateCartException.js");

class Cart {
    //region private attributes
    #items;
    //endregion private attributes

    //region public methods
    constructor(items = []) {
        this.#items = items || [];
    }

    get items() {
        this.#checkEmptyCart();
        return this.#items;
    }

    get total() {
        this.#checkEmptyCart();
        return this.#items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0,
        );
    }

    count(distinct = false) {
        this.#checkEmptyCart();
        if (distinct) {
            return this.#items.length;
        }
        return this.#items.reduce((count, item) => count + item.quantity, 0);
    }

    add(items) {
        if (!Array.isArray(items) || items.length === 0) {
            throw new UpdateCartException();
        }
        this.#items.push(...items);
    }
    //endregion public methods

    //region private methods
    #checkEmptyCart() {
        if (this.#items.length === 0) {
            throw new EmptyCartException();
        }
    }
    //endregion private methods
}

module.exports = Cart;
