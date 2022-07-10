const async_handler = require("express-async-handler");
const Recycling_Form = require('../models/recycling_form')

// @desc            Get a new Recycling Form
// @request         GET
// @route           /api/recycling_form
// @access          Private
const get_recycling_form = async_handler(async (req, res) => {
  res.status(200).json({ message: "Recycling Form" });
});

// @desc            Submit a new recycling form
// @request         POST
// @route           /api/recycling_form
// @access          Private
const submit_recycling_form = async_handler(async (req, res) => {
  if (!req.body.user_id || !req.body.category || !req.body.description || !req.body.image) {
    res.status(400);
    throw new Error("Please fill in all fields!");
  }

  const recycling_form = await Recycling_Form.create({
    user_id: req.body.user_id,
    category: req.body.category,
    description: req.body.description,
    image: req.body.image
  })

  res.status(200).json(recycling_form);
});

// @desc            Update an existing recycling form
// @request         PUT
// @route           /api/recycling_form
// @access          Private
const update_recycling_form = async_handler(async (req, res) => {
  const recycling_form = await Recycling_Form.findById(req.params.id)
  
  if (!recycling_form) {
    res.status(400)
    throw new Error('Recycling Form not found')
  }

  const updated_recycling_form = await Recycling_Form.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
  
  res.status(200).json(updated_recycling_form);
});

// @desc            Delete an existing recycling form
// @request         DELETE
// @route           /api/recycling_form
// @access          Private
const delete_recycling_form = async_handler(async (req, res) => {
  const recycling_form = await Recycling_Form.findById(req.params.id)
  
  if (!recycling_form) {
    res.status(400)
    throw new Error('Recycling Form not found')
  }

  await recycling_form.remove()

  res.status(200).json({ id: req.params.id });
});

// @desc            Get existing recycling forms
// @http request    GET
// @route           /api/recycling_form/submitted_forms
// @access          Private
const get_existing_recycling_forms = async_handler(async (req, res) => {
  const recycling_forms = await Recycling_Form.find()
  res.status(200).json(recycling_forms);
});

module.exports = {
  get_recycling_form,
  submit_recycling_form,
  update_recycling_form,
  delete_recycling_form,
  get_existing_recycling_forms,
};
