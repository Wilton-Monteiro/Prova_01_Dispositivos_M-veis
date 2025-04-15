import React from "react";
import {
  Container,
  Header,
  Avatarperfil,
  Nameperfil,
  BioPerfil,
} from "../styles";

export default function User({ route }) {
  const { filme } = route.params;

  return (
    <Container>
      <Header>
        <Avatarperfil source={{ uri: filme.poster }} />
        <Nameperfil>{filme.titulo}</Nameperfil>
        <BioPerfil>{filme.sinopse}</BioPerfil>
      </Header>
    </Container>
  );
}
