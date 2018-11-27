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
      getGames(state) {
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
      actLogIn(state, params) {
        this.$axios
          .$get("http://127.0.0.1:5000/login")
          .then(response => {
            state.commit("mutateUser", response.user);
            state.commit('mutateIsLoggedin', response.isLoggedin)
            alert(response.message)
          })
          .catch(error => console.log(error));
      },
      actRegister(state, params) {
        return this.$axios
          .$post('http://127.0.0.1:5000/register', params)
          .then(response => {
            alert(response.message)
            if (response.user) {
              state.commit('mutateUser', response.user)
            }
          })
          .catch(error => {
            console.log(error)
            alert('Could not create an account!')
          })
      }
    }
  });
}

export default store;
