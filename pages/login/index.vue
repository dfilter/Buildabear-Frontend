<template>
  <b-container>
    <b-row>
      <b-col md="6" class="mt-4 offset-3">
        <b-card title="Login">
          <p class="card-text">
            <b-form @submit="onSubmit">
            <b-form-group label="Email address:">
              <b-form-input
                  type="email"
                  v-model="login.email"
                  required
                  placeholder="Enter your email">
              </b-form-input>
            </b-form-group>
            <b-form-group label="Password:">
              <b-form-input 
                  type="password"
                  v-model="login.password"
                  required
                  placeholder="Enter password">
              </b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary">Login</b-button>
            <b-button type="button" href="/register">Don't Have an Account? Make one!</b-button>
          </b-form>
          </p>
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
      if (login.email && login.password)
        this.$axios
          .$post("http://127.0.0.1:5000/login", params)
          .then(response => {
            this.$store.commit("mutateUser", response.user)
            this.$store.commit('mutateIsLoggedin', response.isLoggedin)
            this.$router.push('/')
            alert(response.message)
          })
          .catch(error => console.log(error))
      this.$store.dispatch('actLogIn', this.login)
    }
  }
};
</script>
