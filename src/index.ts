'use strict'

export class Checker {
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

    public checkValueNotEmpty(variable: any, type: Types, error?: Error): any {
        this.checkVariableType(variable, type, error);
    }
}

export enum Types {
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