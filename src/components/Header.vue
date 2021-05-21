<template>
  <div class="wrap">
    <div class="cover">
      <img src="@/assets/cover.jpg" alt />
      <div class="icons">
        <i class="fas fa-edit"></i>
        <i class="fas fa-upload"></i>
      </div>
    </div>
    <div class="avatar">
      <div class="profile-img">
        <img src="@/assets/aymen.jpg" alt />
      </div>
      <h3>Aymen isfiaya</h3>
    </div>

    <div class="list">
      <ul>
        <li>
          <i class="fas fa-home"></i>Activity
        </li>
        <li>
          <i class="fas fa-user"></i>Profile
        </li>
        <li>
          <i class="fas fa-users"></i>Friends
        </li>
        <li>
          <i class="fas fa-user-friends"></i>Groups
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style lang="scss" scoped>
.wrap {
  height: 60vh;
  position: relative;
  border-bottom: solid 1px #e7edf2;
}
.cover {
  width: 100%;
  height: 70%;
  position: relative;
  img {
    width: 100%;
    height: 100%;
  }
  .icons {
    position: absolute;
    right: 20px;
    bottom: 20px;
    i {
      margin-left: 20px;
      background-color: #eee;

      text-align: center;
      padding: 10px;
      border-radius: 50%;
      cursor: pointer;
    }
  }
}
.profile-img {
  border-radius: 12px;
  border: 2px solid #eee;
  background-color: white;
  width: 200px;
  height: 200px;
  overflow: hidden;
  padding: 1px;
  img {
    border-radius: 12px;
    width: 100%;
    height: 100%;
  }
}
.avatar {
  width: 200px;
  position: absolute;
  bottom: 30px;
  left: 30px;
  text-align: center;
  h3 {
    font-size: 18px;
    margin-top: 16px;
  }
}
.list {
  padding: 20px;
  ul {
    list-style: none;
    display: flex;
    justify-content: center;

    li {
      display: flex;
      flex-direction: column;
      text-align: center;
      margin-left: 50px;
    }
  }
}
</style>