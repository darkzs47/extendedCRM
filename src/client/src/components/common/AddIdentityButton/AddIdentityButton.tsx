import {type FC, memo} from "react";
import {Button} from "antd";
import styles from "./addIdentityButton.module.scss"

interface Props {
    onClick: () => void;
}

const AddIdentityButton: FC<Props> = ({ onClick }: Props) => {

    return (
        <div>
            <Button
                type='primary'
                onClick={onClick}
                className={styles.addButtons}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ width: '1rem', height: '1rem' }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4v16m8-8H4"
                    />
                </svg>
                Добавить
            </Button>
        </div>
    )
}

export default memo(AddIdentityButton)