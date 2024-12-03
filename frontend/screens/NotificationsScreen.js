import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";

export default function NotificationsScreen() {
  // Lista de notificações
  const notifications = [
    { id: "1", text: "Vaca #102 está perto de criar (10 dias restantes)." },
    { id: "2", text: "Vacinação contra brucelose programada para amanhã." },
    { id: "3", text: "Vaca #45 necessita de revisão sanitária." },
    { id: "4", text: "Vermifugação geral agendada para a próxima semana." },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notificações</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.notificationCard}>
            <Text style={styles.notificationText}>{item.text}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4CAF50",
    textAlign: "center",
    marginBottom: 20,
  },
  notificationCard: {
    backgroundColor: "#E8F5E9",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
  },
  notificationText: {
    color: "#2E7D32",
    fontSize: 16,
    fontWeight: "bold",
  },
});
