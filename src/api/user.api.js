import axiosInstance from "../utils/axiosInstance"

export const loginUser = async (password, email) => {
    const { data } = await axiosInstance.post("/api/auth/login", { email, password }, { withCredentials: true });
    return data;
}

export const registerUser = async (name, password, email) => {
    const { data } = await axiosInstance.post("/api/auth/register", { name, email, password }, { withCredentials: true });
    return data;
}

export const logoutUser = async () => {
    const { data } = await axiosInstance.get("/api/auth/logout", { withCredentials: true });
    return data;
}

export const getCurrentUser = async () => {
    const { data } = await axiosInstance.get("/api/auth/me", { withCredentials: true });
    return data;
}

export const getAllUserUrls = async () => {
    const { data } = await axiosInstance.post("/api/user/urls", {}, { withCredentials: true });
    return data;
}