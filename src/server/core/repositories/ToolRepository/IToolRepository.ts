import { ToolModel } from "../../../infrastructure/db/models/ToolModel/ToolModel";
import {CreateToolDto} from "./dto/CreateToolDto";
import { UpdateToolDto } from "./dto/UpdateToolDto";

export interface IToolRepository {
    getAllTools(): Promise<ToolModel[]>;
    createTool(dto: CreateToolDto): Promise<ToolModel | null>;
    updateTool(dto: UpdateToolDto): Promise<ToolModel | null>;
    deleteTool(id: number): Promise<ToolModel | null>;
}