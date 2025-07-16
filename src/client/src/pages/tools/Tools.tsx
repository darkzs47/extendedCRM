import {type FC, memo, useCallback, useState} from "react";
import ToolsTable from "../layouts/ToolsTable.tsx";
import styles from "../styles/toolsMain.module.scss"
import AddIdentityButton from "../components/AddIdentityButton.tsx";

const Tools: FC = () => {

    const [isCreateNewTool, setIsCreateNewTool] = useState<boolean>(false)

    const handleAddNewTool = useCallback(() => {
        setIsCreateNewTool(!isCreateNewTool);
    }, [isCreateNewTool])

    const handleCancel = useCallback(() => {
        setIsCreateNewTool(!isCreateNewTool)
    }, [isCreateNewTool])

    return (
        <main className={styles.toolsMain}>
            <div className={styles.headerContainer}>
                <h3>Инструменты</h3>
                <AddIdentityButton
                    onClick={() => handleAddNewTool()}
                />
            </div>
            <ToolsTable
                isCreateNewTool={isCreateNewTool}
                setIsCreateNewTool={setIsCreateNewTool}
                onCancel={handleCancel}
            />
        </main>
    )
}

export default memo(Tools);