async function fetchData() {
  let response = await fetch(
    "https://carrentalsystem.cleverapps.io/api/v1/user",
    {
      method: "GET"
    }
  );
  response = await response.json();
  let users = response.users;
  let cartona = ``
  for (let i = 0; i < users.length; i++) {
    cartona += `<tr>
    <td>${users[i]._id}</td>
    <td>${users[i].name}</td>
    <td>${users[i].email}</td>
    <td>${users[i].phoneNumber}</td>
    <td>${users[i].phoneNumber}</td>
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
    `
    document.getElementById("table").innerHTML = cartona;
  }
}

fetchData();
