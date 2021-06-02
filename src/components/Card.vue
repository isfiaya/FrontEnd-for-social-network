<template>
  <div class="card animate__animated animate__fadeInUp">
    <div class="post-title d-flex align-items-center">
      <!-- profile picture end -->
      <div class="profile-thumb">
        <router-link :to="{name:'profile', params:{id:userId}}">
          <figure class="profile-thumb-middle">
            <img src="@/assets/user.png" alt="profile picture" v-if="!picProfile" />
            <img :src="picProfile" alt="profile picture" v-if="picProfile" />
          </figure>
        </router-link>
      </div>
      <!-- profile picture end -->

      <button type="button" class="btn btn-outline-danger" v-if="showBtnDeletePost" @click="requestDeletPost">X</button>

      <div class="posted-author">
        <h6 class="author">
          <router-link :to="{name:'profile', params:{id:userId}}">{{firstName + ' ' + lastName }}</router-link>
        </h6>
        <span class="post-time">{{timeAgo}} ago</span>
      </div>
    </div>

    <div class="post-content">
      <p class="post-desc">{{desc}}</p>
      <div class="post-thumb-gallery" v-if="img">
        <figure>
          <img :src="img" alt="post image" />
        </figure>
      </div>
      <div class="post-meta">
        <button class="post-meta-like" @click="submitClick">
          <i class="far fa-thumbs-up" :class="{likeBtn : isLike}"></i>
          <span>{{ numberLikes}}</span>
          <span>Likes</span>
        </button>

        <button @click="toggleComment" class="post-comment">
          <i class="far fa-comment-alt"></i>
          <span>{{numberComment}}</span>
          <span>commenter</span>
        </button>

        <!-- <button class="post-share">
          <i class="far fa-share-square"></i>
          <span>07</span>
          <span>Partager</span>
        </button>-->
      </div>

      <section class="comments" v-if="isShowComments">
        <ul class="comments-list">
          <Comment v-for="comment in arrayComments" :msg="comment.comment" :postId="comment.postId" :id="comment.userId" :idComment="comment.id" :key="comment.id" />

          <li>
            <div class="wrapComment">
              <div class="imgComment">
                <img src="@/assets/user.png" alt="userImage" v-if="!imgCommentSection" />
                <img :src="imgCommentSection" alt="userImage" v-if="imgCommentSection" />
              </div>
              <div class="inputComment">
                <input type="text" v-model="userComment" placeholder="Add a comment..." />
              </div>
              <div class="btnComment">
                <button type="submit" @click="submitComment">Post</button>
              </div>
            </div>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
