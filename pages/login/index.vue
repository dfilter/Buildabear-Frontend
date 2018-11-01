<template>
  <b-container>
    <b-row>
      <b-col md="4" offset-md="4" class="mt-5">
        <b-card
                no-body
                header-tag="header"
                footer-tag="footer">
            <h3 slot="header"
                class="mb-0 text-center">Login</h3>
            <b-card-body>
              <b-form>
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
                <b-button type="submit" variant="primary">Submit</b-button>
                <b-button href="/register">Create an Account</b-button>
              </b-form>
            </b-card-body>
            <em slot="footer"></em>
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
        email: "",
        password: ""
      }
    };
  }
};
</script>

