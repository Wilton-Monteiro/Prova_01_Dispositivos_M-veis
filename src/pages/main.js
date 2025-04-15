import React, { Component } from "react";
import { Keyboard, ActivityIndicator, Text } from "react-native";
import Icon from "@expo/vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  User,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText,
  
} from "../styles";

export default class Main extends Component {
  state = {
    novoFilme: "",
    filmes: [],
    loading: false,
    nickname:"",
  };

  async componentDidMount() {
    const filmes = await AsyncStorage.getItem("filmes");
    const user = await AsyncStorage.getItem("user");
    if (filmes) {
      this.setState({ filmes: JSON.parse(filmes) });
    }

    if (user) {
      const userData = JSON.parse(user);
      this.setState({ nickname: userData.nickname }); 
    } 
  }

  componentDidUpdate(_, prevState) {
    const { filmes } = this.state;
    if (prevState.filmes !== filmes) {
      AsyncStorage.setItem("filmes", JSON.stringify(filmes));
    }
  }

  handleAddFilme = async () => {
    try {
      const { filmes, novoFilme } = this.state;
      this.setState({ loading: true });

      const response = await fetch(`http://www.omdbapi.com/?t=${novoFilme}&apikey=fcd9cb3d`);
      const data = await response.json();

      if (data.Response === "False") {
        alert("Filme não encontrado!");
        this.setState({ loading: false });
        return;
      }

      const filme = {
        titulo: data.Title,
        sinopse: data.Plot,
        poster: data.Poster,
        id: data.imdbID,
      };

      if (filmes.find((filmeExistente) => filmeExistente.id === filme.id)) {
        alert("Filme já adicionado!");
        this.setState({ loading: false });
        return;
      }

      this.setState({
        filmes: [...filmes, filme],
        novoFilme: "",
        loading: false,
      });
      Keyboard.dismiss();
    } catch (error) {
      alert("Erro ao buscar o filme!");
      this.setState({ loading: false });
    }
  };

  render() {
    const { filmes, novoFilme, loading, nickname } = this.state;
    return (
      <Container>
        {nickname ? (
        <Text style={{ fontSize: 20, marginBottom: 10 }}>
          Olá, {nickname}! 👋
        </Text>
        ) : null}
        <Form>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Adicionar filme"
            value={novoFilme}
            onChangeText={(text) => this.setState({ novoFilme: text })}
            returnKeyType="send"
            onSubmitEditing={this.handleAddFilme}
          />
          <SubmitButton loading={loading} onPress={this.handleAddFilme}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Icon name="add" size={20} color="#fff" />
            )}
          </SubmitButton>
        </Form>
        <List
          showsVerticalScrollIndicator={false}
          data={filmes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <User>
              <Avatar source={{ uri: item.poster }} />
              <Name>{item.titulo}</Name>
              <Bio numberOfLines={3}>{item.sinopse}</Bio>

              <ProfileButton
                onPress={() => {
                  this.props.navigation.navigate("User", { filme: item });
                 
                }}
                
              >
              <ProfileButtonText>Mais detalhes</ProfileButtonText>
                </ProfileButton>

              <ProfileButton
                onPress={() => {
                  this.setState({
                  filmes: this.state.filmes.filter((filmeExistente) => filmeExistente.id !== item.id),
              });
            }}
                style={{ backgroundColor: "red" }}
>
            <ProfileButtonText>Remover</ProfileButtonText>
              </ProfileButton>
            </User>
          )}
        />
      </Container>
    );
  }
}
