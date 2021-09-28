/* eslint-disable @typescript-eslint/restrict-template-expressions */ /*
eslint-disable @typescript-eslint/no-unsafe-member-access */
<template>
  <q-page class="column items-center justify-evenly">
    <h2 v-if="!this.successfullSubmit" class="text-center">
     {{ $t('spaceOwner') }} <br /><br />
      🏠
    </h2>
    <div class="q-pa-md" style="max-width: 400px">
      <!-- 
        Show on success
      -->
      <div style="text-align: center; font-size: 32px;" v-if="this.successfullSubmit">
        <q-icon name="thumb_up_off_alt" />
        <p style="font-family: 'Ubuntu', sans-serif">{{ $t('successfulAddition') }}</p>
        <q-btn color="purple" :label="$t('addMore')" @click="this.successfullSubmit = false"/>
      </div>

      <!--
        Show on failue
      -->
      <div style="text-align: center; font-size: 32px;" v-if="this.unsuccessfullSubmit">
        <q-icon name="thumb_down_off_alt" />
        <p style="font-family: 'Ubuntu', sans-serif">{{ $t('somethingWentWrong') }}.</p>
        <q-btn color="purple" :label="$t('tryAgain')" @click="this.unsuccessfullSubmit = false"/>
      </div>

      <q-form v-if="!this.successfullSubmit" @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input
          filled
          v-model="name"
          :label="$t('yourName')"
          :hint="$t('yourNameHint')"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please enter your name!']"
        />

        <q-input
          filled
          type="number"
          v-model="age"
          :label="$t('yourAge')"
          :hint="$t('yourAgeHint')"
          lazy-rules
          :rules="[
            (val) => (val !== null && val !== '') || 'Please type your age!',
            (val) =>
              (val > 18 && val < 100) ||
              'You have to provide a real age and you have to be an adult.',
          ]"
        />

        <q-input
          filled
          v-model="telephone"
          :label="$t('yourMobileNumber')"
          :hint="$t('yourMobileNumberHint')"
          lazy-rules
          :rules="[
            (val) =>
              (val !== null && val !== '') ||
              'Please type your mobile number in international format.',
            (val) =>
              val.length != 12 ||
              'Please type a number in international format!',
          ]"
        />

        <q-input
          filled
          v-model="email"
          :hint="$t('emailHint')"
          input-class="text-right"
          label-slot
          clearable
        >
          <template v-slot:label>
            <div class="row items-center all-pointer-events">
              {{ $t('emailAddress') }}

              <q-tooltip
                class="bg-grey-8"
                anchor="top left"
                self="bottom left"
                :offset="[0, 8]"
                >{{ $t('spaceOwner') }}</q-tooltip
              >
            </div>
          </template>
        </q-input>

        <q-select
          standout
          v-model="spacetype"
          :options="space_options"
          :label="$t('spaceType')"
          :hint="$t('spaceTypeHint')"
        />

        <q-select
          standout
          v-model="region"
          :options="region_options"
          :label="$t('region')"
          :hint="$t('regionHint')"
        />

        <q-select
          standout
          v-model="pet"
          :options="pet_options"
          :label="$t('petFriendly')"
          :hint="$t('petFriendlyHint')"
        />

        <q-badge color="secondary"> {{ $t('maxVisitors') }} {{ visitorscount }} </q-badge>
        <q-slider
          v-model="visitorscount"
          color="purple"
          markers
          snap
          :min="1"
          :max="15"
        />

        <div class="q-pa-md">
          <q-date
            :subtitle="$t('availability')"
            v-model="timeperiod"
            range
            color="purple"
          />
        </div>

        <q-toggle v-model="accept" :label="$t('acceptConditions')" />

        <div>
          <q-btn :label="$t('addButton')" type="submit" color="purple" />
          <q-btn
            :label="$t('reset')"
            type="reset"
            color="purple"
            flat
            class="q-ml-sm"
          />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { useQuasar } from 'quasar';
import { ref } from 'vue';
import { api } from 'boot/axios';

export default {
  data() {
    return {
    }
  },
  methods () {
    return {
    }
  },
  setup() {

    var today = new Date();
    /* eslint-disable */ 
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();


    const $q = useQuasar();

    const unsuccessfullSubmit = ref(false)
    const successfullSubmit = ref(false)
    const name = ref(null);
    const age = ref(null);
    const accept = ref(false);
    const telephone = ref(null);
    const email = ref(null);
    const spacetype = ref(null);
    const region = ref(null);
    const pet = ref(null);
    const visitorscount = ref(1);
    const timeperiod = ref({ from: date.replace(/\//g, '-'), to: date.replace(/\//g, '-') });

    return {
      unsuccessfullSubmit,
      successfullSubmit,
      telephone,
      email,
      visitorscount,
      spacetype,
      space_options: [
        'Flat',
        'Condo',
        'Single-Family',
        'Cottage',
        'Villa',
        'Tiny Home',
        'Shared Space',
      ],
      region,
      region_options: [
        'Achaea',
        'Acarnania',
        'Arcadia',
        'Argolis',
        'Arta',
        'Athens',
        'Boeotia',
        'Chalkidiki',
        'Chania',
        'Chios',
        'Corfu',
        'Corinthia',
        'Cyclades',
        'Dodecanese',
        'Drama',
        'East Attica',
        'Elis',
        'Euboea',
        'Evros',
        'Evrytania',
        'Florina',
        'Heraklion',
        'Grevena',
        'Imathia',
        'Ioannina',
        'Kastoria',
        'Kavala',
        'Kefallinia',
        'Karditsa',
        'Kilkis',
        'Kozani',
        'Laconia',
        'Larissa',
        'Lasithi',
        'Lefkada',
        'Lesbos',
        'Magnesia',
        'Messenia',
        'Pella',
        'Phocis',
        'Phthiotis',
        'Pieria',
        'Piraeus',
        'Preveza',
        'Rethymno',
        'Rhodope',
        'Samos',
        'Serres',
        'Thesprotia',
        'Thessaloniki',
        'Trikala',
        'West Attica',
        'Xanthi',
        'Zakynthos',
      ],
      timeperiod,
      pet,
      pet_options: ['Yes', 'No'],
      name,
      age,
      accept,

      onSubmit() {
        if (accept.value !== true) {
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'You need to accept the license and terms first!',
          });
        } else {

          // Make request to offer
          /* eslint-disable */
          const spaceOffer = {
            owner: name.value,
            owner_age: age.value,
            telephone: telephone.value,
            email: email.value,
            type: spacetype.value,
            region: region.value,
            availability_start: timeperiod.value["from"],
            availability_end: timeperiod.value["to"],
            visitors_max: visitorscount.value,
            pet_friendly: pet.value
          }

          api.post('/api/v1/space/add', spaceOffer).then(response => {
            if (response.status == 200) {
              successfullSubmit.value = true;
            }else {
              unsuccessfullSubmit.value = true;
            }
          })
        }
      },

      onReset() {
        name.value = null;
        age.value = null;
        accept.value = false;
        telephone.value = null;
        email.value = null;
        spacetype.value = null;
        region.value = null;
        pet.value = null;
        visitorscount.value = null;
        timeperiod.value = null;
      },
    };
  },
};
</script>
