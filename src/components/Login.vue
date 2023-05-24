<template>
    <div class="page-container">
      <div class="card">
        <div class="card-body">
          <div class="login-container">
            <h2>Login</h2>
            <form @submit.prevent="submit" class="login-form">
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" v-model="data.email" required />
              </div>
              <div class="form-group">
                <label for="name">Name</label>
                <input type="text" v-model="data.name" required />
              </div>
              <button type="submit" class="login-button">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { reactive } from "vue";
  import { useRouter } from "vue-router";
  import Cookies from "js-cookie";
  
  export default {
    name: "Login",
    setup() {
      const data = reactive({
        email: "",
        name: "",
      });
  
      const router = useRouter();
  
      const submit = async () => {
        try {
          const token = Cookies.get("token");
  
          if (token) {
            await router.push("/"); // Token already exists, navigate to dashboard
            return;
          }
  
          const response = await fetch(
            "https://api.intern.d-tt.nl/api/register",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "X-Api-Key": "JUI10aqcwlBo4uHNzeGntCh97p6FA8PO",
              },
              body: JSON.stringify(data),
            }
          );
  
          if (response.ok) {
            const responseData = await response.json();
            const newToken = responseData.apiKey;
  
            Cookies.set("token", newToken);
            await router.push("/dashboard");
          } else {
            // Check if the response status is 404 (User not found)
            if (response.status === 404) {
              await router.push("/signup"); // Redirect to signup page
            } else {
              console.log("Login failed.");
            }
          }
        } catch (error) {
          console.log(error);
        }
      };
  
      return {
        data,
        submit,
      };
    },
  };
  </script>
  
  <style>
  .page-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vh;
  }
  
  .card {
    width: 400px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .card-body {
    padding: 20px;
  }
  
  .login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: black;
}

  
  h2 {
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .login-form {
    display: flex;
    flex-direction: column;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  label {
    font-size: 16px;
    font-weight: bold;
  }
  
  input[type="email"],
  input[type="text"] {
    padding: 10px;
    font-size: 14px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  
  .login-button {
    padding: 10px 20px;
    font-size: 16px;
    font-weight: bold;
    background-color: #EB5440;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .login-button:hover {
    background-color: #0069d9;
  }
  </style>
  