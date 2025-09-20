import { axiosGet, axiosPatch, axiosPost, axiosPut } from "../axios/axios-config";



// ==========  ==================
export const organizerEventsListRequest = async (data: any) => {
    return await axiosGet("/api/organizer/events", data);
};



// ==========  ==================
export const createEventOrganizerRequest = async (data: any) => {
    return await axiosPost("/api/events", data);
};


// ==========  ==================
export const updateEventOrganizerRequest = async (event_id: number, data: any) => {
    return await axiosPut(`/api/events/${event_id}/`, data);
};


export const getOrganizerEventsDetailsRequest = async (event_id: number) => {
    return await axiosGet(`/api/organizer/events/${event_id}/`);
};