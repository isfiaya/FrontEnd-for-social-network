<template>
  <div class="container">
    <div class="d-flex justify-content-center h-100">
      <div class="user_card">
        <div class="d-flex justify-content-center">
          <div class="brand_logo_container">
            <img src="@/assets/icon.png" class="brand_logo" alt="Logo" />
          </div>
        </div>
        <div class="d-flex justify-content-center form_container">
          <form method="post" v-on:submit.prevent="submit">
            <div class="input-group mb-3">
              <div class="input-group-append">
                <span class="input-group-text">
                  <i class="fas fa-user"></i>
                </span>
              </div>
              <input type="email" v-model.lazy="$v.email.$model" class="form-control input_user" placeholder="Email" :class="{ 'is-invalid': $v.email.$error }" />
            </div>
            <div class="input-group mb-2">
              <div class="input-group-append">
                <span class="input-group-text">
                  <i class="fas fa-key"></i>
                </span>
              </div>
              <input type="password" v-model.trim="$v.password.$model" class="form-control input_pass" placeholder="Password" :class="{ 'is-invalid': $v.password.$error }" />
            </div>
            <!-- <div class="form-group">
              <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="customControlInline" />
                <label class="custom-control-label" for="customControlInline">Remember me</label>
              </div>
            </div>-->
            <div class="d-flex justify-content-center mt-3 login_container">
              <button type="submit" name="button" class="btn login_btn" @click="submit">
                <router-link to="/login">Login</router-link>
              </button>
            </div>
          </form>
        </div>

        <div class="mt-4">
          <div class="d-flex justify-content-center links">
            Don't have an account?
            <router-link to="/signup" class="ml-2">Sign Up</router-link>
          </div>
          <!-- <div class="d-flex justify-content-center links">
            <a href="#">Forgot your password?</a>
          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { required, email } from "vuelidate/lib/validators";
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "Log",
  data: function () {
    return {
      email: "",
      password: "",
      submitStatus: null,
    };
  },
  validations: {
    email: { required, email },
    password: { required },
  },
  methods: {
    resetData: function () {
      (this.email = ""), (this.password = "");
    },
    submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        axios
          .post("http://localhost:3000/login", {
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            localStorage.setItem("first_name", response.data.first_name);
            localStorage.setItem("last_name", response.data.last_name);
            localStorage.setItem("email", response.data.email);
            localStorage.setItem("id", response.data.id);
            localStorage.setItem("jwt", response.data.token);
            this.$router.replace("/home");
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "email or password is incorrect!",
            });
          });
        // this.submitStatus = "PENDING";
        // setTimeout(() => {
        //   this.submitStatus = "OK";
        // }, 500);
        this.$v.$reset();
        // this.resetData();
      }
    },
  },
};
</script>



<style lang="scss" scoped>
.container {
  background: #fff;
  max-width: 100%;
  height: 100vh;
}
.user_card {
  height: 400px;
  width: 350px;
  margin-top: auto;
  margin-bottom: auto;
  background: #dfe6e9;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 5px;
}
.brand_logo_container {
  position: absolute;
  height: 170px;
  width: 170px;
  top: -75px;
  border-radius: 50%;
  padding: 10px;
  background: #fff;
  text-align: center;
}
.brand_logo {
  height: 150px;
  width: 150px;
  border-radius: 50%;
  border: 2px solid white;
}
.form_container {
  margin-top: 100px;
}
.input-group {
  input {
    width: 250px;
  }
}
.login_btn {
  width: 80%;
  background: $background;
  a {
    color: white !important;
    text-decoration: none;
  }
}
.login_btn:focus {
  box-shadow: none !important;
  outline: 0px !important;
}
.login_container {
  padding: 0 2rem;
}
.input-group-text {
  background: $Primary-Color;
  color: white;
  border: 0;
  border-radius: 0.25rem 0 0 0.25rem;
}
.input_user,
.input_pass:focus {
  box-shadow: none;
  outline: 0px;
}

.custom-control-label::after {
  border: 1px solid black;
  // background-color: #fff;
  border-radius: 4px;
}
.custom-checkbox .custom-control-input:checked ~ .custom-control-label::before {
  background-color: #c0392b !important;
}
</style>