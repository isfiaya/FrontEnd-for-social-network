<template>
  <div class="card animate__animated animate__fadeInUp">
    <div class="post-title d-flex align-items-center">
      <!-- profile picture end -->
      <div class="profile-thumb">
        <a href="#">
          <figure class="profile-thumb-middle">
            <img src="../assets/aymen.jpg" alt="profile picture" />
          </figure>
        </a>
      </div>
      <!-- profile picture end -->

      <div class="posted-author">
        <h6 class="author">
          <a href="profile.html">{{firstName + ' ' + lastName }}</a>
        </h6>
        <span class="post-time">20 min ago</span>
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
          <span>201</span>
          <span>Likes</span>
        </button>

        <button @click="toggleComment" class="post-comment">
          <i class="far fa-comment-alt"></i>
          <span>41</span>
          <span>commenter</span>
        </button>

        <button class="post-share">
          <i class="far fa-share-square"></i>
          <span>07</span>
          <span>Partager</span>
        </button>
      </div>

      <section class="comments" v-if="isShowComments">
        <ul class="comments-list">
          <li>
            <Comment />
          </li>
          <li>
            <Comment />
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
import Comment from "@/components/Comment.vue";
import axios from "axios";
export default {
  name: "Card",
  components: {
    Comment,
  },
  data: () => ({
    isShowComments: false,
    isLike: false,
  }),
  methods: {
    toggleComment() {
      this.isShowComments = this.isShowComments == false ? true : false;
    },
    likeClick() {
      this.isLike = this.isLike == false ? true : false;
    },

    submitClick() {
      this.likeClick();
      const id = localStorage.getItem("id");
      const userId = parseInt(id);
      axios
        .post("http://localhost:3000/home/like", {
          userId: userId,
          postId: this.postId,
        })
        .then((response) => {
          console.log(response.data);
        });
    },
  },
  props: ["desc", "img", "firstName", "lastName", "postId"],
};
</script>

<style lang="scss" scoped>
.card {
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
</style>
