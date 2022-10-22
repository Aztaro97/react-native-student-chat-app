import {
  Box,
  Button,
  FormControl,
  Heading,
  Input,
  Pressable,
  Stack,
  Text,
  useColorModeValue,
  KeyboardAvoidingView,
  View,
} from "native-base";
import { MotiView, motify, MotiText } from "moti";
import { Platform, Dimensions } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useContext } from "react";
import { AuthenticatedUserContext } from "../../contexts/AuthenticatedUserProvider";
import { useNavigation } from "@react-navigation/native";
import { LoginSchema } from "../../utils/validationSchema";
import { Color } from "../../constants/Colors";

const { height, width } = Dimensions.get("window");

type UserLoginProps = {
  email: string;
  password: string;
};

const LoginScreen = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setError] = useState<boolean>(false);
  const [showPwd, setShowPwd] = useState<boolean>(false);

  const navigation = useNavigation();

  const { setUser } = useContext(AuthenticatedUserContext);

  const { handleSubmit, control } = useForm<UserLoginProps>({
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit = (data: UserLoginProps): void => {
    setIsLoading(true);
    const { email, password } = data;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential: any) => {
        const user = userCredential.user;
        setUser(user);
        setIsLoading(false);
        setError(false);
      })
      .catch((error: any) => {
        console.log("error", error);
        setIsLoading(false);
        setError(true);
      });
  };

  return (
    <Box flex={1} justifyContent="space-between" bg={Color.primary} safeArea>
      <Box flex={1} alignItems="center" justifyContent={"center"}>
        <MotiText
          from={{
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            type: "timing",
            duration: 1000,
            delay: 100,
          }}
          style={{
            marginTop: 50,
            marginLeft: 20,
          }}
        >
          <Heading
            fontSize={70}
            fontWeight="bold"
            lineHeight={65}
            px="10"
            mb="4"
            mt="20"
            color="#fff"
            position={"relative"}
          >
            Welcome back
          </Heading>
        </MotiText>
      </Box>
      <MotiView
        from={{
          opacity: 0.5,
          translateY: 800,
        }}
        animate={{
          opacity: 1,
          translateY: 0,
        }}
        transition={{
          type: "timing",
          duration: 2000,
          delay: 800,
        }}
      >
        <KeyboardAvoidingView
          h={{
            base: height / 1.7,
            lg: "auto",
          }}
          behavior={Platform.OS === "ios" ? "padding" : "padding"}
          bg={useColorModeValue("#fff", "gray.800")}
          borderTopLeftRadius={30}
          borderTopRightRadius={30}
          py="5"
          px="10"
        >
          <Box flex={1}>
            <Heading fontSize="3xl" fontWeight={"bold"} mb={4}>
              Login
            </Heading>

            {isError && (
              <View bg="red.100" py={2} px={3} borderRadius={10}>
                <Text color="red.500" bold>
                  Incorrect Email pr password
                </Text>
              </View>
            )}

            <Stack space={4} mt="2">
              <FormControl isRequired>
                <Controller
                  control={control}
                  name="email"
                  rules={{ required: "The Email is required" }}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <Box>
                      <Input
                        type="text"
                        size={"lg"}
                        placeholder="Enter the Email"
                        w="100%"
                        variant={"underlined"}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                      />
                      {error && (
                        <Text fontSize="xs" color="red.500" mt="1">
                          {error.message}
                        </Text>
                      )}
                    </Box>
                  )}
                />
              </FormControl>

              <FormControl isRequired>
                <Controller
                  control={control}
                  name="password"
                  rules={{
                    required: "The Password is required",
                    minLength: {
                      value: 6,
                      message: "Must be at least 6 characters.",
                    },
                  }}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                  }) => (
                    <Box>
                      <Input
                        type={showPwd ? "text" : "password"}
                        size={"lg"}
                        placeholder="Enter the Password"
                        w="100%"
                        variant={"underlined"}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        InputRightElement={
                          <Pressable onPress={() => setShowPwd(!showPwd)}>
                            <Text color={Color.primary}>
                              {showPwd ? "Hide" : "Show"}{" "}
                            </Text>
                          </Pressable>
                        }
                      />
                      {error && (
                        <Text fontSize="xs" color="red.500" mt="1">
                          {error.message}
                        </Text>
                      )}
                    </Box>
                  )}
                />
              </FormControl>

              <Pressable onPress={() => navigation.navigate("ResetPassword")}>
                <Text color={Color.primary}>Forgot passcode? </Text>
              </Pressable>

              <Button
                w="100%"
                mt={5}
                py="4"
                _text={{ fontSize: "xl", fontWeight: "bold" }}
                bg={Color.primary}
                rounded="lg"
                color="#fff"
                onPress={handleSubmit(onSubmit)}
                isLoading={isLoading}
              >
                Login
              </Button>
            </Stack>
          </Box>
        </KeyboardAvoidingView>
      </MotiView>
    </Box>
  );
};

export default LoginScreen;
