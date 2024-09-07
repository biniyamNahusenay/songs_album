import styled from "styled-components"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteSongRequest, fetchSongsRequest, updateSongStart } from "../redux/slices/songSlice"
import { RootState } from "../redux/store"
import Loader from "./Loader"
import { FaCheck, FaEdit, FaTrash } from "react-icons/fa"
import { toast } from "react-toastify";
import { AxiosError } from 'axios';

const Container = styled.div`
  padding: 20px;
  max-width: 1100px;
  margin: 0 auto;
  margin-top:14px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputDiv = styled.div`
  display: flex; 
  align-items: center;
`;

const InputTable = styled.input`
  width: 60%;
  padding: 2px;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  margin-right: 5px;
`;

const Heading = styled.h1`
  font-weight: 600;
  margin-bottom: 25px;
  font-size: 24px;
  text-align: center;
  color: #333;
  margin-top: 14px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
`;
const Th = styled.th`
  padding: 12px 16px;
  text-align: left;
  background-color: #4caf50;
  color: white;
  font-weight: bold;
  text-align: center;
`;

const Td = styled.td`
  padding: 12px 16px;
  text-align: center;
  border-bottom: 1px solid #e0e0e0;
  &:last-child {
    display: flex;
    justify-content: center;
    gap: 10px;
  }
`;

const SearchInput = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 30%;
  font-size: 16px;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PaginationButton = styled.button<{ $active: boolean }>`
  padding: 8px 12px;
  margin: 0 4px;
  border: 1px solid #ddd;
  background-color: ${({ $active }) => ($active ? "#4caf50" : "#fff")};
  color: ${({ $active }) => ($active ? "#fff" : "#333")};
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ $active }) => ($active ? "#4caf50" : "#ddd")};
  }
`;

const SongTable: React.FC = () => {
  const dispatch = useDispatch();
  const { songs, loading, error } = useSelector((state: RootState) => state.songs);

  const [editableSongId, setEditableSongId] = useState<string | null>(null);
  const [editableSongTitle, setEditableSongTitle] = useState("");
  const [editableSongArtist, setEditableSongArtist] = useState("");
  const [editableSongAlbum, setEditableSongAlbum] = useState("");
  const [editableSongGenre, setEditableSongGenre] = useState("");
  const [searchGenre, setSearchGenre] = useState(""); // State for searching by genre
  const [currentPage, setCurrentPage] = useState(1); // For tracking the current page
  const songsPerPage = 5; // Number of songs per page

  useEffect(() => {
    dispatch(fetchSongsRequest());
  }, [dispatch]);

  const toggleEdit = (id: string, title: string, artist: string, album: string, genre: string) => {
    setEditableSongId(id);
    setEditableSongTitle(title);
    setEditableSongArtist(artist);
    setEditableSongAlbum(album);
    setEditableSongGenre(genre);
  };

const updateHandler = async (id: string) => {
  try {
    const updatedSong = {
      _id: id,
      title: editableSongTitle,
      artist: editableSongArtist,
      album: editableSongAlbum,
      genre: editableSongGenre,
    };
    // console.log("Updating song:", updatedSong);

     dispatch(updateSongStart(updatedSong)); // Dispatch the action to start the update process

    setEditableSongId(null);
    setEditableSongTitle("");
    setEditableSongArtist("");
    setEditableSongAlbum("");
    setEditableSongGenre("");
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      toast.error(error.response?.data?.message || error.message);
    } else {
      toast.error("An error occurred while updating the song.");
    }
  }
};

  const deleteHandler = async (id:string)=>{
    console.log(id)
    if (window.confirm("Are you sure")) {
      try {
         dispatch(deleteSongRequest(id))
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data?.message || error.message);
        } else {
          toast.error("An error occurred while updating the song.");
        }
      }
    }
  }
  const filteredSongs = songs.filter((song) =>
    song.genre.toLowerCase().includes(searchGenre.toLowerCase())
  );

  // Get the current songs to display on the page
    const indexOfLastSong = currentPage * songsPerPage;
    const indexOfFirstSong = indexOfLastSong - songsPerPage;
    const currentSongs = filteredSongs.slice(indexOfFirstSong, indexOfLastSong);

    const totalPages = Math.ceil(songs.length / songsPerPage); // Calculate total pages

    const handlePageChange = (pageNumber: number) => {
       setCurrentPage(pageNumber);
      };

  return (
    <Container>
      <Heading>Songs</Heading>
      <SearchInput
        type="text"
        placeholder="Search by genre..."
        id="search"
        value={searchGenre}
        onChange={(e) => setSearchGenre(e.target.value)}
      />
      {loading ? (
        <Loader />
      ) : error ? (
        <p>error: {error}</p>
      ) : (
        <Wrapper>
          <Table>
            <thead>
              <tr>
                <Th>Title</Th>
                <Th>Artist</Th>
                <Th>Album</Th>
                <Th>Genre</Th>
                <Th></Th>
              </tr>
            </thead>
            <tbody>
              {currentSongs.map((song) => (
                <tr key={song._id}>
                  {editableSongId === song._id ? (
                    <Td>
                      <InputDiv>
                        <InputTable
                          type="text"
                          value={editableSongTitle}
                          onChange={(e) => setEditableSongTitle(e.target.value)}
                        />
                        <button
                          onClick={() => updateHandler(song._id)}
                          className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
                        >
                          <FaCheck />
                        </button>
                      </InputDiv>
                    </Td>
                  ) : (
                    <Td>{song.title}</Td>
                  )}
                  {editableSongId === song._id ? (
                    <Td>
                      <InputDiv>
                        <InputTable
                          type="text"
                          value={editableSongArtist}
                          onChange={(e) => setEditableSongArtist(e.target.value)}
                        />
                        <button
                          onClick={() => updateHandler(song._id)}
                          className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
                        >
                          <FaCheck />
                        </button>
                      </InputDiv>
                    </Td>
                  ) : (
                    <Td>{song.artist}</Td>
                  )}
                  {editableSongId === song._id ? (
                    <Td>
                      <InputDiv>
                        <InputTable
                          type="text"
                          value={editableSongAlbum}
                          onChange={(e) => setEditableSongAlbum(e.target.value)}
                        />
                        <button
                          onClick={() => updateHandler(song._id)}
                          className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
                        >
                          <FaCheck />
                        </button>
                      </InputDiv>
                    </Td>
                  ) : (
                    <Td>{song.album}</Td>
                  )}
                  {editableSongId === song._id ? (
                    <Td>
                      <InputDiv>
                        <InputTable
                          type="text"
                          value={editableSongGenre}
                          onChange={(e) => setEditableSongGenre(e.target.value)}
                        />
                        <button
                          onClick={() => updateHandler(song._id)}
                          className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
                        >
                          <FaCheck />
                        </button>
                      </InputDiv>
                    </Td>
                  ) : (
                    <Td>{song.genre}</Td>
                  )}
                  <Td>
                    <InputDiv>
                      <button
                        onClick={() =>
                          toggleEdit(song._id,song.title,song.artist,song.album,song.genre)}
                      >
                        <FaEdit className="ml-[1rem]" />
                      </button>

                        <button
                          onClick={() => deleteHandler(song._id)}
                          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                          <FaTrash />
                        </button>
                    </InputDiv>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
           {/* Pagination Controls */}
        <PaginationContainer>
          {[...Array(totalPages)].map((_, index) => (
            <PaginationButton
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              $active={index + 1 === currentPage}
            >
              {index + 1}
            </PaginationButton>
          ))}
        </PaginationContainer>
        </Wrapper>
      )}
    </Container>
  );
};

export default SongTable;