const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Sample database (Array of objects)
let employees = [
    { id: 1, name: 'John Doe', designation: 'Software Engineer', location: 'New York', salary: 60000 },
    { id: 2, name: 'Jane Smith', designation: 'Product Manager', location: 'California', salary: 75000 }
];

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
    res.render('index', { employees });
});

app.get('/add', (req, res) => {
    res.render('add-employee',{employee:null});
});

app.post('/add', (req, res) => {
    const { name, designation, location, salary } = req.body;
    const newEmployee = {
        id: employees.length + 1,
        name,
        designation,
        location,
        salary: parseInt(salary, 10)
    };

    // Add the new employee to the array
    employees.push(newEmployee);

    // Redirect to the homepage
    res.redirect('/');
});


app.get('/delete/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    employees = employees.filter(emp => emp.id !== id);
    res.redirect('/');
});

app.get('/update/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const employee = employees.find(emp => emp.id === id);
    
    // If employee is not found, redirect to home
    if (!employee) {
        return res.redirect('/');
    }

    res.render('add-employee', { employee });
});

app.post('/update/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { name, designation, location, salary } = req.body;
    const updatedEmployee = employees.find(emp => emp.id === id);
    updatedEmployee.name = name;
    updatedEmployee.designation = designation;
    updatedEmployee.location = location;
    updatedEmployee.salary = parseInt(salary, 10);
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
