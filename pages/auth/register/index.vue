<template>
  <b-container>
    <b-row>
      <b-col md="6" class="mt-4 offset-3">
        <b-card title="Register">
          <b-form @submit.prevent="onSubmit">
            <b-form-group label="Email address:">
              <b-form-input
                type="email"
                v-model="user.email"
                required
                placeholder="Enter your email"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Your Username:">
              <b-form-input
                type="text"
                v-model="user.username"
                required
                placeholder="Enter a username"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Password:">
              <b-form-input
                type="password"
                v-model="user.password"
                required
                placeholder="Enter password"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Confirm Password:">
              <b-form-input
                type="password"
                v-model="user.confirmPassword"
                required
                placeholder="Re-enter password"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="User Level (placeholder):">
              <b-form-input
                type="number"
                v-model="user.user_level"
                required
                placeholder="Enter user level"
              ></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary">Register</b-button>
            <b-button @click="$router.push('/auth/login')">Already got an account? Login!</b-button>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      user: {
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        user_level: 0
      }
    };
  },
  methods: {
    onSubmit() {
      if (this.user.password === this.user.confirmPassword) {
        this.$axios
          .$post("https://dfiltercapstone-buildabear-api.herokuapp.com/register", this.user)
          .then(response => {
            alert(response.message);
            if (response.user) {
              this.$store.commit("mutateUser", response.user);
              this.$store.commit("mutateIsLoggedin", true);
              this.$router.push("/");
            }
          })
          .catch(error => {
            console.log(error);
            alert("Could not create an account!");
          });
      } else {
        alert("Please make sure your passwords match!");
      }
    }
  }
};
</script>
