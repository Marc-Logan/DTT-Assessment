<template>
  <div class="center-container">
    <div class="house-page-content">
      <h1>Houses</h1>
    </div>
    <house-list :houses="houses"></house-list>
  </div>
</template>

<script>
import axios from "axios";
import HouseList from "./HouseList.vue";

export default {
  components: {
    HouseList,
  },
  data() {
    return {
      houses: [],
    };
  },
  created() {
    this.fetchHouseData();
  },
  methods: {
    fetchHouseData() {
      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "https://api.intern.d-tt.nl/api/houses",
        headers: {
          "X-Api-Key": "JUI10aqcwlBo4uHNzeGntCh97p6FA8PO",
        },
      };

      axios(config)
        .then((response) => {
          this.houses = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
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
  position: relative;
  color: black;
}

.house-page-content {
  position: relative;
  z-index: 2;
}

.house-list {
  position: relative;
  z-index: 1;
}

h1 {
  padding-bottom: 2px;
}
</style>
