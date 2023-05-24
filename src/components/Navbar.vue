<template>
    <nav>
      <div class="logo">
        <img src="./img_logo_dtt@3x.png" alt="Logo" class="logo-image" />
      </div>
      <ul>
        <li><router-link to="/" exact>Home</router-link></li>
        <li><router-link to="/about">About</router-link></li>
        <li><router-link to="/signup">SignUp</router-link></li>
        <li><router-link to="/login">Login</router-link></li>
      </ul>
    </nav>
</template>

<script>
export default {};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
nav {
  background-color: white;
  margin: 0px;
  display: flex;
  align-items: center;
  padding: 10px;
  font-family: "Montserrat", sans-serif;
  color:black;
}

.logo {
  margin-right: 25px;
}

.logo-image {
  height: 45px;
  width: auto;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
}

li {
  margin-right: 20px;
  display: flex;
  justify-content: space-between;
  color: #e8e8e8;
}

a {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  color: #e8e8e8;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
}

a.router-link-exact-active {
  color: black;
}

a.router-link {
  color: #e8e8e8;
}

#header h1 {
  margin: 0px;
}
</style>
