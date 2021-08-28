/* eslint-disable @typescript-eslint/restrict-template-expressions */ /*
eslint-disable @typescript-eslint/no-unsafe-member-access */
<template>
  <q-page class="column items-center justify-evenly">
    <h2 class="text-center">
      If you are a space owner, fill the form. <br /><br />
      🏠
    </h2>
    <div class="q-pa-md" style="max-width: 400px">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input
          filled
          v-model="name"
          label="Your name *"
          hint="Name and surname:"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />

        <q-input
          filled
          type="number"
          v-model="age"
          label="Your age *"
          hint="Your age. Eg: 25"
          lazy-rules
          :rules="[
            (val) => (val !== null && val !== '') || 'Please type your age',
            (val) =>
              (val > 18 && val < 100) ||
              'You have to be an adult to submit your place',
          ]"
        />

        <q-input
          filled
          v-model="telephone"
          label="Your mobile number"
          hint="A mobile number to be contacted"
          lazy-rules
          :rules="[
            (val) =>
              (val !== null && val !== '') ||
              'Please type your mobile number in international format.',
            (val) =>
              val.length != 12 ||
              'Please type a number in international format',
          ]"
        />

        <q-input
          filled
          v-model="email"
          hint="An email address to be contacted"
          input-class="text-right"
          label-slot
          clearable
        >
          <template v-slot:label>
            <div class="row items-center all-pointer-events">
              <q-icon
                class="q-mr-xs"
                color="deep-orange"
                size="24px"
                name="mail"
              />
              Email

              <q-tooltip
                class="bg-grey-8"
                anchor="top left"
                self="bottom left"
                :offset="[0, 8]"
                >Email address</q-tooltip
              >
            </div>
          </template>
        </q-input>

        <q-select
          standout
          v-model="spacetype"
          :options="space_options"
          label="Space Type"
          hint="The type of space you're offering"
        />

        <q-select
          standout
          v-model="region"
          :options="region_options"
          label="Region"
          hint="The region of the space"
        />

        <q-select
          standout
          v-model="pet"
          :options="pet_options"
          label="Pet Friendly"
          hint="If you accept pets in your offered space"
        />

        <q-badge color="secondary"> Max visitors: {{ visitorscount }} </q-badge>
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
            subtitle="Availability"
            v-model="timeperiod"
            range
            color="purple"
          />
        </div>

        <q-toggle v-model="accept" label="I accept the conditions." />

        <div>
          <q-btn label="Submit" type="submit" color="purple" />
          <q-btn
            label="Reset"
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
import { api } from 'boot/axios'

export default {
  setup() {
    const $q = useQuasar();

    const name = ref(null);
    const age = ref(null);
    const accept = ref(false);
    const telephone = ref(null);
    const email = ref(null);
    const spacetype = ref(null);
    const region = ref(null);
    const pet = ref(null);
    const visitorscount = ref(null);
    const timeperiod = ref(null);

    return {
      telephone,
      email,
      visitorscount: ref(1),
      spacetype: ref(null),
      space_options: [
        'Flat',
        'Condo',
        'Single-Family',
        'Cottage',
        'Villa',
        'Tiny Home',
        'Shared Space',
      ],
      region: ref(null),
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
      timeperiod: ref({ from: '2020/07/08', to: '2020/07/17' }),
      pet: ref(null),
      pet_options: ['Yes', 'No', 'More information required'],
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
            type: spacetype.value,
            region: region.value,
            availability_start: timeperiod.value,
            availability_end: timeperiod.value,
            visitors_max: visitorscount.value,
            pet_friendly: pet.value
          }

          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Your space has been added to Philoxenia!',
          });
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
