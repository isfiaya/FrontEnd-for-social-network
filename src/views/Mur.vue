<template>
  <div>
    <div class="asideLeft">
      <SideLeft class="side" />
    </div>
    <div class="main">
      <nav class="fixed-top">
        <Nav />
      </nav>
      <div class="row d-flex">
        <div class="col-lg-8 main-post">
          <Panel></Panel>
          <!-- Post /////-->
          <Card v-for="post in posts" :desc="post.message" :img="post.image" :firstName="post.first_name" :lastName="post.last_name" :postId="post.id" :createAt="post.createAt" :key="post.id" />
        </div>
        <aside class="col-lg-4 main-aside">
          <SideRight />
        </aside>
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
    };
  },
  created() {
    axios.get("http://localhost:3000/home").then((response) => {
      const data = response.data;
      this.posts = data;
    });
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
    margin-top: 80px;
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
