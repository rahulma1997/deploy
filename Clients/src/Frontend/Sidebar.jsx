// import React from "react";
// import { Link } from "react-router-dom";

// const 
// Sidebar = () => {
//   return (
//     <>
//       <center>
//         <h1>Welcome My Home Page</h1>
//       </center>

//       <div className="sidebar">
//         <h2>Dashboard</h2>
//         <ul>
//           <li>Home</li>
//           <li className="dropdown">
//             Creation
//             <ul className="dropdown-content">
//               <Link to="/group">
//                 <li>Group</li>
//               </Link>

                
//               <Link to="/account">
//               <li>Account</li>
//               </Link>
              
//               <Link to="/product">
//               <li>Product</li>
//               </Link>
              
//             </ul>
//           </li>
//         </ul>
//       </div>
//     </>
//   );
// };

// export default Sidebar;
// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="sidebar">
    <h2>Dashboard</h2>
    <ul>
      <li>
        <Link to="/" className="home">
          Home
        </Link>
      </li>
      <li className="dropdown">
        Creation
        <ul className="dropdown-content">
        <Link to="/group">
        <li>Group</li>
          </Link>
          <Link to="/account">
            <li>Account</li>
          </Link>
          <Link to="/product">
            <li>Product</li>
          </Link>
        </ul>
      </li>
    </ul>
  </div>
  );
};

export default Home;
