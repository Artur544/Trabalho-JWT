import React, { useState } from "react";
import styled from "styled-components/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Container = styled.View`
  flex: 1;
  padding: 24px;
  background: #fff;
`;

const Input = styled.TextInput`
  border: 1px solid #ccc;
  margin-bottom: 12px;
  padding: 10px;
  border-radius: 6px;
`;

const Button = styled.TouchableOpacity`
  background: #007bff;
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 12px;
`;

const ButtonText = styled.Text`
  color: #fff;
  text-align: center;
  font-weight: bold;
`;

const RemoveButton = styled.TouchableOpacity`
  background: #dc3545;
  padding: 12px;
  border-radius: 6px;
`;

export default function FormProdutos({ route, navigation }) {
  const produto = route.params?.produto;
  const [name, setName] = useState(produto?.name || "");
  const [quantity, setQuantity] = useState(produto?.quantity?.toString() || "");
  const [price, setPrice] = useState(produto?.price?.toString() || "");

  async function handleSave() {
    const token = await AsyncStorage.getItem("token");
    if (produto) {
      await axios.put(`http://localhost:3000/products/${produto.id}`, { name, quantity, price }, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } else {
      await axios.post("http://localhost:3000/products", { name, quantity, price }, {
        headers: { Authorization: `Bearer ${token}` }
      });
    }
    navigation.goBack();
  }

  async function handleRemove() {
    const token = await AsyncStorage.getItem("token");
    await axios.delete(`http://localhost:3000/products/${produto.id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    navigation.goBack();
  }

  return (
    <Container>
      <Input placeholder="Nome" value={name} onChangeText={setName} />
      <Input placeholder="Quantidade" value={quantity} onChangeText={setQuantity} keyboardType="numeric" />
      <Input placeholder="Preço" value={price} onChangeText={setPrice} keyboardType="decimal-pad" />
      <Button onPress={handleSave}>
        <ButtonText>{produto ? "Salvar Alterações" : "Adicionar Produto"}</ButtonText>
      </Button>
      {produto && (
        <RemoveButton onPress={handleRemove}>
          <ButtonText>Remover Produto</ButtonText>
        </RemoveButton>
      )}
    </Container>
  );
}