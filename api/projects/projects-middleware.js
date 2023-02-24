// projects ara yazılımları buraya

const ProjectModels = require("./projects-model");

function logger(req, res, next) {
  console.log(
    `${req.method}--${req.originalUrl}--${new Date().toLocaleTimeString()}`
  );
  next();
}

function projectExistingCheck(req, res, next) {
  ProjectModels.get(req.params.id)
    .then((response) => {
      if (response) {
        req.response = response;
        next();
      } else {
        next({ code: 404, message: "there is no project as you request" });
      }
    })
    .catch((err) => next({ code: 500, message: "database problem" }));
}

function projectValidation(req, res, next) {
  const { id, name, description, completed } = req.body;
  if (name && description && (completed === true || completed === false)) {
    next();
  } else {
    next({ code: 400, message: "required info missing" });
  }
}

module.exports = { logger, projectExistingCheck, projectValidation };
