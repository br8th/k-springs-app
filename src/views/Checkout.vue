<template>
    <div class="checkout">

        <gmap-autocomplete
                class="px-8 z-50 big-desktop:h-16 w-full tab-port:w-1/4 checkout--autocomplete"
                style="height: 5.4rem"
                placeholder="Find Your Location..."
                :options="{ componentRestrictions: {country: 'ke'} }"
                @place_changed="setPlace">
        </gmap-autocomplete>

        <gmap-map
                :center="mapCenter"
                class="z-10 map"
                :zoom="14"
                :options="mapOptions">

            <gmap-marker
                    :position="mapCenter"
                    :clickable="true"
                    :draggable="true"
                    @dragend="onMarkerDragEnded"
                    @click=""/>
        </gmap-map>


        <div class="z-50 checkout--bottom-sheet h-24 w-full tab-port:w-1/4 flex justify-between p-6">
            <p>{{ model.location_name }}</p>
            <a class="btn btn--orange leading-none text-center justify-center items-center" href="#popup"
               style="display: flex" @click="getDeliveryFee">Select Location</a>
        </div>

        <div class="popup" id="popup">
            <div class="popup__content">
                <a href="#" class="popup__close">&times;</a>
                <h4 class="u-font-heading m-8 uppercase">Checkout</h4>

                <div class="form-group">
                    <input type="text" placeholder="Name" v-model="model.delivery_name">
                    <span class="invalid-feedback" v-if="form.errors.has('delivery_name')">
                        {{ form.errors.get('delivery_name') }}
                    </span>
                </div>

                <div class="form-group">
                    <input type="text" placeholder="Phone" v-model="model.delivery_phonenumber">
                    <span class="invalid-feedback" v-if="form.errors.has('delivery_phonenumber')">
                        {{ form.errors.get('delivery_phonenumber') }}
                    </span>
                </div>

                <h3>Ship To</h3>

                <div class="form-group">
                    <input type="text" :value="model.location_name" placeholder="Location Name" readonly>
                    <span class="invalid-feedback" v-if="form.errors.has('location_name')">
                        {{ form.errors.get('location_name') }}
                    </span>
                </div>

                <div class="form-group">
                    <input type="text" placeholder="Apartment, Suite, Hse Number, etc. (optional)"
                           v-model="model.description">
                    <span class="invalid-feedback" v-if="form.errors.has('description')">
                        {{ form.errors.get('description') }}
                    </span>
                </div>

                <h3>Order Details</h3>
                <table class="w-full text-left tableau mt-4">
                    <tr>
                        <td>{{ $store.getters['shop/cart'].length }} Items</td>
                        <td>KES {{ cartTotal }}</td>
                    </tr>
                    <tr>
                        <td>Delivery Cost</td>
                        <td>KES {{ model.delivery_fee }}</td>
                    </tr>
                    <tr>
                        <td>Total</td>
                        <td class="u-text-orange">KES {{ model.delivery_fee + cartTotal }}</td>
                    </tr>
                    <tr>
                        <td>Estimated Delivery Time: {{ model.waiting_time }}</td>
                    </tr>
                </table>


                <div class="btn btn--orange my-12 ld-ext-right" :class="{ 'running' : form.isPending }"
                     @click="placeOrder">
                    Confirm Order
                    <div class="ld ld-ring ld-spin-fast"></div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Checkout',
  mounted() {
    this.getDeliveryFee();
  },
  data() {
    const order_items = this.$store.getters['shop/cart'];

    return {
      mapCenter: {
        lat: -1.300336,
        lng: 36.783773,
      },
      mapOptions: {
        styles: [
          {
            featureType: 'administrative.locality',
            elementType: 'all',
            stylers: [{ hue: '#c79c60' }, { saturation: 7 }, { lightness: 19 }, { visibility: 'on' }],
          }, {
            featureType: 'landscape',
            elementType: 'all',
            stylers: [{ hue: '#ffffff' }, { saturation: -100 }, { lightness: 100 }, { visibility: 'simplified' }],
          }, {
            featureType: 'poi',
            elementType: 'all',
            stylers: [{ hue: '#ffffff' }, { saturation: -100 }, { lightness: 100 }, { visibility: 'off' }],
          }, {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{ hue: '#c79c60' }, { saturation: -52 }, { lightness: -10 }, { visibility: 'simplified' }],
          }, {
            featureType: 'road',
            elementType: 'labels',
            stylers: [{ hue: '#c79c60' }, { saturation: -93 }, { lightness: 31 }, { visibility: 'on' }],
          }, {
            featureType: 'road.arterial',
            elementType: 'labels',
            stylers: [{ hue: '#c79c60' }, { saturation: -93 }, { lightness: -2 }, { visibility: 'simplified' }],
          }, {
            featureType: 'road.local',
            elementType: 'geometry',
            stylers: [{ hue: '#c79c60' }, { saturation: -52 }, { lightness: -10 }, { visibility: 'simplified' }],
          }, {
            featureType: 'transit',
            elementType: 'all',
            stylers: [{ hue: '#c79c60' }, { saturation: 10 }, { lightness: 69 }, { visibility: 'on' }],
          }, {
            featureType: 'water',
            elementType: 'all',
            stylers: [{ hue: '#c79c60' }, { saturation: -78 }, { lightness: 67 }, { visibility: 'simplified' }],
          },
        ],
        mapTypeControl: false,
        streetViewControl: false,
      },
      model: {
        customer_id: null,
        order_items, // Array
        location_name: '',
        latitude: -1.300336,
        longitude: 36.783773,
        description: '',
        delivery_fee: 0,
        payment_method_id: 1, // TODO
        delivery_name: '',
        delivery_phonenumber: '',
        // delivery_name: 'Vincent Kyalo', delivery_phonenumber: '0704808226',
      },
      form: new Form(),
    };
  },
  computed: {
    ...mapGetters({
      cartTotal: 'shop/totalCartItems',
      cartAmount: 'shop/totalCartAmount',
    }),
  },
  methods: {
    onMarkerDragEnded(payload) {
      const lat = payload.latLng.lat();
      const long = payload.latLng.lng();

      this.model.latitude = lat;
      this.model.longitude = long;
    },

    setPlace(place) {
      this.model.location_name = place.name;

      const coordinates = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };

      this.model.latitude = coordinates.lat;
      this.model.longitude = coordinates.lng;

      this.mapCenter = coordinates;
    },

    getDeliveryFee() {
      const url = 'http://138.68.117.139:777/mobile/getdeliveryfee';

      const latlong = `${this.model.latitude},${this.model.longitude}`;
      const total = this.$store.getters['shop/totalCartItems'];
      const data = { latlong, total };

      axios.post(url, data)
        .then(({ data }) => {
          if (data.success) {
            this.model.delivery_fee = data.message;
            this.model.waiting_time = data.time;
          }
        })
        .catch((error) => {
          this.$notify({
            message: "Couldn't fetch delivery fee :(",
            type: 'danger',
          });
        });
    },

    placeOrder() {
      const url = '/api/orders';

      this.form.post(url, this.model)
        .then((response) => {
          this.$notify({
            message: 'Your Order Has Been recieved',
            type: 'success',
          });

          this.$store.dispatch('shop/clearCart');

          setTimeout(() => {
            this.$router.push({ name: 'shop-whiskey' });
          }, 2000);
        })
        .catch((errors) => {
          if (errors.response.status === 400) {
            if (errors.response.data.error) {
              this.form.errors.set(errors.response.data.error.message);
            }

            return;
          }

          this.$notify({
            message: 'Oops, something went wrong',
            type: 'danger',
          });
        });
    },
  },
};
</script>

<style scoped lang="scss">
    .map {
        height: 100vh;
        width: 100%;
    }

    .tableau td {
        padding: 4px;
    }
</style>
