import express from 'express'
import authmiddleware from '../middleware/index.js';
import { Account } from '../db.js';
import mongoose from 'mongoose';
const router = express.Router();

router.get('/balance', authmiddleware, async (req, res) => {

    const account = await Account.findOne({
        userId: req.userId
    })
    res.status(200).json({
        balance: account.balance
    })
})

router.post('/transfer', authmiddleware, async (req, res) => {

    const session = await mongoose.startSession();

    
    try {
        session.startTransaction()
        const touser = req.body.touser
        const amount = req.body.amount

        //  console.log("***********"+req.body+"************")
        //  console.log("***********"+amount+"************")
        //  console.log("***********"+req.userId+"************")

        const SenderAccount = await Account.findOne({
            userId: req.userId
        }).session(session)

        const ReceverAccount = await Account.findOne({
            userId: touser
        }).session(session)

        if (!ReceverAccount || !SenderAccount) {
            // await session.abortTransaction();
            // return res.status(400).json({
            //     messgae: "Enterd account is Invalid"
            // })
            // throw new error("Enterd account is invalid")
            throw new Error("Enterd account is invalid")
        }

        if (SenderAccount.balance < amount) {
            // await session.abortTransaction();
            // return res.status(400).json({
            //     message: "Insufficient balance"
            // })
            throw new Error('insufficent balance')
        }

        console.log(SenderAccount.balance)
        // console.log(typeof (SenderAccount.balance))
        console.log(ReceverAccount.balance)

        await Account.updateOne(
            {
                userId: req.userId
            },
            {
                $inc: {
                    balance: -amount
                }
            }
        ).session(session)

        await Account.updateOne(
            {
                userId: touser
            },
            {
                $inc: {
                    balance: amount
                }
            }
        ).session(session)

        await session.commitTransaction();

        return res.json({
            message: "transfer Successfull"
        })
    } catch (error) {
        await session.abortTransaction()
        return res.status(500).json({
            message: 'transfer failed',
            error: error.message
        })

    } finally {
        await session.endSession();
    }

})

export default router

    //     const touser = req.body.touser
    //     const amount = req.body.amount

    //     console.log("***********" + req.body + "************")
    //     console.log("***********" + touser + "************")
    //     console.log("***********" + amount + "************")

    //     res.json({
    //         message: "request is successfull"
    //     })
    // })
