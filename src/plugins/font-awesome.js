import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import {
  faInstagram,
  faTwitter,
  faFacebookSquare,
  faTelegram,
} from "@fortawesome/free-brands-svg-icons";

library.add(faInstagram, faFacebookSquare, faTwitter, faTelegram);

Vue.component('font-awesome-icon', FontAwesomeIcon);
