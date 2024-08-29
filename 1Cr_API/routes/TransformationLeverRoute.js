const {
  createTransformationLever,
  getAllTransformationLeverDetails,
  getTransformationLeverById,
  updateTransformationLever,
  ActivateTransforamtion,
  DeactivateTransforamtion,
  getAllActiveTransformationLeverDetails,
  GetTransformationName,
} = require("../controllers/TransformationleverController");

const TransformationLeverRoute = require("express").Router();

TransformationLeverRoute.post(
  "/createTransformation",
  createTransformationLever
);

TransformationLeverRoute.get(
  "/get/transformationlevername",
  GetTransformationName
);

TransformationLeverRoute.get(
  "/getTransformation",
  getAllTransformationLeverDetails
);

TransformationLeverRoute.get(
  "/getAllActiveTransformation",
  getAllActiveTransformationLeverDetails
);
TransformationLeverRoute.get(
  "/fetchtransformationbyid",
  getTransformationLeverById
);
TransformationLeverRoute.post(
  "/updateTransformationLever",
  updateTransformationLever
);
TransformationLeverRoute.post(
  "/ActiveTransformationLever",
  ActivateTransforamtion
);
TransformationLeverRoute.post(
  "/DeactiveTransformationLever",
  DeactivateTransforamtion
);

module.exports = TransformationLeverRoute;
