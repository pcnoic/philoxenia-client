/* eslint-disable @typescript-eslint/restrict-template-expressions */ /*
eslint-disable @typescript-eslint/no-unsafe-member-access */
<template>
  <q-page class="column items-center justify-evenly">
    <h2 class="text-center" style="font-family: 'Inter', sans-serif;">
      🫂
      <br /><br />
      {{ $t('welcomeMessage') }}
    </h2>
    <q-btn
      align="around"
      class="btn-fixed-width"
      color="purple-5"
      :label="$t('learnMore')"
      icon="lightbulb_outline"
      to="/about"
    />
    <div class="q-pa-md">
      <q-table
        grid
        card-class="text-black"
        :title="$t('latestSpacesAdded')"
        :rows="rows"
        :columns="columns"
        row-key="type"
        :filter="filter"
      >
        <template v-slot:top-right>
          <q-input
            borderless
            dense
            debounce="300"
            v-model="filter"
            :placeholder="$t('search')"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
      </q-table>
    </div>
  </q-page>
</template>
<script>
import { api } from 'boot/axios';

export default {
  data(){
    return { 
      filter: '',
      rows: [],
      columns: [
            /* eslint-disable */
            { name: 'type', label: 'Type', field: row => row.type},
            { name: 'region', label: 'Region', field: 'region'},
            { name: 'visitors_max', label: 'Max Visitors', field: 'visitors_max'},
            { name: 'pet_friendly', label: 'Pet Friendly', field: 'pet_friendly' },
            { name: 'availability_start', label: 'Available From', field: 'availability_start' },
            { name: 'availability_end', label: 'Available To', field: 'availability_end' }
      ]
    }
  },
  mounted() {
    /* eslint-disable */
    api.get('/api/v1/space/latest').then(response => {
            this.rows = response.data;
    })
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;500&display=swap');
</style>
