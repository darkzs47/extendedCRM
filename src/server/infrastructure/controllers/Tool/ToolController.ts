import {Request, Response} from "express";
import {constants} from "http2";
import {CreateToolDto} from "../../../core/repositories/ToolRepository/dto/CreateToolDto";
import {UpdateToolDto} from "../../../core/repositories/ToolRepository/dto/UpdateToolDto";
import {ToolService} from "../../../core/services/ToolService/ToolService";
import {ToolModel} from "../../db/models/ToolModel/ToolModel";
import {logger} from "../../../logger";

export class ToolController {
    constructor(
        readonly toolService: ToolService,
    ) {}

    async getAllTools(req: Request, res: Response): Promise<void> {
        try {
            const tools: ToolModel[] = await this.toolService.getAllTools()
            res.status(constants.HTTP_STATUS_OK).json(tools)
            return
        } catch (e) {
            res.status(constants.HTTP_STATUS_BAD_REQUEST).json({message: (e as Error).message})
            return;
        }
    }

    async createTool(req: Request, res: Response): Promise<void> {
        try {
            const { name, sellPrice, categoryId, purchasePrice, supplierId } = req.body
            const tool: ToolModel = await this.toolService.createTool(new CreateToolDto( name, sellPrice, categoryId, purchasePrice, supplierId ))
            res.status(constants.HTTP_STATUS_OK).json(tool)
            return
        } catch (e) {
            res.status(constants.HTTP_STATUS_BAD_REQUEST).json({message: (e as Error).message})
            return;
        }
    }

    async updateTool(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { purchasePrice, sellPrice } = req.body;
            const toolUpdated: ToolModel = await this.toolService.updateTool(new UpdateToolDto(Number(id), purchasePrice, sellPrice));
            res.status(constants.HTTP_STATUS_OK).json(toolUpdated)
            return
        } catch (e) {
            res.status(constants.HTTP_STATUS_BAD_REQUEST).json({message: (e as Error).message})
            return;
        }
    }

    async deleteTool(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await this.toolService.deleteTool(Number(id))
            res.status(constants.HTTP_STATUS_OK).json({message: 'Инструмент успешно удален'})
        } catch (e) {
            res.status(constants.HTTP_STATUS_CONFLICT).json({message: (e as Error).message})
            return;
        }
    }
}