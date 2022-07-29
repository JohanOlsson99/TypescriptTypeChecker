# Type checker for typescript
This code does type checking in typescript for different types.
This was created so you easily can add type checking to your code, especially if when getting user input as requests. 

```
const checker = new Checker();
checker.checkVariableType(variable: any, type: Types, error?: Error);
```
Where Types is a type from the enum Types, and error which is an optional error message if the type check fails.

Example:
```
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
```