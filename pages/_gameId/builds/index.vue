<template>
  <b-container>
    <b-row>
      <b-col md="12">
        <div class="text-center mt-3">
          <h1>Builds</h1>
          <p>Click on one of the builds below to navigate to it</p>
        </div>
        <nuxt-link
          class="custom-link"
          v-if="$store.getters.getIsLoggedin"
          :to="$route.fullPath +'/createBuild'"
        >
          <b-card class="mb-4 custom-hover">
            <h3>
              <font-awesome-icon :icon="['far', 'plus-square']"/>Create Build
            </h3>
          </b-card>
        </nuxt-link>
        <b-row>
          <b-col md="12" class="mb-4 custom-hover" v-for="(build, index) in builds" :key="index">
            <nuxt-link class="custom-link" :to="$route.fullPath +'/' + build.build_id">
              <b-card :title="build.build_description" :sub-title="'By: ' + build.username">
                <b-row>
                  <b-col md="2">
                    <font-awesome-icon :icon="['far', 'eye']"/>
                    Views: {{ build.views }}
                  </b-col>
                  <b-col md="2">
                    <font-awesome-icon :icon="['far', 'thumbs-up']"/>
                    Likes: {{ build.up_vote }}
                  </b-col>
                  <b-col md="2">
                    <font-awesome-icon :icon="['far', 'thumbs-down']"/>
                    Dislikes: {{ build.down_vote }}
                  </b-col>
                  <b-col md="6">
                    <span
                      class="float-right"
                    >Date Created: {{ new Date(build.date_posted) | moment("dddd, MMMM Do YYYY, h:mm:ss a") }}</span>
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
    };
    return context.app.$axios
      .$get("http://127.0.0.1:5000/builds", {
        params: params
      })
      .then(response => {
        console.log(response);
        return {
          builds: response.builds
        };
      })
      .catch(error => console.log(error));
  }
};
</script>

<style scoped>
.custom-link {
  text-decoration: none !important;
}
</style>
