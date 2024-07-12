const userdata = require("../schema/userData");

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