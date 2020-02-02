<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>Twitter Search Query Builder</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon :href="searchUrl" target="_blank">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-container fluid class="pa-12">
        <v-row dense>
          <v-col cols="12">
            <v-card>
              <v-card-title>Users</v-card-title>
              <v-card-subtitle>You can speficy users.</v-card-subtitle>
              <div class="d-flex flex-column pa-4">
                <v-text-field
                  label="From"
                  prepend-icon="mdi-account"
                  :value="from"
                  @change="setFrom"
                />
                <v-text-field
                  label="To"
                  prepend-icon="mdi-account"
                  :value="to"
                  @change="setTo"
                />
              </div>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card>
              <v-card-title>Since</v-card-title>
              <v-card-subtitle>You can speficy since date.</v-card-subtitle>
              <v-card-actions>
                <v-spacer />
                <v-btn icon @click="setUseSince(!useSince)">
                  <v-icon>{{ useSince ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>
              </v-card-actions>
              <v-expand-transition>
                <div v-show="useSince" class="pa-4">
                  <v-divider class="mb-4" />
                  <v-date-picker
                    prepend-icon="mdi-calendar"
                    :value="since"
                    @change="setSince"
                  />
                </div>
              </v-expand-transition>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card>
              <v-card-title>Until</v-card-title>
              <v-card-subtitle>You can speficy until date.</v-card-subtitle>
              <v-card-actions>
                <v-spacer />
                <v-btn icon @click="setUseUntil(!useUntil)">
                  <v-icon>{{ useUntil ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>
              </v-card-actions>
              <v-expand-transition>
                <div v-show="useUntil" class="pa-4">
                  <v-divider class="mb-4" />
                  <v-date-picker
                    prepend-icon="mdi-calendar"
                    :value="until"
                    @change="setUntil"
                  />
                </div>
              </v-expand-transition>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card>
              <v-card-title>Filters</v-card-title>
              <v-card-subtitle>You can specify filters.</v-card-subtitle>
              <v-card-actions>
                <v-spacer />
                <v-btn icon @click="setUseFilter(!useFilter)">
                  <v-icon>{{ useFilter ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>
              </v-card-actions>
              <v-expand-transition>
                <div v-show="useFilter" class="pa-4">
                  <v-divider class="mb-4" />
                  <div class="d-flex flex-column">
                    <v-checkbox
                      label="Filter Images"
                      prepend-icon="mdi-image"
                      :value="filter.images"
                      @change="setFilterImages"
                    />
                    <v-checkbox
                      label="Filter Videos"
                      prepend-icon="mdi-video"
                      :value="filter.videos"
                      @change="setFilterVideos"
                    />
                    <v-checkbox
                      label="Filter News"
                      prepend-icon="mdi-newspaper"
                      :value="filter.news"
                      @change="setFilterNews"
                    />
                    <v-checkbox
                      label="Filter Replies"
                      prepend-icon="mdi-reply"
                      :value="filter.replies"
                      @change="setFilterReplies"
                    />
                    <v-checkbox
                      label="Filter Retweets"
                      prepend-icon="mdi-twitter-retweet"
                      :value="filter.nativeretweets"
                      @change="setFilterNativeRetweets"
                    />
                    <v-checkbox
                      label="Filter Links"
                      prepend-icon="mdi-link-variant"
                      :value="filter.links"
                      @change="setFilterLinks"
                    />
                    <v-checkbox
                      label="Filter Verified"
                      prepend-icon="mdi-check-circle-outline"
                      :value="filter.verified"
                      @change="setFilterVerified"
                    />
                    <v-checkbox
                      label="Filter Hashtags"
                      prepend-icon="mdi-music-accidental-sharp"
                      :value="filter.hashtags"
                      @change="setFilterHashTags"
                    />
                  </div>
                </div>
              </v-expand-transition>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card dark>
              <v-card-title>Generated Search Query</v-card-title>
              <v-card-subtitle>You can copy or search directly on Twitter.</v-card-subtitle>
              <div class="d-flex flex-column pa-4">
                <v-text-field
                  readonly
                  label="Search Query"
                  prepend-icon="mdi-twitter"
                  :value="searchText"
                />
              </div>
              <v-divider />
              <v-card-actions>
                <v-spacer />
                <v-btn text :href="searchUrl" target="_blank">Search on Twitter</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import { queryMapper } from '~/store/modules/query';

export default Vue.extend({
  computed: {
    ...queryMapper.mapGetters([
      'useSince',
      'useUntil',
      'useFilter',
      'from',
      'to',
      'since',
      'until',
      'filter',
      'query'
    ]),
    searchText(): string {
      return this.query.join(' ');
    },
    searchUrl(): string {
      return `https://twitter.com/search?q=${this.searchText}`;
    }
  },
  methods: {
    ...queryMapper.mapActions([
      'setUseSince',
      'setUseUntil',
      'setUseFilter',
      'setFrom',
      'setTo',
      'setSince',
      'setUntil',
      'setFilterImages',
      'setFilterVideos',
      'setFilterNews',
      'setFilterReplies',
      'setFilterNativeRetweets',
      'setFilterLinks',
      'setFilterVerified',
      'setFilterHashTags'
    ])
  }
});
</script>
