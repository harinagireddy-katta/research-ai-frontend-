const userdata = require("../schema/userData");
const mongoose = require("mongoose");

exports.UserData = async (req,res) => {
    const {email, data} = req.body;
    
    try {
        const savedata = userdata({
            email, data
        });
        const storedate = await savedata.save();
        res.status(200).json({storedate});
    }
    catch (error){
        res.status(400).json({error : "Error saving the link"});
    }
};

exports.getData = async (req,res) => {
    const {email} =  req.body;

    try {
        const users = await userdata.find({email});
        if (users.length===0)
            {
                return res.status(400).send({ error: 'No users found with this email.' });
            }
        res.send(users);
    } catch (error) {
        res.status(400).send({ error: 'Server error.' });
    }
};

// exports.query = async(req,res)=>{
//     const {name, query} = req.body;
//     if (!query)
//     {
//         res.status(400).send({error:"Send the text"});
//     }
//     const answer = "hello";
//     res.json(answer);
// }
exports.query = async (req, res) => {
    try {
        const { name, query } = req.body;
        if (!name || !query) {
            return res.status(400).json({ error: "Both name and query must be provided" });
        }
        
        // Process your logic here
        
        const answer = "hello";
        res.json({ answer });
    } catch (error) {
        console.error("Error in query handler:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
