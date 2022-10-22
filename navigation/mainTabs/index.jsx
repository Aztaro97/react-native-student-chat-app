import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Color } from "../../constants/Colors";
import { View } from "native-base";
import StudentsScreen from "../../screens/users/usersScreen";
import ChatListScreen from "../../screens/chatList/chatListScreen";
import ProfileScreen from "../../screens/profile/profileScreen";

const HomeStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabsScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="ChatListTab"
      screenOptions={{
        tabBarStyle: {
          borderTopWidth: 0,
          height: 60,
          paddingBottom: 7,
          paddingTop: 7,
        },
        tabBarShowLabel: true,
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: Color.primary,
      }}
    >
      <Tab.Screen
        name="ChatListTab"
        component={ChatStackScreen}
        options={{
          tabBarLabel: "Chat",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="ios-chatbubbles-outline"
              size={size}
              color={color}
            />
          ),
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="StudentsTabs"
        component={StudentsStackScreen}
        options={{
          tabBarLabel: "Students",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="users" size={size} color={color} />
          ),

          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

const ChatStackScreen = () => {
  return (
    <HomeStack.Navigator
      initialRouteName="ChatList"
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="ChatList" component={ChatListScreen} />
    </HomeStack.Navigator>
  );
};

const StudentsStackScreen = () => {
  return (
    <HomeStack.Navigator
      initialRouteName="Students"
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="Students" component={StudentsScreen} />
      <HomeStack.Screen
        name="Profile"
        options={{ headerShown: true }}
        component={ProfileScreen}
      />
    </HomeStack.Navigator>
  );
};
export default MainTabsScreen;
