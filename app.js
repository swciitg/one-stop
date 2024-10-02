require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const routers = require("./routers");
const LastUpdate = require("./models/lastUpdate");
const { BASEURL, ADMINPANELROOT } = require("./helpers/constants");
const { adminJsRouter } = require("./admin_panel/admin-config");
const app = express();
const bcrypt = require("bcrypt");
const { errorHandler } = require("./middlewares/error.handler");
const { NotFoundError } = require("./errors/not.found.error");
const { createLastUpdateDocument } = require("./controllers/lastUpdateController");
const { UnauthorizedRequestError } = require("./errors/unauthorized.request.error");
const { scheduleOPIEmails } = require("./helpers/cronJobs/opiEmails");
const { scheduleMessChange } = require("./helpers/cronJobs/messChange");

console.log(bcrypt.hash("123",10));
//for serving static files
app.use(express.static("public"));

// setting ejs as view engine
app.set("view engine", "ejs");

// connect to mongodb
mongoose.set("strictQuery", false);

app.use(
    express.json({
        limit: "50mb",
        extended: true,
    })
);

console.log(BASEURL,ADMINPANELROOT);

// adminjs routes
app.use(ADMINPANELROOT, adminJsRouter);
app.use(BASEURL, routers.homePage.homePageRouter);

app.use(express.urlencoded({ extended: true }));

// enable CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization, Security-Key"
    );
    next();
});

app.use(BASEURL, routers.authRouter.authRouter);
app.use(BASEURL, routers.imageRouter.imageRouter);

//Validate API Call
app.use((req, res, next) => {
    console.log(req.path);
    console.log(req.body);
    if (req.headers["security-key"] !== process.env.SECURITY_KEY) {
        next(new UnauthorizedRequestError("You are not authorized app.js"));
    }
    next();
});

app.use(BASEURL, routers.notificationRouter);

// API routers
app.use(BASEURL, routers.onestopUserRouter);
app.use(BASEURL, routers.contactRouter.contactRouter);
app.use(BASEURL, routers.timingRouter);
app.use(BASEURL, routers.emailRouter.emailRouter);
app.use(BASEURL, routers.roleRouter.roleRouter);
app.use(BASEURL, routers.foodOutletsRouter.foodOutletsRouter);
app.use(BASEURL, routers.foodItemsRouter.foodItemsRouter);
app.use(BASEURL, routers.messMenuRouter.messMenuRouter);
app.use(BASEURL, routers.LostAndFoundRouters.LostAndFoundRouter);
app.use(BASEURL, routers.updateRouter.updateRouter);
app.use(BASEURL, routers.buyAndSellRouter.buyAndSellRouter);
app.use(BASEURL, routers.newsRouter.newsRouter);
app.use(BASEURL, routers.campusTravelRouter.campusTravelRouter);
app.use(BASEURL, routers.upspRouter);
app.use(BASEURL, routers.gcScoreboardRouter.gcScoreboardRouter);
app.use(BASEURL, routers.opiRouter.opiRouter);

app.use("*",(req,res) => {
    throw new NotFoundError("Route not found");
});

app.use(errorHandler);

// schedule cron jobs
try {
    scheduleOPIEmails();
    scheduleMessChange();
}
catch (e) {
    console.log("Error in scheduling OPI emails", e);
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    console.log(bcrypt.hashSync("123", 10));
    console.log(`Express server listening on port ${PORT} see docs at /docs`);
    await mongoose.connect(process.env.DATABASE_URI);
    console.log("Connected to MongoDB");
    await createLastUpdateDocument();
});
