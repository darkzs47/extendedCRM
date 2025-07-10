import {type FC, memo, useCallback} from "react";
import {useNavigate} from "react-router-dom";

interface Props {
    identity: string;
}

const AddIdentityButton: FC<Props> = ({ identity }) => {

    const navigate = useNavigate()

    const toAddIdentityPage = useCallback(() => {
        navigate(`/${identity}/add`)
    }, [])

    return (
        <div onClick={toAddIdentityPage}>
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
    )
}

export default memo(AddIdentityButton)