import axios from "axios";
import { Song,Songs } from "../slices/songSlice";

const base_url = "http://localhost:5000/song";

export const getSongList = async ():Promise<Songs[]> => {
    try {
        const response = await axios.get(`${base_url}/allSongs`);
        return response.data;
    } catch (error) {
       throw new Error('failed to fetch songs list')
    }
}

export const createSong = async (song: Song): Promise<Song> => {
    try {
        const response = await axios.post(`${base_url}/create`, song);
        return response.data; // Return the newly created song data
    } catch (error) {
        throw new Error('Failed to create song');
    }
};

export const updateSong = async (song: Songs): Promise<Songs> => {
    try {
        const response = await axios.put(`${base_url}/${song._id}`, song);
        return response.data; // Return the updated song data
    } catch (error) {
        throw new Error('Failed to update song');
    }
}

export const deleteSong = async (song:Songs):Promise<Songs> =>{
    try {
        const response = await axios.delete(`${base_url}/${song._id}`);
        return response.data; // Return the deleted song data
    } catch (error) {
        throw new Error('Failed to delete song');
    }
}