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