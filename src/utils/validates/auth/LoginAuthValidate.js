
export const loginEmailValidation = {
    required: "This field is required.",
    validate: (value) => isValidEmail(value) ? true : "Invalid email."
}

export const loginPasswordValidation = {
    required: "This field is required.",
    maxLength: {
        value: 20,
        message: "The password may not be greater than 20."
    },
    minLength: {
        value: 8,
        message: "The password must be at least 8."
    }
}

const isValidEmail = email => {
    const regex = new RegExp('^(([^<>()[\\]\\\\.,;:\\s@\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\"]+)*)|(\\".+\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$');
    return regex.test(email);
}