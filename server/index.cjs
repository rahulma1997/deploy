const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 4000;

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/groupname', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

// Define MongoDB Schemas
const accountSchema = new mongoose.Schema({
  group_name: String,
  ac_name: String,
  address: String,
  city: String,
  pincode: String,
  state: String,
  contact1: String,
  contact2: String,
  email: String,
  pan_no: String,
  gst_no: String,
  obdr: String,
  obcr: String
});

const listSchema = new mongoose.Schema({
  name: String
});

const productsSchema = new mongoose.Schema({
  name: String,
  hsncode: Number,
  price: Number,
  saleprice: Number,
  holesale: Number,
  mrp: Number,
  descount: Number,
  gst: Number,
  unit: String,
  barcode: String,
});

// MongoDB Models
const Account = mongoose.model('Account', accountSchema);
const List = mongoose.model('List', listSchema);
const Products = mongoose.model('Products', productsSchema);

// Helper function to get sequential IDs
const getSequentialItems = async (model) => {
  const items = await model.find().sort({ _id: 1 }); // Ensure items are sorted
  return items.map((item, index) => ({
    id: index + 1, // Sequential ID
    ...item.toObject()
  }));
};

// Routes for 'Account' collection
app.get('/accounts', async (req, res) => {
  try {
    const accounts = await getSequentialItems(Account);
    res.json(accounts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/accounts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ObjectId' });
    }
    const account = await Account.findById(id);
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }
    res.json({ id: (await Account.countDocuments()) + 1, ...account.toObject() });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/accounts', async (req, res) => {
  const account = new Account(req.body);
  try {
    const newAccount = await account.save();
    res.status(201).json({ id: (await Account.countDocuments()) + 1, ...newAccount.toObject() });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put('/accounts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ObjectId' });
    }
    const updatedAccount = await Account.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedAccount) {
      return res.status(404).json({ message: 'Account not found' });
    }
    res.json({ id: (await Account.countDocuments()) + 1, ...updatedAccount.toObject() });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/accounts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ObjectId' });
    }
    const result = await Account.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: 'Account not found' });
    }
    res.json({ message: 'Account deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Routes for 'List' collection
app.get('/list', async (req, res) => {
  try {
    const items = await getSequentialItems(List);
    res.json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Error fetching items' });
  }
});

app.post('/list', async (req, res) => {
  const { name } = req.body;
  try {
    const newItem = await List.create({ name });
    res.status(201).json({ id: (await List.countDocuments()) + 1, ...newItem.toObject() });
  } catch (error) {
    console.error('Error adding item:', error);
    res.status(500).json({ error: 'Error adding item' });
  }
});

app.put('/list/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ObjectId' });
    }
    const updatedItem = await List.findByIdAndUpdate(id, { name }, { new: true });
    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json({ id: (await List.countDocuments()) + 1, ...updatedItem.toObject() });
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ error: 'Error updating item' });
  }
});

app.delete('/list/:id', async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ObjectId' });
    }
    const result = await List.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ error: 'Error deleting item' });
  }
});

// Routes for 'Products' collection
app.get('/products', async (req, res) => {
  try {
    const data = await getSequentialItems(Products);
    res.status(200).json(data);
  } catch (err) {
    console.error('Error retrieving data:', err);
    res.status(500).json({ error: 'Error retrieving data' });
  }
});

app.post('/products', async (req, res) => {
  try {
    const newProduct = await Products.create(req.body);
    res.status(201).json({ id: (await Products.countDocuments()) + 1, ...newProduct.toObject() });
  } catch (err) {
    console.error('Error adding product:', err);
    res.status(500).json({ error: 'Error adding product' });
  }
});

app.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ObjectId' });
    }
    const updatedProduct = await Products.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ id: (await Products.countDocuments()) + 1, ...updatedProduct.toObject() });
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ error: 'Error updating product' });
  }
});

app.delete('/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ObjectId' });
    }
    const result = await Products.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: `Deleted product with ID ${id}` });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ error: 'Error deleting product' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
