import {type FC, memo, useCallback, useState} from "react";
import type {IUser} from "../models/IUser.ts";
import { EditOutlined, DeleteOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons';
import {Button, Input, Tooltip} from "antd";
import type {UserRole} from "../../../server/core/models/User/User.ts";

interface UserRowProps {
    user: IUser;
    isEditing: boolean;
    onEdit: () => void;
    onCancel: () => void;
}

const UserRow: FC<UserRowProps> = ({ user, isEditing, onEdit, onCancel }) => {
    const [email, setEmail] = useState<string>(user.email)
    const [phone, setPhone] = useState<string>(user.phone)
    const [role, setRole] = useState<UserRole>(user.role)
    // const [supplierId, setSupplierId] = useState<string SELECT!!! | undefined>(user.supplierId)

    const translatedRole = useCallback((role: string): string =>
        role === 'admin' ? 'Администратор' :
            (role === 'supplier' ? "Поставщик" :
                (role === 'employee' ? 'Сотрудник' : 'Новый пользователь'))
        , [])

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
                            <Input
                                // @ts-ignore
                                onChange={(e) => setRole(e.target.value)}
                                value={role}
                            />
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
                        <td>{translatedRole(user.role)}</td>
                        <td>{user.supplierId}</td>
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
                                    danger
                                    type="default"
                                    shape="circle"
                                />
                            </Tooltip>
                        </td>
                    </>
                )
            }
        </>
    )
}

export default memo(UserRow);