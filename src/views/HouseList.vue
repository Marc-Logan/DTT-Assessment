<template>
  <div class="center-container">
    <div class="filter-bar">
      <div class="search-filter">
        <input
          type="text"
          v-model="searchText"
          placeholder="Search for a house"
          class="search-input"
        />
        <select v-model="sortOption" class="sort-select">
          <option value="">Sort by:</option>
          <option value="price">Price</option>
          <option value="size">Size</option>
        </select>
        <router-link to="/add-house" class="add-house-button search-input">
          + Create New
        </router-link>
      </div>
    </div>
    <div class="house-list">
      <div v-for="house in filteredHouses" :key="house.id" class="house-card">
        <div class="house-image-container">
          <img :src="house.image" alt="House Image" class="house-image" />
        </div>
        <div class="house-info">
          <h3>{{ house.location.street }}, {{ house.location.city }}</h3>
          <p>Price: {{ house.price }}</p>
          <p>Size: {{ house.size }} m2</p>
          <p>
            Rooms: {{ house.rooms.bedrooms }} bedrooms,
            {{ house.rooms.bathrooms }} bathrooms
          </p>
          <p>Construction Year: {{ house.constructionYear }}</p>
          <p>Has Garage: {{ house.hasGarage }}</p>
        </div>
        <div class="view-details">
          <router-link :to="'/houses/' + house.id">
            <button class="add-house-button">View Details</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    houses: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      searchText: "",
      sortOption: "",
    };
  },
  computed: {
    filteredHouses() {
      let filtered = this.houses.filter((house) => {
        const searchQuery = this.searchText.toLowerCase();
        const street = house.location.street.toLowerCase();
        const bedrooms = house.rooms.bedrooms.toString();
        return street.includes(searchQuery) || bedrooms.includes(searchQuery);
      });

      if (this.sortOption === "price") {
        filtered = filtered.sort((a, b) => a.price - b.price);
      } else if (this.sortOption === "size") {
        filtered = filtered.sort((a, b) => a.size - b.size);
      }

      return filtered;
    },
    resultMessage() {
      if (this.filteredHouses.length === 0) {
        return "No results found.";
      } else {
        return `Showing ${this.filteredHouses.length} results.`;
      }
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

.filter-bar {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  position: sticky;
  top: 0;
  background-color: none;
  z-index: 1;
}

.search-filter {
  display: flex;
  align-items: center;
  border: none;
}

.search-input {
  padding: 10px;
  margin-right: 10px;
  border-radius: 5px;
  border: none;
  font-size: 14px;
}

.sort-select {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 14px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.house-list {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.house-card {
  display: flex;
  align-items: center;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: white;
  border: none;
}

.house-image-container {
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

.view-details {
  display: flex;
  align-items: flex-end;
  justify-content: space-between; /* Add this line */
}

button {
  margin-top: 10px;
}

hr {
  margin-top: 10px;
}

.add-house-button {
  display: inline-flex;
  padding: 10px 20px;
  background-color: #eb5440;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
  font-weight: bold;
  margin-left: 10px; /* Add this line for spacing */
  border: none;
}

/* Media Queries */
@media (max-width: 768px) {
  .house-card {
    flex-direction: column;
    text-align: center;
  }

  .house-image-container {
    margin-bottom: 10px;
  }

  .house-info {
    margin-bottom: 10px;
  }

  .view-details {
    align-items: center;
    justify-content: center;
  }
}
</style>
