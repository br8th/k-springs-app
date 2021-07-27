import Vue from 'vue';
import * as VueGoogleMaps from 'vue2-google-maps';

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBxpiq5K09hvxwII9FCrLczTwNwyEade4c',
    libraries: 'places',
  },
});
