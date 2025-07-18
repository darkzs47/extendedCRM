import {type FC, memo, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../store/store.ts";
import {getAllUsers} from "../../store/users/actions.ts";
import UserRow from "./rows/User.tsx";
import type {IUser} from "../../models/IUser.ts";

const Users: FC = () => {
    const users: IUser[] | null = useSelector((state: RootState) => state.users.users);
    const currentUser: IUser | null = useSelector((state: RootState) => state.currentUser.currentUser)
    const dispatch = useDispatch<AppDispatch>()
    const [editingUserId, setEditingUserId] = useState<number | null>(null);

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    return (
        <>
            <table>
                <thead>
                <tr>
                    <th>ФИО</th>
                    <th>Email</th>
                    <th>Телефон</th>
                    <th>Роль</th>
                    <th>Поставщик</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {users?.map((user) =>
                    <tr key={user.id}>
                        <UserRow
                            user={user}
                            isEditing={editingUserId === user.id}
                            onEdit={() => setEditingUserId(user.id)}
                            onCancel={() => setEditingUserId(null)}
                            hideControls={currentUser?.id === user.id || user.role === 'admin'}
                        />
                    </tr>
                )}
                </tbody>
                <tfoot></tfoot>
            </table>
        </>
    )
}

export default memo(Users);