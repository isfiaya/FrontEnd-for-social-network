<template>
  <div>
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
</template>

<script>
import Nav from "../components/Nav";
import ProfileSide from "../components/ProfileSide";
import Header from "../components/Header";
export default {
  name: "Profile",
  components: {
    Nav,
    ProfileSide,
    Header,
  },
};
</script>
<style lang="scss" scoped>
nav {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  margin-left: 10%;
  width: 90%;
}
aside {
  width: 10%;
  position: fixed;
  margin-top: -80px;
}
header {
  margin-left: 10%;
  margin-top: 80px;
}
</style>
