export const authNameValidation = (t) => {
    return {
        required: t('auth.validation.name.required')
    }
}

export const authEmailValidation = (t) => {
    return {
        required: t('auth.validation.email.required'),
        validate: (value) => isValidEmail(value) ? true : t('auth.validation.email.validate')
    }
}

export const authPasswordValidation = (t) => {
    return {
        required: t('auth.validation.password.required'),
        maxLength: {
            value: 20,
            message: t('auth.validation.password.max_length', {length: 20})
        },
        minLength: {
            value: 8,
            message: t('auth.validation.password.min_length', {length: 8})
        }
    }
}

export const authPasswordConfirmValidation = (getValues, t) => {
    return {
        required: t('auth.validation.password_confirmation.required'),
        maxLength: {
            value: 20,
            message: t('auth.validation.password_confirmation.max_length', {length: 20})
        },
        minLength: {
            value: 8,
            message: t('auth.validation.password_confirmation.min_length', {length: 8})
        },
        validate: {
            confirm_password: pass_confirm => getValues('password') === pass_confirm || t('auth.validation.password_confirmation.validate')
        }
    }
}

export const authCheckPasswordWithConfirm = (pass, confirm_pass, setError, clearErrors, errors, touchedFields, t) => {
    if(
        (errors.password_confirmation === undefined) ||
        (
            errors.password_confirmation?.type !== undefined &&
            errors.password_confirmation?.type === 'confirm_password'
        )
    ) {
        if (confirm_pass === pass) {
            clearErrors(['password_confirmation'])
        } else {
            if(touchedFields.password_confirmation !== undefined && touchedFields.password_confirmation === true) {
                setError('password_confirmation', {
                    type: 'confirm_password',
                    message: t('auth.validation.password_confirmation.validate_with_pass')
                })
            }
        }
    }
}

const isValidEmail = email => {
    const regex = new RegExp('^(([^<>()[\\]\\\\.,;:\\s@\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\"]+)*)|(\\".+\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$');
    return regex.test(email);
}