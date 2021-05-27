<template>
  <div class="asideRight">
    <div class="main">
      <h3>Members</h3>
      <div class="members">
        <Member v-for="user in users" :first_name="user.first_name" :pic="user.imageUser" :last_name="user.last_name" :userID="user.id" :key="user.id" />
      </div>
    </div>
    <footer>
      <ul>
        <li>Home</li>
        <li>About Us</li>
        <li>FAQs</li>
        <li>Blog</li>
        <li>Contact</li>
      </ul>
    </footer>
  </div>
</template>

<script>
import Member from "./Member";
import axios from "axios";
export default {
  name: "SideRight",
  data() {
    return {
      users: null,
    };
  },
  components: {
    Member,
  },
  created() {
    const userId = localStorage.getItem("id");
    axios.get("http://localhost:3000/home/users").then((response) => {
      const data = response.data;
      const dataFilter = data.filter((user) => user.id !== parseInt(userId));
      this.users = dataFilter.slice(0, 7);
    });
  },
};
</script>

<style lang="scss" scoped>
.asideRight {
  background-color: white;
  padding: 30px 30px 30px 30px;
  position: fixed;
  width: 300px;
}
.main {
  border-radius: 12px;
  background: rgba(130, 36, 227, 0.02);
  background: linear-gradient(
    135deg,
    rgba(130, 36, 227, 0.04) 0%,
    rgba(255, 255, 255, 0) 25%,
    rgba(130, 36, 227, 0.07) 100%
  );

  padding: 10px 0px 20px 15px;
  h3 {
    font-size: medium;
    position: relative;
  }
  h3::before {
    content: "";
    position: absolute;
    width: 40px;
    border: #8224e3 solid 1px;
    bottom: -8px;
  }
}
.members {
  margin-top: 30px;
}
footer {
  margin-top: 10px;
  ul {
    display: flex;
    list-style: none;
    padding-left: 0px;
    flex-wrap: wrap;
    justify-content: space-between;
    li {
      font-size: 10px;
      opacity: 70%;
    }
  }
}
</style>