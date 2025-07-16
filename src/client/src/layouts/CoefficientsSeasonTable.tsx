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