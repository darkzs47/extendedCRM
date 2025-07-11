import {CreateToolDto} from "../../repositories/ToolRepository/dto/CreateToolDto";
import {UpdateToolDto} from "../../repositories/ToolRepository/dto/UpdateToolDto";
import {IToolRepository} from "../../repositories/ToolRepository/IToolRepository";
import {ToolModel} from "../../../infrastructure/db/models/ToolModel/ToolModel";

export class ToolService {
    constructor(readonly toolRepository: IToolRepository) {    }

    async getAllTools(): Promise<ToolModel[]> {
        const tools: ToolModel[] = await this.toolRepository.getAllTools()
        return tools;
    }

    async createTool(dto: CreateToolDto): Promise<ToolModel> {
        const tool: ToolModel | null = await this.toolRepository.createTool(dto);
        if (!tool) throw new Error(`Не удалось создать инструмент`);
        return tool;
    }

    async updateTool(dto: UpdateToolDto): Promise<ToolModel> {
        const tool: ToolModel | null = await this.toolRepository.updateTool(dto)
        if (!tool) throw new Error(`Не удалось обновить информацию`);
        return tool;
    }

    async deleteTool(id: number): Promise<void> {
        const deleteResult = await this.toolRepository.deleteTool(id)
        if (!deleteResult) throw new Error(`Не удалось удалить инструмент`);
        return;
    }
}