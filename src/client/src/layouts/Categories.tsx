import {type FC, memo} from "react";
import type {ICategory} from "../models/ICategory.ts";
import CategoryRow from "../components/CategoryRow.tsx";

const Categories: FC = () => {
    const categories: ICategory[] = [{
        id: 1,
        name: 's',
        markup: 1,
    }];

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
                    <th>Категория</th>
                    <th>Наценка</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {categories.map(category =>
                    <tr key={category.id}>
                        <CategoryRow category={category}/>
                    </tr>
                )}
                </tbody>
            </table>
        </>
    )
}

export default memo(Categories);