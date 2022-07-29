'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Types = exports.Checker = void 0;
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
    Types["REGEXP"] = "regexp";
    Types["DATE"] = "date";
    Types["ERROR"] = "error";
})(Types = exports.Types || (exports.Types = {}));
