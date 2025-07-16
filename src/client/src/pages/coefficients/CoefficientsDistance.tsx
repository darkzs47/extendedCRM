import {type FC, memo, useCallback, useState} from "react";
import CoefficientsDistanceTable from "../layouts/CoefficientsDistanceTable.tsx";
import AddIdentityButton from "../components/AddIdentityButton.tsx";
import styles from "../styles/coefficietnsDistance.module.scss"

const CoefficientsDistance: FC = () => {
    const [isCreateNewCoefficient, setIsCreateNewCoefficient] = useState<boolean>(false);

    const handleAddNewCoefficient = useCallback(() => {
        setIsCreateNewCoefficient(!isCreateNewCoefficient)
    }, [isCreateNewCoefficient])

    const handleCancel = useCallback(() => {
        setIsCreateNewCoefficient(!isCreateNewCoefficient)
    }, [isCreateNewCoefficient])
    return (
        <>
            <div className={styles.headerContainer}>
                <h3>Коэффициенты дистанции</h3>
                <AddIdentityButton
                    onClick={handleAddNewCoefficient}
                />
            </div>
            <CoefficientsDistanceTable
                isCreateNewCoefficient={isCreateNewCoefficient}
                setIsCreateNewCoefficient={setIsCreateNewCoefficient}
                onCancel={handleCancel}
            />
        </>
    )
}

export default memo(CoefficientsDistance)