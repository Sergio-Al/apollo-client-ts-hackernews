import React from "react";
import "./../styles/App.css";

// for the moment we are working with fake pages, later React router will join to the party!

// page of Create link
import CreateLink from "./CreateLink";
// page of link list
import LinkList from "./LinkList";

function App() {
  return <CreateLink />;
}

export default App;
