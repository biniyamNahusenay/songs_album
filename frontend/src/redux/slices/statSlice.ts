import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define types for each part of the statistics state
interface GenreStatistic {
  _id: string;
  totalSongs: number;
}

interface AlbumStatistic {
  _id: string;
  totalSongs: number;
}

interface ArtistStatistic {
  _id: string;
  totalSongs: number;
}

interface AlbumsPerArtist {
  _id: string;
  totalAlbums: number;
  Albums: string[];
}

export interface StatisticsState {
  totalSongs: number;
  totalArtists: number;
  totalAlbums: number;
  totalGenres: number;
  songsInEveryGenres: GenreStatistic[]; // Array of objects containing genre and song count
  songsinEachAlbum: AlbumStatistic[];   // Array of objects containing album and song count
  songsEachArtistHas: ArtistStatistic[]; // Array of objects containing artist and song count
  albumsEachArtistHas: AlbumsPerArtist[]; // Array of objects containing artist, album count, and list of albums
  loading: boolean;
  error: string | null;
}

const initialState: StatisticsState = {
  totalSongs: 0,
  totalArtists: 0,
  totalAlbums: 0,
  totalGenres: 0,
  songsInEveryGenres: [],
  songsinEachAlbum: [],
  songsEachArtistHas: [],
  albumsEachArtistHas: [],
  loading: false,
  error: null,
};

const statSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    fetchStatisticsStart: (state) => {
      state.loading = true;
    },
    fetchStatisticsSuccess: (state, action: PayloadAction<StatisticsState>) => {
      state.loading = false;
      state.totalSongs = action.payload.totalSongs;
      state.totalArtists = action.payload.totalArtists;
      state.totalAlbums = action.payload.totalAlbums;
      state.totalGenres = action.payload.totalGenres;
      state.songsInEveryGenres = action.payload.songsInEveryGenres;
      state.songsinEachAlbum = action.payload.songsinEachAlbum;
      state.songsEachArtistHas = action.payload.songsEachArtistHas;
      state.albumsEachArtistHas = action.payload.albumsEachArtistHas;
    },
    fetchStatisticsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchStatisticsStart,
  fetchStatisticsSuccess,
  fetchStatisticsFailure,
} = statSlice.actions;

export default statSlice.reducer;