import {type FC, memo, useCallback, useState} from "react";
import CategoriesTable from "../layouts/CategoriesTable.tsx";
import AddIdentityButton from "../components/AddIdentityButton.tsx";
import styles from "../styles/categoriesMain.module.scss"

const Categories: FC = () => {

    const [isCreateNewCategory, setIsCreateNewCategory] = useState<boolean>(false)

    const handleAddNewCategory = useCallback(() => {
        setIsCreateNewCategory(!isCreateNewCategory);
    }, [isCreateNewCategory])

    const handleCancel = useCallback(() => {
        setIsCreateNewCategory(!isCreateNewCategory)
    }, [isCreateNewCategory])

    return (
        <>
            <div className={styles.headerContainer}>
                <h3>Категории</h3>
                <AddIdentityButton onClick={handleAddNewCategory}/>
            </div>
            <CategoriesTable
                isCreateNewCategory={isCreateNewCategory}
                setIsCreateNewCategory={setIsCreateNewCategory}
                onCancel={handleCancel}
            />
        </>
    )
}

export default memo(Categories)