
// filepath: c:\Users\artur\OneDrive\Documentos\Coisas do IF\Programação Móvel\produto-manager-jwt\frontend\src\screens\Login.js
import React, { useState } from "react";
import styled from "styled-components/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 24px;
  background: #fff;
`;

const Input = styled.TextInput`
  width: 100%;
  border: 1px solid #ccc;
  margin-bottom: 12px;
  padding: 10px;
  border-radius: 6px;
`;

const Button = styled.TouchableOpacity`
  background: #007bff;
  padding: 12px 24px;
  border-radius: 6px;
  margin-bottom: 12px;
  width: 100%;
`;

const ButtonText = styled.Text`
  color: #fff;
  text-align: center;
  font-weight: bold;
`;

const ErrorText = styled.Text`
  color: red;
  margin-bottom: 12px;
`;

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  async function handleLogin() {
    setError("");
    try {
      const res = await axios.post("http://localhost:3000/auth/login", { email, senha });
      await AsyncStorage.setItem("token", res.data.token);
      if (res.data.user.role === "ADMIN") {
        navigation.replace("PainelAdmin");
      } else {
        navigation.replace("Home");
      }
    } catch (err) {
      setError("Usuário ou senha inválidos.");
    }
  }

  async function handleRegister() {
    setError("");
    try {
      await axios.post("http://localhost:3000/auth/register", { email, senha });
      setError("Cadastro realizado! Faça login.");
    } catch (err) {
      setError("Erro ao cadastrar.");
    }
  }

  return (
    <Container>
      <Input
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <Input
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      {error ? <ErrorText>{error}</ErrorText> : null}
      <Button onPress={handleLogin}>
        <ButtonText>Entrar</ButtonText>
      </Button>
      <Button onPress={handleRegister} style={{ backgroundColor: "#28a745" }}>
        <ButtonText>Cadastrar</ButtonText>
      </Button>
    </Container>
  );
}