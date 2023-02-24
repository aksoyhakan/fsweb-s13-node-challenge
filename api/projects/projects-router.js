// "project" routerını buraya yazın!
require("dotenv").config();
const express = require("express");
const ProjectModels = require("./projects-model");
const {
  logger,
  projectExistingCheck,
  projectValidation,
} = require("./projects-middleware");
const { response } = require("../server");

const router = express.Router();

router.use(express.json());

router.use(logger);

router.get("/", (req, res, next) => {
  ProjectModels.get()
    .then((response) => res.status(200).json(response))
    .catch((err) =>
      next({ code: 500, message: process.env.MESSAGE || "database problem" })
    );
});

router.get("/:id", projectExistingCheck, (req, res, next) => {
  res.status(200).json(req.response);
});

router.post("/", projectValidation, (req, res, next) => {
  ProjectModels.insert(req.body)
    .then((response) => res.status(201).json(response))
    .catch((err) =>
      next({ code: 500, message: process.env.MESSAGE || "database problem" })
    );
});

router.put(
  "/:id",
  projectExistingCheck,
  projectValidation,
  (req, res, next) => {
    ProjectModels.update(req.params.id, req.body)
      .then((response) => res.status(201).json(response))
      .catch((err) =>
        next({ code: 500, message: process.env.MESSAGE || "database problem" })
      );
  }
);

router.delete("/:id", projectExistingCheck, (req, res, next) => {
  ProjectModels.remove(req.params.id)
    .then((res) => res.status(201).json())
    .catch((err) =>
      next({ code: 500, message: process.env.MESSAGE || "database problem" })
    );
});

router.get("/:id/actions", projectExistingCheck, (req, res, next) => {
  ProjectModels.getProjectActions(req.params.id)
    .then((response) => res.status(200).json(response))
    .catch((err) =>
      next({ code: 500, message: process.env.MESSAGE || "database problem" })
    );
});
router.use((err, req, res, next) => {
  res.status(err.code).json({ message: err.message });
});

module.exports = router;
