<template>
  <b-container>
    <b-row>
      <b-col md="12" class="mt-4">
        <b-card title="Update Forum Post" :sub-title="'By: ' + forum_post.username">
          <b-form @submit.prevent="onSubmit" v-if="isAdmin || isUsersPost">
            <div class="form-group">
              <b-button variant="danger" @click="deletePost()">Delete Post</b-button>
            </div>
            <b-form-group label="Post Title">
              <b-form-input
                type="text"
                v-model="forum_post.post_description"
                required
                placeholder="Enter forum post's title"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Post Description:">
              <b-form-textarea
                v-model="forum_post.post_text"
                required
                placeholder="Enter forum post's description"
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
      .$get("https://dfiltercapstone-buildabear-api.herokuapp.com/forumPost", {
        params: { post_id: context.params.forumPostId }
      })
      .then(response => {
        console.log(response);
        return {
          forum_post: response.forum_post
        };
      })
      .catch(error => console.log(error));
  },
  methods: {
    onSubmit() {
      this.$axios
        .$put("https://dfiltercapstone-buildabear-api.herokuapp.com/forumPost", this.forum_post)
        .then(response => {
          console.log(response);
          this.$router.push('/' + this.forum_post.game_id + '/forum/' + this.forum_post.post_id)
        })
        .catch(error => console.log(error));
    },
    deletePost() {
      this.$axios
        .$delete("https://dfiltercapstone-buildabear-api.herokuapp.com/forumPost", {
          params: {
            post_id: this.forum_post.post_id,
            rating_id: this.forum_post.rating_id
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
    isUsersPost() {
      return this.$store.getters.getUser.user_id === this.forum_post.author_id;
    }
  }
}
</script>
