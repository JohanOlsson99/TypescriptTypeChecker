import { Checker, Types } from './Checker';

const checker = new Checker();
console.log(checker.checkVariableType('hello world', Types.STRING));
console.log(checker.checkVariableType('hello world', Types.STRING, new Error('Is not a string')));
try {
    checker.checkVariableType(2, Types.STRING, new Error('Is not a string'));
} catch (e: any) {
    if (e.message === 'Is not a string') {
        // do something
        console.log('Do something');
    } else {
        throw e;
    }
}
