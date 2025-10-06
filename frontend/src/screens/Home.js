import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList } from "react-native";
import { useIsFocused } from "@react-navigation/native";

const Container = styled.View`
  flex: 1;
  background: #fff;
  padding: 16px;
`;

const SearchInput = styled.TextInput`
  border: 1px solid #ccc;
  padding: 8px;
  border-radius: 6px;
  margin-bottom: 12px;
`;

const ProductItem = styled.TouchableOpacity`
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
`;

const ProductText = styled.Text`
  font-size: 16px;
`;

const AddButton = styled.TouchableOpacity`
  background: #007bff;
  padding: 14px;
  border-radius: 6px;
  align-items: center;
  margin-top: 16px;
`;

const AddButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
`;

export default function Home({ navigation }) {
  const [produtos, setProdutos] = useState([]);
  const [busca, setBusca] = useState("");
  const isFocused = useIsFocused();

  async function fetchProdutos() {
    const token = await AsyncStorage.getItem("token");
    console.log("Token salvo no AsyncStorage:", token);
    console.log("Parametro de busca:", busca);
    const res = await axios.get("http://localhost:3000/products", {
      headers: { Authorization: `Bearer ${token}` },
      params: busca ? { name: busca } : {},
    });
    setProdutos(res.data);
  }

  useEffect(() => {
    if (isFocused) fetchProdutos();
  }, [isFocused, busca]);

  return (
    <Container>
      <SearchInput
        placeholder="Buscar produto por nome"
        value={busca}
        onChangeText={setBusca}
      />
      <FlatList
        data={produtos}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <ProductItem
            onPress={() =>
              navigation.navigate("FormProdutos", { product: item })
            }
          >
            <ProductText>
              {item.name} - {item.quantity} und - R$ {item.price}
            </ProductText>
          </ProductItem>
        )}
      />
      <AddButton onPress={() => navigation.navigate("FormProdutos")}>
        <AddButtonText>Adicionar Produto</AddButtonText>
      </AddButton>
    </Container>
  );
}