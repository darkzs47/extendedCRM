import {type FC, memo} from "react";

interface Props {
    handler: () => void;
}

const AddIdentityButton: FC<Props> = ({ handler }) => {
    return (
        <div>
            <a href='#' style={{width: '5rem', height: '5rem'}}>
                {/* ВЫНЕСТИ В КОМПОНЕНТ КНОПКУ И ИСПОЛЬЗОВАТЬ ЕЕ НА ВСЕХ СТРАНИЦАХ */}
                <svg xmlns="http://www.w3.org/2000/svg" style={{width: '2rem', height: '2rem'}} fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 4v16m8-8H4"/>
                </svg>
                Добавить
            </a>
        </div>
    )
}

export default memo(AddIdentityButton)