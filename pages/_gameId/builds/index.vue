<template>
  <b-container>
    <b-row>
      <b-col md="12">
        <div class="text-center mt-3">
          <h1>Builds</h1>
          <p>Click on one of the builds below to navigate to it</p>
        </div>
        <b-row>
          <b-col md="12" class="mb-4">
            <nuxt-link :to="$route.fullPath + '/createBuild'">
              <b-card>
                <b-card-body>Create a Forum Post</b-card-body>
              </b-card>
            </nuxt-link>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12" class="mb-4" v-for="(build, index) in builds" :key="index">
            <nuxt-link :to="$route.fullPath + '/' + build.build_id">
              <b-card>
                <b-card-body>{{ build.build_description }}</b-card-body>
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
      .$get("http://127.0.0.1:5000/builds", { 
        params: params
      })
      .then(response => {
        console.log(response)
        return {
          builds: response.builds
        }
      })
      .catch(error => console.log(error));
  },
}
</script>
