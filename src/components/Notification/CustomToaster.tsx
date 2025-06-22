import { toast } from 'react-hot-toast';

export interface ICustomToasterProps {
    type: 'success' | 'error';
    text: string;
    errors?: { [key: string]: string }[];
    pageId?: string;
}

export default function CustomToaster({
    type,
    text,
    errors = [],
    pageId = '000',
}: ICustomToasterProps) {
    return toast.custom((toastId) => (
        <div
            role="alert"
            className={`${
                type === 'error'
                    ? 'border-red-600 hover:border-red-500'
                    : 'border-green-600 hover:border-green-500'
            } ${toastId.visible ? 'animate-enter' : 'animate-leave'}
        border max-w-md w-full bg-base-300 shadow-lg rounded-lg pointer-events-auto flex`}
        >
            {/* LEFT - CONTENT */}
            <div className="flex-1 flex flex-col justify-center p-4">
                {type === 'success' && <h3 className="font-semibold">{text}</h3>}

                {type === 'error' && Object.keys(errors).length > 0 && (
                    <div className="text-sm mt-1 text-neutral">
                        <h5 className="font-semibold mb-1">
                            {pageId} - {text}
                        </h5>
                        <ul className="list-decimal ml-5">
                            {errors.map((error, i) =>
                                Object.entries(error).map(([key, message]) => (
                                    <li key={`${key}-${i}`}>{message}</li>
                                )),
                            )}
                        </ul>
                    </div>
                )}
            </div>

            {/* RIGHT - CLOSE BUTTON */}
            <div
                className={`flex border-l ${
                    type === 'error'
                        ? 'border-red-600 hover:border-red-500'
                        : 'border-green-600 hover:border-green-500'
                }`}
            >
                <button
                    onClick={() => toast.dismiss(toastId.id)}
                    className={`w-full rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium ${
                        type === 'error'
                            ? 'text-red-600 hover:text-red-500'
                            : 'text-green-600 hover:text-green-500'
                    } focus:outline-none`}
                >
                    Close
                </button>
            </div>
        </div>
    ));
}
