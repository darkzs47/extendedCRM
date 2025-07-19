import {ToolModel} from "../models/ToolModel/ToolModel";
import {IToolRepository} from "../../../core/repositories/ToolRepository/IToolRepository";
import {CreateToolDto} from "../../../core/repositories/ToolRepository/dto/CreateToolDto";
import {UpdateToolDto} from "../../../core/repositories/ToolRepository/dto/UpdateToolDto";
import {ToolMapper} from "../mappers/ToolMapper/ToolMapper";
import {CategoryModel} from "../models/CategoryModel/CategoryModel";
import {SupplierModel} from "../models/SupplierModel/SupplierModel";
import {ITool} from "../../../../client/src/models/ITool";

export class ToolRepository implements IToolRepository {
    async getAllTools(): Promise<ToolModel[]> {
        const tools: ToolModel[] = await ToolModel.findAll(
            {
                include: [
                    {model: CategoryModel, as: 'category'},
                    {model: SupplierModel, as: 'supplier'},
                ],
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

        const updateData: Partial<ITool> = {};

        if (dto.purchasePrice !== null && dto.purchasePrice !== undefined) {
            updateData.purchasePrice = dto.purchasePrice;
        }

        if (dto.sellPrice !== null && dto.sellPrice !== undefined) {
            updateData.sellPrice = dto.sellPrice;
        }

        if (dto.isAvailable !== null && dto.isAvailable !== undefined) {
            updateData.isAvailable = dto.isAvailable;
        }

        if (dto.supplierId !== null && dto.supplierId !== undefined) {
            updateData.supplierId = dto.supplierId;
        }
        tool ? await tool.update(updateData) : null
        return tool
    }

    async deleteTool(id: number): Promise<ToolModel | null> {
        const tool: ToolModel | null = await ToolModel.findByPk(id)
        tool ? await tool.destroy() : null
        return tool
    }
}