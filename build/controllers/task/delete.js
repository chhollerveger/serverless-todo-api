import 'source-map-support/register';
import { TaskRequestDto } from '@protocols';
import { deleteTaskConstraint } from '@constraints';
import { converterToType } from '@utils';
import { HttpResponseCreator } from '@presentation';
export class DeleteTaskController {
    constructor(validator, deleteTaskService) {
        this.validator = validator;
        this.deleteTaskService = deleteTaskService;
    }
    async handle(data) {
        try {
            const error = this.validator.validateAgainstConstraints(data, deleteTaskConstraint());
            if (error) {
                return HttpResponseCreator.badRequest(error);
            }
            const request = converterToType(data, TaskRequestDto);
            await this.deleteTaskService.delete(request);
            return HttpResponseCreator.success('Task successfully deleted');
        }
        catch (error) {
            return HttpResponseCreator.serverError(error);
        }
    }
}
//# sourceMappingURL=delete.js.map