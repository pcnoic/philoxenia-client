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
  </q-page>
</template>
<script>
import { ref } from 'vue';

const columns = [
  {
    name: 'type',
    required: true,
    label: 'Type',
    align: 'left',
    field: 'type',
    sortable: true,
  },
  {
    name: 'location',
    align: 'center',
    label: 'Location',
    field: 'location',
    sortable: true,
  },
  { name: 'capacity', label: 'Capacity', field: 'capacity', sortable: true },
  { name: 'pets', label: 'Pet Friendly', field: 'pets' },
  { name: 'availability', label: 'Days Available', field: 'availability' }
];

const rows = [
  {
    type: 'Loft',
    location: 'Earth',
    capacity: 10,
    pets: 'Yes',
    availability: 10
  },
    {
    type: 'Loft',
    location: 'Earth',
    capacity: 10,
    pets: 'Yes',
    availability: 10
  },
    {
    type: 'Loft',
    location: 'Earth',
    capacity: 10,
    pets: 'Yes',
    availability: 10
  },
    {
    type: 'Loft',
    location: 'Earth',
    capacity: 10,
    pets: 'Yes',
    availability: 10
  }
];

export default {
  setup() {
    return {
      filter: ref(''),
      columns,
      rows,
    };
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Megrim&family=Pacifico&display=swap');
</style>
