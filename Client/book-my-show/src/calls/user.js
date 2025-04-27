
import { axiosInstance } from ".";

export async function RegisterUser(data) {
    console.log("Registering user with data:", data);
    try{
        const response = await axiosInstance.post("http://localhost:8000/register", data);
        console.log("User registered successfully:", response.data);
        return response;

    }catch (error) {
        console.error("Error registering user:", error);
        return error.response;
    }

}

export async function LoginUser(data) {
    console.log("Logging in user with data:", data);
    try{
        const response = await axiosInstance.post("http://localhost:8000/login", data);
        console.log("User logged in successfully:", response.data);
        return response;

    }catch (error) {
        console.error("Error logging in user:", error);
        return error.response;
    }
}


export async function ForgotPassword(data) {
    console.log("Requesting password reset with data:", data);
    try{
        const response = await axiosInstance.post("http://localhost:8000/forget", data);
        console.log("Password reset requested successfully:", response.data);
        return response;

    }catch (error) {
        console.error("Error requesting password reset:", error);
        return error.response;
    }
}