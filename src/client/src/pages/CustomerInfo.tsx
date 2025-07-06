import {type FC, memo} from "react";
import {useParams} from "react-router-dom";

const customerInfo: FC = () => {
    const { id } = useParams()

    return (
        <>

        </>
    )
}

export default memo(customerInfo);