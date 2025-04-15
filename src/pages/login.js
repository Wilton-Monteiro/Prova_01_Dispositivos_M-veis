import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ImageBackground,
         TextInput,
         TouchableOpacity,
         Text,
         StyleSheet } from 'react-native';


  const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    const navigation = useNavigation();

    const handleLogin = async () => {
      const user = await AsyncStorage.getItem("user")
      if(!user){
        alert("Nenhum usuário cadastrado!")
        return
      }
    const userJson = JSON.parse(user)

    if(userJson.email === email && userJson.password === password){
      navigation.navigate("Main")
    }else{
      alert("E-mail ou senha inválidos!")
    }
  };

  const handleCadastro = () => {
    navigation.navigate('CadastrarUsuario');
  };

  return (
    <ImageBackground 
      source={require('../pages/images/img1.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="black"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="black"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity 
        style={styles.button} 
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button} 
        onPress={handleCadastro}
      >
        <Text style={styles.buttonText}>Cadastro</Text>
      </TouchableOpacity>
        
      
    </ImageBackground>
    
  );
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
    backgroundColor: "white",
    opacity: 0.7,
    marginVertical: 10,
    width: "80%",
  },
  button: {
    backgroundColor: "red",
    borderRadius: 10,
    padding: 10,
    width: "80%",
    alignItems: "center",
    marginVertical: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Login;
