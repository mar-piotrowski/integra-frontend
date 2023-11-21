import {toast, ToastOptions} from "react-toastify";

const toastSettings: ToastOptions = {
    closeOnClick: true,
}

export const successToast = (message: string) => {
    toast.success(message, toastSettings);
}

export const errorToast = (message: string) => {
   toast.error(message, toastSettings);
}