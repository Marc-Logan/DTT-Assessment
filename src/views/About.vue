<template>
  <div class="spacer"></div>

  <div class="page-container">
    <div class="card">
      <div class="card-body">
        <div class="about-container">
          <h2>About Page</h2>
          <p>
            Hello 👋, I'm Marc Logan,<br />
            🔭<br />
            I am Fullstack Web Developer.
            I have worked with React JS, MongoDB, Express and Node
            JS (MERN) stack including Vue and vanilla JavaScript.<br />
            ⚡ <br />
            This project was a challenging yet rewarding experience to build within the scope given. <br />
            This web app has full CRUD functioanlity as well as authentication through token verification for the user. <br />
            📫 <br />
            Please feel to contact me at your earliest convenience and I look forward to hear about the follwoing steps with DTT! <br />
            <a href="https://www.linkedin.com/in/marc-logan/">Linkedin</a> or <a href="mailto:marclogan90@gmail.com">Send me an email</a><br />
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "About",
};
</script>

<style>
.spacer {
  height: 100px; /* Adjust the desired space between the navigation bar and the card */
}

.page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Set a fixed height for the page container */
}

.card {
  width: 400px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex; /* Use flexbox for the card */
  flex-direction: column; /* Arrange card contents vertically */
}

.card-body {
  flex: 1; /* Allow the card body to grow and occupy remaining space */
  padding: 20px;
  display: flex; /* Use flexbox for the card body */
  justify-content: center; /* Center the contents horizontally */
}

.about-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: black;
  text-align: center; /* Center-align text within the container */
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

p {
  font-size: 16px;
  margin-bottom: 20px;
}
</style>
