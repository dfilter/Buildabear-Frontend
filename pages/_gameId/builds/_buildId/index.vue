<template>
  <b-container>
    <b-row>
      <b-col md="12" class="mb-4 mt-4">
        <b-card
            :title="build.build_description"
            :sub-title="'Created by: ' + build.username"
            :img-src="build.image_url">
          <b-card-body>
            <p>{{ build.build_markup }}</p>
          </b-card-body>
        </b-card>
        <b-card>
          <b-card-body>
            <b-form-input 
              v-model="newComment.user_id"
              placeholder="User ID (placeholder)">
            </b-form-input >
            <b-button @click="addComment(build.build_id)">Add a Comment</b-button>
            <b-form-textarea 
              v-model="newComment.comment"
              :rows="3"
              :max-rows="6">
            </b-form-textarea>
            <b-card
                v-for="(comment, index) in build.comments"
                :key="index"
                class="mt-3"
                :footer="comment.username + ' ' + comment.date_posted + ' ' +  comment.down_vote + ' ' + comment.up_vote">
              <p class="card-text">Card text</p>
            </b-card>
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
      newComment: {
        comment: "",
        user_id: "",
        reply_id: 0
      }
    };
  },
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
    addComment(post_id) {
      this.$axios
        .$post("http://127.0.0.1:5000/comment", {
          comment: this.newComment.comment,
          user_id: this.newComment.user_id,
          reply_id: this.newComment.reply_id,
          associated_id: post_id
        })
        .then(response => {
          console.log(response);
          return {
            forum_post: response.forum_post
          };
        })
        .catch(error => console.log(error));
    }
  }
};
</script>
