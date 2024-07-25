const express = require("express");
const router = express.Router();
const Auth = require("../middlewares/authentication");
const BmrController = require("../controllers/bmr.controllers");

router.post(
  "/add-bmr",
  Auth.checkJwtToken,
  Auth.authorizeUserRole(2),
  BmrController.postBMR
);

router.post(
  "/add-bmr-tab",
  Auth.checkJwtToken,
  Auth.authorizeUserRole(2),
  BmrController.postBMRTab
);

router.post(
  "/add-bmr-field",
  Auth.checkJwtToken,
  Auth.authorizeUserRole(2),
  BmrController.postBMRField
);

router.put(
  "/edit-bmr/:id",
  Auth.checkJwtToken,
  Auth.authorizeUserRole(2),
  BmrController.editBMR
);

router.put(
  "/edit-bmr-tab/:id",
  Auth.checkJwtToken,
  Auth.authorizeUserRole(2),
  BmrController.editBMRTab
);

router.put(
  "/edit-bmr-field/:id",
  Auth.checkJwtToken,
  Auth.authorizeUserRole(2),
  BmrController.editBMRField
);

router.delete(
  "/delete-bmr/:id",
  Auth.checkJwtToken,
  Auth.authorizeUserRole(2),
  BmrController.deleteBMR
);

router.delete(
  "/delete-bmr-tab/:id",
  Auth.checkJwtToken,
  Auth.authorizeUserRole(2),
  BmrController.deleteBMRTab
);

router.delete(
  "/delete-bmr-field/:id",
  Auth.checkJwtToken,
  Auth.authorizeUserRole(2),
  BmrController.deleteBMRField
);

router.get("/get-all-bmr", Auth.checkJwtToken, BmrController.getAllBMR);

router.put(
  "/send-BMR-for-review",
  Auth.checkJwtToken,
  Auth.authorizeUserRole(2),
  BmrController.SendBMRForReview
);

router.put(
  "/send-BMRfrom-review-to-open",
  Auth.checkJwtToken,
  Auth.authorizeUserRole(3),
  BmrController.SendBMRfromReviewToOpen
);

router.put(
  "/send-BMR-from-review-to-approval",
  Auth.checkJwtToken,
  Auth.authorizeUserRole(3),
  BmrController.SendBMRReviewToApproval
);

router.put(
  "/send-BMR-from-approval-to-open",
  Auth.checkJwtToken,
  Auth.authorizeUserRole(4),
  BmrController.SendBMRfromApprovalToOpen
);

router.put(
  "/approve-BMR",
  Auth.checkJwtToken,
  Auth.authorizeUserRole(4),
  BmrController.ApproveBMR
);

router.post(
  "/get-user-roles",
  Auth.checkJwtToken,
  BmrController.GetUserOnBasisOfRoleGroup
);

module.exports = router;
