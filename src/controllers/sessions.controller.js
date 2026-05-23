import bcrypt from "bcrypt"

import User
from "../models/User.js"

export const register =
    async (req, res) => {

        const {
            first_name,
            email,
            password
        } = req.body

        const existingUser =
            await User.findOne({ email })

        if (existingUser) {

            return res.send(
                "Usuario ya existe"
            )

        }

        const hashedPassword =
            bcrypt.hashSync(
                password,
                10
            )

        await User.create({

            first_name,
            email,

            password:
                hashedPassword,

            role: "user"

        })

        res.redirect("/")

}

export const login =
    async (req, res) => {

        const {
            email,
            password
        } = req.body

        const user =
            await User.findOne({ email })

        if (!user) {

            return res.send(
                "Usuario no encontrado"
            )

        }

        const isValid =
            bcrypt.compareSync(

                password,
                user.password

            )

        if (!isValid) {

            return res.send(
                "Contraseña incorrecta"
            )

        }

        req.session.user = {

            id: user._id,

            email:
                user.email,

            role:
                user.role,

            first_name:
                user.first_name

        }

        res.redirect("/")

}

export const logout =
    (req, res) => {

        req.session.destroy(() => {

            res.redirect("/")

        })

}