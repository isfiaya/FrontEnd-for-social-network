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
      <div class="profile-img" @click="box=true">
        <img :src="img" alt />
      </div>

      <h3>{{ firstName + ' ' + lastName}}</h3>
      <div class="overlay-image" v-if="box" @click="box=false">
        <div class="box animate__animated animate__fadeIn">
          <p>Change Profile Photo</p>
          <input type="file" id="file" ref="file" class="custom-file-input" @change="onFileChange" @click="resetFileUploader" />
          <button class="btnRemove">Remove Current Photo</button>
          <button @click="box=false">Cancel</button>
        </div>
      </div>
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
import axios from "axios";
export default {
  name: "Header",
  data() {
    return {
      img: null,
      box: false,
      file: null,
      oneUser: null,
    };
  },
  props: ["firstName", "lastName"],
  methods: {
    onFileChange(e) {
      let files = e.target.files;
      this.file = files[0];
      if (!files.length) return;
      this.box = false;
      this.img = URL.createObjectURL(files[0]);
      this.setImageProfile();
    },
    async setImageProfile() {
      const id = localStorage.getItem("id");
      const formData = new FormData();
      formData.append("image", this.file);
      formData.append("id", id);
      await axios
        .post("http://localhost:3000/home/users/images", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response);
        });
    },
    resetFileUploader() {
      this.$refs.file.value = "";
    },
    getOneUser() {
      const userId = localStorage.getItem("id");
      axios.get("http://localhost:3000/home/users").then((response) => {
        const data = response.data;
        const dataFilter = data.filter((user) => user.id == parseInt(userId));
        this.img = dataFilter[0].imageUser;
      });
    },
  },
  created() {
    this.getOneUser();
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
.overlay-image {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.65);
  z-index: 2;
  justify-content: space-around;
  .box {
    position: absolute;
    top: 50%;
    left: 50%;
    color: white;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 260px;
    border-radius: 12px;
    background-color: #fff;
    color: black;
    height: 222px;
    p {
      color: #262626;
      font-size: 18px;
      font-weight: 600;
      padding-top: 20px;
    }
    input,
    button {
      border-top: 1px solid #dbdbdb;
      padding: 10px 0;
      cursor: pointer;
    }
    .custom-file-input {
      opacity: 1;
      height: auto;
      color: transparent;
    }
    .custom-file-input::-webkit-file-upload-button {
      visibility: hidden;
    }
    .custom-file-input::before {
      content: "Upload Photo";
      display: inline-block;
      color: #0095f6;
      font-weight: 700;
      padding: 5px 8px;
      outline: none;
      white-space: nowrap;
      font-size: 10pt;
      position: absolute;
      left: calc(50% - 56px);
    }
    .btnRemove {
      color: #ed4956;
      font-weight: 700;
    }
  }
}
.animate__animated.animate__fadeIn {
  --animate-duration: 300ms;
}
</style>