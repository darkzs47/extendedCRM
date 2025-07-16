import React, {memo, type FC, useCallback, useState, useEffect} from "react";
import type {ICoefficientDistance} from "../models/ICoefficientDistance.ts";
import CoeffDistanceRow from "../components/CoeffDistanceRow.tsx";
import {Button, InputNumber, Tooltip} from "antd";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../store/store.ts";
import {createDistanceCoefficients, getDistanceCoefficients} from "../store/coefficients/actions.ts";

interface Props {
    isCreateNewCoefficient: boolean;
    setIsCreateNewCoefficient: React.Dispatch<React.SetStateAction<boolean>>;
    onCancel: () => void;
}

const CoefficientsDistanceTable: FC<Props> = ( {isCreateNewCoefficient, setIsCreateNewCoefficient, onCancel}: Props ) => {
    const dispatch = useDispatch<AppDispatch>()
    const coefficients: ICoefficientDistance[] | null = useSelector((state: RootState) => state.coefficients.distances)
    if (!coefficients) {
        return <table>
            <thead>
                <tr>
                    <th>Минимальная дистанция(км)</th>
                    <th>Максимальная дистанция(км)</th>
                    <th>Коэффициент(%)</th>
                    <th>Действия</th>
                </tr>
            </thead>
        </table>
    }
    const [minKm, setMinKm] = useState<number>(coefficients[coefficients.length - 1].maxKm + 1)
    const [maxKm, setMaxKm] = useState<number>(minKm + 1)
    const [coefficient, setCoefficient] = useState<number>(1)

    const handleSubmitNewCoefficient = useCallback(() => {
        if (coefficient < 0 || coefficient > 100) return
        const request = {
            minKm: minKm,
            maxKm: maxKm,
            coefficient: coefficient,
        }

        dispatch(createDistanceCoefficients(request))
        setMinKm(maxKm + 1)
        setMaxKm(maxKm + 2)
        setCoefficient(1)
        setIsCreateNewCoefficient(!isCreateNewCoefficient)

    }, [minKm, maxKm, coefficient, dispatch])

    useEffect(() => {
        dispatch(getDistanceCoefficients())
    }, []);

    return (
        <>
            <table>
                <thead>
                <tr>
                    <th>Минимальная дистанция(км)</th>
                    <th>Максимальная дистанция(км)</th>
                    <th>Коэффициент(%)</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {coefficients.map(coefficient =>
                    <tr key={coefficient.id}>
                        <CoeffDistanceRow coefficient={coefficient}/>
                    </tr>
                )}
                {
                    isCreateNewCoefficient ? (
                        <tr>
                            <td>
                                {minKm}
                            </td>
                            <td>
                                <InputNumber
                                    min={minKm + 1}
                                    onChange={(value) => {
                                        if (value !== null) {
                                            setMaxKm(value);
                                        }
                                    }}
                                    value={maxKm}
                                />
                            </td>
                            <td>
                                <InputNumber
                                    onChange={(value) => {
                                        if (value !== null) {
                                            setCoefficient(value);
                                        }
                                    }}
                                    value={coefficient}
                                />
                            </td>
                            <td>
                                <Tooltip title="Сохранить">
                                    <Button
                                        onClick={() => {
                                            handleSubmitNewCoefficient()
                                        }}
                                        icon={<CheckOutlined/>}
                                        shape="circle"
                                        style={{color: '#2fff00'}}
                                    />
                                </Tooltip>

                                <Tooltip title="Отменить">
                                    <Button
                                        icon={<CloseOutlined/>}
                                        onClick={onCancel}
                                        shape="circle"
                                        style={{marginRight: 8}}
                                    />
                                </Tooltip>
                            </td>
                        </tr>
                    ) : null
                }
                </tbody>
            </table>
        </>
    )
}

export default memo(CoefficientsDistanceTable);