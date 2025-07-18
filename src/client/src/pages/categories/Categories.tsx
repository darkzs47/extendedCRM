import {type FC, memo, useCallback, useState} from "react";
import CategoriesTable from "../../components/tables/Categories.tsx";
import AddIdentityButton from "../../components/common/AddIdentityButton/AddIdentityButton.tsx";
import styles from "./categories.module.scss"

const Categories: FC = () => {

    const [isCreateNewCategory, setIsCreateNewCategory] = useState<boolean>(false)

    const handleAdd = useCallback(() => {
        setIsCreateNewCategory(prev => !prev);
    }, [isCreateNewCategory])

    return (
        <main>
            <div className={styles.headerContainer}>
                <h3>Категории</h3>
                <AddIdentityButton onClick={handleAdd}/>
            </div>
            <CategoriesTable
                isCreateNewCategory={isCreateNewCategory}
                setIsCreateNewCategory={setIsCreateNewCategory}
                onCancel={handleAdd}
            />
        </main>
    )
}

export default memo(Categories)