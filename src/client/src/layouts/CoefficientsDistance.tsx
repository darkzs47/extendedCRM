import {memo, type FC} from "react";
import type {ICoefficientDistance} from "../models/ICoefficientDistance.ts";
import CoeffDistanceRow from "../components/CoeffDistanceRow.tsx";

const CoefficientsDistance: FC = () => {
    const coefficients: ICoefficientDistance[] = [{
        id: 1,
        minKm: 1,
        maxKm: 1,
        coefficient: 1,
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
                    <th>Минимальная дистанция(км)</th>
                    <th>Максимальная дистанция(км)</th>
                    <th>Коэффициент</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {coefficients.map(coefficient =>
                    <tr key={coefficient.id}>
                        <CoeffDistanceRow coefficient={coefficient}/>
                    </tr>
                )}
                </tbody>
            </table>
        </>
    )
}

export default memo(CoefficientsDistance);