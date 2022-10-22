import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Box, Text, useColorModeValue, View, VStack } from "native-base";
import React from "react";
import {
  Feather,
  FontAwesome,
  Ionicons,
  FontAwesome5,
} from "@expo/vector-icons";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { Color } from "../../constants/Colors";
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";

const DrawerContentScreen = (props: DrawerContentComponentProps) => {
  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        props.navigation.closeDrawer();
        console.log("User Log Out");
      })
      .catch((err) => console.log(err));
  };
  return (
    <Box flex={1} bg={useColorModeValue(Color.primary, "gray.500")} safeArea>
      <DrawerContentScrollView {...props}>
        <Box flex={1} justifyContent={"space-between"} h="full" px="3" py="3">
          <DrawerNavigation {...props} />

          <Text fontSize={20} mt={5} ml={3} color="gray.100">
            Preferences
          </Text>
        </Box>
      </DrawerContentScrollView>
      <DrawerItem
        labelStyle={{ color: "#fff" }}
        label="Sign Out"
        onPress={handleLogOut}
        icon={({ color, size, focused }) => (
          <Feather name="log-out" size={size} color={"#fff"} />
        )}
      />
    </Box>
  );
};

const DrawerNavigation = (props: DrawerContentComponentProps) => {
  const navLinks = [
    {
      label: "Home",
      icon: <Feather name="home" size={30} color="#fff" />,
      link: "Orders",
    },
    {
      label: "Profile",
      icon: <FontAwesome name="user-o" size={30} color="#fff" />,
      link: "Profile",
    },
    {
      label: "Tasks",
      icon: <FontAwesome5 name="tasks" size={30} color="#fff" />,
      link: "Favorite",
    },
    {
      label: "Settings",
      icon: <Ionicons name="settings-outline" size={30} color="#fff" />,
      link: "Setting",
    },
  ];

  return (
    <VStack space={4} mt={10}>
      {navLinks.map((item, index) => (
        <View key={index}>
          <DrawerItem
            style={{ backgroundColor: "transparent" }}
            inactiveTintColor="#fff"
            labelStyle={{ color: "#fff", fontWeight: "600", fontSize: 17 }}
            icon={({ color, size }) => item.icon}
            label={item.label}
            onPress={() => props.navigation.closeDrawer()}
            activeBackgroundColor={useColorModeValue("#333", "gray.500")}
          />
        </View>
      ))}
    </VStack>
  );
};

export default DrawerContentScreen;
