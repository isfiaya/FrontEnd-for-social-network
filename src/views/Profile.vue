<template>
  <div>
    <div class="row header">
      <nav>
        <Nav ref="nav" />
      </nav>
      <aside>
        <ProfileSide />
      </aside>

      <header>
        <Header ref="header" />
      </header>
    </div>

    <main class="row" @click="hiddenBoxSearch">
      <div class="col-md-8 cards">
        <router-view name="Panel" v-if="paramsId == userId"></router-view>
        <router-view name="NoPostsYet" v-if="!posts"></router-view>
        <router-view ref="card" name="Card" v-for="post in posts" :desc="post.message" :img="post.image" :firstName="post.first_name" :lastName="post.last_name" :postId="post.id" :createAt="post.createAt" :userId="post.userId" :key="post.id"></router-view>

        <router-view name="InfoUser"></router-view>
        <router-view name="InfoEdit"></router-view>
      </div>
    </main>
    <!-- <transition name="slide-fade">
      <div class="customToast" v-if="toast">
        <p>Like Added</p>
        <i class="fas fa-check-circle"></i>
      </div>
    </transition>
    <transition name="slide-fade">
      <div class="customToast" v-if="toastComment">
        <p>Comment Added</p>
        <i class="fas fa-check-circle"></i>
      </div>
    </transition>
    <transition name="slide-fade">
      <div class="customToast customColor" v-if="toastCommentDeleted">
        <p>Comment Deleted</p>
        <i class="far fa-trash-alt"></i>
      </div>
    </transition>-->
  </div>
</template>

<script>
import Nav from "../components/Nav";
import ProfileSide from "../components/ProfileSide";
import Header from "../components/Header";

import axios from "axios";
export default {
  name: "Profile",
  components: {
    Nav,
    ProfileSide,
    Header,
  },
  data() {
    return {
      firstName: null,
      lastName: null,
      paramsId: this.$route.params.id,
      userId: localStorage.getItem("id"),
      posts: null,
      imgUserCard: null,
    };
  },
  methods: {
    getUserPost() {
      const id = this.$route.params.id;
      axios
        .post("http://localhost:3000/home/profile", {
          id: id,
        })
        .then((response) => {
          // console.log(response);
          const jwt = localStorage.getItem("jwt");
          if (!jwt) {
            return this.$router.replace("/login");
          }
          if (!response.data.length) {
            this.posts = null;
          }
          if (response.data.length > 0) {
            const data = response.data;
            this.posts = data;
          }
        });
    },

    hiddenBoxSearch() {
      if (this.$refs.nav.search) {
        return (this.$refs.nav.search = "");
      }
    },
  },
  watch: {
    "$route.params.id": function () {
      this.getUserPost();
      this.$refs.header.getOneUser();
      this.paramsId = this.$route.params.id;
    },
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  created() {
    this.getUserPost();
  },
};
</script>
<style lang="scss" scoped>
.header {
  margin-left: 0;
  margin-right: 0;
}
nav {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  width: 100vw;

  @media (min-width: 1200px) {
    margin-left: 10%;
    width: 90%;
  }
}
aside {
  width: 10%;
  height: 100vh;
  position: fixed;
  display: none;
  padding-right: 0;
  padding-left: 0;
  @media (min-width: 1200px) {
    display: block;
  }
}
header {
  margin-top: 80px;
  padding-left: 0;
  padding-right: 0;
  @media (min-width: 1200px) {
    margin-left: 10%;
    width: 90%;
  }
}
main {
  margin-top: 80px;
  width: 100%;
  margin-left: 0;
  .cards {
    margin: auto;
  }
  @media (min-width: 1200px) {
    margin-left: 10%;
  }
  @media (max-width: 768px) {
    margin-top: 10rem;
  }
}
.customToast {
  border: black 1px solid;
  width: 250px;
  padding: 10px;
  background-color: rgb(12 10 10 / 88%);
  position: fixed;
  z-index: 10000;
  bottom: 30px;
  left: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    color: white;
    margin-bottom: 0;
  }
  i {
    color: green;
  }
}
.customColor {
  i {
    color: red !important;
  }
}
</style>
