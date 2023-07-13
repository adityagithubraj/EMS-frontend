const addEmployeeForm = document.getElementById('add-employee-form');
const employeeTableBody = document.getElementById('employee-table-body');


// Add Employee form submission
addEmployeeForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const firstName = document.getElementById('first-name').value;
  const lastName = document.getElementById('last-name').value;
  const email = document.getElementById('email').value;
  const department = document.getElementById('department').value;
  const salary = document.getElementById('salary').value;

  try {
    const response = await fetch('https://dark-windbreaker-ant.cyclic.app/employees', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, email, department, salary }),
    });

    if (response.ok) {
      addEmployeeForm.reset();
      fetchEmployees();
    } else {
      alert('Failed to add employee');
    }
  } catch (error) {
    console.error(error);
    alert('Something went wrong');
  }
});

// Fetch employees and display in table
const fetchEmployees = async () => {
  try {
    const response = await fetch('https://dark-windbreaker-ant.cyclic.app/employees');
    const data = await response.json();
    if (response.ok) {
      displayEmployees(data);
    } else {
      alert('Failed to fetch employees');
    }
  } catch (error) {
    console.error(error);
    alert('Something went wrong');
  }
};

const displayEmployees = (employees) => {
  employeeTableBody.innerHTML = '';

  employees.forEach((employee) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${employee.firstName}</td>
      <td>${employee.lastName}</td>
      <td>${employee.email}</td>
      <td>${employee.department}</td>
      <td>${employee.salary}</td>
      <td class="actions">
        <button class="edit-btn" data-id="${employee._id}">Edit</button>
        <button class="delete-btn" data-id="${employee._id}">Delete</button>
      </td>
    `;

    row.querySelector('.edit-btn').addEventListener('click', () => {
      const confirmEdit = confirm('Do you want to edit this employee?');
      if (confirmEdit) {
        // Implement edit functionality here
      }
    });

    row.querySelector('.delete-btn').addEventListener('click', () => {
      const confirmDelete = confirm('Do you want to delete this employee?');
      if (confirmDelete) {
        deleteEmployee(employee._id);
      }
    });

    employeeTableBody.appendChild(row);
  });
};

const deleteEmployee = async (id) => {
  try {
    const response = await fetch(`https://dark-windbreaker-ant.cyclic.app/employees/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      fetchEmployees();
    } else {
      alert('Failed to delete employee');
    }
  } catch (error) {
    console.error(error);
    alert('Something went wrong');
  }
};


fetchEmployees();
