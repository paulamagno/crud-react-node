
import GlobalStyle from "./styles/global";
import styled from "styled-components";
import Form from "./components/Form.js";
import Grid from "./components/Grid";
import  { useEffect, useState } from "react";
import {toast, ToastContainer } from "react-toastify"; // feedback que da natela a partir do comportamento do usuário
import "react-toastify/dist/ReactToastify.css"; // estilização da biblioteca toastify
import axios from "axios"

//style do nosso container
const Container = styled.div`
width:100%
max-width: 800px;
margin-top:800px;
margin-top:20px;
display:flex;
flex-direction: column;
align-items: center;
gap:10px;
`;

const Title = styled.h2``;

// assíncrona, pois espera o banco de dados retornar esses dados
function App() {
  //criando 2 states, 1 p users (que inicia com array vazio) e 1 p edição
  const [users, setUsers] = useState([])
  const [onEdit, setOnEdit] = useState(null)

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8800");
      //ordenando por ordem alfabética
      setUsers(res.data.sort((a,b) => (a.nome > b.nome ? 1 : -1)));
    }catch(error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getUsers()
  }, [setUsers]);

//configurando toastify, em 3segundos, ele vai fechar, e o local na tela que eu quero
  return (
    <>
    <Container>
      <Title>USUÁRIOS</Title>
      <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
      <Grid users = {users} setUsers = {setUsers} setOnEdit={setOnEdit} />
    </Container>

    <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
    <GlobalStyle/>
    </>
  );
}

export default App;
