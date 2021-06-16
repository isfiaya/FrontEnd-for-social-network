<template>
  <div class="panel">
    <textarea placeholder="Whats in your mind today?" rows="2" class="form-control input-lg p-text-area" v-model="message"></textarea>
    <img :src="img" class="imgPreview" />

    <footer>
      <ul class="nav nav-pills">
        <li>
          <label class="btn-camera">
            <i class="fa fa-camera"></i>
            <span class="tooltiptext">Upload photo</span>
            <span>
              <input type="file" id="file" ref="file" @change="onFileChange" @click="resetFileUploader" />
            </span>
          </label>
        </li>
        <li v-if="img">
          <button class="btn pull-right btn-post" type="reset" @click="removeImage">Remove image</button>
        </li>
        <li>
          <button class="btn pull-right btn-post" type="submit" @click="submitPost" :disabled="!message && !file">Post</button>
        </li>
      </ul>
    </footer>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "Panel",
  data: function () {
    return {
      message: "",
      file: null,
      img: null,
    };
  },
  methods: {
    async submitPost() {
      const userId = localStorage.getItem("id");
      const firstName = localStorage.getItem("first_name");
      const lastName = localStorage.getItem("last_name");
      const formData = new FormData();
      formData.append("image", this.file);
      formData.append("message", this.message);
      formData.append("userId", userId);
      formData.append("first_name", firstName);
      formData.append("last_name", lastName);

      if (this.file || this.message) {
        await axios
          .post(
            "https://social-network-groupmonia.herokuapp.com/home",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Your post has been saved",
              showConfirmButton: false,
              timer: 2000,
            });
            // console.log(response);

            // this.message = "";
            this.message = "";
            this.img = null;
            this.file = "";
            this.$refs.file.value = null;
            if (this.$route.name == "home") {
              return this.fetchAllPost();
            }
            if (this.$route.name == "profile") {
              return this.getUserPost();
            }
          });
      }
    },
    resetFileUploader() {
      this.$refs.file.value = "";
    },
    onFileChange(e) {
      // this.file = this.$refs.file.files[0];
      let files = e.target.files;
      this.file = files[0];
      if (!files.length) return;

      this.img = URL.createObjectURL(files[0]);
    },
    removeImage() {
      this.img = "";
      this.file = "";
    },
    fetchAllPost() {
      this.$parent.fetchAllPost();
    },
    getUserPost() {
      this.$parent.getUserPost();
    },
  },
};
</script>

<style lang="scss" scoped>
.p-text-area,
.p-text-area:focus {
  border: none;
  font-weight: 300;
  box-shadow: none;
  color: #000000;
  font-size: 16px;
}
.panel {
  margin-bottom: 20px;
  background-color: #fff;
  border: 1px solid transparent;
  border-radius: 12px;
  padding: 2.5rem 2rem;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  footer {
    padding: 10px 15px;
    border-top: 1px solid #e7ebee;
    .btn-post {
      height: 30px;
      // background-color: $Primary-Color;
      background: $Primary-Color;
      box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
      background-size: 200%;
      border: none !important;
      cursor: pointer;
      border-radius: 30px;
      line-height: 0.3;
      text-align: center;
      padding: 0.375rem 2rem;
      outline: none !important;
      color: #fff;
    }
    .btn-post:active {
      transform: translateY(2px);
      border: none !important;
      outline: none !important;
    }
    .btn-post:hover {
      // background-color: $Secondary-Color;
    }
    ul {
      display: flex;
      justify-content: space-between;
      align-items: center;
      li:nth-child(1) {
        border: #e7e5e5 solid 1px;
        text-align: center;
        width: 30px;
        background-color: #f1f2f4;
        height: 31px;
        border-radius: 15px;
        label {
          margin-bottom: 0;
        }
      }
      li:nth-child(1):active {
        transform: translateY(2px);
      }

      li a {
        color: #7a7a7a !important;
      }
    }
    .btn:focus {
      box-shadow: 0 0 0 0.25rem #e2dbda;
    }
  }
}

.btn-camera {
  width: 25px;
  height: 25px;
  cursor: pointer;
  position: relative;

  span input {
    opacity: 0;
    width: 0;
    height: 0;
  }
}
.imgPreview {
  width: 50%;
  max-width: 300px;
  height: auto;
}
.tooltiptext {
  visibility: hidden;
  width: 100px;
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
  position: absolute;
  font-size: 12px !important;
  z-index: 1;
  top: 100%;
  left: 50%;
  margin-left: -50px;
  margin-top: 15px;
}
.btn-camera:hover {
  .tooltiptext {
    visibility: visible;
  }
}
</style>