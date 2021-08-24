import { 
  ApolloProvider, 
  ApolloClient, 
  useMutation, 
  InMemoryCache 
} from "@apollo/client";
import { tokenAuthMutation } from "../api/mutations";
import { useEffect, useContext, useState } from "react";
import { userContext } from "../state-management/user-state/userContext";

export default function ClientMutator({ children }) {
  console.log('clientMutator');
  const userInfo = useContext(userContext);
  var token = '';
  var refreshToken = '';

  if (typeof window !== 'undefined'){
    token = sessionStorage.getItem("token");
    refreshToken = localStorage.getItem("refreshToken");
  }

  const [signedClient, setClient] = useState(
    new ApolloClient({
      uri: "http://localhost:8000/endpoint/",
      cache: new InMemoryCache(),
    })
  );
  const [verfiyToken, { data, loading, error }] = useMutation(
    tokenAuthMutation,
    {
      token,
    }
  );

  useEffect(() => {
    verfiyToken();
  }, []);

  useEffect(() => {
    if (data) {
      if (data.verfiyToken.success) {
        setClient(
          new ApolloClient({
            uri: "http://localhost:8000/endpoint/",
            cache: new InMemoryCache(),
            headers: {
              authorization: "JWT " + token,
            },
          })
        );
        userInfo.userDispatch({ logged: true });
      }
    }
}, [data]);

console.log("verifyToken", data);
  return (
  <ApolloProvider client={signedClient}>
      {children}
  </ApolloProvider>
  );
}
