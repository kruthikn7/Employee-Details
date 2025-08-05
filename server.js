const express = require('express');
const mongoose = require('mongoose');
const Employee = require('./models/student');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// DB Connection
mongoose.connect('mongodb://localhost:27017/studentdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ Connection Failed:', err));

// Routes
app.get('/', async (req, res) => {
  const employees = await Employee.find();
  res.render('index', { employees });
});

app.get("/sort", async (req, res) => {
  const employees = await Employee.find().sort({ age: 1 });
  const halfemployee = employees.slice(Math.ceil(employees.length / 2), employees.length);
  const finalEmployee = [
    ...employees.slice(0, Math.ceil(employees.length / 2)),
    ...halfemployee.sort((a, b) => b.age - a.age)
  ];
  res.render('index', { employees: finalEmployee });
});

app.get('/new', (req, res) => {
  res.render('new');
});

app.post('/create', async (req, res) => {
  await Employee.create(req.body);
  res.redirect('/');
});

app.get('/edit/:id', async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  res.render('edit', { employee });
});

app.post('/update/:id', async (req, res) => {
  await Employee.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/');
});

app.get('/delete/:id', async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));