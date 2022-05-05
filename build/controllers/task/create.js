import 'source-map-support/register';
import { TaskRequestDto } from '@protocols';
import { createTaskConstraint } from '@constraints';
import { converterToType } from '@utils';
import { HttpResponseCreator } from '@presentation';
export class CreateTaskController {
    constructor(validator, createTaskService) {
        this.validator = validator;
        this.createTaskService = createTaskService;
    }
    async handle(data) {
        try {
            const error = this.validator.validateAgainstConstraints(data, createTaskConstraint());
            if (error) {
                return HttpResponseCreator.badRequest(error);
            }
            const request = converterToType(data, TaskRequestDto);
            const taskId = await this.createTaskService.create(request);
            return HttpResponseCreator.success('Task successfully added', { taskId });
        }
        catch (error) {
            return HttpResponseCreator.serverError(error);
        }
    }
}
//# sourceMappingURL=create.js.map