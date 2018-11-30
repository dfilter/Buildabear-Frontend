<template>
  <b-container>
    <b-row>
      <b-col md="12" class="mt-4">
        <b-card title="Update Build">
          <b-form @submit.prevent="onSubmit" v-if="isAdmin || isUsersBuild">
            <div class="form-group">
              <b-button variant="danger" @click="deleteBuild()">Delete build</b-button>
            </div>
            <b-form-group label="Build Banner:">
              <b-form-input
                type="text"
                v-model="build.image_url"
                required
                placeholder="Enter a image url"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Build Title">
              <b-form-input
                type="text"
                v-model="build.build_description"
                required
                placeholder="Enter build's title"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Build Description:">
              <b-form-textarea
                v-model="build.build_markup"
                required
                placeholder="Enter build's description"
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
      .$get("http://127.0.0.1:5000/build", {
        params: { build_id: context.params.buildId }
      })
      .then(response => {
        console.log(response);
        return {
          build: response.build
        };
      })
      .catch(error => console.log(error));
  },
  methods: {
    onSubmit() {
      this.$axios
        .$put("http://127.0.0.1:5000/build", this.build)
        .then(response => {
          console.log(response);
          this.$router.push('/' + this.build.game_id + '/builds/' + this.build.build_id)
        })
        .catch(error => console.log(error));
    },
    deleteBuild() {
      this.$axios
        .$delete("http://127.0.0.1:5000/build", {
          params: {
            build_id: this.build.build_id,
            rating_id: this.build.rating_id
          }
        })
        .then(response => {
          console.log(response);
          this.$router.push("/");
        })
        .catch(error => console.log(error));
    }
  },
  computed: {
    isAdmin() {
      return this.$store.getters.getUser.user_level > 1
    },
    isUsersBuild() {
      return this.$store.getters.getUser.user_id === this.build.author_id;
    }
  }
}
</script>
