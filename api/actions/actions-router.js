// "eylem" routerını buraya yazın
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const ActionModels = require("./actions-model");
const {
  logger,
  actionExistingCheck,
  actionValidation,
} = require("./actions-middlware");

const router = express.Router();
router.use(express.json());
router.use(cors());

router.use(logger);

router.get("/", (req, res, next) => {
  ActionModels.get()
    .then((response) => res.status(200).json(response))
    .catch((err) =>
      next({ code: 500, message: process.env.MESSAGE || "database problem" })
    );
});

router.get("/:id", actionExistingCheck, (req, res, next) => {
  res.status(200).json(req.response);
});

router.post("/", actionValidation, (req, res, next) => {
  ActionModels.insert(req.body)
    .then((response) => res.status(201).json(response))
    .catch((err) =>
      next({ code: 500, message: process.env.MESSAGE || "database problem" })
    );
});

router.put("/:id", actionExistingCheck, actionValidation, (req, res, next) => {
  ActionModels.update(req.params.id, req.body)
    .then((response) => res.status(201).json(response))
    .catch((err) =>
      next({ code: 500, message: process.env.MESSAGE || "database problem" })
    );
});

router.delete("/:id", actionExistingCheck, (req, res, next) => {
  ActionModels.remove(req.params.id)
    .then((res) => res.status(201).json())
    .catch((err) =>
      next({ code: 500, message: process.env.MESSAGE || "database problem" })
    );
});

router.use((err, req, res, next) => {
  res.status(err.code).json({ message: err.message });
});

module.exports = router;
