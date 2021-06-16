<template>
  <div class="no-post-yet">
    <i class="far fa-sad-cry"></i>
    <h2>hmm.../ {{firstName + ' ' + lastName}} hasn't posted anything</h2>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "NOPostsYet",
  data() {
    return {
      firstName: null,
      lastName: null,
    };
  },
  methods: {
    getOneUser() {
      const id = this.$route.params.id;
      this.idUserProfile = id;
      // console.log(id);
      axios
        .post("https://social-network-groupmonia.herokuapp.com/home/users", {
          id: id,
        })
        .then((response) => {
          console.log(response.data[0]);
          const data = response.data[0];
          this.firstName = data.first_name;
          this.lastName = data.last_name;
        });
    },
  },
  created() {
    this.getOneUser();
  },
};
</script>

<style lang="scss" scoped>
.no-post-yet {
  width: 100%;
  text-align: center;
  padding: 20px;
  border-radius: 10px;
  border: #434343a1 solid 1px;
  background-color: #f8f9fb;
  box-shadow: 0 10px 20px -8px rgb(58 46 68 / 70%);
  margin-bottom: 20px;
  i {
    font-size: 45px;
    color: $Secondary-Color;
  }
  h2 {
    margin-top: 15px;
    opacity: 80%;
  }
}
</style>