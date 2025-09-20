import { axiosGet, axiosPost } from "../axios/axios-config";


// ==========  ==================
export const eventsListRequest = async () => {
    return await axiosGet("/api/events");
};

interface bookingTicketType  {
    event: number,
    items: any,
}

export const bookingTicketRequest = async (data: bookingTicketType) => {
    return await axiosPost("/api/bookings", data);
};


export const myBookingListRequest = async () => {
    return await axiosGet("/api/my-bookings");
};