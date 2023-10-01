import express from "express";
import {
  accountVerification,
  allAccount,
  cleanProfileAccount,
  createAccount,
  firstAccountVerification,
  getSingleAccount,
  updateSingleAccount,
} from "../controller/authController";

const router = express.Router();

router.route("/create-account").post(createAccount);
router.route("/all-account").get(allAccount);

router.route("/:accountID/single-account").get(getSingleAccount);
router.route("/:accountID/update-account").patch(updateSingleAccount);

router.route("/:token/first-mail").post(firstAccountVerification);

router.route("/:token/verify-account").get(accountVerification);

router.route("/:accountID/clean-account").get(cleanProfileAccount);

export default router;
