<template>
  <q-layout view="lHh Lpr lFf">
    <div class="q-pa-md">
      <q-toolbar class="bg-purple text-white shadow-2 rounded-borders">
        <q-btn
          to="/"
          flat
          style="font-family: 'Pacifico', cursive"
          label="🏡 Philoxenia"
        />
        <q-space />

        <!--
        notice shrink property since we are placing it
        as child of QToolbar
      -->
        <q-tabs v-model="tab" shrink>
          <q-route-tab
            to="/offer"
            style="font-family: 'Fredoka One', cursive"
            name="offer"
            label="Offer space"
          />
          <q-route-tab
            to="/request"
            style="font-family: 'Fredoka One', cursive"
            name="tab2"
            label="Request space"
          />
          <q-route-tab
            to="/about"
            style="font-family: 'Fredoka One', cursive"
            name="tab3"
            label="About"
          />
        </q-tabs>
        <q-select
          style="font-family: 'Fredoka One', cursive; min-width: 100px"
          v-model="locale"
          :options="localeOptions"
          dense
          borderless
          emit-value
          map-options
          options-dense
        />
      </q-toolbar>
    </div>
    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated>
      <q-toolbar class="bg-purple">
        <q-toolbar-title>
          {{ new Date().getFullYear() }} —
          <strong>Philoxenia - by Tynr.io</strong></q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script lang="ts">
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

export default {
  name: 'MainLayout',

  setup() {
    const { locale } = useI18n({ useScope: 'global' });
    return {
      tab: ref(''),

      locale,
      localeOptions: [
        { value: 'en-US', label: 'English 🇬🇧' },
        { value: 'gr', label: 'Greek 🇬🇷' },
        { value: 'ar', label: 'Arabic 🇸🇦' },
      ],
    };
  },
};
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Pacifico&display=swap');
</style>
