import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
};

export const notifySuccess = (message) => {
    toast.dismiss();
    toast.success(message, toastOptions);
};

export const notifyError = (message) => {
    toast.dismiss();
    toast.error(message, toastOptions);
};
