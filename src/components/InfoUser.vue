<template>
  <div class="wrap">
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
          <td class="pl-4">1992-02-25</td>
        </tr>
        <tr>
          <td class="label">Sex</td>
          <td class="pl-4 customColor">Male</td>
        </tr>
        <tr>
          <td class="label">City</td>
          <td class="pl-4">Gafsa</td>
        </tr>
        <tr>
          <td class="label">Country</td>
          <td class="pl-4 customColor">Tunisia</td>
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
      firstName: null,
      lastName: null,
    };
  },
  methods: {
    async getUserPost() {
      const id = this.$route.params.id;
      console.log(id);
      await axios
        .post("http://localhost:3000/home/profile", {
          id: id,
        })
        .then((response) => {
          console.log(response.data);
          this.posts = response.data;
          this.firstName = response.data[0].first_name;
          this.lastName = response.data[0].last_name;
        });
    },
  },
  created() {
    this.getUserPost();
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  margin-bottom: 5rem;
}
.label {
  background: #f8f9fb;
  width: 35%;
  padding-left: 1rem;
}
.customColor {
  color: #8224e3;
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