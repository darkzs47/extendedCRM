import {type FC, memo} from "react";
import CoefficientsSeasonTable from "../../components/tables/CoefficientsSeason.tsx";

const CoefficientsSeason: FC = () => {
    return (
        <>
            <div>
                <h3>Коэффициенты сезонности</h3>
            </div>
            <CoefficientsSeasonTable/>
        </>
    )
}

export default memo(CoefficientsSeason)