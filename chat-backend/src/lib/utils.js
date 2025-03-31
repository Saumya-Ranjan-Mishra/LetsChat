import jwt from "jsonwebtoken"

export const generateToken = (userId, res) =>
{
    const token = jwt.sign({userId}, "mysecretkey", {
        expiresIn: "7d"
    })

    res.cookie("jwt", token, {
        maxAge: 7 * 24* 60 * 60* 1000,
        httpOnly: true, // prevents from XSS attacks
        sameSite: "strict", // prevents from CSRF
        secure: false
    })

    return token;
}