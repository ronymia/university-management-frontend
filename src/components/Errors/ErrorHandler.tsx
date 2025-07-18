import { IGenericErrorResponse } from '@/types';
import CustomToaster from '../Notification/CustomToaster';

interface IErrorHandlerProps {
    errors: IGenericErrorResponse;
    pageId?: string;
}

export default function ErrorHandler({ errors }: IErrorHandlerProps) {
    // SEND ERROR MESSAGE BASED ON STATUS
    if (errors.statusCode && errors.statusCode === 400) {
        return CustomToaster({ type: 'error', text: errors.message });
    }
    if (errors.statusCode && errors.statusCode === 401) {
        return CustomToaster({ type: 'error', text: errors.message });
    }
    if (errors.statusCode && errors.statusCode === 403) {
        return CustomToaster({ type: 'error', text: errors.message });
    }
    if (errors.statusCode && errors.statusCode === 404) {
        return CustomToaster({ type: 'error', text: errors.message });
    }
    if (errors.statusCode && errors.statusCode === 406) {
        return CustomToaster({ type: 'error', text: errors.message });
    }
    if (errors.statusCode && errors.statusCode === 409) {
        return CustomToaster({ type: 'error', text: errors.message });
    }
    if (errors.statusCode && errors.statusCode === 422) {
        return CustomToaster({
            type: 'error',
            text: errors.message,
            errors: errors.errorMessages,
        });
    }
    if (errors.statusCode && errors.statusCode === 500) {
        return CustomToaster({ type: 'error', text: errors.message });
    }

    //
    return null;
}
