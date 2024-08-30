import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

const Form = () => {
  const [groupName, setGroupName] = useState('');
  const [acName, setAcName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [state, setState] = useState('');
  const [contact1, setContact1] = useState('');
  const [contact2, setContact2] = useState('');
  const [email, setEmail] = useState('');
  const [panNo, setPanNo] = useState('');
  const [gstNo, setGstNo] = useState('');
  const [obdr, setObdr] = useState('');
  const [obcr, setObcr] = useState('');
  const [fetchedData, setFetchedData] = useState([]);
  const [idToUpdate, setIdToUpdate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // State for current page

  const pageSize = 5; // Number of records per page

  useEffect(() => {
    fetchData(); // Initial data fetch on component mount
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/accounts');
      setFetchedData(response.data); // Update fetched data state
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      group_name: groupName,
      ac_name: acName,
      address: address,
      city: city,
      pincode: pincode,
      state: state,
      contact1: contact1,
      contact2: contact2,
      email: email,
      pan_no: panNo,
      gst_no: gstNo,
      obdr: obdr,
      obcr: obcr,
    };

    try {
      if (validateForm()) {
        if (idToUpdate) {
          // Update existing record
          const response = await axios.put(`http://localhost:4000/accounts/${idToUpdate}`, formData);
          console.log('Updated data: ', response.data);
          fetchData(); // Refresh data after update
          clearForm(); // Clear form fields
          setIdToUpdate(null); // Reset idToUpdate state
        } else {
          // Insert new record
          const response = await axios.post('http://localhost:4000/accounts', formData);
          console.log('Inserted data: ', response.data);
          setFetchedData([...fetchedData, response.data]); // Update fetched data state
          clearForm(); // Clear form fields
        }
      } else {
        console.log('Please fill in all required fields.');
      }
    } catch (error) {
      console.error('Error submitting data: ', error);
    }
  };

  const validateForm = () => {
    return (
      groupName !== '' &&
      acName !== '' &&
      address !== '' &&
      city !== '' &&
      pincode !== '' &&
      state !== '' &&
      contact1 !== '' &&
      email !== '' &&
      panNo !== '' &&
      gstNo !== '' &&
      obdr !== '' &&
      obcr !== ''
    );
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/accounts/${id}`);
      fetchData(); // Refresh data after deletion
    } catch (error) {
      console.error('Error deleting data: ', error);
    }
  };

  const handleUpdate = (data) => {
    setGroupName(data.group_name);
    setAcName(data.ac_name);
    setAddress(data.address);
    setCity(data.city);
    setPincode(data.pincode);
    setState(data.state);
    setContact1(data.contact1);
    setContact2(data.contact2);
    setEmail(data.email);
    setPanNo(data.pan_no);
    setGstNo(data.gst_no);
    setObdr(data.obdr);
    setObcr(data.obcr);

    setIdToUpdate(data._id); // Set the ID to update
  };

  const clearForm = () => {
    setGroupName('');
    setAcName('');
    setAddress('');
    setCity('');
    setPincode('');
    setState('');
    setContact1('');
    setContact2('');
    setEmail('');
    setPanNo('');
    setGstNo('');
    setObdr('');
    setObcr('');
  };

  // Calculate start and end index for current page
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
              <Link to="/product">
                <li>Product</li>
              </Link>
            </ul>
          </li>
        </ul>
      </div>
      <div className="form-container">
        <h2>Create Account</h2>

        <form onSubmit={handleSubmit}>
          {/* Form Fields */}
          <div className="form-group">
            <label htmlFor="group">Group Name</label>
            <select
              id="group"
              name="group"
              className="group1"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            >
              <option value="">Select Group Name</option>
              <option value="Item 1">Item 1</option>
              <option value="Item 2">Item 2</option>
              <option value="Item 3">Item 3</option>
              <option value="Item 4">Item 4</option>
            </select>
          </div>

          <div className="form-group">
            <label>A/C Name</label>
            <input
              className="AE"
              type="text"
              value={acName}
              onChange={(e) => setAcName(e.target.value)}
            />

            <label>Address</label>
            <input
              className="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>City</label>
            <input
              className="cp"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />

            <label className="sp">Pincode</label>
            <input
              className="pc"
              type="text"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
            />

            <label htmlFor="" className="sp">
              State
            </label>
            <select
              id="state"
              name="state"
              className="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
            >
              <option value="">Select State</option>
              <option value="State 1">State 1</option>
              <option value="State 2">State 2</option>
              <option value="State 3">State 3</option>
              <option value="State 4">State 4</option>
            </select>
          </div>

          <div className="form-group">
            <label>Contact No. 1</label>
            <input
              className="contact"
              type="text"
              value={contact1}
              onChange={(e) => setContact1(e.target.value)}
            />

            <label>Contact No. 2</label>
            <input
              className="contact2"
              type="text"
              value={contact2}
              onChange={(e) => setContact2(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Email ID</label>
            <input
              className="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>PAN No.</label>
            <input
              className="pg"
              type="text"
              value={panNo}
              onChange={(e) => setPanNo(e.target.value)}
            />

            <label>GST No</label>
            <input
              className="gp"
              type="text"
              value={gstNo}
              onChange={(e) => setGstNo(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>OB / DR</label>
            <input
              className="balance"
              type="text"
              value={obdr}
              onChange={(e) => setObdr(e.target.value)}
            />

            <label>OB / CR</label>
            <input
              className="balance2"
              type="text"
              value={obcr}
              onChange={(e) => setObcr(e.target.value)}
            />
          </div>

          <button type="submit" disabled={!validateForm()}>
            Submit
          </button>
        </form>
        <hr />

        {/* Display fetched data in a table */}
        <div className="tb">
          <h2>Account Details Table</h2>
          <table>
            <thead className="head">
              <tr>
                <th>Action</th>
                <th>ID</th>
                <th>Group Name</th>
                <th>A/C Name</th>
                <th>Address</th>
                <th>City</th>
                <th>Pincode</th>
                <th>State</th>
                <th>Contact 1</th>
                <th>Contact 2</th>
                <th>Email</th>
                <th>PAN No</th>
                <th>GST No</th>
                <th>OB DR</th>
                <th>OB CR</th>
              </tr>
            </thead>
            <tbody className="data">
              {fetchedData.slice(startIndex, endIndex).map((data, index) => (
                <tr key={data._id}>
                  <td className="du">
                    <div className="delup">
                      <DeleteSweepIcon
                        className="del"
                        onClick={() => handleDelete(data._id)}
                      />
                      <EditNoteIcon onClick={() => handleUpdate(data)} />
                    </div>
                  </td>
                  <td>{startIndex + index + 1}</td> {/* Sequential ID */}
                  <td>{data.group_name}</td>
                  <td>{data.ac_name}</td>
                  <td>{data.address}</td>
                  <td>{data.city}</td>
                  <td>{data.pincode}</td>
                  <td>{data.state}</td>
                  <td>{data.contact1}</td>
                  <td>{data.contact2}</td>
                  <td>{data.email}</td>
                  <td>{data.pan_no}</td>
                  <td>{data.gst_no}</td>
                  <td>{data.obdr}</td>
                  <td>{data.obcr}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination buttons */}
          <div>
            <ArrowCircleLeftIcon
              className="arrow"
              onClick={() =>
                setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))
              }
              disabled={currentPage === 1}
            />
            <ArrowCircleRightIcon
              className="arrow"
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage * pageSize >= fetchedData.length}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
