const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const dotenv = require('dotenv')
const path = require('path')
const db = require(path.join(__dirname,'..','config','db.js'))

dotenv.config()

//Register api
const register = async(req, res) => {
    try {
        const { name, email, password, role } = req.body
        if(!name || !email || !password){
            return res.status(400).json({error:"All fields are required"})
        }
        const [exist] = await db.execute('SELECT * from users WHERE email = ?', [email])
        if(exist.length>0){
            return res.status(400).json({error:"Email is already exist"})
        }
        const hashPassword = await bcrypt.hash(password,10)
        const [add] = await db.execute('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', 
            [name, email, hashPassword, role || 'employee'])
        return res.status(201).json({message:"User successfully created"})
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}

//Login User
const login = async(req, res) => {
    try {
        const { email, password } = req.body
        if(!email || !password){
            return res.status(400).json({error:"All fields are required"})
        }
        const [user]  = await db.execute('SELECT * from users WHERE email = ?',[email])
        if(user.length === 0) {
            res.status(404).json({message:"No user found"})
        }
        const foundUser = user[0]
        const isMatch = await bcrypt.compare(password,foundUser.password)
        if(!isMatch){
            return res.status(401).json({error:"Invalid password"})
        }
        const token = jwt.sign(
            { id: foundUser.id, role:foundUser.role },
            process.env.JWT_SECRET,
            { expiresIn : process.env.JWT_EXPIRES_IN || '1h' }
        )
        return res.json({message:"Login successfully",token})

    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}

module.exports = { register, login }