
import jwt from "jsonwebtoken"
// import ("dotenv")("config")
import dotenv from 'dotenv';
dotenv.config()
export const jwtGenerate = (user) => {
    const accessToken = jwt.sign(
        { name: user.username, password: user.password },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "10m", algorithm: "HS256" }
    )
    return accessToken
}
export const jwtRefreshTokenGenerate = (user) => {
    const refreshToken = jwt.sign(
        { name: user.username, password: user.password },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "10m", algorithm: "HS256" }
    )
    return refreshToken
}
export const jwtValidate = (req, res, next) => {
    try {
        if (!req.headers["authorization"]) return res.sendStatus(401)

        const token = req.headers["authorization"].replace("Bearer ", "")

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) throw new Error(error)
        })
        next()
    } catch (error) {
        return res.sendStatus(403)
    }
}