import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import EditNoteIcon from '@mui/icons-material/EditNote';

const Product = () => {
  const [name, setName] = useState("");
  const [hsncode, setHsncode] = useState("");
  const [price, setPrice] = useState("");
  const [saleprice, setSaleprice] = useState("");
  const [holesale, setHolesale] = useState("");
  const [mrp, setMrp] = useState("");
  const [descount, setDescount] = useState("");
  const [gst, setGst] = useState("");
  const [unit, setUnit] = useState("");
  const [barcode, setBarcode] = useState("");
  const [fetchedData, setFetchedData] = useState([]);
  const [idToUpdate, setIdToUpdate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 5;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/products");
      setFetchedData(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name,
      hsncode,
      price,
      saleprice,
      holesale,
      mrp,
      descount,
      gst,
      unit,
      barcode,
    };

    try {
      if (validateForm()) {
        if (idToUpdate) {
          await axios.put(`http://localhost:4000/products/${idToUpdate}`, formData);
          fetchData();
          clearForm();
          setIdToUpdate(null);
        } else {
          const response = await axios.post("http://localhost:4000/products", formData);
          setFetchedData(prevData => [...prevData, response.data]);
          clearForm();
        }
      } else {
        console.log("Please fill in all required fields.");
      }
    } catch (error) {
      console.error("Error submitting data: ", error);
    }
  };

  const validateForm = () => {
    return name && hsncode && price && saleprice && holesale && mrp && descount && gst && unit && barcode;
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/products/${id}`);
      fetchData(); // Refresh data after deletion
    } catch (error) {
      console.error('Error deleting data: ', error);
    }
  };

  const handleUpdate = (data) => {
    setName(data.name);
    setHsncode(data.hsncode);
    setPrice(data.price);
    setSaleprice(data.saleprice);
    setHolesale(data.holesale);
    setMrp(data.mrp);
    setDescount(data.descount);
    setGst(data.gst);
    setUnit(data.unit);
    setBarcode(data.barcode);
    setIdToUpdate(data.id);
  };

  const clearForm = () => {
    setName("");
    setHsncode("");
    setPrice("");
    setSaleprice("");
    setHolesale("");
    setMrp("");
    setDescount("");
    setGst("");
    setUnit("");
    setBarcode("");
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  return (
    <>
      <div className="sidebar">
        <h2>Dashboard</h2>
        <ul>
          <Link to="/">
            <li>Home</li>
          </Link>
          <li className="dropdown">
            Creation
            <ul className="dropdown-content">
              <Link to="/group">
                <li>Group</li>
              </Link>
              <Link to="/account">
                <li>Account</li>
              </Link>
              <li>Product</li>
            </ul>
          </li>
        </ul>
      </div>

      <div className="form-container">
        <h2>Product</h2>

        <form onSubmit={handleSubmit}>
          {/* Form Fields */}
          <div className="form-group">
            <label>Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

            <label>HSN Code</label>
            <input value={hsncode} onChange={(e) => setHsncode(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Price</label>
            <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />

            <label>Sale Price</label>
            <input type="text" value={saleprice} onChange={(e) => setSaleprice(e.target.value)} />

            <label>Hole Sale</label>
            <input type="text" value={holesale} onChange={(e) => setHolesale(e.target.value)} />
          </div>

          <div className="form-group">
            <label>MRP</label>
            <input type="text" value={mrp} onChange={(e) => setMrp(e.target.value)} />

            <label>DIS %</label>
            <input type="text" value={descount} onChange={(e) => setDescount(e.target.value)} />

            <label>GST %</label>
            <input type="text" value={gst} onChange={(e) => setGst(e.target.value)} />
          </div>

          <div>
            <label>Unit</label>
            <select value={unit} onChange={(e) => setUnit(e.target.value)}>
              <option value="">Select Unit</option>
              <option value="Unit 1">Unit 1</option>
              <option value="Unit 2">Unit 2</option>
              <option value="Unit 3">Unit 3</option>
              <option value="Unit 4">Unit 4</option>
            </select>

            <label>Barcode</label>
            <input type="text" value={barcode} onChange={(e) => setBarcode(e.target.value)} />
          </div>

          <button type="submit" disabled={!validateForm()}>
            Submit
          </button>
        </form>

        <hr />

        <div className="tb">
          <h2>Product Details Table</h2>
          <table>
            <thead>
              <tr>
                <th>Action</th>
                <th>ID</th>
                <th>Name</th>
                <th>HSN Code</th>
                <th>Price</th>
                <th>Sale Price</th>
                <th>Hole Sale</th>
                <th>MRP</th>
                <th>DIS %</th>
                <th>GST %</th>
                <th>Unit</th>
                <th>Barcode</th>
              </tr>
            </thead>
            <tbody>
              {fetchedData.slice(startIndex, endIndex).map((data, index) => (
                <tr key={data._id}>
                  <td>
                    <div>
                      <DeleteSweepIcon onClick={() => handleDelete(data._id)} />
                      <EditNoteIcon onClick={() => handleUpdate(data)} />
                    </div>
                  </td>
                  <td>{startIndex + index + 1}</td> {/* Render sequential ID */}
                  <td>{data.name}</td>
                  <td>{data.hsncode}</td>
                  <td>{data.price}</td>
                  <td>{data.saleprice}</td>
                  <td>{data.holesale}</td>
                  <td>{data.mrp}</td>
                  <td>{data.descount}</td>
                  <td>{data.gst}</td>
                  <td>{data.unit}</td>
                  <td>{data.barcode}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div>
            <ArrowCircleLeftIcon onClick={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))} disabled={currentPage === 1} />
            <ArrowCircleRightIcon onClick={() => setCurrentPage((prev) => prev + 1)} disabled={currentPage * pageSize >= fetchedData.length} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;


// import React, { useState } from 'react';
// import axios from 'axios';

// const Product = () => {
//     const [productName, setProductName] = useState('');
//     const [productId, setProductId] = useState('');

//     const handleGenerateId = () => {
//         axios.post('http://localhost:4000/products', { productName })
//             .then(res => {
//                 setProductId(res.data.productId);
//             })
//             .catch(err => {
//                 console.error('Error generating product ID:', err);
//             });
//     };

//     return (
//         <div>
//             <h2>Generate Product ID</h2>
//             <label>Product Name:</label>
//             <input type="text" value={productName} onChange={e => setProductName(e.target.value)} />
//             <button onClick={handleGenerateId}>Generate ID</button>
//             {productId && <p>Generated Product ID: {productId}</p>}
//         </div>
//     );
// };

// export default Product;
