import express from "express";
import basicProfileRoute from "./routes/basicProfile.js"
import emergencyInformationRoute from "./routes/emergencyInformation.js"
import englishScoreRoute from "./routes/englishScore.js"
import aptitudeScoreRoute from "./routes/aptitudeScore.js"
import tenthScoreRoute from "./routes/tenthScore.js"
import twelvethScoreRoute from "./routes/twelvethScore.js"
import ugScoreRoute from "./routes/ug.js"
import pgScoreRoute from "./routes/pg.js"
import experienceRoute from "./routes/experience.js"
import passportRoute from "./routes/passportInformation.js"

const app = express()
app.use(express.json())

app.use("/api/basicprofile", basicProfileRoute)
app.use("/api/emergencyInformation", emergencyInformationRoute)
app.use("/api/englishscore",englishScoreRoute)
app.use("/api/aptitudescore",aptitudeScoreRoute)
app.use("/api/tenthscore",tenthScoreRoute)
app.use("/api/twelvethscore",twelvethScoreRoute)
app.use("/api/ugscore",ugScoreRoute)
app.use("/api/pgscore",pgScoreRoute)
app.use("/api/experience",experienceRoute)
app.use("/api/passport",passportRoute)




app.listen(5000, () => {

    console.log("server is live");
})