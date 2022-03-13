import { EAuthFormField } from './enums';

export const INITIAL_AUTH_FORM_STATE = {
    [EAuthFormField.Email]: '',
    [EAuthFormField.Password]: ''
};

export const INITIAL_AUTH_FORM_VALIDATION_STATE = {
    [EAuthFormField.Email]: null,
    [EAuthFormField.Password]: null
};
