<template>
  <v-dialog v-model="isDialog" width="800" persistent>
    <v-card>
      <v-card-title> {{ $t('HeuristicsTable.titles.currentHeuristics') }} </v-card-title>

      <v-divider />

      <v-row justify="center" class="ma-0">

        <!--Heuristics List-->
        <v-col class="ma-0 pa-0" cols="4">
          <v-list dense height="560px" class="pt-0" outlined>
            <v-list-item @click="dialogHeuristic = true">
              <v-list-item-icon>
                <v-icon>mdi-plus</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title style="color: #fca326">
                  <strong>{{ $t('HeuristicsTable.titles.addNewHeuristic') }}</strong>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider />

            <v-subheader>
              <v-text-field v-model="search" solo flat prepend-icon="mdi-magnify" color="orange" class="ml-2" hide-details
                dense>
                <template v-slot:label>
                  <span class="ml-2" style="font-size: 12px">{{ $t('HeuristicsTable.titles.searchHeuristics') }}</span>
                </template>'
              </v-text-field>
            </v-subheader>

            <v-divider />

            <v-list dense height="470px" class="list-scroll">
              <v-list-item-group v-model="itemSelect" color="#fca326">
                <template v-if="filteredHeuristics.length === 0">
                  <div class="text-center mt-16" style="color: #a7a7a7">
                    <h4>{{ $t('HeuristicsTable.titles.noHeuristicsFound') }}</h4>
                    <h5>{{ $t('HeuristicsTable.messages.youMustHave') }}</h5>
                    <v-icon>mdi-file-remove</v-icon>
                  </div>
                </template>

                <template v-else>
                  <v-list-item v-for="(item, i) in filteredHeuristics" :key="i" class="pb-0 pt-0" small @mouseenter="hoveredItem = i" @mouseleave="hoveredItem = null">
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ item.id + 1 }} - {{ item.title }}
                      </v-list-item-title>
                    </v-list-item-content>

                    <div style="display: flex;">
                      <v-list-item-action v-if="hoveredItem === i && i != itemSelect" style="margin: 0px !important; padding: 0px !important;">
                        <v-btn icon small :disabled="item.id == 0" @click.stop="moveItemUp(i)">
                          <v-icon x-small>mdi-arrow-up</v-icon>
                        </v-btn>

                        <v-btn icon small :disabled="i === filteredHeuristics.length - 1" @click.stop="moveItemDown(i)">
                          <v-icon x-small>mdi-arrow-down</v-icon>
                        </v-btn>
                      </v-list-item-action>
                    </div>

                    <v-list-item-icon v-if="i == itemSelect">
                      <v-icon>mdi-chevron-right</v-icon>
                    </v-list-item-icon>
                  </v-list-item>
                </template>
              </v-list-item-group>
            </v-list>
          </v-list>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    search: '',
    itemSelect: null,
    hoveredItem: null,
    dialogHeuristic: false,
  }),

  computed: {
    filteredHeuristics() {
      return this.data.testStructure || []
    }
  },

  props: {
    isDialog: {
      type: Boolean,
      default: () => true,
      required: true,
    },
    preview: {
      type: Boolean,
      required: true,
    },
    data: {
      type: Object,
      default: () => ({}),
      required: true,
    }
  },

  methods: {
    moveItemUp(index) {
      if (index > 0) {
        const itemToMove = this.filteredHeuristics[index]
        const itemAbove = this.filteredHeuristics[index - 1]

        this.filteredHeuristics[index] = itemAbove
        this.filteredHeuristics[index - 1] = itemToMove

        itemToMove.id = index - 1
        itemAbove.id = index

        this.heuristics[index] = itemAbove
        this.heuristics[index - 1] = itemToMove

        itemToMove.id = index - 1
        itemAbove.id = index
      }
    },

    moveItemDown(index) {
      if (index < this.filteredHeuristics.length - 1) {
        const itemToMove = this.filteredHeuristics[index]
        const itemBelow = this.filteredHeuristics[index + 1]

        this.filteredHeuristics[index] = itemBelow
        this.filteredHeuristics[index + 1] = itemToMove

        itemToMove.id = index + 1
        itemBelow.id = index

        this.heuristics[index] = itemBelow
        this.heuristics[index + 1] = itemToMove

        itemToMove.id = index + 1
        itemBelow.id = index
      }
    },
  }
}
</script>

<style scoped>
.disabledBtn {
  color: rgba(75, 65, 65, 0.438) !important;
}

.disabledBtnBackground {
  background-color: #f0f0f0;
}

.search-bar {
  color: #dbdde4;
}

.list-scroll {
  overflow: auto;
}

.list-scroll::-webkit-scrollbar {
  width: 5px;
}

/* Track */
.list-scroll::-webkit-scrollbar-track {
  background: none;
}

/* Handle */
.list-scroll::-webkit-scrollbar-thumb {
  background: #ffcd86;
  border-radius: 4px;
}

/* Handle on hover */
.list-scroll::-webkit-scrollbar-thumb:hover {
  background: #fca326;
  /* background: #515069; */
}

.csv-btn {
  position: absolute;
  right: 10px;

  z-index: 0;
  width: 10vw;
  height: 4vh;
  border-radius: 0px 0px 20px 20px;

  box-shadow: 0px 2px 5px black;
  background-color: #fca326;

  transition: 0.5s;
}

.csv-btn:hover {
  height: 10vh;
  content: 'test';
}

.csv-model {
  position: absolute;
  top: 40%;
  right: 32%;
  z-index: 50;

  width: 40%;
  height: 42%;

  background-color: #dbdde4;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
}

.import-img {
  width: 10vw;
  height: 10vw;
}

.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}

@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

@-o-keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
