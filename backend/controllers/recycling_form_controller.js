const async_handler = require("express-async-handler");

// @desc            Get a new Recycling Form
// @http request    GET
// @route           /api/recycling_form
// @access          Private
const get_recycling_form = async_handler(async (req, res) => {
  res.status(200).json({ message: "Recycling Form" });
});

// @desc            Submit a new recycling form
// @http request    POST
// @route           /api/recycling_form
// @access          Private
const submit_recycling_form = async_handler(async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    res.status(400);
    throw new Error("Cannot submit empty form");
  }
  res.status(200).json({ message: "Submit Recycling Form" });
});

// @desc            Update an existing recycling form
// @http request    PUT
// @route           /api/recycling_form
// @access          Private
const update_recycling_form = async_handler(async (req, res) => {
  res.status(200).json({ message: `Update Recycling Form ${req.params.id}` });
});

// @desc            Delete an existing recycling form
// @http request    DELETE
// @route           /api/recycling_form
// @access          Private
const delete_recycling_form = async_handler(async (req, res) => {
  res.status(200).json({ message: `Delete Recycling Form ${req.params.id}` });
});

// @desc            Get existing recycling forms
// @http request    GET
// @route           /api/recycling_form/submitted_forms
// @access          Private
const get_existing_recycling_forms = async_handler(async (req, res) => {
  res.status(200).json({ message: "Submitted Recycling Forms" });
});

module.exports = {
  get_recycling_form,
  submit_recycling_form,
  update_recycling_form,
  delete_recycling_form,
  get_existing_recycling_forms,
};
