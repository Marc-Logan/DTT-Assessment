<template>
  <div class="spacer"></div>

  <div class="center-container">
    <div v-if="house" class="card">
      <div class="image-container">
        <img class="house-image" :src="house.image" alt="House Image" />
      </div>
      <div class="house-info">
        <h2>House Details</h2>
        <div class="details-row"><strong>Price:</strong> {{ house.price }}</div>
        <div class="details-row">
          <strong>Size:</strong> {{ house.size }} m2
        </div>
        <div class="details-row">
          <strong>Construction Year:</strong> {{ house.constructionYear }}
        </div>
        <div class="details-row">
          <strong>Listen Since:</strong> {{ house.createdAt }}
        </div>
        <div class="details-row">
          <strong>Description:</strong> {{ house.description }}
        </div>
        <div class="details-row">
          <strong>Has Garage:</strong> {{ house.hasGarage }}
        </div>
        <div class="details-row">
          <strong>Location:</strong> {{ house.location.street }},
          {{ house.location.city }}, {{ house.location.zip }}
        </div>
        <div class="details-row" v-if="hasToken">
          <router-link :to="'/edit-house/' + house.id">
            <button class="edit-house-button">Edit House</button>
          </router-link>
          <button
            class="delete-house-button"
            @click="showConfirmationDialog = true"
          >
            Delete
          </button>
        </div>
        <div v-if="showConfirmationDialog" class="confirmation-dialog">
          <div class="confirmation-dialog-content">
            <h3>Confirmation</h3>
            <p>Are you sure you want to delete this listing?</p>
            <div class="confirmation-buttons">
              <button @click="deleteHouse(house.id)">Yes, Delete</button>
              <button @click="cancelDeletion">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <p>Loading house data...</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  computed: {
    ...mapGetters(["getToken"]),
    hasToken() {
      return !!this.getToken; // Check if the token exists
    },
    house() {
      return this.$store.state.houses.find(
        (house) => house.id === Number(this.$route.params.id)
      );
    },
  },
  data() {
    return {
      showConfirmationDialog: false,
    };
  },
  mounted() {
    this.$store.dispatch("fetchHouses");
  },
  methods: {
    deleteHouse(houseId) {
      this.showConfirmationDialog = false;

      const url = `https://api.intern.d-tt.nl/api/houses/${houseId}`;

      const config = {
        method: "delete",
        maxBodyLength: Infinity,
        url,
        headers: {
          "X-Api-Key": "JUI10aqcwlBo4uHNzeGntCh97p6FA8PO",
        },
      };

      axios(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    cancelDeletion() {
      this.showConfirmationDialog = false;
    },
  },
};
</script>

<style>
.center-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  overflow-y: auto;
}

.card {
  display: flex;
  align-items: flex-start;
  background-color: #f2f2f2;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.image-container {
  margin-right: 20px;
}

.house-image {
  max-width: 300px;
  max-height: 200px;
  object-fit: cover;
}

.house-info {
  flex-grow: 1;
}

.details-row {
  margin-bottom: 10px;
}

.details-row strong {
  margin-right: 5px;
}

.confirmation-dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.confirmation-dialog-content {
  text-align: center;
}

.confirmation-dialog-content h3 {
  margin-bottom: 10px;
}

.confirmation-buttons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.confirmation-buttons button {
  margin-right: 10px;
}
</style>
