<template>
  <div class="wrap">
    <nav>
      <ul>
        <li>
          <router-link to="about">View</router-link>
        </li>
        <li>
          <router-link :to="{path:'edit'}" append v-if="idParam == idUser">Edit</router-link>
        </li>
      </ul>
    </nav>
    <div>
      <h2>View Profile</h2>
      <h3 class="sub-title">Base</h3>
    </div>
    <table class="table">
      <tbody>
        <tr>
          <td class="label">Name</td>
          <td class="pl-4">{{ firstName + ' ' + lastName}}</td>
        </tr>
        <tr>
          <td class="label">Date of Birth</td>
          <td class="pl-4">{{dateBrith}}</td>
        </tr>
        <tr>
          <td class="label">Sex</td>
          <td class="pl-4 customColor">{{gender}}</td>
        </tr>
        <tr>
          <td class="label">City</td>
          <td class="pl-4">{{city}}</td>
        </tr>
        <tr>
          <td class="label">Country</td>
          <td class="pl-4 customColor">{{country}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "InfoUser",
  data() {
    return {
      idUser: localStorage.getItem("id"),
      idParam: this.$route.params.id,
      firstName: null,
      lastName: null,
      gender: null,
      city: null,
      country: null,
      dateBrith: null,
    };
  },
  methods: {
    async getUserData() {
      const id = this.$route.params.id;

      await axios
        .post("http://localhost:3000/home/users", {
          id: id,
        })
        .then((response) => {
          this.firstName = response.data[0].first_name;
          this.lastName = response.data[0].last_name;
          this.gender = response.data[0].gender;
          this.city = response.data[0].city;
          this.country = response.data[0].country;
          const brith = response.data[0].dateBrith;
          if (brith) {
            this.dateBrith = brith.split("T")[0];
          }
        });
    },
  },
  created() {
    this.getUserData();
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  margin-bottom: 5rem;
}
nav {
  margin-bottom: 1.5rem;
  ul {
    width: 100%;
    border-bottom: 1px solid #e7edf2;
    list-style: none;
    display: flex;
    padding-left: 0;
    li {
      margin-right: 20px;
      width: 40px;
      padding-bottom: 3px;
      text-align: center;
      a {
        color: #212529;
      }
      a:hover {
        text-decoration: none;
      }
    }
    li:nth-child(1) {
      border-bottom: 2px solid $Secondary-Color;
      a {
        color: $Primary-Color;
      }
    }
  }
}
.label {
  background: #f8f9fb;
  width: 35%;
  padding-left: 1rem;
}
.customColor {
  color: $Secondary-Color;
}
h2 {
  font-size: 1.616em;
  color: #4f515b;
  margin-bottom: 1rem;
}
.sub-title {
  font-size: 1em !important;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid #e7edf2;
}
</style>