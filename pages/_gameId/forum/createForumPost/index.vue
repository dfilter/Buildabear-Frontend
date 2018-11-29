<template>
  <b-container>
    <b-row>
      <b-col md="12" class="mt-4">
        <b-card
            no-body
            header-tag="header">
          <h3 slot="header"
              class="mb-0 text-center">Create a Forum Post</h3>
          <b-card-body>
            <b-form @submit.prevent="onSubmit">
              <b-form-group
                  label="Post Title:">
                <b-form-input 
                    type="text"
                    v-model="forum_post.post_description"
                    required>
                </b-form-input>
              </b-form-group>
              <b-form-group
                  label="Post Text:">
                <b-form-textarea 
                    v-model="forum_post.post_text"
                    :rows="3"
                    :max-rows="6"
                    required>
                </b-form-textarea>
              </b-form-group>
              <b-button type="submit" variant="primary">Submit</b-button>
              <b-button @click="$router.push('/')">Cancel</b-button>
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
      forum_post: {
        post_description: '',
        post_text: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$axios
        .post('https://dfiltercapstone-buildabear-api.herokuapp.com/forumPost',  {
          ...this.forum_post,
          game_id: this.$store.getters.getGame.game_id,
          user_id: this.$store.getters.getUser.user_id
        })
        .then(response => {
          console.log(response)
        })
        .catch(error => console.log(error))
    }
  }
}
</script>
