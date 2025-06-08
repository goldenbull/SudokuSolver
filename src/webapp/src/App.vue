<template>
  <v-app>
    <v-app-bar app>
      <v-row justify="start" align="center">
        <v-col cols="2">
          <v-img height="60" src="src/assets/logo.png" />
        </v-col>
        <v-col class="text-h4"> 数独助手</v-col>
      </v-row>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <v-row>
          <v-col>
            <v-container>
              <v-row>
                <v-btn class="ma-1">重新开始</v-btn>
              </v-row>
              <v-row>
                <v-btn class="ma-1">back</v-btn>
                <v-btn class="ma-1">forward</v-btn>
              </v-row>
            </v-container>
          </v-col>

          <v-col>
            <v-sheet class="pa-2 ma-2"> aaaa</v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import { getGame } from '@/stores/board.ts'

const game = getGame()
</script>
