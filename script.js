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
    <td>${users[i].traderId}</td>
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
