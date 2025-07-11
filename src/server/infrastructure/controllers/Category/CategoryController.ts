import {Request, Response} from "express";
import { CategoryService } from "../../../core/services/CategoryService/CategoryService";
import {CategoryModel} from "../../db/models/CategoryModel/CategoryModel";
import {constants} from "http2";
import {CreateCategoryDto} from "../../../core/repositories/CategoryRepository/dto/CreateCategoryDto";
import {UpdateMarkupCategoryDto} from "../../../core/repositories/CategoryRepository/dto/UpdateMarkupCategoryDto";

export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {    }

    async getAllCategories(req: Request, res: Response): Promise<void> {
        try {
            const categories: CategoryModel[] = await this.categoryService.getAllCategories();
            res.status(constants.HTTP_STATUS_OK).json(categories);
            return
        } catch (e) {
            res.status(constants.HTTP_STATUS_BAD_REQUEST).json({message: (e as Error).message})
            return;
        }
    }

    async createCategory(req: Request, res: Response): Promise<void> {
        try {
            const { name, markup } = req.body;
            const category: CategoryModel = await this.categoryService.createCategory(new CreateCategoryDto(name, markup));
            res.status(constants.HTTP_STATUS_OK).json(category);
            return
        } catch (e) {
            res.status(constants.HTTP_STATUS_BAD_REQUEST).json({message: (e as Error).message})
            return;
        }
    }

    async updateCategory(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { markup } = req.body;
            const categoryUpdated: CategoryModel = await this.categoryService.updateCategory(new UpdateMarkupCategoryDto(Number(id), markup));
            res.status(constants.HTTP_STATUS_OK).json(categoryUpdated);
            return
        } catch (e) {
            res.status(constants.HTTP_STATUS_BAD_REQUEST).json({message: (e as Error).message})
            return;
        }
    }

    async deleteCategory(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await this.categoryService.deleteCategory(Number(id))
            res.status(constants.HTTP_STATUS_OK).json({message: "Категория успешно удалена"})
            return
        } catch (e) {
            res.status(constants.HTTP_STATUS_CONFLICT).json({message: (e as Error).message})
            return;
        }
    }
}