<template>
  <div class="wrap style">
    <div class="header">
      <img src="@/assets/icon-1.png" class="logo-side" alt="logo" />
      <p>Groupmonia</p>
      <p>Socail Network</p>
      <div class="card">
        <div class="info">
          <img src="@/assets/user.png" alt="profile" />
          <p>{{first_name + ` ` + last_name}}</p>
          <p>Member</p>
        </div>
        <div class="connection">
          <ul>
            <li>
              1
              <span>Friends</span>
            </li>
            <li>
              4
              <span>Groups</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="items">
        <ul>
          <li>
            <i class="fas fa-home"></i>Activity
          </li>
          <li>
            <i class="fas fa-image"></i>
            Photos
          </li>
          <li>
            <i class="fas fa-play"></i>
            Watch
          </li>
          <li>
            <i class="fas fa-user"></i>
            People
          </li>
          <li>
            <i class="fas fa-user-friends"></i>
            Groups
          </li>
          <li>
            <i class="fas fa-users"></i>
            Pages
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "SideLeft",
  data: function () {
    return {
      first_name: "",
      last_name: "",
    };
  },
  created: function () {
    this.first_name = localStorage.getItem("first_name");
    this.last_name = localStorage.getItem("last_name");
  },
};
</script>



<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.wrap {
  overflow: auto;
  height: 100vh;
  background-color: #f8f9fb;
}
.style::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background: transparent;
}
.style::-webkit-scrollbar {
  width: 12px;
  background: transparent;
}
.style::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #555;
}
.header {
  background-color: #383a45;
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
  background-image: linear-gradient(135deg, #4f5261 0%, #383a45 50%);
  img {
    width: 50px;
    height: auto;
    max-height: 105px;
    margin-bottom: 5px;
  }
  p {
    color: #fff;
    margin-bottom: 0px !important;
  }
  p:nth-child(3) {
    font-size: small;
    opacity: 70%;
  }
}
.main {
  height: 100vh;
  text-align: center;
  padding: 50px;
  .items {
    height: 100%;
    margin-top: 150px;
    ul {
      display: flex;
      flex-wrap: wrap;
      list-style: none;
      padding-left: 0;
      li {
        width: 150px;
        max-width: 50%;
        margin-bottom: 50px;
        display: flex;
        flex-direction: column;
        opacity: 80%;
        i {
          margin-bottom: 10px;
        }
      }
    }
  }
}

.card {
  width: 250px;
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 25px 40px 25px 40px;
  border-radius: 12px;
  margin-top: 30px;
  box-shadow: 0 15px 100px rgb(58 46 68 / 6%);
  position: relative;
  img {
    border-radius: 50%;
    height: auto;
    box-shadow: 0 7px 35px rgb(58 46 68 / 10%);
    padding: 2px;
    border: 2px solid #eee;
  }
  p {
    color: black;
  }
  p:nth-child(3) {
    opacity: 50%;
  }
  .connection {
    margin-top: 20px;
    padding-top: 20px;
    border-top: #eee solid 2px;
    ul {
      display: flex;
      list-style: none;
      justify-content: space-around;
      padding-left: 0px;
      li {
        display: flex;
        flex-direction: column;
        span {
          opacity: 50%;
        }
      }
    }
  }
}
.card::before {
  content: "";
  padding: 10px;
  background-color: #464855;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  position: absolute;
  width: 70%;
  bottom: -22px;
}
</style>