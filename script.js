let name = document.getElementById("name").value;
let members = document.getElementById("members").value;
let amount = document.getElementById("amount").value;
let trader = document.getElementById("traderId").value;

  document.querySelector('form').addEventListener('submit', function(event) {
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
      responsiblePerson
    };

    // Send data using fetch API
    fetch("https://cardsproject.cleverapps.io/api/v1/users", { // Replace with your actual endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData) // Convert form data to JSON
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      alert('تم إرسال البيانات بنجاح');
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('حدث خطأ أثناء إرسال البيانات');
    });
  });


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
  for (let i = 0; i < users.length; i++) {
    cartona += `<tr>
    <td>${i + 1}</td>
    <td>${users[i].name}</td>
    <td>${users[i].members}</td>
    <td>${users[i].amount}</td>
    <td>${users[i].trader.name}</td>
    <td>${users[i].responsiblePerson}</td>
    <td><button
        type="button"
        class="btn btn-warning"
      >
      <i class="fa-solid fa-pen-to-square"></i>
        تعديل
      </button></td>
    <td><button
        type="button"
        class="btn btn-danger"
      >
      <i class="fa-solid fa-trash"></i>
        حذف
      </button></td>
    </tr>
    `;
    document.getElementById("table").innerHTML = cartona;
  }
}

fetchData();
