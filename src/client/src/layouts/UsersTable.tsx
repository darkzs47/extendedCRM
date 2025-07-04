import {type FC, memo, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../store/store.ts";
import type {IUser} from "../models/IUser.ts";
import {getAllUsers} from "../store/users/actions.ts";
import UserRow from "../components/UserRow.tsx";

const UsersTable: FC = () => {
    const usersFromStore = useSelector((state: RootState) => state.users.users);
    const dispatch = useDispatch<AppDispatch>()

    const [users, setUsers] = useState<IUser[] | null>(null)

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    useEffect(() => {
        setUsers(usersFromStore);
    }, [usersFromStore]);

    return (
        <table>
            <thead>
            <tr>
                <th>ФИО</th>
                <th>Email</th>
                <th>Телефон</th>
                <th>Роль</th>
                <th>Поставщик</th>
            </tr>
            </thead>
            <tbody>
                {users?.map((user) =>
                    <tr key={user.id}>
                        <UserRow user={user}/>
                    </tr>
                )}
            </tbody>
            <tfoot></tfoot>
        </table>
    )
}

export default memo(UsersTable);