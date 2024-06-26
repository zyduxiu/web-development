import React from "react";
import { BrowserRouter as router, Routes, Route } from "react-router-dom";
import MemberProfile from "./component/MemberProfile";

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/profile/:phoneNumber" element={<MemberProfile />} />
      </Routes>
    </div>
  );
}

export default App;
