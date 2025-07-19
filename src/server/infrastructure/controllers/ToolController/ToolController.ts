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
            res.status(constants.HTTP_STATUS_BAD_REQUEST).json({message: "Не удалось получить информацию об инструментах"})
            return;
        }
    }

    async createTool(req: Request, res: Response): Promise<void> {
        try {
            const { name, sellPrice, categoryId, purchasePrice, supplierId } = req.body
            const newTool: ToolModel = await this.toolService.createTool(new CreateToolDto( name, sellPrice, categoryId, purchasePrice, supplierId ))
            res.status(constants.HTTP_STATUS_OK).json(newTool)
            return
        } catch (e) {
            res.status(constants.HTTP_STATUS_BAD_REQUEST).json({message: "Не удалось создать инструмент"})
            return;
        }
    }

    async updateTool(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { purchasePrice, sellPrice, isAvailable, supplierId } = req.body;

            const safePurchasePrice = purchasePrice ?? null;
            const safeSellPrice = sellPrice ?? null;
            const safeIsAvailable = isAvailable ?? null;
            const safeSupplierId = supplierId ?? null;
            const toolUpdated: ToolModel = await this.toolService.updateTool(
                new UpdateToolDto(Number(id), safePurchasePrice, safeSellPrice, safeIsAvailable, safeSupplierId));
            res.status(constants.HTTP_STATUS_OK).json(toolUpdated)
            return
        } catch (e) {
            res.status(constants.HTTP_STATUS_BAD_REQUEST).json({message: "Не удалось изменить данные"})
            return;
        }
    }

    async deleteTool(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await this.toolService.deleteTool(Number(id))
            res.status(constants.HTTP_STATUS_OK).json({message: 'Инструмент успешно удален'})
            return
        } catch (e) {
            res.status(constants.HTTP_STATUS_CONFLICT).json({message: "Не удалось удалить инструмент"})
            return;
        }
    }
}