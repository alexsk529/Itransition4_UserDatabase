import {validationResult} from "express-validator";
import User from "../models/User.js";
import bcrypter from "bcryptjs";
import jwt from "jsonwebtoken";


class UserController {
    async signin (req,res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Invalid data'
                })
            }

            const {email, password} = req.body;

            const user = await User.findOne({email});
            if (!user) return res.status(400).json({message: 'Incorrect email'})
            if (user.status === 'Blocked') return res.status(403).json({message: 'This user has been blocked'})

            const isAuth = await bcrypter.compare(password, user.password)
            if(!isAuth) return res.status(400).json({message: 'Incorrect password'})

            const jwtSecret = 'sec456ret';
            const token = jwt.sign(
                {userId: user._id},
                jwtSecret,
                {expiresIn:'1h'}
            );

            user.loginDate = `${new Date().toLocaleString()}`
            user.save();

            res.json({token, userId: user._id});


        } catch (e) {
            console.log(e)
        }
    }

    async signup (req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect data'
                })
            }

            const {email, password, firstName, lastName} = req.body;

            const isUsed = await User.findOne({email})

            if (isUsed) {
                return res.status(300).json({message: 'This email is already registered'});
            }
            const passwordHashed = await bcrypter.hash(password, 12);

            const user = new User({
                email, password: passwordHashed, fullName:`${firstName[0].toUpperCase() + firstName.slice(1).toLowerCase()} ${lastName[0].toUpperCase() + lastName.slice(1).toLowerCase()}`
            })

            await user.save();

            res.status(201).json({message: 'You have successfully signed up'});

        } catch (e) {
            console.log(e)
        }
    }

    async getData (req, res) {
        try {
            await User.find({})
                .then(data => res.send(data))
        } catch (e) {console.log(e)}
    }

    async deleteSelected (req, res) {
        const id = req.params.id.slice(1);
        await User.findByIdAndDelete({_id: id});

        await User.find({})
            .then(data => res.send(data))
    }

    async blockUnblock (req,res) {
        const path = req.url.split('/')[1];
        const id = req.params.id.slice(1);
        const user = await User.findById({_id: id}, )
        user.status = path === 'block' ? 'Blocked' : 'Unrestricted'
        await user.save()

        await User.find({})
            .then(data => res.send(data))
    }

}

export default new UserController()