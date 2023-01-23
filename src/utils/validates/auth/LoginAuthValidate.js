export const authNameValidation = () => {
    return {
        required: "The field is required."
    }
}

export const authEmailValidation = () => {
    return {
        required: "This field is required.",
            validate: (value) => isValidEmail(value) ? true : "Invalid email."
    }
}

export const authPasswordValidation = () => {
    return {
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
}

export const authPasswordConfirmValidation = (getValues) => {
    return {
        required: "The password confirm is required.",
        minLength: {
            value: 8,
            message: 'Your password must be more then 8 characters'
        },
        validate: {
            confirm_password: pass_confirm => getValues('password') === pass_confirm || 'The confirm password is not equals with password'
        }
    }
}

export const authCheckPasswordWithConfirm = (pass, confirm_pass, setError, clearErrors, errors) => {
    if(
        (errors.password_confirmation === undefined) ||
        (errors.password_confirmation?.type !== undefined &&
            errors.password_confirmation?.type === 'confirm_password')
    ) {
        if (confirm_pass === pass) {
            clearErrors(['password_confirmation'])
        } else {
            setError('password_confirmation', {
                type: 'confirm_password',
                message: 'The confirm password is not equals with password'
            })
        }
    }
}

const isValidEmail = email => {
    const regex = new RegExp('^(([^<>()[\\]\\\\.,;:\\s@\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\"]+)*)|(\\".+\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$');
    return regex.test(email);
}