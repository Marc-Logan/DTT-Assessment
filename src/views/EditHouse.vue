<template>
  <div class="edit-listing-form">
    <h2>Edit Listing</h2>
    <form @submit.prevent="submitForm">
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
      <button type="submit">Update Listing</button>
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
      houseId: null, // Store the house ID
    };
  },
  created() {
    this.houseId = this.$route.params.id;
    this.fetchHouseDetails();
  },
  methods: {
    fetchHouseDetails() {
      axios
        .get(`https://api.intern.d-tt.nl/api/houses/${this.houseId}`)
        .then((response) => {
          const house = response.data;
          this.street = house.streetName;
          this.houseNumber = house.houseNumber;
          this.addition = house.numberAddition;
          this.postalCode = house.zip;
          this.city = house.city;
          this.description = house.description;
          this.price = house.price;
          this.size = house.size;
          this.bedrooms = house.bedrooms;
          this.bathrooms = house.bathrooms;
          this.constructionYear = house.constructionYear;
          this.hasGarage = house.hasGarage;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    submitForm() {
      const updatedHouse = {
        streetName: this.street,
        houseNumber: this.houseNumber,
        numberAddition: this.addition,
        zip: this.postalCode,
        city: this.city,
        description: this.description,
        price: this.price,
        size: this.size,
        bedrooms: this.bedrooms,
        bathrooms: this.bathrooms,
        constructionYear: this.constructionYear,
        hasGarage: this.hasGarage,
      };

      axios
        .put(`https://api.intern.d-tt.nl/api/houses/${this.houseId}`, updatedHouse)
        .then(() => {
          this.errorMessage = "";
          // Redirect to the updated house details page
          this.$router.push(`/house/${this.houseId}`);
        })
        .catch((error) => {
          this.errorMessage = "Failed to update the listing. Please try again.";
          console.error(error);
        });
    },
    handleFileUpload(event) {
      // Handle file upload logic
    },
  },
};
</script>

<style scoped>
.edit-listing-form {
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

