import { Link } from "react-router-dom"
import styled from "styled-components"

const Container = styled.div`
  height:40px;
`
const Wrapper = styled.div`
  padding:10px 20px;
  display:flex;
  justify-content:space-between;
  align-items:center;
`
const Left = styled.div`
  font-size:16px;
  cursor:pointer;
   &:hover {
    border-bottom: 1px solid black;
  }
`
const Center = styled.div`
 font-size:16px;
  cursor:pointer;
   &:hover {
    border-bottom: 1px solid black;
  }
`
const Right = styled.div`
  font-size:16px;
   cursor:pointer;

    &:hover {
   border-bottom: 1px solid black;
  }
`

const Navbar = () => {
  return (
    <Container>
      <Wrapper>
        <Left>
            <Link to='/' style={{textDecoration: 'none',color:"black",fontWeight:"bold"}}>Songs</Link>
        </Left>
        <Center>
          <Link to='/create' style={{textDecoration: 'none',color:"black",fontWeight:"bold"}}>CreateSong</Link>
        </Center>
        <Right>
          <Link to='/stat' style={{textDecoration: 'none',color:"black",fontWeight:"bold"}}>SongStatistics</Link>
        </Right>
      </Wrapper>
    </Container>
  )
}

export default Navbar
