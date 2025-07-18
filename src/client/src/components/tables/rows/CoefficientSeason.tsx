import {type FC, memo, useCallback, useState} from "react";
import {Button, InputNumber, Tooltip} from "antd";
import {CheckOutlined, CloseOutlined, EditOutlined} from "@ant-design/icons";
import type {ICoefficientSeason} from "../../../models/ICoefficientSeason.ts";
import {useDispatch} from "react-redux";
import type { AppDispatch } from "../../../store/store.ts";
import {updateSeasonCoefficients} from "../../../store/coefficients/actions.ts";

export interface CoeffSeasonRowProps {
    coefficient: ICoefficientSeason;
}

const CoefficientSeason: FC<CoeffSeasonRowProps> = ({coefficient}: CoeffSeasonRowProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [newCoefficient, setNewCoefficient] = useState<number>(coefficient.coefficient)

    const handleEditing = useCallback(() => {
        setIsEditing(prev => !prev)
    }, [isEditing])

    const handleSaveChanges = useCallback((coefficient: ICoefficientSeason) => {
        if (newCoefficient === coefficient.coefficient) return
        const request = {
            id: coefficient.id,
            coefficient: newCoefficient,
        }

        dispatch(updateSeasonCoefficients(request))
        handleEditing();
    }, [newCoefficient, dispatch, coefficient])

    return (
        <>
            {isEditing ? (
                <>
                    <td>{coefficient.season}</td>
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
                                type="text"
                                icon={<CheckOutlined style={{ color: 'green' }} />}
                                onClick={() => handleSaveChanges(coefficient)}
                            />
                        </Tooltip>

                        <Tooltip title="Отменить">
                            <Button
                                type="text"
                                icon={<CloseOutlined/>}
                                onClick={() => handleEditing()}
                            />
                        </Tooltip>
                    </td>
                </>
            ) : (
                <>
                    <td>{coefficient.season}</td>
                    <td>{coefficient.coefficient}</td>
                    <td>
                        <Tooltip title="Редактировать коэффициент">
                            <Button
                                type="text"
                                icon={<EditOutlined/>}
                                onClick={() => handleEditing()}
                            />
                        </Tooltip>
                    </td>
                </>
            )
            }
        </>
    )
}

export default memo(CoefficientSeason);