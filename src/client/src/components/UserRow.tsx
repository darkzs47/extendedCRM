import {type FC, memo} from "react";
import type {IUser} from "../models/IUser.ts";

interface UserRowProps {
    user: IUser;
}

const UserRow: FC<UserRowProps> = ({user}) => {
    return (
        <>
            <th>{user.secondName} {user.name} {user.lastName}</th>
            <th>{user.email}</th>
            <th>{user.phone}</th>
            <th>{user.role}</th>
            <th>{user.supplierId}</th>
        </>
    )
}

export default memo(UserRow);