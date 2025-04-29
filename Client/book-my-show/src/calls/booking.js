import { axiosInstance } from ".";

export async function makePayment(data) {
  try {
    const response = await axiosInstance.post("/payment", 
        {token: data.token.id,
        amount: data.amount}
    );
    return response;
  } catch (error) {
    console.error("Error making payment:", error);
    throw error;
  }
}

export async function createBooking(data) {
  try {
    const response = await axiosInstance.post("/bookings", data);
    return response;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
}

