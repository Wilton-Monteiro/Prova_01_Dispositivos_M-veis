import React, { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

export default class CadastrarUsuario extends Component {
  state = {
    email: "",
    password: "",
    nickname:"",
    telefone:"",
    curso:"",
    cpf:"",
  };

  handleCadastro = async () => {
    const { email, password, nickname, telefone, cpf, curso } = this.state;
    if (!email || !password || !nickname) {thread
      alert("Preencha todos os campos!");
      return;
    }

    const user = { email, password, nickname, telefone, cpf, curso };

    try {
      await AsyncStorage.setItem("user", JSON.stringify(user));
      alert("Usuário cadastrado com sucesso!");
      this.props.navigation.navigate("Login");
    } catch (error) {
      alert("Erro ao salvar usuário!");
      console.error(error);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={this.state.email}
          onChangeText={(email) => this.setState({ email })}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
        />
        <TextInput
          style={styles.input}
          placeholder="CPF"
          secureTextEntry={true}
          value={this.state.cpf}
          onChangeText={(cpf) => this.setState({ cpf })}
        />
        <TextInput
          style={styles.input}
          placeholder="Telefone"
          secureTextEntry={true}
          value={this.state.telefone}
          onChangeText={(telefone) => this.setState({ telefone })}
        />
        <TextInput
          style={styles.input}
          placeholder="Curso"
          secureTextEntry={true}
          value={this.state.curso}
          onChangeText={(curso) => this.setState({ curso })}
        />
        <TextInput
          style={styles.input}
          placeholder="Como posso te chamar?"
          value={this.state.nickname}
          onChangeText={(nickname) => this.setState({ nickname })}
        />
        <TouchableOpacity style={styles.button} onPress={this.handleCadastro}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    width: "80%",
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "red",
    borderRadius: 10,
    padding: 10,
    width: "80%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
