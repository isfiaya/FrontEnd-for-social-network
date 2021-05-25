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
        <Header :firstName="posts[0].first_name" :lastName="posts[0].last_name" />
      </header>
    </div>

    <main class="row">
      <div class="col-md-8 cards">
        <Panel />

        <Card v-for="post in posts" :desc="post.message" :img="post.image" :firstName="post.first_name" :lastName="post.last_name" :postId="post.id" :createAt="post.createAt" :userId="post.userId" :key="post.id" />
      </div>
    </main>
  </div>
</template>

<script>
import Nav from "../components/Nav";
import ProfileSide from "../components/ProfileSide";
import Header from "../components/Header";
import Card from "../components/Card";
import Panel from "../components/Panel";
import axios from "axios";
export default {
  name: "Profile",
  components: {
    Nav,
    Panel,
    ProfileSide,
    Header,
    Card,
  },
  data() {
    return {
      posts: null,
    };
  },
  methods: {
    getUserPost() {
      const id = this.$route.query.id;
      axios
        .post("http://localhost:3000/home/profile", {
          id: id,
        })
        .then((response) => {
          console.log(response.data);
          this.posts = response.data;
          this.firstName = response[0].first_name;
          this.lastName = response[0].last_name;
        });
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
