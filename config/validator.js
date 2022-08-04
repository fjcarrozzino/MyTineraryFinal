const joi = require('joi')

const validator = (req, res, next) => {
    const schema = joi.object({
        firstName: joi.string().max(20).min(1).trim().required().messages({
            'string.min': 'The name must contain more than 1 characters',
            'string.max': "The name must contain less than 20 characters",
        }),

        lastName: joi.string().max(20).min(1).trim().required().messages({
            'string.min': 'Last name must contain more than 1 characters',
            'string.max': "Last name must contain more than 20 characters",
        }),

        email: joi.string().email({ minDomainSegments: 2 }).required().messages({
            'string.email': 'incorrect format of email'
        }),
        password: joi.string().max(30).min(6).pattern(/(?=.*[0-9])/).required().messages({
            "string.pattern.base": "The password must contain at least one number.",
            "string.min": "The password must contain at least 6 alphanumeric characters",
            "string.max": "The password must not exceed 30 alphanumeric characters."
        }),
        from: joi.string(),
        urlImage: joi.string().min(10),
        country: joi.string()
    })

    const validation = schema.validate(req.body.userData, { abortEarly: false })

    if (validation.error) {

        return res.json({
            success: false,
            from: "validator",
            message: validation.error.details,
        })
    }
    next()
}

module.exports = validator