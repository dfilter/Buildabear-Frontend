<template>
  <b-container>
    <b-row>
      <b-col md="12" class="mt-4 mb-4">
        <b-card
            :title="'Welcome to ' + user_profile.username + '\'s profile'"
            :sub-title="'Subscribers: ' + user_profile.subscriber_count">
          <b-card-body>
            <p class="card-text">{{ user_profile.user_description }}</p>
            <b-card
                v-if="user_profile.user_subscriptions > 0"
                title="Subscriptions"
                :sub-title="'Total Subscriptions: ' + user_profile.user_subscriptions.length">
              <b-card-body>
                <table class="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Username</th>
                      <th>User Level</th>
                      <th>Subscriber Count</th>
                      <th v-if="$store.getters.getUser.user_id === user_profile.user_id">Unsubscribe</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(subscription, index) in user_profile.user_subscriptions" :key="index">
                      <td>{{ subscription.username }}</td>
                      <td>{{ subscription.user_level }}</td>
                      <td>{{ subscription.subscriber_count }}</td>
                      <td v-if="$store.getters.getUser.user_id === user_profile.user_id">
                        <b-button 
                            variant="danger" 
                            size="sm"
                            @click="unsubscribe(subscription.subscription_id, index)">
                          <font-awesome-icon :icon="['far', 'times-circle']" />
                        </b-button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </b-card-body>
            </b-card>
            <b-card
                :title="'Builds by ' + user_profile.username"
                :sub-title="'Total Builds: ' + user_profile.user_builds.length">
              <b-card-body>
                <div
                    v-for="(build, index) in user_profile.user_builds"
                    :key="index">
                  <div v-if="$store.getters.getUser.user_id === build.author_id">
                    <b-button 
                        variant="success" 
                        size="sm">Update</b-button>
                    <b-button 
                        variant="danger" 
                        size="sm"
                        @click="deleteBuild(build.build_id, build.rating_id)">Delete</b-button>
                  </div>
                  <nuxt-link class="custom-link"
                      :to="'/' + build.game_id + '/builds/' + build.build_id">
                    <b-card
                        :title="build.build_description">
                      <b-row>
                        <b-col md="2">
                          <font-awesome-icon :icon="['far', 'eye']" /> Views: {{ build.views }}
                        </b-col>
                        <b-col md="2">
                          <font-awesome-icon :icon="['far', 'thumbs-up']" /> Likes: {{ build.up_vote }}
                        </b-col>
                        <b-col md="2">
                          <font-awesome-icon :icon="['far', 'thumbs-down']" /> Dislikes: {{ build.down_vote }}
                        </b-col>
                        <b-col md="6">
                          <span class="float-right">Date Created: {{ new Date(build.date_posted) | moment("dddd, MMMM Do YYYY, h:mm:ss a") }}</span>
                        </b-col>
                      </b-row>
                    </b-card>
                  </nuxt-link>
                </div>
              </b-card-body>
            </b-card>
            <b-card
                :title="'Forum Posts by ' + user_profile.username"
                :sub-title="'Total Posts: ' + user_profile.forum_posts.length">
              <b-card-body>
                <div 
                    v-for="(forum_post, index) in user_profile.forum_posts"
                    :key="index">
                  <div v-if="$store.getters.getUser.user_id === forum_post.author_id">
                    <b-button 
                        variant="success" 
                        size="sm">Update</b-button>
                    <b-button 
                        variant="danger" 
                        size="sm"
                        @click="deletePost(forum_post.post_id, forum_post.rating_id)">Delete</b-button>
                  </div>
                  <nuxt-link class="custom-link"
                      :to="'/' + forum_post.game_id + '/forum/' + forum_post.post_id">
                    <b-card
                        :title="forum_post.post_description">
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
                </div>
              </b-card-body>
            </b-card>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  asyncData(context) {
    return context.app.$axios
      .$get("https://dfiltercapstone-buildabear-api.herokuapp.com/profile", {
        params: {
          user_id: context.params.userId,
          username: null,
          email: null
        }
      })
      .then(response => {
        console.log(response)
        if (response.user_profile) {
          return {
            user_profile: response.user_profile
          }
        }
        return
      })
      .catch(error => console.log(error));
  },
  methods: {
    deleteBuild(build_id, rating_id) {
      this.deleteMethod({
        build_id: build_id,
        rating_id: rating_id
      }, 'https://dfiltercapstone-buildabear-api.herokuapp.com/build')
    },
    deletePost(post_id, rating_id) {
      this.deleteMethod({
        post_id: post_id,
        rating_id: rating_id
      }, 'https://dfiltercapstone-buildabear-api.herokuapp.com/forumPost')
    },
    unsubscribe(subscription_id, index) {
      this.deleteMethod({
        subscription_id: subscription_id
      }, 'https://dfiltercapstone-buildabear-api.herokuapp.com/subscription')
      this.user_profile.user_subscriptions.splice(index, 1)
    },
    deleteMethod(params, url) {
      this.$axios
        .$delete(url, {
          params: params
        })
        .then(response => {
          console.log(response)
        })
        .catch(error => console.log(error));
    }
  }
}
</script>

<style scoped>
.custom-link {
  text-decoration: none !important;
}
</style>

