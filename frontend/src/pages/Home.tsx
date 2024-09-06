import styled from 'styled-components';
import SongTable from '../components/SongTable';

const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
  position: relative;
`;

const Footer = styled.footer`
  position: absolute;
  bottom: 100px;
  width: 100%;
  text-align: center;
  font-size: 14px;
  color: #666;
`;

const Home = () => {
  return (
    <Container>
      <SongTable />
      <Footer>
        &copy; {new Date().getFullYear()} Biniyam Nahuseny. All rights reserved.
      </Footer>
    </Container>
  );
}

export default Home;