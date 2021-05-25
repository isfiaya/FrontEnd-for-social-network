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
        <label class="btn-camera">
          <i class="fa fa-camera"></i>
          <span>
            <input type="file" id="file" ref="file" @change="onFileChange" />
          </span>
        </label>
        <img :src="img" alt />
      </div>
      <h3>Aymen isfiaya</h3>
    </div>

    <div class="list">
      <ul>
        <router-link to="/home">
          <li>
            <i class="fas fa-home"></i>Activity
          </li>
        </router-link>

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
  data() {
    return {
      img: null,
    };
  },
  methods: {
    onFileChange(e) {
      let files = e.target.files;
      if (!files.length) return;
      this.img = URL.createObjectURL(files[0]);
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  height: 60vh;
  position: relative;
  border-bottom: solid 1px #e7edf2;
  @media (max-width: 768px) {
    border-bottom: none;
  }
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
  position: relative;
  img {
    border-radius: 12px;
    width: 100%;
    height: 100%;
  }
}
.avatar {
  width: 200px;
  position: absolute;
  bottom: 0px;
  left: 30px;
  text-align: center;
  h3 {
    font-size: 18px;
    margin-top: 16px;
  }
  @media (max-width: 768px) {
    left: calc(50% - 100px);
    top: calc(100% - 200px);
  }
}
.list {
  padding: 20px;
  ul {
    list-style: none;
    display: flex;
    justify-content: center;
    padding-left: 0;
    a:hover {
      text-decoration: none;
    }
    li {
      display: flex;
      flex-direction: column;
      text-align: center;
      margin-left: 50px;
    }
  }
  @media (max-width: 768px) {
    margin-top: 9rem;
  }
}
.btn-camera {
  width: 25px;
  height: 25px;
  cursor: pointer;
  position: absolute;
  left: calc(50% - 12.5px);
  top: calc(50% - 12.5px);
  span input {
    opacity: 0;
    width: 0;
    height: 0;
  }
}
</style>