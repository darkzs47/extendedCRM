import bcrypt from 'bcrypt';

const password = process.argv[2]; // берём пароль из аргументов
const saltRounds = 10;

bcrypt.hash(password, saltRounds).then((hash: string) => {
    console.log('Хэш:', hash);
});