/* eslint-disable @typescript-eslint/restrict-template-expressions */ /*
eslint-disable @typescript-eslint/no-unsafe-member-access */
<template>
  <q-page class="column items-center justify-evenly">
    <!--
      Show on failue
    -->
    <div
      style="text-align: center; font-size: 32px"
      v-if="this.unsuccessfullRequest"
    >
      <q-icon name="sentiment_dissatisfied" />
      <p style="font-family: 'Ubuntu', sans-serif">
        Something went wrong. Please try again.
      </p>
      <q-btn
        color="purple"
        label="Try again"
        @click="this.unsuccessfullRequest = false"
      />
    </div>

    <!--
      Show on No results
    -->
    <div style="text-align: center; font-size: 32px" v-if="this.noResultsFound">
      <q-icon name="sentiment_dissatisfied" />
      <p style="font-family: 'Ubuntu', sans-serif">
        No spaces found at this time. Try again later.
      </p>
    </div>

    <!--
      Show on fetched results
    -->
    <div v-if="this.resultsFound" class="q-pa-md">
      <q-table
        grid
        card-class="bg-primary text-white"
        title="🏠 Spaces Available"
        :rows="rows"
        :columns="columns"
        row-key="name"
        :filter="filter"
        hide-header
      >
        <template v-slot:top-right>
          <q-input
            borderless
            dense
            debounce="300"
            v-model="filter"
            placeholder="Search"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
      </q-table>
    </div>

    <!-- Main Page On Load -->

    <h2
      v-if="!this.unsuccessfullRequest && !this.resultsFound"
      class="text-center"
    >
      If you need a space, fill the form.<br /><br />
      💌
    </h2>
    <div
      v-if="!this.unsuccessfullRequest && !this.resultsFound"
      class="q-pa-md"
      style="max-width: 400px"
    >
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-select
          standout
          v-model="spacetype"
          :options="space_options"
          label="Space Type"
          hint="The type of space you're requesting."
        />

        <q-select
          standout
          v-model="region"
          :options="region_options"
          label="Region"
          hint="The region you're looking for a space."
        />

        <q-select
          standout
          v-model="pet"
          :options="pet_options"
          label="Pet Friendly"
          hint="If you require the space to be pet friendly."
        />

        <q-badge color="secondary">
          Sleeps (visitors): {{ visitorscount }}
        </q-badge>
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
          <q-btn label="Find" type="submit" color="purple" />
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
import { api } from 'boot/axios';


export default {
  setup() {
    const $q = useQuasar();

    const resultsFound = ref(true);
    const noResultsFound = ref(false);
    const unsuccessfullRequest = ref(false);
    const spacetype = ref(null);
    const region = ref(null);
    const pet = ref(null);
    const visitorscount = ref(1);
    const timeperiod = ref({ from: '2020/07/08', to: '2020/07/17' });
    const accept = ref(false);

    return {
      filter: ref(''),
      /* eslint-disable */
      columns: [
        { name: 'owner', label: 'Owner\'s Name', field: row => row.owner },
        { name: 'owner_age', label: 'Owner\'s Age', field: 'owner_age' },
        { name: 'type', label: 'Type of Place', field: 'type'},
        { name: 'region', label: 'Region', field: 'region' },
        { name: 'availability_start', label: 'Available From', field: 'availability_start' },
        { name: 'availability_end', label: 'Available To', field: 'availability_end' },
        { name: 'visitors_max', label: 'Maximum Number of Visitors', field: 'visitors_max' },
        { name: 'pet_friendly', label: 'Pets Allowed', field: 'pet_friendly' }
      ],
      rows: [], // for results
      resultsFound,
      noResultsFound,
      unsuccessfullRequest,
      timeperiod,
      pet,
      pet_options: ['Yes', 'No'],
      visitorscount,
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
          // Make request to offer
          /* eslint-disable */
          const spaceRequest = {
            type: spacetype.value,
            region: region.value,
            availability_start: timeperiod.value['from'],
            availability_end: timeperiod.value['to'],
            visitors_max: visitorscount.value,
            pet_friendly: pet.value,
          };

          api.post('/api/v1/space/request', spaceRequest).then((response) => {
            if (response.status == 200) {
              if (response.data['status'] == 'no_results') {
                noResultsFound.value = true;
              } else {
                resultsFound.value = true;
                this.rows = response.data;
              }
            } else {
              unsuccessfullRequest.value = true;
            }
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
