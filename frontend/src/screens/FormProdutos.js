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
  const product = route.params?.product;
  const [name, setName] = useState(product?.name || "");
  const [quantity, setQuantity] = useState(product?.quantity?.toString() || "");
  const [price, setPrice] = useState(product?.price?.toString() || "");
  console.log(name, quantity, price)

  async function handleSave() {
    const token = await AsyncStorage.getItem("token");
    console.log("Token enviado:", token);
    if (product) {
      await axios.put(`http://localhost:3000/products/${product.id}`, { name, quantity, price }, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } else {
      console.log("Chegou:", product);
        try {
          await axios.post("http://localhost:3000/products", { name, quantity, price }, {
            headers: { Authorization: `Bearer ${token}` }
          });
        } catch (error) {
          console.log(
            "Erro ao criar produtos:",
            error.response?.data || error.message
          );
        }
    }
    navigation.goBack();
  }

  async function handleRemove() {
    const token = await AsyncStorage.getItem("token");
    await axios.delete(`http://localhost:3000/products/${product.id}`, {
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
        <ButtonText>{product ? "Salvar Alterações" : "Adicionar Produto"}</ButtonText>
      </Button>
      {product && (
        <RemoveButton onPress={handleRemove}>
          <ButtonText>Remover Produto</ButtonText>
        </RemoveButton>
      )}
    </Container>
  );
}