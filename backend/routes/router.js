const express = require("express");
const router = express.Router();
const pdfParse = require("pdf-parse");
const fileUpload = require("express-fileupload");
const controllers = require("../controllers/userControllers");
const datacon = require("../controllers/dataContoller");

router.post("/signin" , controllers.userLogin);
router.post("/signup", controllers.userregister);
router.post("/otp", controllers.userOtpSend);
router.post("/savedata", datacon.UserData);
router.post("/sendData", datacon.getData);
router.post("/getRes", datacon.query);
router.post("/saveAnswer", datacon.saveAns);
router.post("/getAnswers",datacon.getAns);
// Middleware setup
router.use(fileUpload());

// POST route to extract text from PDF
router.post("/extract-text", (req, res) => {
    if (!req.files || !req.files.pdfFile) {
        return res.status(400).send("No PDF file uploaded.");
    }

    const pdfFile = req.files.pdfFile;

    pdfParse(pdfFile.data).then(parsedData => {
        res.send(parsedData.text);
    }).catch(err => {
        console.error("Error parsing PDF:", err);
        res.status(500).send("Error parsing PDF.");
    });
});

router.post("/addLink", (req,res) => {
    const {link} = req.body;
    if (!link)
    {
        return res.status(400).send("No link uploaded");
    }
    else
    {
        return res.status(200).send("Link uploaded");
    }
})
module.exports = router;