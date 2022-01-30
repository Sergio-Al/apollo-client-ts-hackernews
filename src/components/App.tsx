import React from "react";
import "./../styles/App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";

// for the moment we are working with fake pages, later React router will join to the party!

// page of Create link
import CreateLink from "./CreateLink";
// page of link list
import LinkList from "./LinkList";
import Login from "./Login";

function App() {
  return (
    <div className="center w85">
      <Header />
      <div className="ph3 pv1 background-gray">
        <Routes>
          <Route path="/" element={<LinkList />} />
          <Route path="/create" element={<CreateLink />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
