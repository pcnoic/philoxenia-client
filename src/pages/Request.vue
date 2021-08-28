/* eslint-disable @typescript-eslint/restrict-template-expressions */ /*
eslint-disable @typescript-eslint/no-unsafe-member-access */
<template>
  <q-page class="column items-center justify-evenly">
    <h2 class="text-center">
      If you need a space, fill the form.<br /><br />
      💌
    </h2>
    <div class="q-pa-md" style="max-width: 400px">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
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

        <q-toggle v-model="accept" label="I accept the conditions" />

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

export default {
  setup() {
    const $q = useQuasar();

    const spacetype = ref(null);
    const region = ref(null);
    const pet = ref(null);
    const visitorscount = ref(null);
    const timeperiod = ref(null);
    const accept = ref(false);

    return {
      timeperiod: ref({ from: '2020/07/08', to: '2020/07/17' }),
      pet: ref(null),
      pet_options: ['Yes', 'No', 'More information required'],
      visitorscount: ref(1),
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
      accept,

      onSubmit() {
        if (accept.value !== true) {
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'You need to accept the license and terms first',
          });
        } else {
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Submitted',
          });
        }
      },

      onReset() {
        spacetype.value = null;
        region.value = null;
        pet.value = null;
        visitorscount.value = null;
        timeperiod.value = null;

        accept.value = false;
      },
    };
  },
};
</script>
