const express = require("express");
const router = express.Router();
const {
  get_recycling_form,
  submit_recycling_form,
  update_recycling_form,
  delete_recycling_form,
  get_existing_recycling_forms,
} = require("../controllers/recycling_form_controller");

module.exports = router;

router.route("/").get(get_recycling_form).post(submit_recycling_form);

router.route("/:id").put(update_recycling_form).delete(delete_recycling_form);

router.route("/submitted_forms").get(get_existing_recycling_forms);
