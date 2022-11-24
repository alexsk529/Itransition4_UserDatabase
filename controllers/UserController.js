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
                    message: 'Incorrect signin data'
                })
            }

            const {email, password} = req.body;

            const user = await User.findOne({email});
            if (!user) return res.status(400).json({message: 'Incorrect email'})

            const isAuth = bcrypter.compare(password, user.password)
            if(!isAuth) return res.status(400).json({message: 'Incorrect password'})

            const jwtSecret = 'sec456ret';
            const token = jwt.sign(
                {userId: user._id},
                jwtSecret,
                {expiresIn:'1h'}
            );

            user.loginDate = `${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()} ${new Date().getHours()}:${new Date().getMinutes()}`;
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
                    message: 'Incorrect signup data'
                })
            }

            const {email, password, firstName, lastName} = req.body;

            const isUsed = await User.findOne({email})

            if (isUsed) {
                return res.status(300).json({message: 'This email is already registered'});
            }
            const passwordHashed = await bcrypter.hash(password, 12);

            const user = new User({
                email, password: passwordHashed, fullName:`${firstName} ${lastName}`
            })

            await user.save();

            res.status(201).json({message: 'The user has been created'});

        } catch (e) {
            console.log(e)
        }
    }

    async getData (req, res) {
        try {
            User.find({}, (err, data) =>{
                if (err) res.send(err);
                res.send(data);
            })
        } catch (e) {console.log(e)}
    }

    async deleteSelected (req, res) {
        const id = req.params.id.slice(1);
        const user = await User.findByIdAndDelete({_id: id});

        res.send(user);
    }

}

export default new UserController()