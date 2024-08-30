const userdata = require("../schema/userData");
const userAns = require("../schema/saveans");
const mongoose = require("mongoose");
const axios = require('axios');

exports.UserData = async (req,res) => {
    const {email, data} = req.body;
    
    try {
        const response = await axios.post('http://0.0.0.0:5300/embeddings', {"username":email, "dataname":data});
        const answer = response.data.message; 
        console.log(answer);
        const savedata = userdata({
            email, data
        });
        const storedate = await savedata.save();
        //res.status(200).json({storedate});
        res.json({answer});
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

exports.query = async (req, res) => {
   
    try {
        const { username, query } = req.body;
        if (!username || !query) {
            return res.status(400).json({ error: "Both name and query must be provided" });
        }
        
        // Process your logic here
        
        //const answer = "hello";
        const response = await axios.post('http://0.0.0.0:5200/getResponse', {username, query});
        const answer = response.data.message; 
        console.log(answer);
        //res.end( JSON.stringify(answer.message) );
        res.json({answer});
    } catch (error) {
        console.error("Error in query handler:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.saveAns = async(req,res) =>{
    try {
        const { email, answer } = req.body;
        const newAnswer = new userAns({ email, answer });
        await newAnswer.save();
        res.status(200).json({ message: 'Answer saved successfully' });
    } catch (error) {
        console.error('Error saving answer:', error);
        res.status(500).json({ message: 'Error saving answer' });
    }
};

exports.getAns = async(req,res) =>{
    const {email} =  req.body;

    try {
        const users = await userAns.find({email});
        if (users.length===0)
            {
                return res.status(400).send({ error: 'No users found with this email.' });
            }
        res.send(users);
    } catch (error) {
        res.status(400).send({ error: 'Server error.' });
    }
};