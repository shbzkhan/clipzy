import React from "react";
import { View, Text } from "react-native";
import { Tabs, MaterialTabBar } from "react-native-collapsible-tab-view";


const HEADER_HEIGHT = 200;

const Notification =()=> {
  return (
    <Tabs.Container
      headerHeight={HEADER_HEIGHT}
      renderHeader={() => (
        <View
          style={{
            height: HEADER_HEIGHT,
            backgroundColor: "#0c263b",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 20 }}>Channel Header</Text>
        </View>
      )}
      revealHeaderOnScroll
      TabBarComponent={(props) => (
        <MaterialTabBar {...props} activeColor="white" inactiveColor="gray" />
      )}
    >
      <Tabs.Tab name="Videos">
        <Tabs.ScrollView>
          {Array.from({ length: 20 }).map((_, i) => (
            <Text key={i} style={{ padding: 20, color: "white" }}>
              Video {i + 1}
            </Text>
          ))}
        </Tabs.ScrollView>
      </Tabs.Tab>

      <Tabs.Tab name="Playlists">
        <Tabs.ScrollView>
          {Array.from({ length: 10 }).map((_, i) => (
            <Text key={i} style={{ padding: 20, color: "white" }}>
              Playlist {i + 1}
            </Text>
          ))}
        </Tabs.ScrollView>
      </Tabs.Tab>
    </Tabs.Container>
  );
}


export default Notification