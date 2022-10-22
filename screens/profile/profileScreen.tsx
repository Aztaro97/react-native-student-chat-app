import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Box,
  Center,
  Flex,
  HStack,
  Icon,
  Image,
  Pressable,
  Switch,
  Text,
  View,
} from "native-base";
import React, { useState } from "react";
import { setDoc, doc } from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";
import { db } from "../../config/firebase";
import { useChatContext } from "stream-chat-expo";
import { AuthenticatedUserContext } from "../../contexts/AuthenticatedUserProvider";
import { Color } from "../../constants/Colors";

const ProfileScreen = () => {
  const route = useRoute();
  const {
    params: { id, first_name, last_name, image, roll_no, classType, isActive },
  } = route;

  const [isEnabled, setIsEnabled] = useState(false);

  const navigation = useNavigation();

  const handleToggle = async (val: boolean) => {
    setIsEnabled(val);
    try {
      const docRef = doc(db, "students", id);
      await setDoc(docRef, { isActive: val }, { merge: true });
    } catch (error) {
      console.log(error);
    }
  };

  const adminId = "aztaro97";

  const { client } = useChatContext();

  const onPressChat = async () => {
    if (!id || !adminId) return;

    const newChannel = client.channel("messaging", { members: [id, adminId] });
    await newChannel.watch();

    navigation.navigate("ChatRoom", {
      channelId: newChannel.id,
    });
  };

  return (
    <Box flex={1} safeArea px={3}>
      <Center mb={10}>
        <Image
          w={200}
          h={200}
          borderRadius={20}
          source={{ uri: image }}
          alt={last_name}
        />
      </Center>

      <HStack space={4} justifyContent="space-between">
        <View>
          <Text fontSize={18}>
            First Name:
            <Text bold color={Color.primary}>
              {first_name}
            </Text>
          </Text>

          <Text fontSize={18}>
            Last Name:
            <Text bold color={Color.primary}>
              {last_name}
            </Text>
          </Text>

          <Text fontSize={20}>
            Class:{" "}
            <Text bold color={Color.primary}>
              {classType}
            </Text>
          </Text>

          <Text fontSize={20}>
            Roll No:{" "}
            <Text bold color={Color.primary}>
              {roll_no}
            </Text>
          </Text>
        </View>

        <View>
          <Text bold color="gray.400">
            Visibility
          </Text>
          <Switch
            defaultIsChecked={isEnabled}
            isChecked={isEnabled}
            onToggle={handleToggle}
            size="lg"
            colorScheme="primary"
          />
        </View>
      </HStack>

      <Pressable
        onPress={onPressChat}
        flex={1}
        justifyContent="flex-end"
        mb={5}
      >
        <Flex
          bg={Color.primary}
          flexDirection="row"
          px={3}
          py={3}
          borderRadius={20}
          alignItems="center"
          justifyContent="center"
          mt={10}
        >
          <Icon
            size={"3xl"}
            color="#fff"
            as={<Ionicons name="chatbubble-ellipses-outline" />}
          />
          <Text ml={2} fontSize={30} color="#fff" bold>
            Chat
          </Text>
        </Flex>
      </Pressable>
    </Box>
  );
};

export default ProfileScreen;
