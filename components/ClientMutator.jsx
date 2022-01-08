import {
  ApolloProvider,
  ApolloClient,
  useMutation,
  InMemoryCache,
} from "@apollo/client";
import { verifyTokenMutation, refreshTokenMutation } from "../api/mutations";
import { useEffect, useContext, useState } from "react";
import { UserContext } from "../state-management/user-state/UserContext";
import { USER, T, URL_ENDPOINT } from "../constants";

export default function ClientMutator({ children }) {
  const userContext = useContext(UserContext);
  var token = "";
  var rToken = "";

  if (typeof window !== "undefined") {
    token = sessionStorage.getItem("token");
    if (!token) token = userContext.user.token;
    rToken = localStorage.getItem("refreshToken");
  }

  const [client, setClient] = useState(
    new ApolloClient({
      uri: URL_ENDPOINT,
      cache: new InMemoryCache(),
    })
  );
  const [verifyToken, { data: dataVerifyToken }] = useMutation(
    verifyTokenMutation,
    { variables: { token } }
  );
  const [refreshToken, { data: dataRefreshToken }] = useMutation(
    refreshTokenMutation,
    { variables: { refreshToken: rToken } }
  );

  // Excute `toketAuth` once if `token` is found
  useEffect(async () => {
    if (userContext.user.status === USER.VERIFING) {
      var username = userContext.user.username;
      token = userContext.user.token;
      if (!localStorage.getItem("lang")) localStorage.setItem("lang", "en");

      setClient(
        new ApolloClient({
          uri: URL_ENDPOINT,
          cache: new InMemoryCache(),
          headers: { authorization: "JWT " + token },
        })
      );

      userContext.userDispatch({
        type: T.SET_CLIENT,
        token,
        username,
        lang: localStorage.getItem("lang") || "en",
      });
    } else if (token) await verifyToken();
    else if (rToken) await refreshToken();
    else if (userContext.user.status === USER.LOGGED_OUT) client.resetStore();
  }, [userContext.user.status]);

  useEffect(() => {
    if (dataVerifyToken) {
      if (dataVerifyToken.verifyToken.success) {
        setClient(
          new ApolloClient({
            uri: URL_ENDPOINT,
            cache: new InMemoryCache(),
            headers: { authorization: "JWT " + token },
          })
        );
        // TODO: provide language by the me query
        userContext.userDispatch({
          type: T.SET_CLIENT,
          token,
          username: dataVerifyToken.verifyToken.payload.username,
          lang: localStorage.getItem("lang") || "en",
        });
      } else if (rToken) {
        refreshToken();
      }
    }
  }, [dataVerifyToken]);

  useEffect(() => {
    if (dataRefreshToken) {
      if (dataRefreshToken.refreshToken.success) {
        token = dataRefreshToken.refreshToken.token;
        rToken = dataRefreshToken.refreshToken.refreshToken;
        sessionStorage.setItem("token", token);
        localStorage.setItem("refreshToken", rToken);
        setClient(
          new ApolloClient({
            uri: URL_ENDPOINT,
            cache: new InMemoryCache(),
            headers: { authorization: "JWT " + token },
          })
        );
        userContext.userDispatch({
          type: T.SET_CLIENT,
          token,
          username: dataRefreshToken.refreshToken.payload.username,
          lang: localStorage.getItem("lang") || "en",
        });
      }
    }
  }, [dataRefreshToken]);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
