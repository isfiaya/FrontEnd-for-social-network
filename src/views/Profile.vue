<template>
  <div>
    <div class="row header">
      <nav>
        <Nav />
      </nav>
      <aside>
        <ProfileSide />
      </aside>

      <header>
        <Header ref="header" />
      </header>
    </div>

    <main class="row">
      <div class="col-md-8 cards">
        <router-view name="Panel" v-if="paramsId == userId"></router-view>
        <router-view name="NoPostsYet" v-if="!posts"></router-view>
        <router-view name="Card" v-for="post in posts" :desc="post.message" :img="post.image" :firstName="post.first_name" :lastName="post.last_name" :postId="post.id" :createAt="post.createAt" :userId="post.userId" :key="post.id"></router-view>

        <router-view name="InfoUser"></router-view>
        <router-view name="InfoEdit"></router-view>
      </div>
    </main>
  </div>
</template>

<script>
import Nav from "../components/Nav";
import ProfileSide from "../components/ProfileSide";
import Header from "../components/Header";
// import Card from "../components/Card";
// import Panel from "../components/Panel";
import axios from "axios";
export default {
  name: "Profile",
  components: {
    Nav,
    // Panel,
    ProfileSide,
    Header,
    // Card,
  },
  data() {
    return {
      firstName: null,
      lastName: null,
      paramsId: this.$route.params.id,
      userId: localStorage.getItem("id"),
      posts: null,
    };
  },
  methods: {
    getUserPost() {
      const id = this.$route.params.id;
      console.log(id);
      axios
        .post("http://localhost:3000/home/profile", {
          id: id,
        })
        .then((response) => {
          if (response.data.length > 0) {
            const data = response.data;
            this.posts = data;
          }
        });
    },
  },
  watch: {
    "$route.params.id": function () {
      this.getUserPost();
      this.$refs.header.getOneUser();
    },
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
</style>
