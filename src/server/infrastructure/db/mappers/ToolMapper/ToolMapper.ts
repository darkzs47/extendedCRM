import {Tool} from "../../../../core/models/Tool/Tool";
import {ToolModel} from "../../models/ToolModel/ToolModel";

type ToolWithoutId = Omit<Tool, "id">;

export class ToolMapper {
    static toModel(data: ToolWithoutId): Partial<ToolModel> {
        return {
            name: data.name,
            sellPrice: data.sellPrice,
            categoryId: data.categoryId,
            purchasePrice: data.purchasePrice,
            supplierId: data.supplierId,
        }
    }
}