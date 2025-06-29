import  { IUserRepository } from "../../../core/repositories/UserRepository/IUserRepository";
import { User } from "../../../core/models/User/User";
import {CreateUserDto} from "../../../core/repositories/UserRepository/dto/createUserDto";
import * as fs from "fs/promises";
import {logger} from "../../../logger";

export class UserRepositoryJSON implements IUserRepository{
    constructor(readonly filePath: string) {}

    private async readFile(): Promise<User[]> {
        try {
            const data = await fs.readFile(this.filePath, 'utf-8');
            return JSON.parse(data);
        } catch {
            return [];
        }
    }

    private async writeFile(users: User[]): Promise<void> {
        await fs.writeFile(this.filePath, JSON.stringify(users, null, 2), 'utf-8');
    }

    async add(dto: CreateUserDto): Promise<User> {
        logger.info(dto)
        const users = await this.readFile();
        const user: User = { ...dto };
        users.push(user);
        await this.writeFile(users);
        return user;
    }
}
