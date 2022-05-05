import 'source-map-support/register';
import { TaskRequestDto } from '@protocols';
import { updateTaskConstraint } from '@constraints';
import { converterToType } from '@utils';
import { BadRequestError, HttpResponseCreator } from '@presentation';
export class UpdateTaskController {
    constructor(validator, updateTaskService) {
        this.validator = validator;
        this.updateTaskService = updateTaskService;
    }
    async handle(data) {
        try {
            const error = this.validator.validateAgainstConstraints(data, updateTaskConstraint());
            if (error) {
                return HttpResponseCreator.badRequest(error);
            }
            const request = converterToType(data, TaskRequestDto);
            const isCompletedPresent = typeof request.completed !== 'undefined';
            if (!request.description && !isCompletedPresent) {
                const present = `description, completed`;
                return HttpResponseCreator.badRequest(new BadRequestError('Invalid request: at least one of them must be present.', { present }));
            }
            await this.updateTaskService.update(request);
            return HttpResponseCreator.success('Task successfully updated');
        }
        catch (error) {
            return HttpResponseCreator.serverError(error);
        }
    }
}
//# sourceMappingURL=update.js.map