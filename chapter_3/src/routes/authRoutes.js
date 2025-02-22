import express from "express"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from "../db.js";

const router=express.Router();
//Register a new user endpoint /auth/register route .
router.post('/register',(req,res)=>{
   // const body=req.body; give us acces to the json body of the incoming request
    const {username,password}=req.body;
    const hashedPassword=bcrypt.hashSync(password,8)

    // save the new user and hashed password to the db
    try{

        const insertUser=db.prepare(` INSERT INTO users(username,password) values (?,?)  `)

        const result=insertUser.run(username,hashedPassword);

        //now tat we have the user , i want to add their fisrt todo for them
        const defaultTodo= `Hello! Add your first todo!`
        const insertTodo=db.prepare(`INSERT INTO todos(user_id,task) values (?,?)`)
        insertTodo.run(result.lastInsertRowid,defaultTodo)

        // Create a token : associate a special token or key with that network request that confirms they are in fact authentificated user
        const token=jwt.sign({id:result.lastInsertRowid},process.env.JWT_SECRET,{expiresIn: '24h'})
        res.json({token})

    }catch(err){
        console.log(err.message)
        res.sendStatus(503)
    }

})

router.post('/login',(req,res)=>{

    const {username,password}= req.body
    try{
        const getUser=db.prepare(` SELECT *  FROM users where username= ? `)
        const user=getUser.get(username)
        if (!user){return res.status(404).send({message:"user not found"})}

    }catch{
        console.log(err.message)
        res.sendStatus(503)

    }
})

export default router
