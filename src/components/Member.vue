<template>
  <div class="member">
    <router-link :to="{
        name:'profile',
        params:{id:userID}
      }">
      <img src="@/assets/user.png" alt="user image" v-if="!pic" />
      <img :src="pic" alt="user image" v-if="pic" />
    </router-link>

    <div class="info">
      <router-link :to="{
        name:'profile',
        params:{id:userID}
      }">{{first_name + ' ' + last_name}}</router-link>
      <!-- <p>2 hours ago</p> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "Member",
  props: ["first_name", "last_name", "pic", "userID"],
};
</script>

<style lang="scss" scoped>
.member {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .info {
    margin-left: 15px;
    line-height: 1.5;
    a {
      color: rgb(255 255 255 / 70%);
      text-decoration: none;
    }
    p {
      font-weight: 500;
      margin-bottom: 0 !important;
    }
    p:nth-child(2) {
      font-size: 10px;
      opacity: 60%;
    }
  }
}
</style>