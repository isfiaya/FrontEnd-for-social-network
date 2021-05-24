<template>
  <nav>
    <div class="search">
      <i class="fas fa-search"></i>
      <input type="text" placeholder="Search..." />
    </div>
    <div class="icons">
      <ul>
        <li>
          <i class="fas fa-user-plus"></i>
        </li>
        <li>
          <i class="fas fa-bell"></i>
        </li>
        <li @click="logout">
          <i class="fas fa-sign-out-alt"></i>
        </li>
        <li class="badge">
          <router-link :to="{
            name:'profile',
            query:{id:id} 
          }">
            <img src="@/assets/user.png" alt />
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import Swal from "sweetalert2";
export default {
  name: "Navbar",
  data() {
    return {
      id: localStorage.getItem("id"),
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
  i {
    font-size: 1rem;
    opacity: 60%;
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
.badge {
  img {
    width: 40px;
    border-radius: 50%;
  }
}
</style>