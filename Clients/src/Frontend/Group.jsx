import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import EditNoteIcon from '@mui/icons-material/EditNote';

function Group() {
  const [itemName, setItemName] = useState("");
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    fetchItems();
  }, [currentPage]);

  const fetchItems = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/list`);
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const addItem = async () => {
    try {
      await axios.post("http://localhost:4000/list", { name: itemName });
      setItemName("");
      fetchItems();
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/list/${id}`);
      fetchItems();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const updateItem = async (id, newName) => {
    try {
      await axios.put(`http://localhost:4000/list/${id}`, {
        name: newName,
      });
      fetchItems();
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const totalPages = Math.ceil(items.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, items.length);
  const currentItems = items.slice(startIndex, endIndex);

  return (
    <>
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
              <li>Group</li>
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

      <div className="app">
        <h1>Group</h1>
        <div className="group-container">
          <input
            className="text-input"
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="Enter item name"
          />
          <button onClick={addItem} disabled={itemName.length === 0}>
            Add
          </button>

          <table className="items-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={item._id}>
                  <td>{startIndex + index + 1}</td> {/* Sequential ID */}
                  <td>{item.name}</td>
                  <td>
                    <DeleteSweepIcon onClick={() => deleteItem(item._id)} />
                    <EditNoteIcon onClick={() => {
                      const newName = prompt("Enter new name:");
                      if (newName) updateItem(item._id, newName);
                    }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div>
            <ArrowCircleLeftIcon onClick={prevPage} disabled={currentPage === 1} />
            <ArrowCircleRightIcon onClick={nextPage} disabled={currentPage === totalPages} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Group;
