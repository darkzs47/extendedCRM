import {type FC, memo, useCallback, useState} from "react";
import type {IUser} from "../models/IUser.ts";
import { EditOutlined, DeleteOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons';
import {Button, Input, Select, Tooltip} from "antd";
import type {UserRole} from "../../../server/core/models/User/User.ts";
import {useDispatch} from "react-redux";
import type {AppDispatch} from "../store/store.ts";
import {deleteUser, updateUser} from "../store/users/actions.ts";

interface UserRowProps {
    user: IUser;
    isEditing: boolean;
    hideControls: boolean;
    onEdit: () => void;
    onCancel: () => void;
}

const roles: Record<string, string> = {
    admin: "Администратор",
    user: "Новый пользователь",
    supplier: "Поставщик",
    employee: "Сотрудник",
}

export type UserDataForUpdate = Omit<IUser, "name" | "secondName" | "lastName">

const UserRow: FC<UserRowProps> = ({ user, isEditing, onEdit, onCancel, hideControls }) => {
    const [email, setEmail] = useState<string>(user.email);
    const [phone, setPhone] = useState<string>(user.phone);
    const [role, setRole] = useState<UserRole>(user.role);
    const dispatch = useDispatch<AppDispatch>();
    // const [supplierId, setSupplierId] = useState<string SELECT!!! | undefined>(user.supplierId)

    const handleDeleteUser = useCallback((user: IUser) => {
        const confirmString = `Вы действительно хотите удалить пользователя ${user.secondName} ${user.name} ${user.lastName}`;
        if (confirm(confirmString)) dispatch(deleteUser({id: user.id}))
    }, [dispatch]);

    const handleSaveChanges = useCallback(async (user: IUser) => {
        const confirmString = `Вы действительно хотите изменить данные пользователя ${user.secondName} ${user.name} ${user.lastName}`;
        if (confirm(confirmString)) {
            const updatedData: UserDataForUpdate = {
                id: user.id,
                email,
                phone,
                role,
                // supplierId,
            };
            const result = await dispatch(updateUser(updatedData))
            if (!result.success) {
                setRole(user.role)
                setPhone(user.phone)
                setEmail(user.email)
            }
            onCancel()
        }
    }, [dispatch, email, phone, role, user])

    return (
        <>
            <th>{user.secondName} {user.name} {user.lastName}</th>
            {
                isEditing ? (
                    <>
                        <td>
                            <Input
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                        </td>
                        <td>
                            <Input
                                onChange={(e) => setPhone(e.target.value)}
                                value={phone}
                            />
                        </td>
                        <td>
                            <Select value={role} onChange={setRole}>
                                {Object.entries(roles).map(([key, label]) => (
                                    <Select.Option key={key} value={key}>
                                        {label}
                                    </Select.Option>
                                ))}
                            </Select>
                        </td>
                        {/*<td>*/}
                        {/*    <Input*/}
                        {/*        onChange={(e) => setSupplierId(e.target.value)}*/}
                        {/*        value={supplierId}*/}
                        {/*    />*/}
                        {/*</td>*/}
                        <td>
                            <Tooltip title="Сохранить">
                                <Button
                                    onClick={() => {handleSaveChanges(user)}}
                                    icon={<CheckOutlined />}
                                    shape="circle"
                                    style={{color: '#2fff00'}}
                                />
                            </Tooltip>

                            <Tooltip title="Отменить">
                                <Button
                                    icon={<CloseOutlined />}
                                    onClick={onCancel}
                                    shape="circle"
                                    style={{ marginRight: 8 }}
                                />
                            </Tooltip>
                        </td>
                    </>
                ) : (
                    <>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>{roles[user.role]}</td>
                        <td>{user.supplierId}</td>
                        {!hideControls && (
                            <td>
                                <Tooltip title="Редактировать пользователя">
                                    <Button
                                        icon={<EditOutlined />}
                                        onClick={onEdit}
                                        style={{ marginRight: 8 }}
                                        shape="circle"
                                    />
                                </Tooltip>
                                <Tooltip title="Удалить пользователя">
                                    <Button
                                        icon={<DeleteOutlined />}
                                        onClick={() => handleDeleteUser(user)}
                                        danger
                                        type="default"
                                        shape="circle"
                                    />
                                </Tooltip>
                            </td>
                        )}
                    </>
                )
            }
        </>
    )
}

export default memo(UserRow);