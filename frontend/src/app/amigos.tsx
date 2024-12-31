import { Ionicons } from "@expo/vector-icons";
import { useContext, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { UserContext } from "./includes/UserProvider";

export default function Amigos() {
  const user = useContext(UserContext);

  let [data, setData] = useState(user);

  let amigos = null;

  async function removerAmigo(amigoId: any) {
    const response = await fetch("http://10.0.2.2:3008/removerAmigo", {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: data?.user?.id,
        amigoId: amigoId,
      }),
    });

    const dados = await response.json();
    setData(dados);
    user?.fetchUserData();
  }

  if ((data?.user?.amigos || "").length <= 0) {
    amigos = (
      <Text style={{ fontSize: 17, marginTop: 10 }}>
        Você ainda não tem amigos...
      </Text>
    );
  } else {
    data?.user?.amigos.forEach((amigo: any) => {
      amigos = (
        <Pressable style={styles.btnAmigo}>
          <Ionicons
            name="person"
            size={40}
            style={{ marginVertical: 5, marginHorizontal: 15 }}
          ></Ionicons>
          <Text style={{ fontSize: 17 }}>
            {amigo.nome} {amigo.sobrenome}
          </Text>

          <Ionicons
            name="trash-outline"
            size={30}
            style={{ marginLeft: "auto", marginRight: 10 }}
            onPress={() => {
              removerAmigo(amigo.id);
            }}
          ></Ionicons>
        </Pressable>
      );
    });
  }

  return (
    <View style={{ alignItems: "center", height: "90%" }}>
      <View style={styles.feedDefault}>
        <View style={styles.topFeedPerfil}>
          <Text style={styles.subtitulo}>Todos seus amigos</Text>
        </View>

        <ScrollView
          contentContainerStyle={{ alignItems: "center", width: 320 }}
        >
          {amigos}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  feedDefault: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 30,
    width: "90%",
    height: "90%",
  },

  topFeedPerfil: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    paddingBottom: 15,
  },

  subtitulo: {
    fontWeight: "bold",
    fontSize: 35,
    width: "85%",
    textAlign: "center",
  },

  btnAmigo: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    marginVertical: 10,
  },
});
