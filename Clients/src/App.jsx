// // App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./Style_Components/S_style.css";
import "./Style_Components/G_style.css";
import "./Style_Components/A_style.css";
import "./Style_Components/P_style.css";
import Sidebar from "./Frontend/Sidebar";
import Group from "./Frontend//Group";
import Account from "./Frontend/Account";
import Product from "./Frontend/Product";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Sidebar />}></Route>
          <Route path="/group" element={<Group />} />
          <Route path="/account" element={<Account />} />
          <Route path="/product" element={<Product />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

// src/App.js
// import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Form from './components/Form';
// import Home from './components/Home';

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Switch>
//           <Route path="/" exact component={Home} />
//           <Route path="/group" component={Form} />
//           {/* Add other routes as needed */}
//         </Switch>
//       </div>
//     </Router>
//   );
// }

// export default App;
