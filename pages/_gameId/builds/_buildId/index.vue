<template>
  <b-container>
    <b-row>
      <b-col md="12" class="mb-4 mt-4">
        <b-card :title="build.build_description" :img-src="build.image_url">
          <div class="mb-4">
            <h6 class="card-subtitle mb-2 text-muted">Created by: {{ build.username }}</h6>
            <b-button
              size="sm"
              type="button"
              variant="success"
              :disabled="!isLoggedin || isSubscribed || isPostOwner"
              @click="subscribe(build.author_id)"
            >
              <font-awesome-icon :icon="['far', 'plus-square']"/>&nbsp;Subscribe
            </b-button>
            <b-button
              size="sm"
              type="button"
              variant="success"
              :disabled="!isLoggedin || isPostOwner"
              @click="like(build.rating_id)"
            >
              <font-awesome-icon :icon="['far', 'thumbs-up']"/>
              Like {{ build.up_vote }}
            </b-button>
            <b-button
              size="sm"
              type="button"
              variant="danger"
              :disabled="!isLoggedin || isPostOwner"
              @click="dislike(build.rating_id)"
            >
              <font-awesome-icon :icon="['far', 'thumbs-down']"/>
              Dislike {{ build.down_vote }}
            </b-button>
            <b-button size="sm" type="button" variant="info" disabled>
              <font-awesome-icon :icon="['far', 'eye']"/>
              Views: {{ build.views }}
            </b-button>
            <span
              class="float-right"
            >Date Created: {{ new Date(build.date_posted) | moment("dddd, MMMM Do YYYY, h:mm:ss a") }}</span>
            <hr>
          </div>
          <p class="card-text">{{ build.build_markup }}</p>
        </b-card>
        <b-card sub-title="User Comments">
          <b-card-body>
            <b-form
              v-if="$store.getters.getIsLoggedin"
              @submit.prevent="addComment(build.build_id)"
            >
              <b-button type="submit">Add a Comment</b-button>
              <b-form-textarea v-model="new_comment" :rows="3" :max-rows="6"></b-form-textarea>
            </b-form>
            <div v-for="(comment, index) in build.comments" :key="index" class="mt-3">
              <b-button 
                class="mt-3" 
                variant="danger" 
                @click="deleteComment(comment.comment_id, comment.rating_id, index)"
                v-if="isAdmin"
              >
                <font-awesome-icon :icon="['far', 'times-circle']"/>&nbsp;Delete Comment
              </b-button>
              <b-card>
                <p class="card-text">{{ comment.comment }}</p>
                <div slot="footer">
                  <nuxt-link
                    class="mr-2"
                    :to="'/profile/' + comment.user_id"
                  >By: {{ comment.username }}</nuxt-link>
                  <span v-if="$store.getters.getIsLoggedin">
                    <b-link class="mr-2" @click="like(comment.rating_id, index)">
                      <font-awesome-icon :icon="['far', 'thumbs-up']"/>
                      Like {{ comment.up_vote }}
                    </b-link>
                    <b-link @click="dislike(comment.rating_id, index)">
                      <font-awesome-icon :icon="['far', 'thumbs-down']"/>
                      Dislike {{ comment.down_vote }}
                    </b-link>
                  </span>
                  <span
                    class="float-right"
                  >Date Posted: {{ new Date(comment.date_posted) | moment("dddd, MMMM Do YYYY, h:mm:ss a") }}</span>
                </div>
              </b-card>
            </div>
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
      new_comment: "",
      reply_id: 0
    };
  },
  asyncData(context) {
    return context.app.$axios
      .$get("http://127.0.0.1:5000/build", {
        params: { build_id: context.params.buildId }
      })
      .then(response => {
        return {
          build: response.build
        };
      })
      .catch(error => console.log(error));
  },
  mounted() {
    this.putRating({
      rating_id: this.build.rating_id,
      up_vote: null,
      down_vote: null,
      view: 1
    });
  },
  methods: {
    addComment(build_id, reply_id = 0) {
      this.$axios
        .$post("http://127.0.0.1:5000/comment", {
          user_id: this.$store.getters.getUser.user_id,
          comment: this.new_comment,
          reply_id: reply_id,
          associated_id: build_id
        })
        .then(response => {
          console.log(response);
          this.build.comments.push(response.comment);
        })
        .catch(error => console.log(error));
    },
    putRating(obj) {
      this.$axios
        .$put("http://127.0.0.1:5000/rating", obj)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    },
    like(rating_id, index, up_vote = 1) {
      this.putRating({
        rating_id: rating_id,
        up_vote: up_vote,
        down_vote: null,
        view: null
      });
      this.build.comments[index].up_vote++;
    },
    dislike(rating_id, index, down_vote = 1) {
      this.putRating({
        rating_id: rating_id,
        up_vote: null,
        down_vote: down_vote,
        view: null
      });
      this.build.comments[index].down_vote++;
    },
    deleteComment(comment_id, rating_id, index) {
      this.$axios
        .$delete("http://127.0.0.1:5000/comment", {
          params: {
            comment_id: comment_id,
            rating_id: rating_id
          }
        })
        .then(response => {
          console.log(response);
          this.build.comments.splice(index, 1)
        })
        .catch(error => console.log(error));
    },
    subscribe(author_id) {
      this.$axios
        .$post("http://127.0.0.1:5000/subscription", {
          author_id: author_id,
          user_id: this.$store.getters.getUser.user_id
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  computed: {
    isAdmin() {
      return this.$store.getters.getUser.user_level > 0
    },
    isLoggedin() {
      return this.$store.getters.getIsLoggedin;
    },
    isSubscribed() {
      return this.$store.getters.getUser.subscriptions.includes(
        this.build.author_id
      );
    },
    isPostOwner() {
      return this.$store.getters.getUser.user_id == this.build.author_id;
    }
  }
};
</script>
