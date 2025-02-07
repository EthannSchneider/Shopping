"use strict";

const InvalidArticleIdException = require("./exceptions/InvalidArticleIdException.js");
const InvalidQuantityException = require("./exceptions/InvalidQuantityException.js");
const InvalidPriceException = require("./exceptions/InvalidPriceException.js");

module.exports = class CartItem {

    //region private attributes
    #articleId;
    #name;
    #quantity;
    #price;
    //endregion private attributes

    //region public methods
    constructor(articleId, name, quantity, price) {
        this.#validate(articleId < 1, new InvalidArticleIdException());
        this.#articleId = articleId;
        this.#name = name;
        this.quantity = quantity;
        this.price = price;
    }

    get articleId() {
        return this.#articleId;
    }

    get name() {
        return this.#name;
    }

    get quantity() {
        return this.#quantity;
    }

    set quantity(value) {
        this.#validate(value < 1, new InvalidQuantityException());
        this.#quantity = value;
    }

    get price() {
        return this.#price;
    }

    set price(value) {
        this.#validate(value < 10, new InvalidPriceException());
        this.#price = value;
    }

    get total() {
        return this.#quantity * this.#price;
    }
    //endregion public methods

    //region private methods
    #validate(isValid, exception) {
        if (isValid) {
            throw exception;
        }
    };
    //endregion private methods
}
