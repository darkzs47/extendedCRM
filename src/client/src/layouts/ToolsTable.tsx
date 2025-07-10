import {type FC, memo} from "react";
import ToolRow from "../components/ToolRow.tsx";
import type {ITool} from "../models/ITool.ts";

const ToolsTable: FC = () => {
    const tools: ITool[] = [
        {
            id: 3,
            name: 'q',
            categoryId: 5,
            purchasePrice: 1,
            sellPrice: 1,
            category: {
                id: 2,
                name: '1',
                markup: 1,
            }
        }
    ]

    return (
        <>
            <div>
                <a href='#' style={{width: '5rem', height: '5rem'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" style={{width: '2rem', height: '2rem'}} fill="none"
                         viewBox="0 0 24 24"
                         stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M12 4v16m8-8H4"/>
                    </svg>
                    Добавить
                </a>
            </div>
            <table>
                <thead>
                <tr>
                    <th>Название</th>
                    <th>Категория</th>
                    <th>Стоимость покупки</th>
                    <th>Стоимость продажи</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {tools.map(tool =>
                    <tr key={tool.id}>
                        <ToolRow tool={tool}/>
                    </tr>
                )}
                </tbody>
            </table>
        </>
    )
}

export default memo(ToolsTable);