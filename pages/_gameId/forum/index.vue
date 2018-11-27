<template>
  <b-container>
    <b-row>
      <b-col md="12">
        <div class="text-center mt-3">
          <h1>Forum</h1>
          <p>Click on one of the forum posts below to navigate to it</p>
        </div>
        <b-row>
          <b-col md="12" class="mb-4">
            <nuxt-link :to="$route.fullPath + '/createForumPost'">
              <b-card>
                <b-card-body>Create a Forum Post</b-card-body>
              </b-card>
            </nuxt-link>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12" class="mb-4" v-for="(forum_post, index) in forum_posts" :key="index">
            <nuxt-link :to="$route.fullPath + '/' + forum_post.post_id">
              <b-card>
                <b-card-body>{{ forum_post.post_description }}</b-card-body>
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
