function login() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();

  if (user === "admin" && pass === "1234") {
    document.getElementById("loginSection").classList.add("hidden");
    document.getElementById("adminSection").classList.remove("hidden");
  } else {
    alert("Invalid login");
  }
}

function logout() {
  window.location.replace("/index.html");
}
