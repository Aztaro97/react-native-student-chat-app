import { createDrawerNavigator } from "@react-navigation/drawer";
import React, { useEffect, useState } from "react";
import AuthStackScreen from "../navigation/authStack";

import { useContext } from "react";
import { AuthenticatedUserContext } from "../contexts/AuthenticatedUserProvider";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import RootStackScreen from "../navigation/rootStack";
import LoaderSpinner from "../components/loaderSpinner";
import { Box } from "native-base";

const AuthRoutes = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { user, setUser } = useContext(AuthenticatedUserContext);

  useEffect(() => {
    setIsLoading(true);
    const unsubscribeAuthStateChanged = onAuthStateChanged(
      auth,
      (authenticatedUser) => {
        authenticatedUser ? setUser(authenticatedUser) : setUser(null);
        setIsLoading(false);
      }
    );

    // unsubscribe auth listener on unmount
    return unsubscribeAuthStateChanged;
  }, [user]);

  if (isLoading)
    return (
      <Box safeArea>
        <LoaderSpinner />
      </Box>
    );

  return <>{user ? <RootStackScreen /> : <AuthStackScreen />}</>;
};

export default AuthRoutes;
