import {ToolModel} from "../models/ToolModel/ToolModel";
import {IToolRepository} from "../../../core/repositories/ToolRepository/IToolRepository";
import {CreateToolDto} from "../../../core/repositories/ToolRepository/dto/CreateToolDto";
import {UpdateToolDto} from "../../../core/repositories/ToolRepository/dto/UpdateToolDto";
import {ToolMapper} from "../mappers/ToolMapper/ToolMapper";
import {CategoryModel} from "../models/CategoryModel/CategoryModel";

export class ToolRepository implements IToolRepository {
    async getAllTools(): Promise<ToolModel[]> {
        const tools: ToolModel[] = await ToolModel.findAll(
            {
                include: [
                    {model: CategoryModel, as: 'category'}],
            }
        );
        return tools;
    }

    async getToolById(id: number): Promise<ToolModel | null> {
        const tool: ToolModel | null = await ToolModel.findByPk(id)
        return tool;
    }

    async createTool(dto: CreateToolDto): Promise<ToolModel | null> {
        const tool: ToolModel | null = await ToolModel.create(ToolMapper.toModel(dto));
        return tool;
    }

    async updateTool(dto: UpdateToolDto): Promise<ToolModel | null> {
        const tool: ToolModel | null = await ToolModel.findByPk(dto.id)
        tool ? await tool.update(
            { purchasePrice: dto.purchasePrice ?? null, sellPrice: dto.sellPrice ?? null  },
        ) : null
        return tool
    }

    async deleteTool(id: number): Promise<ToolModel | null> {
        const tool: ToolModel | null = await ToolModel.findByPk(id)
        tool ? await tool.destroy() : null
        return tool
    }
}