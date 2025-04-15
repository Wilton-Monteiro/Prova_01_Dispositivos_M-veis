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
    newUser: "",
    users: [],
    loading: false,
    nickname:"",
  };

  async componentDidMount() {
    const users = await AsyncStorage.getItem("users");
    const user = await AsyncStorage.getItem("user");
    if (users) {
      this.setState({ users: JSON.parse(users) });
    }

    if (user) {
      const userData = JSON.parse(user);
      this.setState({ nickname: userData.nickname }); 
    } 
  }

  componentDidUpdate(_, prevState) {
    const { users } = this.state;
    if (prevState.users !== users) {
      AsyncStorage.setItem("users", JSON.stringify(users));
    }
  }

  handleAddUser = async () => {
    try {
      const { users, newUser } = this.state;
      this.setState({ loading: true });

      const response = await fetch(`http://www.omdbapi.com/?t=${newUser}&apikey=fcd9cb3d`);
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

      if (users.find((user) => user.id === filme.id)) {
        alert("Filme já adicionado!");
        this.setState({ loading: false });
        return;
      }

      this.setState({
        users: [...users, filme],
        newUser: "",
        loading: false,
      });
      Keyboard.dismiss();
    } catch (error) {
      alert("Erro ao buscar o filme!");
      this.setState({ loading: false });
    }
  };

  render() {
    const { users, newUser, loading, nickname } = this.state;
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
            value={newUser}
            onChangeText={(text) => this.setState({ newUser: text })}
            returnKeyType="send"
            onSubmitEditing={this.handleAddUser}
          />
          <SubmitButton loading={loading} onPress={this.handleAddUser}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Icon name="add" size={20} color="#fff" />
            )}
          </SubmitButton>
        </Form>
        <List
          showsVerticalScrollIndicator={false}
          data={users}
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
                    users: this.state.users.filter((user) => user.id !== item.id),
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
