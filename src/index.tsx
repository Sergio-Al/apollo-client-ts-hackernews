import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";

// creating a context
import { setContext } from "@apollo/client/link/context";
import { AUTH_TOKEN } from "./components/constants";

// import { FEED_QUERY } from "./components/LinkList";
// import { gql } from "@apollo/client";

const httpLink = createHttpLink({
  uri: "http://localhost:4000",
});

// Creating a fake session with a valid token obtained in the backend (apollo playground)
const authLInk = setContext((_, { headers }) => {
  // fake token with expiricy time
  const token = localStorage.getItem(AUTH_TOKEN);
  return {
    headers: { ...headers, authorization: token ? `Bearer ${token}` : "" },
  };
});

const client = new ApolloClient({
  // link line: we a working with our fake token created in the backend
  link: authLInk.concat(httpLink),
  cache: new InMemoryCache({
    // our type policies for our fields
    typePolicies: {
      // for Link type fields (you can see Link fields in the schema)
      //
      // Disabled because, it were used to update the ui manually,
      // currently the update is working automatically.
      // 
      // Link: {
      //   fields: {
      //     voters: {
      //       merge(existing, incoming) {
      //         return incoming;
      //       },
      //     },
      //   },
      // },
      // for Query type
      Query: {
        fields: {
          feed: {
            merge(existing, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
});

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
