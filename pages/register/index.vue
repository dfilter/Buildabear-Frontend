<template>
  <b-container>
    <b-row>
      <b-col md="12 mt-4">
        <b-form @submit="onSubmit">
        <b-form-group label="Email address:">
          <b-form-input
              type="email"
              v-model="user.email"
              required
              placeholder="Enter your email">
          </b-form-input>
        </b-form-group>
        <b-form-group label="Your Username:">
          <b-form-input 
              type="text"
              v-model="user.username"
              required
              placeholder="Enter a username">
          </b-form-input>
        </b-form-group>
        <b-form-group label="Password:">
          <b-form-input 
              type="password"
              v-model="user.password"
              required
              placeholder="Enter password">
          </b-form-input>
        </b-form-group>
        <b-form-group label="Confirm Password:">
          <b-form-input 
              type="password"
              v-model="user.confirmPassword"
              required
              placeholder="Re-enter password">
          </b-form-input>
        </b-form-group>
        <b-form-group label="User Level (placeholder):">
          <b-form-input 
              type="number"
              v-model="user.user_level"
              required
              placeholder="Enter user level">
          </b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
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
        this.$store.dispatch('actRegister', this.user)
          .then(() => {
            this.$router.push('/')
          })
      } else {
        alert('Please make sure your passwords match!')
      }
    }
  }
};
</script>
