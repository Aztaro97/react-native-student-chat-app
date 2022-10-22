import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import ChatRoomScreen from "../../screens/chatRoom/chatRoomScreen";
import ThreadScreen from "../../screens/threadScreen/threadScreen";
import { HomeDrawerParamsList } from "../../types/navigationTypes";
import DrawerContentScreen from "../drawerContent";
import MainTabsScreen from "../mainTabs";

const Drawer = createDrawerNavigator<HomeDrawerParamsList>();

const RootStackScreen = () => {
  return (
    <Drawer.Navigator
      initialRouteName="HomeDrawer"
      drawerContent={(props) => <DrawerContentScreen {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen name="HomeDrawer" component={MainTabsScreen} />
      <Drawer.Screen name="ChatRoom" component={ChatRoomScreen} />
      <Drawer.Screen name="Thread" component={ThreadScreen} />
    </Drawer.Navigator>
  );
};

export default RootStackScreen;
