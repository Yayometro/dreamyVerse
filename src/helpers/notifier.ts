import { toast, ToastContainer, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type InType = "ok" | "error" | "info" | "warning" | "message";

const defaultOptions = {
  // position: "top-right",
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  style: {zIndex: 3005, pointerEvents: "all"}
} as ToastOptions<unknown>;

export default function notifier(nType: InType, nMessage: string, nCustomMessage?: JSX.Element) {
  if (nType === "ok") {
    return toast.success(`${nMessage}`, defaultOptions);
  } else if (nType === "error") {
    return toast.error(` ${nMessage}`, defaultOptions);
  } else if (nType === "info") {
    return toast.info(` ${nMessage}`, defaultOptions);
  } else if (nType === "warning") {
    return toast.warn(` ${nMessage}`, defaultOptions);
  } else if (nType === "message") {
    return toast(nCustomMessage, defaultOptions);
  } else {
    return toast(nMessage, {
      ...defaultOptions,
    });
  }
}
