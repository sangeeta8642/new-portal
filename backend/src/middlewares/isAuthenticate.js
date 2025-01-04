import jwt from "jsonwebtoken";
import { sendResponse } from "../utils/apiResponse.js";

const isAunthenticate = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return sendResponse(res, 401, "Unautheticated user");
    }

    const decode = jwt.verify(token, process.env.SECRET_KEY);

    if (!decode) {
      return sendResponse(res, 401, "Invalid token");
    }

    req.id = decode.UserId;

    next();
  } catch (error) {
    return sendResponse(res, 500, error.message);
  }
};

export default isAunthenticate;
