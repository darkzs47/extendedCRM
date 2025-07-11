import {ToolModel} from "../models/ToolModel/ToolModel";
import {IToolRepository} from "../../../core/repositories/ToolRepository/IToolRepository";
import {CreateToolDto} from "../../../core/repositories/ToolRepository/dto/CreateToolDto";
import {UpdateToolDto} from "../../../core/repositories/ToolRepository/dto/UpdateToolDto";
import {ToolMapper} from "../mappers/ToolMapper/ToolMapper";

export class ToolRepositoryPostgres implements IToolRepository {
    async getAllTools(): Promise<ToolModel[]> {
        const toolsModels: ToolModel[] = await ToolModel.findAll();
        return toolsModels;
    }

    async createTool(dto: CreateToolDto): Promise<ToolModel | null> {
        const tool: ToolModel | null = await ToolModel.create(ToolMapper.toModel(dto));
        return tool;
    }

    async updateTool(dto: UpdateToolDto): Promise<ToolModel | null> {
        const tool: ToolModel | null = await ToolModel.findByPk(dto.id)
        tool?.update(
            { purchasePrice: dto.purchasePrice ?? null, sellPrice: dto.sellPrice ?? null  },
        )
        return tool
    }

    async deleteTool(id: number): Promise<ToolModel | null> {
        const tool: ToolModel | null = await ToolModel.findByPk(id)
        tool ? await tool.destroy() : null
        return tool;
    }
}