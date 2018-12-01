<template>
  <b-container>
    <b-row>
      <b-col md="6" class="mt-4 offset-3">
        <b-card title="Update Profile">
          <b-form @submit.prevent="onSubmit">
            <div class="form-group">
              <b-button variant="danger" @click="deleteUser(user.user_id)">Delete account</b-button>
            </div>
            <b-form-group label="User Level:" v-if="isAdmin">
              <b-form-input
                type="number"
                min="0" 
                max="2"
                v-model="user.user_level"
                required
              ></b-form-input>
            </b-form-group>
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
            <b-form-group label="User Description:">
              <b-form-textarea
                type="text"
                v-model="user.user_description"
                required
                placeholder="Tell people about yourself"
                :rows="3"
                :max-rows="6"
              ></b-form-textarea>
            </b-form-group>
            <b-button type="submit" variant="success">Update</b-button>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  asyncData(context) {
    return context.app.$axios
      .$get("https://dfiltercapstone-buildabear-api.herokuapp.com/user", {
        params: {
          user_id: context.params.userId
        }
      })
      .then(response => {
        console.log(response);
        return {
          user: response.user
        };
      })
      .catch(error => console.log(error));
  },
  methods: {
    onSubmit() {
      this.$axios
        .$put("https://dfiltercapstone-buildabear-api.herokuapp.com/profile", this.user)
        .then(response => {
          console.log(response);
        })
        .catch(error => console.log(error));
    },
    deleteUser(user_id) {
      this.$axios
        .$delete("https://dfiltercapstone-buildabear-api.herokuapp.com/profile", {
          params: {
            user_id: user_id
          }
        })
        .then(response => {
          console.log(response);
          if (this.$store.getters.getUser.user_id === user_id) {
            this.$store.commit("mutateUser", {});
          }
          this.$router.push("/");
        })
        .catch(error => console.log(error));
    }
  },
  computed: {
    isAdmin() {
      return this.$store.getters.getUser.user_level > 1
    }
  }
};
</script>
