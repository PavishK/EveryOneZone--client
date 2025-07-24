import bcryptjs from 'bcryptjs';

export async function hashPassword(password) {
    const salt=Number(process.env.SALT);
    return await bcryptjs.hash(password,salt);
}

export async function verifyPassword(hash,password) {
    return await bcryptjs.compare(password,hash);
}