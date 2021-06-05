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
              <input type="text" v-model.trim="$v.first_name.$model" class="form-control input_user" placeholder="First Name" :class="{ 'is-invalid': $v.first_name.$error }" />
            </div>
            <div class="input-group mb-3">
              <div class="input-group-append">
                <span class="input-group-text">
                  <i class="fas fa-user"></i>
                </span>
              </div>
              <input type="text" v-model.trim="$v.last_name.$model" class="form-control input_user" placeholder="Last Name" :class="{ 'is-invalid': $v.last_name.$error }" />
            </div>
            <div class="input-group mb-3">
              <div class="input-group-append">
                <span class="input-group-text">
                  <i class="fas fa-at"></i>
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
            <div class="d-flex justify-content-center mt-3 login_container">
              <button type="submit" name="button" class="btn login_btn" @click="submit">Sign Up</button>
            </div>
          </form>
        </div>

        <div class="mt-4">
          <div class="d-flex justify-content-center links">
            If you already have an account, just
            <router-link to="/login" class="ml-2">login.</router-link>
          </div>
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
  name: "Sign",
  data: function () {
    return {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      submitStatus: null,
    };
  },
  validations: {
    email: { required, email },
    password: { required },
    first_name: { required },
    last_name: { required },
  },
  methods: {
    resetData: function () {
      (this.email = ""),
        (this.password = ""),
        (this.first_name = ""),
        (this.last_name = "");
    },
    submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        axios
          .post("http://localhost:3000/signup", {
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            console.log(response);
            if (!response.data.email) {
              return Swal.fire({
                icon: "error",
                title: "this email already exist !",
                showConfirmButton: false,
                timer: 2000,
              });
            }
            Swal.fire({
              icon: "success",
              title: "Registration successfully completed!",
              showConfirmButton: false,
              timer: 2000,
            });
            this.$router.replace({ name: "login" });
          });
        // .catch((err) => {
        //   console.log(err);
        // });
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
  border-radius: 10px;
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
  color: #fff;
}
.login_btn:focus {
  box-shadow: none;
  outline: 0px;
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
.custom-checkbox .custom-control-input:checked ~ .custom-control-label::before {
  background-color: #c0392b !important;
}
</style>