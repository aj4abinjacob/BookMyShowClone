import { axiosInstance } from "./index";


export async function getShowsForMovie(movieId, date) {
    console.log(`Fetching shows for movie ${movieId} on date ${date}`);
    try {
      const response = await axiosInstance.get(`/movies/${movieId}/shows`, {
        params: { date }
      });
      console.log("Shows for movie fetched successfully:", response.data);
      return response;
    } catch (error) {
      // Don't log the full error object
      console.error("Error fetching shows for movie:", error.message);
      
      // Return a properly structured response
      return {
        status: error.response ? error.response.status : 500,
        data: error.response ? error.response.data : { message: "Unknown error occurred" }
      };
    }
  }


export async function getShowDetails(showId) {
    console.log(`Fetching show details for show ${showId}`);
    try {
      const response = await axiosInstance.get(`/shows/${showId}`);
      console.log("Show details fetched successfully:", response.data);
      return response;
    } catch (error) {
      // Don't log the full error object
      console.error("Error fetching show details:", error.message);
      
      // Return a properly structured response
      return {
        status: error.response ? error.response.status : 500,
        data: error.response ? error.response.data : { message: "Unknown error occurred" }
      };
    }
  }



  