import express from "express";
import mongoose from "mongoose";
import Cors from "cors";

import Cards from "./dbCards.js";

// App Config
const app = express();
const port = process.env.PORT || 8080;

// MiddleWare
app.use(express.json());
app.use(Cors()); // cors add header to every request essential for security when things are online

// DB Config
const connection_url = "mongodb+srv://tinder-admin:VPomUKFjyyMtFCo6@cluster0.okqjo.mongodb.net/tinderDB?retryWrites=true&w=majority";
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

// API Endpoints
app.get("/", (req, res) => res.status(200).send("HELLO EVERYTHING IS FINE"));

app.post("/tinder/card", (req, res) => {
    const dbCard = req.body;

    Cards.create(dbCard, (err , data) => {
        if (err) {
            res.status(500).send(err); // INFO: status 500 means internal server error
        } else {
            res.status(201).send(data); // status 201 means created
        };
    });
})

app.get("/tinder/card", (req, res) => {
    Cards.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
});

// Listener
app.listen(port, () => console.log(`listening on http://localhost:${port}`));


// Link ==> https://www.youtube.com/watch?v=8oAns_nOcVU