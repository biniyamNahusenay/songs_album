import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { fetchStatisticsStart } from '../redux/slices/statSlice';
import Loader from '../components/Loader'; // Import your separate loader component
import styled from 'styled-components';

const StatisticsWrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  margin-top: 30px;
  margin-bottom: 10px;
`;

const StatText = styled.p`
  font-size: 18px;
  margin-bottom: 8px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 30px;
`;

const TableHead = styled.thead`
  background-color: #f4f4f4;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;
`;

const TableHeader = styled.th`
  padding: 10px;
  text-align: left;
`;

const TableCell = styled.td`
  padding: 10px;
`;

const SongStatistics = () => {
  const dispatch = useDispatch();
  const { 
    totalSongs, 
    totalArtists, 
    totalAlbums, 
    totalGenres, 
    songsInEveryGenres, 
    songsinEachAlbum, 
    songsEachArtistHas, 
    albumsEachArtistHas, 
    loading, 
    error 
  } = useSelector((state: RootState) => state.statistics);

  useEffect(() => {
    dispatch(fetchStatisticsStart());
  }, [dispatch]);

  if (loading) {
    return <Loader />; // Use the Loader component when loading
  }

  if (error) {
    return <StatText style={{ color: 'red' }}>{error}</StatText>;
  }

  return (
    <StatisticsWrapper>
      <Title>Statistics</Title>

      {/* Display total statistics */}
      <StatText>Total Songs: {totalSongs}</StatText>
      <StatText>Total Artists: {totalArtists}</StatText>
      <StatText>Total Albums: {totalAlbums}</StatText>
      <StatText>Total Genres: {totalGenres}</StatText>

      {/* Display songsInEveryGenres */}
      <SubTitle>Songs in Every Genre</SubTitle>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Genre</TableHeader>
            <TableHeader>Total Songs</TableHeader>
          </TableRow>
        </TableHead>
        <tbody>
          {songsInEveryGenres.map((genre) => (
            <TableRow key={genre._id}>
              <TableCell>{genre._id}</TableCell>
              <TableCell>{genre.totalSongs}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>

      {/* Display songsinEachAlbum */}
      <SubTitle>Songs in Each Album</SubTitle>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Album</TableHeader>
            <TableHeader>Total Songs</TableHeader>
          </TableRow>
        </TableHead>
        <tbody>
          {songsinEachAlbum.map((album) => (
            <TableRow key={album._id}>
              <TableCell>{album._id}</TableCell>
              <TableCell>{album.totalSongs}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>

      {/* Display songsEachArtistHas */}
      <SubTitle>Songs Each Artist Has</SubTitle>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Artist</TableHeader>
            <TableHeader>Total Songs</TableHeader>
          </TableRow>
        </TableHead>
        <tbody>
          {songsEachArtistHas.map((artist) => (
            <TableRow key={artist._id}>
              <TableCell>{artist._id}</TableCell>
              <TableCell>{artist.totalSongs}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>

      {/* Display albumsEachArtistHas */}
      <SubTitle>Albums Each Artist Has</SubTitle>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Artist</TableHeader>
            <TableHeader>Total Albums</TableHeader>
            <TableHeader>Albums</TableHeader>
          </TableRow>
        </TableHead>
        <tbody>
          {albumsEachArtistHas.map((artist) => (
            <TableRow key={artist._id}>
              <TableCell>{artist._id}</TableCell>
              <TableCell>{artist.totalAlbums}</TableCell>
              <TableCell>{artist.Albums.join(', ')}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </StatisticsWrapper>
  );
};

export default SongStatistics;