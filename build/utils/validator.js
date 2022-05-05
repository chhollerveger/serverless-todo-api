import { validate } from 'validate.js/validate';
import { BadRequestError } from '@presentation';
export class Validator {
    validateAgainstConstraints(values, constraints) {
        const validation = validate(values, constraints);
        if (typeof validation !== 'undefined') {
            return new BadRequestError('required fields are missing', { validation });
        }
    }
}
//# sourceMappingURL=validator.js.map