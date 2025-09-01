import jwt from "jsonwebtoken"
const generatetoken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET || "secret123", { expiresIn: "1h" })
}


export default generatetoken