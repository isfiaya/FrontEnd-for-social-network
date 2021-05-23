<template>
  <li class="comment">
    <div class="info">
      <img src="@/assets/user.png" alt />
      <p>{{firstName + " " + lastName}}</p>
    </div>
    <div class="inputComment">
      <span class="inputComment-Comment">{{msg}}</span>
    </div>
    <div class="tools" v-if="userCommentId">
      <button class="mr-3">Edit</button>
      <button @click="deleteComment">Delete</button>
    </div>
  </li>
</template>

<script>
import axios from "axios";
export default {
  name: "Comment",
  data() {
    return {
      firstName: null,
      lastName: null,
      userCommentId: false,
    };
  },
  props: ["msg", "id", "postId", "idComment"],
  methods: {
    deleteComment() {
      axios
        .delete("http://localhost:3000/home/comment", {
          data: {
            idComment: this.idComment,
          },
        })
        .then((response) => {
          console.log(response);
          this.getComment();
        });
    },
    getComment() {
      this.$parent.getComment();
    },
  },
  created() {
    const userId = this.id;
    const userConnect = localStorage.getItem("id");
    axios.get("http://localhost:3000/home/users").then((response) => {
      const data = response.data;
      const dataFilter = data.filter((user) => user.id == parseInt(userId));
      this.firstName = dataFilter[0].first_name;
      this.lastName = dataFilter[0].last_name;
      if (dataFilter[0].id == userConnect) {
        this.userCommentId = true;
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.comment {
  display: flex;
  flex-direction: column;
  .info {
    display: flex;
    align-items: center;
    img {
      width: 40px;
      height: auto;
      border-radius: 50%;
      margin-right: 15px;
    }
  }
  .inputComment {
    background-color: #eee;
    border-radius: 20px;
    padding: 10px;
    margin-left: 40px;
  }

  .tools {
    display: flex;
    margin-top: 10px;
    margin-left: 40px;
    p {
      margin-right: 15px;
    }
  }
}
.wrapComment {
  display: flex;
  align-items: center;
  .imgComment {
    width: 10%;
    img {
      max-width: 40px;
      border-radius: 50%;
      height: auto;
    }
  }
  .inputComment {
    width: 70%;
    input {
      padding: 7px;
      width: 100%;
      border-radius: 30px;
      outline: none;
      border: 2px solid #e7edf2;
      background-color: #eee;
    }
  }
  .btnComment {
    margin-left: 20px;

    button {
      padding: 7px 20px 7px 20px;
      border-radius: 20px;
      outline: none;
      background-color: #8224e3;
      background-image: linear-gradient(
        90deg,
        #8224e3 0,
        #a968ec 50%,
        #8224e3 100%
      );
      box-shadow: 0 1px 2px 0 rgb(130 36 227 / 50%);
      color: #fff;
    }
  }
}
</style>