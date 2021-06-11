<template>
  <div class="wrap style">
    <div class="header">
      <img src="@/assets/icon-1.png" class="logo-side" alt="logo" />
      <p>Groupomania</p>
      <p>Social Network</p>
      <div class="card">
        <div class="info">
          <router-link :to="{
            name:'profile',
            params:{id:id} 
          }">
            <img src="@/assets/user.png" alt="profile" v-if="!img" />
            <img :src="img" alt="profile" v-if="img" />
            <p>{{first_name + ` ` + last_name}}</p>
          </router-link>

          <p class="member">Member</p>
        </div>
        <div class="connection">
          <ul>
            <li>
              {{numberPost}}
              <span>Posts</span>
            </li>
            <!-- <li>
              4
              <span>Groups</span>
            </li>-->
          </ul>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="items">
        <ul>
          <li>
            <i class="fas fa-home"></i>Activity
          </li>
          <li>
            <i class="fas fa-image"></i>
            Photos
          </li>
          <li>
            <i class="fas fa-play"></i>
            Watch
          </li>
          <li>
            <i class="fas fa-user"></i>
            People
          </li>
          <li>
            <i class="fas fa-user-friends"></i>
            Groups
          </li>
          <li>
            <i class="fas fa-users"></i>
            Pages
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
export default {
  name: "SideLeft",
  data: function () {
    return {
      first_name: "",
      last_name: "",
      img: null,
      id: localStorage.getItem("id"),
      numberPost: 0,
    };
  },
  methods: {
    getOneUser() {
      const userId = localStorage.getItem("id");
      axios
        .get("https://social-network-groupmonia.herokuapp.com/home/users")
        .then((response) => {
          if (response.data) {
            const data = response.data;
            const dataFilter = data.filter(
              (user) => user.id == parseInt(userId)
            );
            this.img = dataFilter[0].imageUser;
          }
        });
    },
    fetchPost() {
      const id = localStorage.getItem("id");
      axios
        .get("https://social-network-groupmonia.herokuapp.com/home")
        .then((response) => {
          const data = response.data;
          const dataFilter = data.filter((post) => post.userId == id);
          this.numberPost = dataFilter.length;
        });
    },
  },
  created: function () {
    this.first_name = localStorage.getItem("first_name");
    this.last_name = localStorage.getItem("last_name");
    this.getOneUser();
    this.fetchPost();
  },
};
</script>



<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.wrap {
  overflow: auto;
  height: 100vh;
  background-color: #f8f9fb;
}
.wrap:hover {
  &::-webkit-scrollbar-thumb {
    opacity: 1;
    background-color: #ced0d4;
  }
}

.style::-webkit-scrollbar-track {
  border-radius: 10px;
  background: transparent;
}
.style::-webkit-scrollbar {
  width: 12px;
  background: transparent;
}
.style::-webkit-scrollbar-thumb {
  border-radius: 10px;
  opacity: 0;

  // background-color: rgb(209, 203, 203);
  // visibility: visible;
}
.header {
  background-color: #383a45;
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
  background-image: linear-gradient(135deg, #4f5261 0%, #383a45 50%);
  img {
    width: 50px;
    height: auto;
    max-height: 105px;
    margin-bottom: 5px;
  }
  p {
    color: #fff;
    margin-bottom: 0px !important;
  }
  p:nth-child(3) {
    font-size: small;
    opacity: 70%;
  }
}
.main {
  height: 100vh;
  text-align: center;
  padding: 50px;
  .items {
    height: 100%;
    margin-top: 150px;
    ul {
      display: flex;
      flex-wrap: wrap;
      list-style: none;
      padding-left: 0;
      gap: 10px;
      li {
        width: 100px;
        max-width: 50%;
        margin-bottom: 50px;
        display: flex;
        flex-direction: column;
        opacity: 80%;
        padding: 5px;
        border-radius: 7px;
        cursor: pointer;

        i {
          margin-bottom: 10px;
        }
      }
      li:hover {
        background-color: #eee;
      }
    }
  }
}

.card {
  width: 250px;
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 25px 40px 25px 40px;
  border-radius: 12px;
  margin-top: 30px;
  box-shadow: 0 15px 100px rgb(58 46 68 / 6%);
  position: relative;
  img {
    border-radius: 50%;
    width: 47px;
    height: 47px;
    box-shadow: 0 7px 35px rgb(58 46 68 / 10%);
    padding: 2px;
    border: 2px solid #eee;
  }

  .connection {
    margin-top: 20px;
    padding-top: 20px;
    border-top: #eee solid 2px;
    ul {
      display: flex;
      list-style: none;
      justify-content: space-around;
      padding-left: 0px;
      li {
        display: flex;
        flex-direction: column;
        span {
          opacity: 50%;
        }
      }
    }
  }
  .info {
    a {
      p {
        color: black;
      }
    }
    a:hover {
      text-decoration: none;
    }
    a:active {
      transform: translateY(2px);
    }
    .member {
      color: black;
      opacity: 50%;
    }
  }
  .info:active {
    transform: translateY(2px);
  }
}
.card::before {
  content: "";
  padding: 10px;
  background-color: #464855;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  position: absolute;
  width: 70%;
  bottom: -22px;
}
</style>