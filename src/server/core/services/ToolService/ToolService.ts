import {CreateToolDto} from "../../repositories/ToolRepository/dto/CreateToolDto";
import {UpdateToolDto} from "../../repositories/ToolRepository/dto/UpdateToolDto";
import {IToolRepository} from "../../repositories/ToolRepository/IToolRepository";
import {ToolModel} from "../../../infrastructure/db/models/ToolModel/ToolModel";
import {Tool} from "../../models/Tool/Tool";

export class ToolService {
    constructor(readonly toolRepository: IToolRepository) {    }

    async getAllTools(): Promise<ToolModel[]> {
        const tools: ToolModel[] = await this.toolRepository.getAllTools()
        return tools;
    }

    async getToolById(toolId: number): Promise<ToolModel> {
        const tool: ToolModel | null = await this.toolRepository.getToolById(toolId)
        if (!tool) throw new Error(`Не удалось найти инструмент`);
        return tool;
    }

    async createTool(dto: CreateToolDto): Promise<ToolModel> {
        const newTool: ToolModel | null = await this.toolRepository.createTool(dto);
        if (!newTool) throw new Error(`Инструмент не создан`);
        return newTool;
    }

    async updateTool(dto: UpdateToolDto): Promise<ToolModel> {
        const tool: ToolModel | null = await this.toolRepository.updateTool(dto)
        if (!tool) throw new Error(`Информация не обновлена`);
        return tool;
    }

    async deleteTool(id: number): Promise<ToolModel> {
        const tool: ToolModel | null = await this.toolRepository.deleteTool(id)
        if (!tool) throw new Error(`Не удалось удалить инструмент`);
        return tool;
    }
}