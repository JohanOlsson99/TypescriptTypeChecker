'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Checker = void 0;
class Checker {
    checkVariableType(variable, type, error) {
        let isOk = false;
        if (type === Types.ARRAY) {
            isOk = Array.isArray(variable);
        }
        else if (type === Types.NULL) {
            isOk = variable === null;
        }
        else if (type === Types.REGEXP) {
            isOk = variable instanceof RegExp;
        }
        else if (type === Types.DATE) {
            isOk = variable instanceof Date;
        }
        else if (type === Types.ERROR) {
            isOk = variable instanceof Error;
        }
        else if (type === Types.JSON) {
            try {
                JSON.parse(variable);
                isOk = true;
            }
            catch (e) {
                isOk = false;
            }
        }
        else if (typeof variable === type) {
            isOk = true;
        }
        if (isOk) {
            return true;
        }
        else {
            if (error) {
                throw error;
            }
            return false;
        }
    }
    checkValueNotEmpty(variable, type, error) {
        this.checkVariableType(variable, type, error);
    }
}
exports.Checker = Checker;
var Types;
(function (Types) {
    Types["STRING"] = "string";
    Types["NUMBER"] = "number";
    Types["BOOLEAN"] = "boolean";
    Types["OBJECT"] = "object";
    Types["ARRAY"] = "array";
    Types["FUNCTION"] = "function";
    Types["UNDEFINED"] = "undefined";
    Types["NULL"] = "null";
    Types["SYMBOL"] = "symbol";
    Types["REGEXP"] = "regexp";
    Types["DATE"] = "date";
    Types["ERROR"] = "error";
    Types["JSON"] = "json";
})(Types || (Types = {}));
console.log('1');
console.log(new Checker().checkVariableType(2, Types.STRING, new Error('Custom error')));
console.log('2');
console.log(new Checker().checkVariableType(1, Types.NUMBER));
console.log('3');
console.log(new Checker().checkVariableType(true, Types.BOOLEAN));
console.log('4');
console.log(new Checker().checkVariableType({}, Types.OBJECT));
console.log('5');
console.log(new Checker().checkVariableType([1], Types.ARRAY));
console.log('6');
console.log(new Checker().checkVariableType(function () { }, Types.FUNCTION));
console.log('7');
console.log(new Checker().checkVariableType(undefined, Types.UNDEFINED));
console.log('8');
console.log(new Checker().checkVariableType(null, Types.NULL));
console.log('9');
console.log(new Checker().checkVariableType(Symbol(), Types.SYMBOL));
console.log('10');
console.log(new Checker().checkVariableType(/a/, Types.REGEXP));
console.log('11');
console.log(new Checker().checkVariableType(new Date(), Types.DATE));
console.log('12');
console.log(new Checker().checkVariableType(new Error(), Types.ERROR));
console.log('13');
console.log(new Checker().checkVariableType({ a: 1 }, Types.JSON));
