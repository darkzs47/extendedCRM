import {type FC, memo} from "react";
import CoefficientsSeasonTable from "../../components/tables/CoefficientsSeason.tsx";

const CoefficientsSeason: FC = () => {
    return (
        <main>
            <div>
                <h3>Коэффициенты сезонности</h3>
            </div>
            <CoefficientsSeasonTable/>
        </main>
    )
}

export default memo(CoefficientsSeason)