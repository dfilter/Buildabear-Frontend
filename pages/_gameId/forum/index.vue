<template>
  <b-container>
    <b-row>
      <b-col md="12">
        <div class="text-center mt-3">
          <h1>Forum</h1>
          <p>Click on one of the forum posts below to navigate to it</p>
        </div>
        <nuxt-link 
            class="custom-link"
            :to="$route.fullPath +'/createForumPost'">
          <b-card 
              class="mb-4">
            <h3><font-awesome-icon :icon="['far', 'plus-square']" /> Create Forum Post</h3>
          </b-card>
        </nuxt-link>
        <b-row>
          <b-col md="12" class="mb-4" 
              v-for="(forum_post, index) in forum_posts" 
              :key="index">
            <nuxt-link  
                class="custom-link"
                :to="$route.fullPath +'/' + forum_post.post_id">
              <b-card 
                  :title="forum_post.post_description"
                  :sub-title="'By: ' + forum_post.username">
                <b-row>
                  <b-col md="2">
                    <font-awesome-icon :icon="['far', 'eye']" /> Views: {{ forum_post.views }}
                  </b-col>
                  <b-col md="2">
                    <font-awesome-icon :icon="['far', 'thumbs-up']" /> Likes: {{ forum_post.up_vote }}
                  </b-col>
                  <b-col md="2">
                    <font-awesome-icon :icon="['far', 'thumbs-down']" /> Dislikes: {{ forum_post.down_vote }}
                  </b-col>
                  <b-col md="6">
                    <span class="float-right">Date Created: {{ new Date(forum_post.date_posted) | moment("dddd, MMMM Do YYYY, h:mm:ss a") }}</span>
                  </b-col>
                </b-row>
              </b-card>
            </nuxt-link>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  asyncData(context) {
    const params = {
      game_id: context.params.gameId,
      hours: 8766,
      order: null,
      desending: true
    }
    return context.app.$axios
      .$get("http://127.0.0.1:5000/forumPosts", { 
        params: params
      })
      .then(response => {
        return {
          forum_posts: response.forum_posts
        }
      })
      .catch(error => console.log(error));
  }
}
</script>

<style scoped>
.custom-link {
  text-decoration: none !important;
}
</style>
