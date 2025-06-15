<template>
  <v-app ref="app">
    <!-- header -->
    <v-app-bar app>
      <div class="ma-2">
        <v-img width="50" src="src/assets/logo.png" />
      </div>
      <div class="ma-2">
        <v-sheet class="text-h4">标题栏位置</v-sheet>
      </div>
    </v-app-bar>

    <v-main app class="container">
      <v-container fluid class="fill-height flex-nowrap">
        <v-row class="fill-height">
          <!-- 画图面板 -->
          <v-col cols="9" class="canvas-container" v-resize="onCvsResize">
            <canvas ref="cvs" class="canvas1"></canvas>
          </v-col>

          <!-- 操作面板 -->
          <v-col cols="3" class="pt-4 pl-2 pr-2">
            <v-row class="justify-center mb-8">
              <v-btn class="ma-2 flex-grow-1" max-width="120" rounded @click="restartGame"
                >重新开始
              </v-btn>
            </v-row>
            <v-row class="justify-center flex-nowrap">
              <v-btn class="ma-2 flex-grow-1" max-width="120">回退</v-btn>
              <v-btn class="ma-2 flex-grow-1" max-width="120">前进</v-btn>
            </v-row>
            <v-row class="justify-center flex-nowrap">
              <v-btn class="ma-2 flex-grow-1" max-width="120">自动一步</v-btn>
              <v-btn class="ma-2 flex-grow-1" max-width="120">直接通关</v-btn>
            </v-row>
            <v-row class="justify-center flex-nowrap pa-2">
              <v-switch label="标记模式" color="green" hide-details />
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

            <!-- for debug -->
            <v-row>
              <v-btn @click="debug1">debug</v-btn>
            </v-row>
            <v-row>
              {{ msg }}
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-footer app class="justify-center">
      <a href="https://beian.miit.gov.cn" target="_blank">京ICP备14006224号-1</a>
    </v-footer>
  </v-app>
</template>

<style scoped>
.container {
  position: fixed;
  left: 0;
  width: calc(100% + 0px);
  height: calc(100% - 2vw);
}

.canvas-container {
  display: flex;
  justify-content: center;
}

.canvas1 {
  height: min(100%, 100vh - 100px);
  aspect-ratio: 1 / 1;
  background: lightgreen;
}
</style>

<script lang="ts" setup>
import { onMounted, ref, useTemplateRef } from 'vue'
import { getStatus } from '@/stores/board.ts'

let msg = ref('debug output here')
const cvs = useTemplateRef('cvs')
const { game, setNumber, clear } = getStatus()

function updateMsg() {
  msg.value = `H=${cvs.value!.clientHeight} W=${cvs.value!.clientWidth}`

  // const canvas = document.getElementById('cvs1') as HTMLCanvasElement
  const canvas = cvs.value as HTMLCanvasElement
  canvas.width = canvas.clientWidth
  canvas.height = canvas.clientHeight
  console.log(`clientWidth=${canvas?.clientWidth} width=${canvas?.width}`)
  console.log(`clientWidth=${canvas?.clientHeight} width=${canvas?.height}`)
}

function restartGame() {
  clear()
  updateMsg()
}

function onCvsResize() {
  console.log('canvas resized')
  updateMsg()
}

function debug1() {
  // const ctx = cvs.value.getContext('2d')
  // ctx.fillStyle = 'red'
  // ctx.fillRect(10, 10, 100, 100)
  // const canvas = document.getElementById('cvs1') as HTMLCanvasElement
  const canvas = cvs.value as HTMLCanvasElement
  canvas.width = canvas.clientWidth
  canvas.height = canvas.clientHeight
  console.log(`clientWidth=${canvas?.clientWidth} width=${canvas?.width}`)
  console.log(`clientWidth=${canvas?.clientHeight} width=${canvas?.height}`)

  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  ctx.translate(0.5, 0.5)

  ctx.strokeStyle = 'blue'
  ctx.beginPath()
  ctx.rect(10, 10, 30, 30)
  ctx.stroke()

  ctx.fillStyle = 'red'
  ctx.fillRect(50, 50, 50, 50)

  game.setNumber(5, 5, 1)
  console.log(game.boards.length)
}

onMounted(() => {
  console.log('Component mounted!')
  updateMsg()
})
</script>
