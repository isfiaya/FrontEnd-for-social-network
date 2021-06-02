<template>
  <nav>
    <div class="search">
      <i class="fas fa-search"></i>
      <input type="text" placeholder="Search..." v-model="search" />
    </div>
    <div class="resultSearch" v-if="users">
      <p v-if="notUsers">not match any username</p>
      <router-link v-for="user in users" :to="{name:'profile',params:{id:user.id}}" :key="user.id">{{user.first_name + ' ' + user.last_name}}</router-link>
    </div>
    <div class="icons">
      <ul>
        <!-- <li>
          <i class="fas fa-user-plus"></i>
        </li>-->
        <!-- <li>
          <i class="fas fa-bell"></i>
        </li>-->
        <li @click="logout" class="logout">
          <i class="fas fa-sign-out-alt"></i>
          <span class="tooltiptext">Log Out</span>
        </li>
        <li class="badgeProfile">
          <router-link :to="{
            name:'profile',
            params:{id:id} 
          }" class="linkBadge">
            <img src="@/assets/user.png" alt="imgProfile" v-if="!img" />
            <img :src="img" alt="imgProfile" v-if="img" />
            <span class="tooltiptext">Profile</span>
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
export default {
  name: "Navbar",
  data() {
    return {
      search: null,
      id: localStorage.getItem("id"),
      img: null,
      users: null,
      notUsers: false,
    };
  },
  components: {},
  computed: {
    //
  },
  methods: {
    logout: function () {
      localStorage.clear();
      this.$router.replace("/");
      Swal.fire({
        text: "disconnected !",
        icon: "success",
        timer: 1500,
        timerProgressBar: true,
      });
    },
    getOneUser() {
      const userId = localStorage.getItem("id");
      axios.get("http://localhost:3000/home/users").then((response) => {
        const data = response.data;
        const dataFilter = data.filter((user) => user.id == parseInt(userId));
        this.img = dataFilter[0].imageUser;
      });
    },
    searchUsers() {
      const words = this.search;
      if (words.length) {
        axios
          .post("http://localhost:3000/home/users/search", {
            words: words,
          })
          .then((response) => {
            console.log(response.data);
            const data = response.data;
            this.users = data;
            if (this.users.length) {
              this.notUsers = false;
            } else {
              this.notUsers = true;
            }
          });
      }
      if (!words) {
        this.users = null;
      }
    },
  },
  watch: {
    search: function () {
      this.searchUsers();
    },
  },
  created() {
    this.getOneUser();
  },
};
</script>

<style lang="scss" scoped>
nav {
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
  align-items: center;
  height: 80px;
  border-bottom: 1px solid #e7edf2;
}

.search {
  height: 28px;
  width: 40%;
  position: relative;
  i {
    font-size: 1rem;
    opacity: 60%;
    width: 5%;
  }
  input {
    border: none;
    border-radius: 3px;
    color: #262626;
    height: 2.5rem;
    border-radius: 1.25rem;
    padding: 0.375rem 1rem;
    background: none;
    height: 100%;
    outline: none;
    width: 85%;
  }
}
.resultSearch {
  position: absolute;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  width: 30%;
  top: 100%;
  left: 20px;
  padding: 5px;
  p {
    margin-bottom: 0;
    padding: 5px 0 5px 10px;
  }
  a {
    display: block;
    color: black;
    padding: 5px 0 5px 10px;
    margin: 10px 0;
  }
  a:hover {
    background-color: #eee;
    text-decoration: none;
  }
}
.icons {
  ul {
    display: flex;
    list-style: none;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 0;
    li {
      margin-left: 15px;
      i {
        cursor: pointer;
      }
    }
  }
  a {
    margin-left: 25px;
    color: black;
    text-decoration: none;
  }
}
.badgeProfile {
  img {
    width: 40px;
    border-radius: 50%;
  }
}
.linkBadge {
  position: relative;
}
.linkBadge:hover {
  .tooltiptext {
    visibility: visible;
  }
}
.badgeProfile:active {
  transform: translateY(2px);
}
.logout {
  position: relative;
  i {
    border: #dfdfdf solid 1px;
    padding: 5px;
    border-radius: 15px;
    background-color: #f1f2f4;
  }
}
.tooltiptext {
  visibility: hidden;
  width: 80px;
  background-color: black;
  color: #fff;
  font-size: 12px !important;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
  position: absolute;
  z-index: 1;
  top: 100%;
  left: 50%;
  margin-left: -40px;
  margin-top: 15px;
}
.logout:hover {
  .tooltiptext {
    visibility: visible;
  }
}
</style>