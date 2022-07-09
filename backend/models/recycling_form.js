const { default: mongoose } = require('mongoose')

const recycling_form_schema = mongoose.Schema({
    user_id: {
        type: String,
        required: [true, 'Please add user id']
    },
    category: {
        type: String,
        required: [true, 'Please add category']
    },
    description: {
        type: String,
        required: [true, 'Please add description']
    },
    image: {
        type: String,
        required: [true, 'Please add image']
    }
}, {
    timestaps: true
})

module.exports = mongoose.model('Recycling_Form', recycling_form_schema)