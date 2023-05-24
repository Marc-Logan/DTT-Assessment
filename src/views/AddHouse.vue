<template>
  <div class="create-listing-form">
    <h2>Create a New Listing</h2>
    <form @submit="submitForm">
      <div class="form-group">
        <label>Street Name</label>
        <input type="text" v-model="street" required />
      </div>
      <div class="form-group">
        <label>House Number</label>
        <input type="text" v-model="houseNumber" required />
      </div>
      <div class="form-group">
        <label>Addition</label>
        <input type="text" v-model="addition" />
      </div>
      <div class="form-group">
        <label>Postal Code</label>
        <input type="text" v-model="postalCode" required />
      </div>
      <div class="form-group">
        <label>City</label>
        <input type="text" v-model="city" required />
      </div>
      <div class="form-group">
        <label>Image</label>
        <input type="file" @change="handleFileUpload" accept="image/*" />
      </div>
      <div class="form-group">
        <label>Description</label>
        <textarea v-model="description" required></textarea>
      </div>
      <div class="form-group">
        <label>Price</label>
        <input type="number" v-model="price" required />
      </div>
      <div class="form-group">
        <label>Size</label>
        <input type="number" v-model="size" required />
      </div>
      <div class="form-group">
        <label>Bedrooms</label>
        <input type="number" v-model="bedrooms" required />
      </div>
      <div class="form-group">
        <label>Bathrooms</label>
        <input type="number" v-model="bathrooms" required />
      </div>
      <div class="form-group">
        <label>Construction Year</label>
        <input type="number" v-model="constructionYear" required />
      </div>
      <div class="form-group">
        <label>Has Garage</label>
        <input type="checkbox" v-model="hasGarage" />
      </div>
      <button type="submit">Create Listing</button>
    </form>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      street: "",
      houseNumber: "",
      addition: "",
      postalCode: "",
      city: "",
      description: "",
      price: null,
      size: null,
      bedrooms: null,
      bathrooms: null,
      constructionYear: null,
      hasGarage: false,
      errorMessage: "",
    };
  },
  methods: {
    submitForm(event) {
      event.preventDefault(); // Prevent the default form submission behavior

      const apiKey = "JUI10aqcwlBo4uHNzeGntCh97p6FA8PO";

      const data = new FormData();
      data.append("price", this.price.toString());
      data.append("bedrooms", this.bedrooms.toString());
      data.append("bathrooms", this.bathrooms.toString());
      data.append("size", this.size.toString());
      data.append("streetName", this.street);
      data.append("houseNumber", this.houseNumber);
      data.append("numberAddition", this.addition);
      data.append("zip", this.postalCode);
      data.append("city", this.city);
      data.append("constructionYear", this.constructionYear.toString());
      data.append("hasGarage", this.hasGarage.toString());
      data.append("description", this.description);

      const config = {
        headers: {
          "X-Api-Key": apiKey,
        },
      };

      axios
        .post("https://api.intern.d-tt.nl/api/houses", data, config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          // Redirect to the newly created listing detail page
          this.$router.push(`/`);
        })
        .catch((error) => {
          console.log(error);
          this.errorMessage = "An error occurred while creating the listing.";
        });
    },
  },
};
</script>

<style scoped>
.create-listing-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: black;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}

label {
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="text"],
textarea,
input[type="number"],
input[type="checkbox"],
input[type="file"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

textarea {
  resize: vertical;
}

button[type="submit"] {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>
