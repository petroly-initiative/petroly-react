import { ApolloProvider, ApolloClient, useMutation } from "@apollo/client";
import { tokenAuthMutation } from "../api/mutations";
import { useEffect, useContext } from "react";
import { userContext } from "../state-management/user-state/userContext";

export default function clientMutator({ children, ...delegated }) {
  const userInfo = useContext(userContext);

  const token = sessionStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");
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
        <div {...delegated}>{children}</div>
  </ApolloProvider>
  );
}
