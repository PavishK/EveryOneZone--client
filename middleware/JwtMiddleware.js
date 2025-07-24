import JWT from 'jsonwebtoken';

export function generateToken(payload){
    const secret=process.env.JWT_SECRET;
    return JWT.sign(payload,secret,{expiresIn:'30m'});
}

export function verifyToken(token){
    const secret=process.env.JWT_SECRET;
    try {
        return {...JWT.verify(token,secret),expired:false};
    } catch (error) {
        return {expired:true};
    }
}