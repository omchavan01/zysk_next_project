import toast from "react-hot-toast";

export const showToast = (type, message, duration) => {
  toast[type](message, {
    duration: duration,
    style: {
      borderRadius: "10px",
      background: "#121212",
      color: "#fff",
      fontFamily: "sans-serif",
      position: "relative",
      top: "80px",
      right: "20px",
    },
  });
};

export const showToastFromComponent = (type, message, duration) => {
  toast[type](message, {
    duration: duration,
    style: {
      borderRadius: "10px",
      background: "#121212",
      color: "#fff",
      fontFamily: "sans-serif",
      position: "relative",
      top: "10px",
      right: "20px",
    },
  });
};
