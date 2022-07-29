"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Checker_1 = require("./Checker");
const checker = new Checker_1.Checker();
console.log(checker.checkVariableType('hello world', Checker_1.Types.STRING));
console.log(checker.checkVariableType('hello world', Checker_1.Types.STRING, new Error('Is not a string')));
try {
    checker.checkVariableType(2, Checker_1.Types.STRING, new Error('Is not a string'));
}
catch (e) {
    if (e.message === 'Is not a string') {
        // do something
        console.log('Do something');
    }
    else {
        throw e;
    }
}
