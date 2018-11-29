<template>
  <b-container>
    <b-row>
      <b-col md="6" class="mt-4 offset-3">
        <b-card title="Login">
          <b-form @submit.prevent="submitStep1" v-show="!enableStep2">
            <b-form-group label="Email address:">
              <b-form-input
                  type="email"
                  v-model="step1.email"
                  required
                  placeholder="Enter your email">
              </b-form-input>
            </b-form-group>
            <b-form-group label="Username:">
              <b-form-input 
                  type="text"
                  v-model="step1.username"
                  required
                  placeholder="Enter username">
              </b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary">Proceed</b-button>
          </b-form>
          <b-form @submit.prevent="submitStep2" v-show="enableStep2">
            <b-form-group label="Password:">
              <b-form-input
                  type="password"
                  v-model="step2.password"
                  required
                  placeholder="New password">
              </b-form-input>
            </b-form-group>
            <b-form-group label="Confirm Password:">
              <b-form-input 
                  type="password"
                  v-model="step2.confirm_password"
                  required
                  placeholder="Confirm password">
              </b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary">Reset Password</b-button>
          </b-form>
          <p class="card-text mt-2">Please note that login will only persist if page is not manually refreshed.</p>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      enableStep2: false,
      step1: {
        email: '',
        username: ''
      },
      step2: {
        password: '',
        confirm_password: ''
      }
    };
  },
  methods: {
    submitStep1() {
      if (this.step1.email && this.step1.username){
        this.$axios
          .$post("http://127.0.0.1:5000/checkuser", this.step1)
          .then(response => {
            console.log(response)
            alert(response.message)
            if (response.continue) {
              this.enableStep2 = true
            }
          })
          .catch(error => console.log(error))
      }
    },
    submitStep2() {
      if (this.step2.password === this.step2.confirm_password) {
        this.$axios
          .$post("http://127.0.0.1:5000/resetpassword", {
            password: this.step2.password,
            username: this.step1.username
          })
          .then(response => {
            console.log(response)
            if (response.continue) {
              this.$router.push('/login')
            }
            alert(response.message)
          })
          .catch(error => console.log(error))
      }
    }
  }
};
</script>
