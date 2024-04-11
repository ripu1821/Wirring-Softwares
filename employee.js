var signOutButton = document.getElementById("signOutBtn");
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwa3Jlc2hya3RvZ3VxdndsYWlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI1NzU3ODIsImV4cCI6MjAyODE1MTc4Mn0.AD5Oh1ya3N_r6LumXEEjhqZj72nTbyWftReAmZNEO4s";
const supabaseUrl = "https://bpkreshrktoguqvwlaii.supabase.co";
const database = supabase.createClient(supabaseUrl, supabaseKey);
const { auth } = database;

async function employeeList() {
  try {
    const { data, error } = await database.from("wirring-team").select("*");

    if (error) {
      console.error("Error getting employees:", error.message);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error getting employees:", error.message);
    return null;
  }
}
async function getEmployees() {
  try {
    const { data, error } = await database.from("wirring-team").select("*");

    if (error) {
      console.error("Error getting employees:", error.message);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error getting employees:", error.message);
    return null;
  }
}
async function displayEmployeeList() {
  const employees = await getEmployees();
  if (employees) {
    const employeeTableBody = document.getElementById("employeeList");
    employeeTableBody.innerHTML = "";

    employees.forEach((employee) => {
      const row = document.createElement("tr");
      row.innerHTML = `
      <div  class="list-row">
      <img class="img-fluid" src="images/team/member2.png" alt="Employee Image">
      <h3>${employee.name}</h3>
      <h5>${employee.role}</h5>
            </div>
    `;

      employeeTableBody.appendChild(row);
    });
  } else {
    console.log("Failed to retrieve employee data.");
  }
}
// Call displayEmployees function to initially populate the employee list
displayEmployeeList();

signOutButton.addEventListener("click", async () => {
  console.log("successfully");
  try {
    const { error } = await auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    } else {
      console.log("User signed out successfully");
      window.location.href = "os-admin.html";
      localStorage.removeItem("isLoggedIn");
      updateContentVisibility();
      alert("Logged out successfully.");
    }
  } catch (error) {
    console.error("Error signing out:", error.message);
  }
});
