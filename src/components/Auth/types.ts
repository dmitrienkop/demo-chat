import { EAuthFormField } from './enums';

export interface IAuthFormState {
    [EAuthFormField.Email]: string;
    [EAuthFormField.Password]: string;
}

export interface IAuthFormValidationState {
    [EAuthFormField.Email]: boolean | null;
    [EAuthFormField.Password]: boolean | null;
}
