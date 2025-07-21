import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList } from "react-native";

const Container = styled.View`
  flex: 1;
  background: #fff;
  padding: 16px;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const UserItem = styled.View`
  padding: 12px;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
`;

const UserText = styled.Text`
  font-size: 16px;
`;

export default function PainelAdmin() {
  const [usuarios, setUsuarios] = useState([]);
  const [produtos, setProdutos] = useState([]);

  async function fetchData() {
    const token = await AsyncStorage.getItem("token");
    const resUsers = await axios.get("http://localhost:3000/admin/users", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setUsuarios(resUsers.data);

    const resProdutos = await axios.get("http://localhost:3000/products", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setProdutos(resProdutos.data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <Title>Usuários</Title>
      <FlatList
        data={usuarios}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <UserItem>
            <UserText>{item.email} ({item.role})</UserText>
          </UserItem>
        )}
      />
      <Title style={{ marginTop: 24 }}>Produtos Totais</Title>
      <FlatList
        data={produtos}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <UserItem>
            <UserText>{item.name} - {item.quantity} und - R$ {item.price}</UserText>
          </UserItem>
        )}
      />
    </Container>
  );
}