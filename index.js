import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
var todaysList =[];
var workList =[];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req,res) => {
    res.render("index.ejs");
});

app.get("/todaystasks", (req,res) => {
    res.render("todaystasks.ejs", {
        todaysList: todaysList
    });
});

app.get("/worktasks", (req,res) => {
    res.render("worktasks.ejs", {
        workList: workList
    });
});

app.post("/todaysTasksSubmit", (req,res) => {
    if (req.body["newTodaysListItem"].length > 0) {
        todaysList.push(req.body["newTodaysListItem"]);
    }
    res.render("todaystasks.ejs", {
        newTodaysListItem: req.body["newTodaysListItem"],
        todaysList: todaysList
    });
});

app.post("/workTasksSubmit", (req,res) => {
    if (req.body["newWorkListItem"].length > 0) {
    workList.push(req.body["newWorkListItem"]);
    }
    res.render("worktasks.ejs", {
        newWorkListItem: req.body["newWorkListItem"],
        workList: workList
    });
});

app.post("/todaysTasksClearList", (req,res) => {
    todaysList = [];
    res.render("todaystasks.ejs");
});

app.post("/workTasksClearList", (req,res) => {
    workList = [];
    res.render("worktasks.ejs");
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});