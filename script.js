function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("members").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("traderId").value = "";
  document.getElementById("responsible-person").value = "";
}

// Handle form submission

document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form from submitting normally

  // Get the form data
  let name = document.getElementById("name").value;
  let members = document.getElementById("members").value;
  let amount = document.getElementById("amount").value;
  let trader = document.getElementById("traderId").value;
  let responsiblePerson = document.getElementById("responsible-person").value;

  // Prepare data to send
  const formData = {
    name,
    members,
    amount,
    trader,
    responsiblePerson,
  };

  // Send data using fetch API
  fetch("https://cardsproject.cleverapps.io/api/v1/users", {
    // Replace with your actual endpoint
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData), // Convert form data to JSON
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      alert("تم إرسال البيانات بنجاح");
      fetchData(); // Fetch the updated user list after submission
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("حدث خطأ أثناء إرسال البيانات");
    });
  clearForm();
});

// Delete user function
async function deleteUser(id) {
  try {
    const response = await fetch(
      `https://cardsproject.cleverapps.io/api/v1/users/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    alert("تم حذف المستخدم بنجاح");
    fetchData(); // Refresh the table after deletion
  } catch (error) {
    console.error("Error:", error);
    alert("حدث خطأ أثناء حذف المستخدم");
  }
  clearForm();
}

// Fetch data and render the user table
async function fetchData() {
  let response = await fetch(
    "https://cardsproject.cleverapps.io/api/v1/users",
    {
      method: "GET",
    }
  );
  response = await response.json();
  let users = response.users;
  console.log(users);

  let cartona = ``;
  let totalAmount = 0;
  for (let i = 0; i < users.length; i++) {
    totalAmount += users[i].amount;
    cartona += `
    <tr id="${users[i]._id}">
    <td>${i + 1}</td>
          <td>${users[i].name}</td>
          <td>${users[i].members}</td>
          <td>${users[i].amount}</td>
          <td>${users[i].trader.name}</td>
          <td>${users[i].responsiblePerson}</td>
          <td>
            <button type="button" class="btn btn-warning">
              <i class="fa-solid fa-pen-to-square"></i> تعديل
            </button>
          </td>
          <td>
            <button type="button" class="btn btn-danger" onclick="deleteUser('${
              users[i]._id
            }')">
            <i class="fa-solid fa-trash"></i> حذف
            </button>
            </td>
            </tr>
            `;
  }
  document.getElementById("totalAmount").innerHTML = totalAmount;
  document.getElementById("table").innerHTML = cartona;
  clearForm();
}

// Fetch data when the page loads
fetchData();

// Function to fetch and display users based on search query
let searchQuery;
document
  .getElementById("searchInput")
  .addEventListener("input", async function (event) {
    console.log(event.target.value);
    searchQuery = event.target.value;

    let url = `https://cardsproject.cleverapps.io/api/v1/users/${searchQuery}`;
    let response = await fetch(url, {
      method: "GET",
    });
    response = await response.json();
    let users = response.users;
    console.log(users);

    // Generate HTML for table rows
    let cartona = ``;
    let totalAmount = 0;

    for (let i = 0; i < users.length; i++) {
      totalAmount += users[i].amount;
      cartona += `
        <tr id="${users[i]._id}">
          <td>${i + 1}</td>
          <td>${users[i].name}</td>
          <td>${users[i].members}</td>
          <td>${users[i].amount}</td>
          <td>${users[i].trader.name}</td>
          <td>${users[i].responsiblePerson}</td>
          <td>
            <button type="button" class="btn btn-warning">
              <i class="fa-solid fa-pen-to-square"></i> تعديل
            </button>
          </td>
          <td>
            <button type="button" class="btn btn-danger" onclick="deleteUser('${
              users[i]._id
            }')">
              <i class="fa-solid fa-trash"></i> حذف
            </button>
          </td>
        </tr>
      `;
    }
    document.getElementById("table").innerHTML = cartona;
    document.getElementById("totalAmount").innerHTML = totalAmount;
  });

let searchQueryRes;
document
  .getElementById("searchInputAdmin")
  .addEventListener("input", async function (event) {
    console.log(event.target.value);
    searchQueryRes = event.target.value;
    let url = `https://cardsproject.cleverapps.io/api/v1/users/res/${searchQueryRes}`;
    let response = await fetch(url, {
      method: "GET",
    });
    response = await response.json();
    console.log(response);
    
    let users = response.user;
    console.log(users);

    // Generate HTML for table rows
    let cartona = ``;
    let totalAmount = 0;

    for (let i = 0; i < users.length; i++) {
      totalAmount += users[i].amount;
      cartona += `
        <tr id="${users[i]._id}">
          <td>${i + 1}</td>
          <td>${users[i].name}</td>
          <td>${users[i].members}</td>
          <td>${users[i].amount}</td>
          <td>${users[i].trader.name}</td>
          <td>${users[i].responsiblePerson}</td>
          <td>
            <button type="button" class="btn btn-warning">
              <i class="fa-solid fa-pen-to-square"></i> تعديل
            </button>
          </td>
          <td>
            <button type="button" class="btn btn-danger" onclick="deleteUser('${
              users[i]._id
            }')">
              <i class="fa-solid fa-trash"></i> حذف
            </button>
          </td>
        </tr>
      `;
    }
    document.getElementById("table").innerHTML = cartona;
    document.getElementById("totalAmount").innerHTML = totalAmount;
  });
