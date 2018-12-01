<template>
  <b-container>
    <b-row>
      <b-col md="6" class="mt-4 offset-3">
        <b-card title="Login">
          <b-form @submit.prevent="onSubmit">
            <b-form-group label="Email address:">
              <b-form-input
                type="email"
                v-model="login.email"
                required
                placeholder="Enter your email"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Password:">
              <b-form-input
                type="password"
                v-model="login.password"
                required
                placeholder="Enter password"
              ></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary">Login</b-button>
            <b-button type="button" @click="$router.push('/auth/register')">Register</b-button>
            <b-button type="button" @click="$router.push('/auth/passwordReset')">Forgot Password</b-button>
          </b-form>
          <p
            class="card-text mt-2"
          >Please note that login will only persist if page is not manually refreshed.</p>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      login: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    onSubmit() {
      if (this.login.email && this.login.password) {
        this.$axios
          .$post("https://dfiltercapstone-buildabear-api.herokuapp.com/login", this.login)
          .then(response => {
            console.log(response);
            if (response.user) {
              this.$store.commit("mutateUser", response.user);
              this.$store.commit("mutateIsLoggedin", true);
              this.$router.push("/");
            } else {
              alert(response.message);
            }
          })
          .catch(error => console.log(error));
      }
    }
  }
};
</script>
