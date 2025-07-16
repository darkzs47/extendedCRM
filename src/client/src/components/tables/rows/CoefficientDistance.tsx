import {type FC, memo, useCallback, useState} from "react";
import {Button, InputNumber, Tooltip} from "antd";
import {CheckOutlined, CloseOutlined, DeleteOutlined, EditOutlined} from "@ant-design/icons";
import type {ICoefficientDistance} from "../models/ICoefficientDistance.ts";
import {useDispatch} from "react-redux";
import type {AppDispatch} from "../store/store.ts";
import {
    deleteDistanceCoefficients,
    updateDistanceCoefficients,
} from "../store/coefficients/actions.ts";

export interface CoeffDistanceRowProps {
    coefficient: ICoefficientDistance;
}

const CoeffDistanceRow: FC<CoeffDistanceRowProps> = ({coefficient}: CoeffDistanceRowProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [newCoefficient, setNewCoefficient] = useState<number>(coefficient.coefficient)

    const handleEditing = useCallback(() => {
        setIsEditing(prev => !prev)
    }, [isEditing])

    const handleSaveChanges = useCallback((coefficient: ICoefficientDistance) => {
        if (coefficient.coefficient === newCoefficient) return
        const request = {
            id: coefficient.id,
            coefficient: newCoefficient,
        }

        dispatch(updateDistanceCoefficients(request))
        handleEditing();
    }, [newCoefficient, dispatch, coefficient])

    const handleDelete = useCallback((coefficient: ICoefficientDistance) => {
        const confirmString = `
        Вы действительно хотите удалить коэффициент от ${coefficient.minKm} км до ${coefficient.maxKm} км? 
        Нераспределённое расстояние автоматически распределится между другими коэффициентами.`
        if (confirm(confirmString)){
            const request = {
                id: coefficient.id
            }
            dispatch(deleteDistanceCoefficients(request))
        }
    }, [dispatch, coefficient])

    return (
        <>
            <td>{coefficient.minKm} КМ.</td>
            <td>{coefficient.maxKm} КМ.</td>
            {isEditing ? (
                <>
                    <td>
                        <InputNumber
                            min={1}
                            max={2}
                            step={0.01}
                            onChange={(value) => {
                                if (value !== null) {
                                    setNewCoefficient(value);
                                }
                            }}
                            value={newCoefficient}
                        />
                    </td>
                    <td>
                        <Tooltip title="Сохранить">
                            <Button
                                onClick={() => handleSaveChanges(coefficient)}
                                icon={<CheckOutlined />}
                                shape="circle"
                            />
                        </Tooltip>

                        <Tooltip title="Отменить">
                            <Button
                                icon={<CloseOutlined />}
                                onClick={() => handleEditing()}
                                shape="circle"
                            />
                        </Tooltip>
                    </td>
                </>
            ) : (
                <>
                    <td>{coefficient.coefficient}</td>
                    <td>
                        <Tooltip title="Редактировать коэффициент">
                            <Button
                                onClick={handleEditing}
                                icon={<EditOutlined/>}
                                shape="circle"
                            />
                        </Tooltip>
                        <Tooltip title="Удалить коэффициент">
                            <Button
                                onClick={() => handleDelete(coefficient)}
                                icon={<DeleteOutlined/>}
                                danger
                                type="default"
                                shape="circle"
                            />
                        </Tooltip>
                    </td>
                </>
            )
            }
        </>
    )
}

export default memo(CoeffDistanceRow);