const express = require("express");
require("dotenv").config();
const cors = require("cors");
const FunctionRoute = require("./routes/FunctionRoute.js");
const ApplicationRoute = require("./routes/ApplicationRoute.js");
const Trackings = require("./routes/TrackingRoute.js");
const Waves = require("./routes/WaveRoute.js");
const Technologies = require("./routes/TechnologyRoute.js");
const TransformationLever = require("./routes/TransformationLeverRoute.js");
const Stage = require("./routes/StageRoute.js");
const ProcessRoute = require("./routes/ProcessRoute.js");
const TrackerRoute = require("./routes/TrackerRoute.js");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

// app.use('/swag', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get("/apis", (req, res, next) => {
  res.send("APIs are available.");
});

app.use("/cs/apis/function", FunctionRoute);
app.use("/cs/apis/application", ApplicationRoute);
app.use("/cs/apis/tracking", Trackings);
app.use("/cs/apis/waves", Waves);
app.use("/cs/apis/technology", Technologies);
app.use("/cs/apis/transformationlever", TransformationLever);
app.use("/cs/apis/stages", Stage);
app.use("/cs/apis/process", ProcessRoute);
app.use("/cs/apis/automation/tracker", TrackerRoute);
app.use("/cs/apis/images",express.static('uploads/functionImages'))

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
