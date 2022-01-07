const express = require('express');
const app = express();
const mongoose = require("mongoose");
const userData = require("./user");

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

mongoose.connect("mongodb://localhost:27017/pagination")
    .then(() => {
        console.log("connection sucessfully...");
    }).catch(() => {
        console.log("not connected...");
    });

app.post("/register", async (req, res) => {
    try {
        const user = new userData(req.body);
        const userdata = await user.save();

        res.status(200).json({
            mes: "data save.",
            status: 200,
            data: userdata
        })
    } catch (error) {
        res.status(400).json({
            mes: "data not save.",
            status: 400
        })
    }
})

app.get("/user", async (req, res) => {
    try {
        const { page, size } = req.query;
        if (!page) {
            page = 1;
        }
        if (!size) {
            size = 1;
        }

        const limit = parseInt(size);
        const skip = (page - 1) * size;

        const user = await userData.find().limit(limit).skip(skip);

        res.status(200).json({
            mes: "user is display",
            status: 200,
            data: user
        })

    } catch (error) {
        res.status(400).json({
            mes: "data not display.",
            status: 400
        })
    }
});

// WITHOUT DATABASE

// const user = [
//     { id: 1, name: 'user 1' },
//     { id: 2, name: 'user 2' },
//     { id: 3, name: 'user 3' },
//     { id: 4, name: 'user 4' },
//     { id: 5, name: 'user 5' },
//     { id: 6, name: 'user 6' },
//     { id: 7, name: 'user 7' },
//     { id: 8, name: 'user 8' },
//     { id: 9, name: 'user 9' },
//     { id: 10, name: 'user 10' },
// ]


// app.get("/user", (req, res) => {
//     const page = req.query.page
//     const limit = req.query.limit

//     const startIndex = (page - 1) * limit
//     const endIndex = page * limit

//     const result = user.slice(startIndex, endIndex)
//     res.json(result);
// });

app.listen(8000, () => {
    console.log('port is running successfully..');
})