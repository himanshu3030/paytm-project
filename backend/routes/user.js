import express from 'express'
import jwt from 'jsonwebtoken'
import { User, Account } from '../db.js'
import zod, { string } from 'zod'
import JWT_SECRET from '../config.js';
import authmiddleware from '../middleware/index.js'


const router = express.Router();

const signupSchema = zod.object({
    firstname: zod.string(),
    lastname: zod.string(),
    username: zod.email(),
    password: zod.string().min(8)
})

router.post('/signup', async (req, res) => {

    const body = req.body;
    const { success } = signupSchema.safeParse(req.body);

    if (!success) {
       return res.status(411).json({
            message: "wrong inputs"
        })
    }

    const user = await User.findOne({
        username: body.username
    })

    if (user) {
       return res.status(411).json({
            message: "eamil is already taken/wrong inputs"
        })
    }

    const dbuser = await User.create(body);

    const userId = dbuser._id;

    await Account.create({
        userId,
        balance: Math.random() * 10000
    })

    const token = jwt.sign({
        userId: dbuser._id
    }, JWT_SECRET)


    res.status(200).json({
        message: "user created successfully",
        token
    })
})

const signinSchema = zod.object({
    username: zod.email(),
    password: zod.string()
})

router.post('/signin', async (req, res) => {
    const body = req.body;
    const { success } = signinSchema.safeParse(req.body);

    if (!success) {
        return res.status(411).json({
            message: "Email already taken/ Incorrect inputs"
        })
    }

    const exestinguser = await User.findOne({
        username: body.username,
        password: body.password
    });
    console.log( "exesting user : "+ exestinguser)

    if (exestinguser) {

        const token = jwt.sign({
            userId: exestinguser._id
        }, JWT_SECRET)


        return res.status(200).json({
            message: "signed successfully",
            _id: exestinguser._id,
            firstname: exestinguser.firstname,
            token: token
        });

    }

    return res.status(409).json({
        message: "Error while singing"
    });

});

const updateSchema = zod.object({
    username: string().optional(),
    password: string().optional()
})

router.put('/update', authmiddleware, async (req, res) => {
    const body = req.body;
    const { success } = updateSchema.safeParse(req.body)

    if (!success) {
        res.status(411).json({
            message: "Error while updating infomation"
        })
    }
    console.log(req.userId)
    try {
        const update_data = await User.updateOne(

            { _id: req.userId },
            { $set: body }

        )
        console.log(req.userId)
        res.status(200).json({
            message: "Updated successfully"
        })
    } catch (err) {
        res.status(411).json({
            message: "Error while updating infomation"
        })
    }
})

router.get('/bulk/', async (req, res) => {

    // const search = await User.find({}, {username: 1, _id:0}, {_id: req.userId})
    //  res.json({
    //     search
    //  })

    const filter = req.query.filter || "";
    console.log("***************" + filter + "*************************")

    const bulkuser = await User.find({
        $or: [{
            username: { "$regex": filter }
        }]
    })
    console.log(bulkuser)
    res.json({
        user: bulkuser.map(u => ({
            _id: u._id,
            username: u.username,
            lastname: u.lastname,
            firstname: u.firstname
        })
        )
    })


})

export default router;