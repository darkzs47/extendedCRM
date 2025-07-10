import {type FC, memo} from "react";
import type {ICoefficientSeason} from "../models/ICoefficientSeason.ts";
import CoeffSeasonRow from "../components/CoeffSeasonRow.tsx";

const CoeffSeason: FC = () => {
    const coefficients: ICoefficientSeason[] = [{
        id: 1,
        season: 'Лето',
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
                    <th>Сезон</th>
                    <th>Коэффициент</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {coefficients.map(coefficient =>
                    <tr key={coefficient.id}>
                        <CoeffSeasonRow coefficient={coefficient}/>
                    </tr>
                )}
                </tbody>
            </table>
        </>
    )
}

export default memo(CoeffSeason);