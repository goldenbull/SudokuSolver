<template>
  <v-app>

    <!-- header -->
    <v-app-bar app>
      <div class="ma-2">
        <v-img width="40" src="@/assets/logo.png"/>
      </div>
      <div class="ma-2">
        <v-sheet class="text-h4">标题栏位置</v-sheet>
      </div>
    </v-app-bar>

    <!-- body -->
    <v-main>
      <v-container fluid>
        <v-row class="flex-nowrap">

          <!-- board panel -->
          <div class="container ma-4">
            <div class="content"></div>
          </div>

          <!-- control panel -->
          <div class="ma-16">
            <v-row class="justify-center mb-8">
              <v-btn class="ma-2 flex-grow-1" rounded>重新开始</v-btn>
            </v-row>
            <v-row class="justify-center flex-nowrap">
              <v-switch label="标记模式" color="green" hide-details/>
            </v-row>
            <v-row class="justify-center flex-nowrap">
              <v-btn class="ma-2 flex-grow-1">回退</v-btn>
              <v-btn class="ma-2 flex-grow-1">前进</v-btn>
            </v-row>
            <v-row class="justify-center flex-nowrap mb-6">
              <v-btn class="ma-2 flex-grow-1">自动填充</v-btn>
            </v-row>
            <v-row class="justify-center flex-nowrap">
              <v-btn class="ma-1" width="60" height="60">1</v-btn>
              <v-btn class="ma-1" width="60" height="60">2</v-btn>
              <v-btn class="ma-1" width="60" height="60">3</v-btn>
            </v-row>
            <v-row class="justify-center flex-nowrap">
              <v-btn class="ma-1" width="60" height="60">4</v-btn>
              <v-btn class="ma-1" width="60" height="60">5</v-btn>
              <v-btn class="ma-1" width="60" height="60">6</v-btn>
            </v-row>
            <v-row class="justify-center flex-nowrap">
              <v-btn class="ma-1" width="60" height="60">7</v-btn>
              <v-btn class="ma-1" width="60" height="60">8</v-btn>
              <v-btn class="ma-1" width="60" height="60">9</v-btn>
            </v-row>
          </div>

          <!-- log output -->
          <div class="ma-8">
            <v-textarea width="600" rows="20" no-resize>
              show log here
            </v-textarea>
          </div>

        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.container {
  padding: 1rem;
  border: 1px dashed blue;

  display: inline-flex;
  flex-direction: column;
}

.content {
  border: 1px solid red;
  overflow: auto;
  min-height: 720px;
  min-width: 720px;
  background: wheat;
}

</style>

<script lang="ts" setup>
//
</script>
