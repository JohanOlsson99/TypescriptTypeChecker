# Type checker
This code does type checking in typescript or javascript. This was created so you easily can add
type checking to your code, especially if when getting user input as requests and the if statements
is getting long. 
### Methods
The methods that exists in the Checker class are:
#### checkVariableType
This method checks if the variable is of the correct type.
The parameters are:
- variable: The variable that you want to check the type of.
- type: The type that you want to check the variable against.
- error: [optional] The error that you want to throw if the variable is not of the correct type.

#### checkNumber
This method checks if the variable is a number and if it is it checks against requirements passed in.
The parameters are:
- variable: The variable that you want to check the type of.
- error: [optional] The error that you want to throw if the variable is not of the correct type. Pass in undefined if you don't want to throw an error.
- requirements: [optional] The requirements that you want to check the variable against. Has to be of type NumberRequirements.
- radix: [optional] The radix that you want the number to be. Default is 10.

#### checkFloat
This method checks if the variable is a float and if it is it checks against requirements passed in.
The parameters are:
- variable: The variable that you want to check the type of.
- error: [optional] The error that you want to throw if the variable is not of the correct type. Pass in undefined if you don't want to throw an error.
- requirements: [optional] The requirements that you want to check the variable against. Has to be of type NumberRequirements.

### Types
The types which currently can be checked are:
```
string
number
boolean
object
array
function
undefined
null
regexp
Date
Error
```

### NumberRequirements
The number requirements are:
```
NumberRequirements {
    min: number [optional]
    max: number [optional]
    equalTo: number[] [optional]
    notEqualTo: number[] [optional]
}
```
### How to get started
Run `npm i type-checker-ts`
At the top of the file import with the following command:
```
import { Checker, Types } from 'type-checker-ts';
```
To run the code you can use the following example:
```

const checker = new Checker();

checker.checkVariableType('hello world', Types.STRING); // returns true

checker.checkVariableType('hello world', Types.STRING, new Error('Is not a string')); // returns true

checker.checkVariableType(2, Types.STRING, new Error('Is not a string')); // throws error

checker.checkVariableType(2, Types.STRING); // return false

try {
    checker.checkVariableType(2, Types.STRING, new Error('Is not a string'));
} catch (e: any) {
    if (e.message === 'Is not a string') {
        // will get here since 2 is not a string
    } else {
        throw e;
    }
}
```