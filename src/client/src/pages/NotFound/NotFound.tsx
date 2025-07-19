import {type FC, memo} from "react";
import notfound from "../../../public/notfound.jpg"
import styles from "./404.module.scss"

const NotFound: FC = () => {
    return (
        <main className={styles.notFoundContainer}>
            <h2>Кажется, Вы попали на запрещённую для Вас страницу</h2>
            <h2>Попросите администратора выдать вам нужную роль или авторизуйтесь</h2>
            <img src={notfound} alt="ПУ-ПУ-ПУ"/>
        </main>
    )
}

export default memo(NotFound);