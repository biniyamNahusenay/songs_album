import {createSlice,PayloadAction} from "@reduxjs/toolkit"

export interface Song{
  title: string,
  artist: string,
  album: string,
  genre: string,
}

export interface Songs extends Song{
  _id: string
}
interface SongState{
  songs: Songs[],
  loading: boolean,
  error: string | null
}

const initialState: SongState= {
    songs:[],
    loading:false,
    error:null
}

const songSlice = createSlice({
    name:"songs",
    initialState,
    reducers:{
        fetchSongsRequest:(state)=>{
            state.loading = true
            state.error = null
        },
        fetchSongsSuccess:(state, action:PayloadAction<Songs[]>)=>{
            state.loading = false
            state.songs = action.payload
        },
        fetchSongsFailure:(state, action: PayloadAction<string>)=>{
            state.loading = false
            state.error = action.payload
        },
        createSongStart:(state, _action: PayloadAction<Song>)=>{
            state.loading = true
            state.error = null
        },
        createSongSuccess: (state, action: PayloadAction<Songs>) => {
            state.songs.push(action.payload);
            state.loading = false;
        },
        createSongFailure:(state, action: PayloadAction<string>)=>{
            state.loading = false
            state.error = action.payload
        },
        updateSongStart:(state, _action: PayloadAction<Songs>)=>{
           state.loading = false
           state.error = null
        },
        updateSongSuccess: (state, action: PayloadAction<Songs>) => {
            state.loading = false;
            state.songs = state.songs.map((song) =>
              song._id === action.payload._id ? action.payload : song
            );
          },
        updateSongFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
        },
        deleteSongRequest: (state, _action: PayloadAction<string>) => {
            state.loading = true;
        },
        deleteSongSuccess: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.songs = state.songs.filter((song) => song._id !== action.payload);
        },
        deleteSongFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
        },
        filterSongsByGenres: (state, action: PayloadAction<string>) => {
            state.songs = state.songs.filter((song) => song.genre === action.payload);
        }
    }
})

export const {fetchSongsRequest,fetchSongsSuccess,fetchSongsFailure,createSongStart,createSongSuccess,
createSongFailure,updateSongStart,updateSongSuccess,updateSongFailure,deleteSongRequest,
deleteSongSuccess,deleteSongFailure,filterSongsByGenres} = songSlice.actions;

export default songSlice.reducer;