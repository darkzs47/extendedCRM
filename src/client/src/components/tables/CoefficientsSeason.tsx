import  {type FC, memo, useEffect} from "react";
import type {ICoefficientSeason} from "../../models/ICoefficientSeason.ts";
import CoeffSeasonRow from "./rows/CoefficientSeason.tsx";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../store/store.ts";
import {getSeasonCoefficients} from "../../store/coefficients/actions.ts";

const CoeffSeason: FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const coefficients: ICoefficientSeason[] | null = useSelector((state: RootState) => state.coefficients.seasons)

    useEffect(() => {
        dispatch(getSeasonCoefficients())
    }, []);

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
                {coefficients?.map(coefficient =>
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