import Comment from "@/components/Comment.vue";
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "Card",
  components: {
    Comment,
  },
  data: () => ({
    isShowComments: false,
    isLike: false,

    userComment: null,
    numberLikes: null,
    numberComment: null,
    timeAgo: null,
    arrayComments: null,
    showBtnDeletePost: false,
    picProfile: null,
    imgCommentSection: null,
  }),
  methods: {
    toggleComment() {
      this.isShowComments = this.isShowComments == false ? true : false;
      this.getComment();
    },
    submitClick() {
      const id = localStorage.getItem("id");
      const userId = parseInt(id);
      axios
        .post("http://localhost:3000/home/like", {
          userId: userId,
          postId: this.postId,
        })
        .then((response) => {
          console.log(response.data.like);
          if (response.data.like) {
            this.numberLikes++;
            this.isLike = true;
          }
          if (!response.data.like) {
            this.numberLikes--;
            this.isLike = false;
          }
        });
    },
    fetchData() {
      const id = localStorage.getItem("id");
      const userId = parseInt(id);
      axios.get("http://localhost:3000/home/like").then((response) => {
        const data = response.data;
        const likes = data.filter((like) => like.postId == this.postId);
        this.numberLikes = likes.length;

        const userLikes = likes.filter((user) => user.userId == userId);

        if (userLikes.length > 0) {
          this.isLike = true;
        }
        if (userLikes.length == 0) {
          this.isLike = false;
        }
      });
    },

    timeSince() {
      const dateNow = Date.now();
      const dateCreated = Date.parse(this.createAt);
      const seconds = Math.floor((dateNow - dateCreated) / 1000);
      let interval = seconds / 31536000;

      if (interval > 1) {
        return (this.timeAgo = Math.floor(interval) + " years");
      }
      interval = seconds / 2592000;
      if (interval > 1) {
        return (this.timeAgo = Math.floor(interval) + " months");
      }
      interval = seconds / 86400;
      if (interval > 1) {
        return (this.timeAgo = Math.floor(interval) + " days");
      }
      interval = seconds / 3600;
      if (interval > 1) {
        return (this.timeAgo = Math.floor(interval) + " hours");
      }
      interval = seconds / 60;
      if (interval > 1) {
        return (this.timeAgo = Math.floor(interval) + " minutes");
      }
      return (this.timeAgo = Math.floor(seconds) + " seconds");
    },
    submitComment() {
      const postId = this.postId;
      const id = localStorage.getItem("id");
      const userId = parseInt(id);
      const comment = this.userComment;
      if (comment) {
        axios
          .post("http://localhost:3000/home/comment", {
            userId: userId,
            postId: postId,
            comment: comment,
          })
          .then((response) => {
            console.log(response);
            this.getComment();
            this.userComment = "";
          });
      }
    },
    getComment() {
      const postId = this.postId;
      axios.get("http://localhost:3000/home/comment").then((response) => {
        const data = response.data;
        const dataFilterComment = data.filter(
          (comment) => comment.postId == postId
        );
        this.numberComment = dataFilterComment.length;
        this.arrayComments = dataFilterComment;
      });
    },
    showBtnDelete() {
      const id = localStorage.getItem("id");
      if (id == this.userId) {
        this.showBtnDeletePost = true;
      }
    },
    requestDeletPost() {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          const id = this.postId;
          axios
            .delete("http://localhost:3000/home", {
              data: {
                id: id,
              },
            })
            .then((response) => {
              console.log(response);
              if (this.$route.name == "home") {
                return this.fetchAllPost();
              }
              if (this.$route.name == "profile") {
                return this.getUserPost();
              }
            });
          Swal.fire("Deleted!", "Your post has been deleted.", "success");
        }
      });
    },
    fetchAllPost() {
      this.$parent.fetchAllPost();
    },
    getUserPost() {
      this.$parent.getUserPost();
    },
    getOneUser() {
      const userId = this.userId;
      axios.get("http://localhost:3000/home/users").then((response) => {
        const data = response.data;
        const dataFilter = data.filter((user) => user.id == parseInt(userId));
        this.picProfile = dataFilter[0].imageUser;
      });
    },
    getImgCommentSection() {
      const id = localStorage.getItem("id");
      axios
        .post("http://localhost:3000/home/users", {
          id: id,
        })
        .then((response) => {
          const data = response.data[0];
          this.imgCommentSection = data.imageUser;
        });
    },
  },
  created() {
    this.getComment();
    this.fetchData();
    this.timeSince();
    this.showBtnDelete();
    this.getOneUser();
    this.getImgCommentSection();
  },
  props: [
    "desc",
    "img",
    "firstName",
    "lastName",
    "postId",
    "createAt",
    "userId",
  ],
};
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  border: solid 1px #eeeeee;
  border-radius: 12px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}
.post-title {
  // align-items: center !important;
  .posted-author {
    margin-left: 20px;
    h6 {
      font-size: 14px;
      font-weight: 800;
      line-height: 1;
      text-transform: capitalize;
      margin-bottom: 0;
      a {
        color: #333333;
        text-decoration: none;
      }
    }
    .post-time {
      display: block;
      font-size: 14px;
      line-height: 1;
      padding-top: 10px;
    }
  }
  .profile-thumb-middle {
    width: 45px;
    height: 45px;
    display: block;
    border-radius: 50%;
    overflow: hidden;
    margin: 0;
    img {
      max-width: 100%;
    }
  }
}
.post-content {
  padding-top: 18px;
  .post-desc {
    padding-bottom: 16px;
  }
  .post-thumb-gallery {
    border-radius: 5px;
    overflow: hidden;
    figure {
      margin: 0;
      img {
        width: 100%;
        max-width: 500px;
      }
    }
  }
  .post-meta {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0 12px;
    margin-top: 20px;
    border-top: 1px solid #ced0d4;
    border-bottom: 1px solid #ced0d4;
    button {
      border: none;
      outline: none;
      padding: 10px;
      border-radius: 10px;

      box-shadow: none;
      transition: 0.4s;
      span {
        color: #666666;
        padding-left: 8px;
      }
    }
    button:hover {
      background-color: #eee;
    }
    ul {
      margin-left: auto;
      margin-bottom: 0;
      li:first-child {
        margin-left: 0;
      }
      li {
        list-style: none;
        display: inline-block;
        margin-left: 24px;
        svg {
          font-size: 20px;
          color: #333333;
          vertical-align: middle;
        }
      }
    }
  }
}
.comments {
  margin-top: 25px;
  ul {
    list-style: none;
    padding-left: 0;
    li {
      border: solid 1px #eee;
      margin-bottom: 10px;
      border-radius: 10px;
      padding: 10px;
    }
  }
}
.likeBtn {
  color: #a29bfe;
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
      border-radius: 30px;
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
    button:active {
      transform: translateY(2px);
    }
  }
}

.btn-outline-danger {
  position: absolute;
  right: 10px;
  top: 10px;
  border: none;
}
</style>
