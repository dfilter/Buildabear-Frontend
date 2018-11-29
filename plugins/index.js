import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { far, faThumbsUp, faThumbsDown, faEye, faPlusSquare, faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(far)
library.add(faEye)
library.add(faPlusSquare)
library.add(faThumbsUp)
library.add(faThumbsDown)
library.add(faTimesCircle)

Vue.use(require('vue-moment'))
Vue.component('font-awesome-icon', FontAwesomeIcon)
