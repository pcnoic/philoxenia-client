<template>
  <q-layout view="lHh Lpr lFf">
    <div class="q-pa-md">
      <q-toolbar class="bg-purple text-white shadow-2 rounded-borders">
        <q-btn
          to="/"
          flat
          style="font-family: 'Ubuntu', sans-serif"
          label="🏡 Philoxenia"
        />
        <q-space />

        <!--
        notice shrink property since we are placing it
        as child of QToolbar
      -->
        <q-tabs style="margin-right:50px" v-if="$q.platform.is.desktop" v-model="tab" shrink>
          <q-route-tab
            to="/offer"
            style="font-family: 'Ubuntu', sans-serif"
            name="offer"
            :label="$t('offerSpace')"
          />
          <q-route-tab
            to="/request"
            style="font-family: 'Ubuntu', sans-serif"
            name="tab2"
            :label="$t('requestSpace')"
          />
          <q-route-tab
            to="/about"
            style="font-family: 'Ubuntu', sans-serif"
            name="tab3"
            :label="$t('about')"
          />
        </q-tabs>
        <q-btn-dropdown
          v-if="$q.platform.is.mobile"
          style="font-family: 'Ubuntu', sans-serif"
          stretch
          flat
          borderless
          :label="$t('menu')"
        >
          <q-list>
            <q-tabs v-model="tab" shrink>
              <q-route-tab
                to="/offer"
                style="font-family: 'Ubuntu', sans-serif"
                name="offer"
                :label="$t('offerSpace')"
              />
              <q-route-tab
                to="/request"
                style="font-family: 'Ubuntu', sans-serif"
                name="tab2"
                :label="$t('requestSpace')"
              />
              <q-route-tab
                to="/about"
                style="font-family: 'Ubuntu', sans-serif"
                name="tab3"
                :label="$t('about')"
              />
            </q-tabs>
          </q-list>
        </q-btn-dropdown>
        <q-select
          style="font-family: 'Ubuntu', sans-serif; min-width: 50px"
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
          <strong>Philoxenia</strong></q-toolbar-title
        >
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

export default {
  name: 'MainLayout',

  setup() {
    const { locale } = useI18n({ useScope: 'global' });
    return {
      tab: ref(''),

      locale,
      localeOptions: [
        { value: 'en-US', label: 'English' },
        { value: 'el', label: 'Greek' },
        { value: 'ar', label: 'Arabic' },
      ],
    };
  },
};
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Pacifico&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@500&display=swap');
</style>
