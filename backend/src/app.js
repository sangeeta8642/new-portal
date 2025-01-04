import e from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import UserRoute from "./routes/user.route.js";
import ArticleRoute from "./routes/article.route.js";

const app = e();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(e.json());
app.use(cookieParser());
app.options("*", cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (_, res) => {
  return res.json("Im running");
});

app.use("/api/v1/user", UserRoute);
app.use("/api/v1/article", ArticleRoute);

app.post("/api/v1/logout", async (_, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
    return sendResponse(res, 200, "logout successfull", true);
  } catch (error) {
    return sendResponse(res, 500, error.message);
  }
});

export { app };
