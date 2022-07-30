'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Types = exports.Checker = void 0;
class Checker {
    /**
     *
     * @param variable The variable to check
     * @param type The type to check for
     * @param error The error to throw if the check fails
     * @returns boolean if not error has been thrown
     */
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
        else if (type === Types.OBJECT) {
            if (Array.isArray(variable)) {
                isOk = false;
            }
            else {
                isOk = typeof variable === 'object';
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
    /**
     * Will check the variable type, if the type is number we will check for requirements
     * and then return. If the variable type is string we try to parse it to a int with
     * specified radix. If the parse is successful we check for requirements and return true.
     * @param variable The variable to check
     * @param error The error to throw if the check fails
     * @param requirements The requirements to check for
     * @param radix The radix to use for parsing
     * @returns boolean
     */
    checkNumber(variable, error, requirements, radix = 10) {
        let num = 0;
        let numHasChanged = false;
        let isInt = this.checkVariableType(variable, Types.NUMBER);
        if (isInt) {
            num = variable;
            numHasChanged = true;
        }
        if (!numHasChanged) {
            let isString = this.checkVariableType(variable, Types.STRING);
            if (isString) {
                if (!radix) {
                    radix = 10;
                }
                num = parseInt(variable, radix);
                numHasChanged = true;
            }
        }
        if (!numHasChanged && error) {
            throw error;
        }
        else if (!numHasChanged) {
            return false;
        }
        let passRequirements = this.checkRequirements(num, requirements);
        if (passRequirements) {
            return true;
        }
        else {
            if (error) {
                throw error;
            }
            return false;
        }
    }
    /**
     * Check number requirements, if the requirements are not met we will return false;
     * If any checks fails we return false, otherwise true
     * @param num The number to check
     * @param requirements The requirements to check for
     * @returns boolean
     */
    checkRequirements(num, requirements) {
        if (!requirements) {
            return true;
        }
        if (requirements.min && num < requirements.min) {
            return false;
        }
        if (requirements.max && num > requirements.max) {
            return false;
        }
        if (requirements.equalTo && requirements.equalTo !== []
            && requirements.equalTo.indexOf(num) === -1) {
            return false;
        }
        if (requirements.notEqualTo && requirements.notEqualTo !== []
            && requirements.notEqualTo.indexOf(num) !== -1) {
            return false;
        }
        return true;
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
    Types["REGEXP"] = "regexp";
    Types["DATE"] = "date";
    Types["ERROR"] = "error";
})(Types || (Types = {}));
exports.Types = Types;
