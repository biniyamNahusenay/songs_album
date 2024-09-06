import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  height: 40px;
  position: sticky;
  top: 0;
  background-color: #fff; /* Ensure the background is solid */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Add slight shadow */
  z-index: 1000; /* Ensure it stays on top of other content */
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Left = styled.div`
  font-size: 16px;
  cursor: pointer;
  &:hover {
    border-bottom: 1px solid black;
  }
`;

const Center = styled.div`
  font-size: 16px;
  cursor: pointer;
  &:hover {
    border-bottom: 1px solid black;
  }
`;

const Right = styled.div`
  font-size: 16px;
  cursor: pointer;
  &:hover {
    border-bottom: 1px solid black;
  }
`;

const Navbar = () => {
  return (
    <Container>
      <Wrapper>
        <Left>
          <Link to='/' style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }}>Songs</Link>
        </Left>
        <Center>
          <Link to='/create' style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }}>CreateSong</Link>
        </Center>
        <Right>
          <Link to='/stat' style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }}>SongStatistics</Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;