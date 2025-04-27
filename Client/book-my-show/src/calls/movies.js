import { axiosInstance } from "./index";

export async function getAllMovies() {
    console.log("Fetching all movies");
    try {
        const response = await axiosInstance.get("/movies");
        console.log("Movies fetched successfully:", response.data);
        return response;
    } catch (error) {
        console.error("Error fetching movies:", error);
        return {
            status: error.response?.status || 500,
            data: error.response?.data || { message: "Unknown error occurred" },
            error: true
        };
    }
}

export async function getMovieById(id) {
    console.log("Fetching movie by ID:", id);
    try {
        const response = await axiosInstance.get(`/movies/${id}`);
        console.log("Movie fetched successfully:", response.data);
        return response;
    } catch (error) {
        console.error("Error fetching movie:", error);
        return {
            status: error.response?.status || 500,
            data: error.response?.data || { message: "Unknown error occurred" },
            error: true
        };
    }
}