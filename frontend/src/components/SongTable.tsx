import styled from "styled-components"

const Container = styled.div`
  padding:4;
`
const Wrapper = styled.div`
display:flex;
flex-direction:column;
`
const Heading = styled.h1`
   font:semibold;
   margin-bottom:25px;
   font-size:20px;
   text-align:center;
   margin-top:14px;
`
const Table = styled.table`
  width:70%;
  margin:0px auto;
`
const Th = styled.th`
 padding:2 4;
 text-align:center;
`
const SongTable = () => {
  return (
   
     <Container>
         <Heading>Songs</Heading>
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
                
             </tbody> 
           </Table>
         </Wrapper>
     </Container>
  )
}

export default SongTable
