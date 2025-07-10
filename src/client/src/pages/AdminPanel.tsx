import {type FC, memo} from 'react'
import {NavLink, Outlet} from 'react-router-dom';

const AdminPanel: FC = () => {

    return (
        <main>
            <h3>Страница администратора</h3>
                <nav>
                    <ul>
                        <li><NavLink to="users">Пользователи</NavLink></li>
                        <li><NavLink to='coefficients/distance'>Коэффициенты дистанции</NavLink></li>
                        <li><NavLink to='coefficients/season'>Коэффициенты сезонности</NavLink></li>
                        <li><NavLink to='categories'>Категории инструментов</NavLink></li>
                    </ul>
                </nav>
            <div>
                <Outlet/>
            </div>
        </main>
    )
}

export default memo(AdminPanel);