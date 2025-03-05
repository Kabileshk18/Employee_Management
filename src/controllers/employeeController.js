const path = require('path')
const db = require(path.join(__dirname,'..','config','db.js'))


//Add Employees
const addEmployee = async(req, res) => {
    try {
        const { name, email, position, salary } = req.body
        if (!name || !email || !position || !salary) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const [result] = await db.execute('INSERT INTO employees (name, email, position, salary) VALUES (?, ?, ?, ?)',
            [name, email, position, salary])
            res.status(201).json({message:'Employee added', employeeId: result.insertId})
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
    
//Get All Employees
const getAllEmployee = async(req, res) => {
    try {
        const [rows] = await db.execute('SELECT * from employees')
        if(!rows){
            res.status(404).json({message:"No data found"})
        }
        res.json(rows)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

//Get Specific Employee
const getSpecificEmployee = async(req, res) => {
    const id = req.params.id
    if(!id){
        res.status(400).json({message:"Kindly give Employee id"})
    }
    const [present] = await db.execute('SELECT * FROM employees WHERE id = ?',[id])
    if(!present){
        res.status(404).json({message:"No User found"})
    }
    res.json(present[0])
}

//Update Specific Employee
const updateSpecificEmployee = async(req, res) => {
    try {
        const { name, email, position, salary } = req.body
        const [ id ] = req.params.id
        if (!name || !email || !position || !salary || !id) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const [present] = await db.execute('SELECT * FROM employees WHERE id = ?',[id])
        if(!present){
            res.status(404).json({message:"No User found"})
        }
        const [result] = await db.execute('UPDATE employees set name = ?, email = ?, position = ?, salary = ? WHERE id = ? ', [name, email, position, salary, id])
        res.status(200).json(result)
        
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}


//Delete Specific Employee
const deleteSpecificEmployee = async(req, res) => {
    const id=req.params.id
    if(!id){
        res.status(400).json({message:"Kindly give Employee id"})
    }
    const [present] = await db.execute('SELECT * FROM employees WHERE id = ?', [id])
    if(!present){
        res.status(404).json({message:"No User Found"})
    }
    const del = await db.execute('Delete from employees WHERE id = ?', [id])
    res.status(200).json({message:"Deleted Successfully"})
}

module.exports = { addEmployee, getAllEmployee, getSpecificEmployee, deleteSpecificEmployee, updateSpecificEmployee }