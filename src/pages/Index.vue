/* eslint-disable @typescript-eslint/restrict-template-expressions */ /*
eslint-disable @typescript-eslint/no-unsafe-member-access */
<template>
  <q-page class="column items-center justify-evenly">
    <h2 class="text-center" style="font-family: 'Megrim', cursive">
      🫂
      <br /><br />
      Welcome to Philoxenia, the P2P Space Exchange
    </h2>
    <q-btn
      align="around"
      class="btn-fixed-width"
      color="purple-5"
      label="Learn more"
      icon="lightbulb_outline"
      to="/about"
    />
    <div class="q-pa-md">
      <q-table
        grid
        card-class="text-black"
        title="Latest spaces added 🏠"
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
            placeholder="Search"
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
@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Megrim&family=Pacifico&display=swap');
</style>
