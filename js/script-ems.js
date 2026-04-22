// CREATE AN ARRAY OF EMPLOYEES
let employees = JSON.parse(localStorage.getItem('employees')) || [
        { id: '12345678', name: 'Sally Brown', extension: '1234', email: 'sbrown@example.com', department: 'Engineering' },
        { id: '23456789', name: 'Snoop Dawg', extension: '2345', email: 'sndawg@example.com', department: 'Marketing' },
        { id: '34567890', name: 'Chibi Taw', extension: '3456', email: 'ctaw@example.com', department: 'QA' },
        { id: '45678901', name: 'Sam Newguy', extension: '4567', email: 'snewguy@example.com', department: 'Sales' },
        { id: '56789012', name: 'Lois Kent', extension: '5678', email: 'lkent@example.com', department: 'Executive' }
]

// CHECK TO SEE IF STORAGE OBJECT EXISTS WHEN THE PAGE LOADS
// IF DOES, RETURN STORAGE OBJECT INTO ARRAY INSTEAD OF POPULATED ARRAY
        // uses || 

// GET DOM ELEMENTS
const $ = id => document.getElementById(id)
const form = $('addForm')
const empTable = $('empTable')
const empCount = $('empCount')

// BUILD THE EMPLOYEES TABLE WHEN THE PAGE LOADS
buildGrid()

// ADD EMPLOYEE
form.addEventListener('submit', (e) => {
    // PREVENT FORM SUBMISSION
    e.preventDefault()
    // GET THE VALUES FROM THE TEXT BOXES
    const id = document.getElementById('id').value
    const name = document.getElementById('name').value
    const extension = document.getElementById('extension').value
    const email = document.getElementById('email').value
    const department = document.getElementById('department').value
    // ADD THE NEW EMPLOYEE TO A NEW ARRAY OBJECT
    const newEmployee = { id, name, extension, email, department }
    // PUSH THE NEW ARRAY TO THE *EXISTING* EMPLOYEES ARRAY
    employees.push(newEmployee)
    // BUILD THE GRID
    buildGrid()
    // RESET THE FORM
    form.reset()
    // SET FOCUS BACK TO THE ID TEXT BOX
    document.getElementById('id').focus()
});

// DELETE EMPLOYEE
empTable.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
    // CONFIRM THE DELETE
    if (confirm('Are you sure you want to delete this employee?')) {  
        // GET THE SELECTED ROWINDEX FOR THE TR (PARENTNODE.PARENTNODE)
        const rowIndex = e.target.parentNode.parentNode.rowIndex - 1
        // REMOVE EMPLOYEE FROM ARRAY
        employees.splice(rowIndex, 1) 
        // BUILD THE GRID
                    buildGrid()
        }
    }
});

// BUILD THE EMPLOYEES GRID
function buildGrid() {
    // REMOVE THE EXISTING SET OF ROWS BY REMOVING THE ENTIRE TBODY SECTION
    const tbody = empTable.querySelector('tbody')
    tbody.innerHTML = ''
    // REBUILD THE TBODY FROM SCRATCH

    // LOOP THROUGH THE ARRAY OF EMPLOYEES
    // REBUILDING THE ROW STRUCTURE
        employees.forEach((employee, index) => {
        const row = document.createElement('tr')
        row.innerHTML = `
            <td>${employee.id}</td>
            <td>${employee.name}</td>
            <td>${employee.extension}</td>
            <td>${employee.email}</td>
            <td>${employee.department}</td>
            <td><button class="btn btn-danger btn-sm">Delete</button></td> `
    // BIND THE TBODY TO THE EMPLOYEE TABLE
        tbody.appendChild(row)    
        })
    // UPDATE EMPLOYEE COUNT
        empCount.textContent = `(${employees.length})`   
    // STORE THE ARRAY IN STORAGE
        localStorage.setItem('employees', JSON.stringify(employees))    
};