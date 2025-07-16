import {ToolModel} from "../../models/ToolModel/ToolModel";
import {CreateToolDto} from "../../../../core/repositories/ToolRepository/dto/CreateToolDto";

export class ToolMapper {
    static toModel(data: CreateToolDto): Partial<ToolModel> {
        return {
            ...data
        }
    }
}