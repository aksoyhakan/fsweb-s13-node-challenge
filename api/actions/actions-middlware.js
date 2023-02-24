// eylemlerle ilgili ara katman yazılımları yazın
const ActionModels = require("./actions-model");
const ProjectModels = require("../projects/projects-model");

function logger(req, res, next) {
  console.log(
    `${req.method}--${req.originalUrl}--${new Date().toLocaleTimeString()}`
  );
  next();
}

function actionExistingCheck(req, res, next) {
  ActionModels.get(req.params.id)
    .then((response) => {
      if (response) {
        console.log("Buradayım bir");
        req.response = response;
        next();
      } else {
        next({ code: 404, message: "there is no such an action you want " });
      }
    })
    .catch((err) => next({ code: 500, message: "database problem" }));
}

function actionValidation(req, res, next) {
  const { id, project_id, description, notes, completed } = req.body;

  project_id &&
  description &&
  notes &&
  (completed === true || completed === false)
    ? ProjectModels.get(project_id).then((response) => {
        response
          ? next()
          : next({ code: 401, message: "there is no such an project" });
      })
    : next({ code: 400, message: "required info missing" });
}
module.exports = { logger, actionExistingCheck, actionValidation };
