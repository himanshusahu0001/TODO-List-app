const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("static"));

////////////////////////////////////////////////////////////////////////////////////////
mongoose.connect("mongodb+srv://himanshu00738:p1o2i3u4@cluster0.k3ruhxq.mongodb.net/todolistDB");
// mongoose.connect("mongodb://127.0.0.1:27017/todolistDB");

const ItemSchema = {
    task: String
};
const ItemModel = mongoose.model("Item", ItemSchema);

const item1 = new ItemModel({
    task: "Welcome to Your ToDo List!"
});
const item2 = new ItemModel({
    task: "Hit the + button to add a new task."
});
const item3 = new ItemModel({
    task: "<-- Hit this to delete a task."
});

const defautlItems = [item1, item2, item3];

////////////////////////////////////////////////////////////////////////////////////////
app.get("/", (req, res) => {
    ItemModel.find({}, (err, docs) => {
        if (docs.length === 0) {
            ItemModel.insertMany(defautlItems, (err) => {
                if (err) console.log(err);
                else console.log("successfully inserted items.");
            });
            res.redirect("/");
        } else {
            res.render("index", {date: date,list: docs});
        }
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        date: date,
        list: items
    });
});


app.post("/", function (req, res) {
    const newTask = req.body.newTask;
   
    const itemNew = new ItemModel({
        task : newTask
    });
    itemNew.save();
    res.redirect("/");
});

app.post("/delete", (req,res)=>{
    console.log(req.body.taskId);
    const Id = req.body.taskId;
    ItemModel.findByIdAndRemove(Id,(err)=>{
        if(!err) console.log("successfully deleted.")
    });
    res.redirect("/");
});



////////////////////////////////////////////////////////////////////////////////////////
app.listen( process.env.PORT || 3001, () => {
    console.log("server started at 3001.");
});


today = new Date();
const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
};
date = today.toLocaleDateString("hi-IN", options);