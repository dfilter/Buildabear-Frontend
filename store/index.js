import Vuex from 'vuex';

const store = () => {
  return new Vuex.Store({
    state: () => ({
      games: [],
      game: {},
      forumPosts: [],
      user: {},
      isLoggedin: false,
    }),
    getters: {
      getGames(state) {
        return state.games
      },
      getGame(state) {
        return state.game
      },
      getForumPosts(state) {
        return state.forumPosts
      },
      getUser(state) {
        return state.user
      },
      getIsLoggedin(state) {
        return state.isLoggedin
      },
    },
    mutations: {
      mutateGames(state, games) {
        state.games = games
      },
      mutateGame(state, game) {
        state.game = game
      },
      mutateForumPosts(state, forumPosts) {
        state.forumPosts = forumPosts
      },
      mutateUser(state, user) {
        state.user = user
      },
      mutateIsLoggedin(state, isLoggedin) {
        state.isLoggedin = isLoggedin
      },
    },
    actions: {
      nuxtServerInit(vuexState, context) {
        return context.app.$axios
          .$get("http://127.0.0.1:5000/games")
          .then(response => {
            vuexState.commit('mutateGames', response.games)
          })
          .catch(error => console.log(error));
      }
    }
  });
}

export default store;
