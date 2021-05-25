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
        <Header />
      </header>
    </div>

    <main class="row">
      <div class="col-md-8 cards">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </main>
  </div>
</template>

<script>
import Nav from "../components/Nav";
import ProfileSide from "../components/ProfileSide";
import Header from "../components/Header";
import Card from "../components/Card";
export default {
  name: "Profile",
  components: {
    Nav,
    ProfileSide,
    Header,
    Card,
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
