const { body } = require('express-validator')

exports.start = () => {
    return [
        body('email', 'Invalid Emails').isEmail()
    ]
}
