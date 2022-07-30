'use strict'

class Checker {
    /**
     * 
     * @param variable The variable to check
     * @param type The type to check for
     * @param error The error to throw if the check fails
     * @returns boolean if not error has been thrown
     */
    public checkVariableType(variable: any, type: Types, error?: Error): boolean {
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
            } else {
                isOk = typeof variable === 'object';
            }

        }
        else if (typeof variable === type) {
            isOk = true;
        }

        if (isOk) {
            return true;
        } else {
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
    public checkNumber(
            variable: any, error?: Error,
            requirements?: NumberRequirements, radix: number = 10): boolean {
        let num: number = NaN;
        let numHasChanged: Boolean = false;
        let isInt = this.checkVariableType(variable, Types.NUMBER);
        if (isInt) {
            num = parseInt((variable as number).toString(), radix);
            numHasChanged = true;
        }
        if (!numHasChanged) {
            let isString = this.checkVariableType(variable, Types.STRING);
            if (isString) {
                num = parseInt(variable as string, radix);
                numHasChanged = true;
            }
        }
        if ((num === NaN || !numHasChanged) && error) {
            throw error;
        } else if (!numHasChanged) {
            return false;
        }
        let passRequirements = this.checkRequirements(num, requirements);
        if (passRequirements) {
            return true;
        } else {
            if (error) {
                throw error;
            }
            return false;
        }
    }

    /**
     * Will check the variable type, if the type is number we will check for requirements
     * and then return. If the variable type is string we try to parse it to a float with
     * specified radix. If the parse is successful we check for requirements and return true.
     * @param variable The variable to check
     * @param error The error to throw if the check fails
     * @param requirements The requirements to check for
     * @returns boolean
     */
    public checkFloat(
            variable: any, error?: Error,
            requirements?: NumberRequirements): boolean {
        let num: number = NaN;
        let numHasChanged: Boolean = false;
        let isInt = this.checkVariableType(variable, Types.NUMBER);
        if (isInt) {
            num = parseFloat((variable as number).toString());
            numHasChanged = true;
        }
        if (!numHasChanged) {
            let isString = this.checkVariableType(variable, Types.STRING);
            if (isString) {
                num = parseFloat(variable as string);
                numHasChanged = true;
            }
        }
        if ((num === NaN || !numHasChanged) && error) {
            throw error;
        } else if (!numHasChanged) {
            return false;
        }
        let passRequirements = this.checkRequirements(num, requirements);
        if (passRequirements) {
            return true;
        } else {
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
    private checkRequirements(num: number, requirements?: NumberRequirements): boolean {
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

enum Types {
    STRING = 'string',
    NUMBER = 'number',
    BOOLEAN = 'boolean',
    OBJECT = 'object',
    ARRAY = 'array',
    FUNCTION = 'function',
    UNDEFINED = 'undefined',
    NULL = 'null',
    REGEXP = 'regexp',
    DATE = 'date',
    ERROR = 'error',
}

/**
 * NumberRequirements
 * @property { number } min - minimum value.
 * @property { number } max - maximum value.
 * @property { number[] } equalTo - has to be equal to one of the values
 * @property { number[] } notEqualTo - has to be not equal to one of the values.
 * lower priority goes first
 */
interface NumberRequirements {
    min?: number; // minimum value it can be
    max?: number; // maximum value it can be
    equalTo?: number[]; // values it can be
    notEqualTo?: number[]; // values it can't be
}

export { Checker, Types, NumberRequirements };
