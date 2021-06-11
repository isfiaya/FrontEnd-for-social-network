<template>
  <div>
    <div class="asideLeft">
      <SideLeft ref="sideLeft" />
    </div>
    <div class="main">
      <nav class="fixed-top">
        <Nav ref="nav" />
      </nav>
      <div class="row d-flex" @click="hiddenBoxSearch">
        <div class="col-lg-8 main-post">
          <Panel></Panel>
          <!-- Post /////-->
          <Card v-for="post in posts" :desc="post.message" :img="post.image" :firstName="post.first_name" :lastName="post.last_name" :postId="post.id" :createAt="post.createAt" :userId="post.userId" :key="post.id" />
        </div>
        <aside class="col-lg-4 main-aside">
          <SideRight />
        </aside>
        <div class="customToast" v-if="toast">
          <p>Like Added</p>
          <i class="fas fa-check-circle"></i>
        </div>
        <div class="customToast" v-if="toastComment">
          <p>Comment Added</p>
          <i class="fas fa-check-circle"></i>
        </div>
        <div class="customToast customColor" v-if="toastCommentDeleted">
          <p>Comment Deleted</p>
          <i class="far fa-trash-alt"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import User from "../components/User-data";
import Panel from "../components/Panel";
import SideLeft from "../components/SideLeft";
import SideRight from "../components/SideRight";
import Card from "../components/Card";
import Nav from "../components/Nav.vue";
import axios from "axios";

export default {
  name: "Mur",

  components: {
    // User,
    Panel,
    Card,
    SideLeft,
    Nav,
    SideRight,
  },
  data() {
    return {
      posts: null,
      users: null,
      toast: false,
      toastComment: false,
      toastCommentDeleted: false,
    };
  },
  methods: {
    fetchAllPost() {
      axios.get("http://localhost:3000/home").then((response) => {
        // const token = response.data.token;
        // if (token === false) {
        //   return this.$router.replace("/login");
        // }
        const jwt = localStorage.getItem("jwt");
        if (!jwt) {
          return this.$router.replace("/login");
        }
        const data = response.data;
        this.posts = data;
      });
    },
    hiddenBoxSearch() {
      if (this.$refs.nav.search) {
        this.$refs.nav.search = "";
      }
    },
    showToast() {
      this.toast = true;
      setTimeout(() => {
        this.toast = false;
      }, 2000);
    },
    showToastComment() {
      this.toastComment = true;
      setTimeout(() => {
        this.toastComment = false;
      }, 2000);
    },
    showToastDeleteComment() {
      this.toastCommentDeleted = true;
      setTimeout(() => {
        this.toastCommentDeleted = false;
      }, 2000);
    },
  },
  watch: {
    posts: function () {
      this.$refs.sideLeft.fetchPost();
    },
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  created() {
    this.fetchAllPost();
  },
};
</script>

<style lang="scss" scoped>
.fixed-top {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 10000;
  @media (min-width: 1200px) {
    margin-left: 25%;
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
.btn-share {
  color: white;
}

.c-marg {
  margin-top: 50px;
}
.row {
  padding-left: 0;
  padding-right: 0;
  margin: 0;
}

.asideLeft {
  width: 25%;
  position: fixed;
  padding-right: 0;
  padding-left: 0;
  padding-top: 0;
  background-color: white;
  display: none;
  @media (min-width: 1200px) {
    display: block;
  }
}
.main {
  padding-left: 0;
  padding-right: 0;
  padding-top: 0;
  @media (min-width: 1200px) {
    margin-left: 25%;
  }

  .row {
    background-color: white;
  }
  .main-post {
    margin-top: 120px;
  }
  .main-aside {
    border-left: solid 1px #e7edf2;
    padding: 0;
    margin-top: 80px;
    min-height: 100vh;
    display: none;
    @media (min-width: 1200px) {
      display: block;
    }
  }
}
</style>
