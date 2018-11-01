<template>
  <b-container>
    <b-row>
      <b-col md="12" class="mt-4">
        <h3 class="text-center">Create a Buildabear Account!</h3>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="4" offset-md="4" class="mt-1">
        <b-card
            no-body
            header-tag="header"
            footer-tag="footer">
          <h3 slot="header"
              class="mb-0 text-center">Register</h3>
          <b-card-body>
            <b-form>
              <b-form-group
                  label="Username:"
                  label-for="user-username">
                <b-form-input 
                    id="user-username"
                    type="text"
                    v-model="loginData.userName"
                    required
                    placeholder="Enter username">
                </b-form-input>
              </b-form-group>
              <b-form-group
                  label="Email address:"
                  label-for="user-email">
                <b-form-input 
                    id="user-email"
                    type="email"
                    v-model="loginData.email"
                    required
                    placeholder="Enter email">
                </b-form-input>
              </b-form-group>
              <b-form-group
                  label="Password:"
                  label-for="user-password">
                <b-form-input 
                    id="user-password"
                    type="password"
                    v-model="loginData.password"
                    required
                    placeholder="Enter password">
                </b-form-input>
              </b-form-group>
              <b-form-group
                  label="Confirm Password:"
                  label-for="user-confirm-password">
                <b-form-input 
                    id="user-confirm-password"
                    type="password"
                    v-model="loginData.confirmPassword"
                    required
                    placeholder="Re-enter password">
                </b-form-input>
              </b-form-group>
              <b-button type="submit" variant="primary">Submit</b-button>
              <b-button href="/">Cancel</b-button>
            </b-form>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      loginData: {
        userName: "",
        email: "",
        password: "",
        confirmPassword: ""
      }
    };
  }
};
</script>

