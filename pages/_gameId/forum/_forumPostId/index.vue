<template>
  <b-container>
    <b-row>
      <b-col md="12" class="mb-4 mt-4">
        <b-card
            :title="forum_post.post_description">
          <div class="mb-4">
            <h6 class="card-subtitle mb-2 text-muted">Created by: {{ forum_post.username }}</h6>
            <b-button 
                size="sm" 
                type="button" 
                variant="success"
                :disabled="!isLoggedin"
                @click="subscribe(forum_post.author_id)"><font-awesome-icon :icon="['far', 'plus-square']" /> Subscribe</b-button>
            <b-button 
                size="sm" 
                type="button" 
                variant="success"
                :disabled="!isLoggedin"
                @click="like(forum_post.rating_id)"><font-awesome-icon :icon="['far', 'thumbs-up']" /> Like {{ forum_post.up_vote }}</b-button>
            <b-button 
                size="sm" 
                type="button" 
                variant="danger"
                :disabled="!isLoggedin"
                @click="dislike(forum_post.rating_id)"><font-awesome-icon :icon="['far', 'thumbs-down']" /> Dislike {{ forum_post.down_vote }}</b-button>
            <b-button 
                size="sm" 
                type="button" 
                variant="info" 
                disabled><font-awesome-icon :icon="['far', 'eye']" /> Views: {{ forum_post.views }}</b-button>
            <span class="float-right">Date Created: {{ new Date(forum_post.date_posted) | moment("dddd, MMMM Do YYYY, h:mm:ss a") }}</span>
            <hr>
          </div>
          <p class="card-text">{{ forum_post.post_text }}</p>
        </b-card>
        <b-card>
          <b-card-body>
            <b-form-input 
              v-model="newComment.user_id"
              placeholder="User ID (placeholder)">
            </b-form-input >
            <b-button @click="addComment(forum_post.post_id)">Add a Comment</b-button>
            <b-form-textarea 
              v-model="newComment.comment"
              :rows="3"
              :max-rows="6">
            </b-form-textarea>
            <b-card
                v-for="(comment, index) in forum_post.comments"
                :key="index"
                class="mt-3">
              <p class="card-text">{{ comment.comment }}</p>
              <div slot="footer">
                <nuxt-link class="mr-2" :to="'/profile/' + comment.user_id">By: {{ comment.username }}</nuxt-link>
                <b-link class="mr-2" @click="like(comment.rating_id)" :disabled="!isLoggedin">
                  <font-awesome-icon :icon="['far', 'thumbs-up']" /> Like {{ comment.up_vote }}
                </b-link>
                <b-link @click="dislike(comment.rating_id)" :disabled="!isLoggedin">
                  <font-awesome-icon :icon="['far', 'thumbs-down']" /> Dislike {{ comment.down_vote }}
                </b-link>
                <span class="float-right">Date Posted: {{ new Date(forum_post.date_posted) | moment("dddd, MMMM Do YYYY, h:mm:ss a") }}</span>
              </div>
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
      .$get("http://127.0.0.1:5000/forumPost", {
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
    },
    putRating(obj) {
      this.$axios
        .$put("http://127.0.0.1:5000/rating", obj)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    },
    like(rating_id, up_vote=1) {
      this.putRating({
        rating_id: rating_id,
        up_vote: up_vote,
        down_vote: null,
        view: null
      })
    },
    dislike(rating_id, down_vote=1) {
      this.putRating({
        rating_id: rating_id,
        up_vote: null,
        down_vote: down_vote,
        view: null
      })
    },
    subscribe(author_id) {
      this.$axios
        .$put("http://127.0.0.1:5000/subscription", {
          author_id: author_id,
          user_id: this.$store.getters.getUser.user_id
        })
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    },
  },
  computed: {
    isLoggedin() {
      return this.$store.getters.getIsLoggedin
    }
  }
};
</script>
