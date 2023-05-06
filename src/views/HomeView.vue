<script setup>
import { ref, reactive } from 'vue'

const hello = ref("01")

function plus() {
    const lastItem = hello.value.split('')[hello.value.length - 1]
    hello.value += Math.round(Math.random(0, 1)).toString()
}



</script>

<template>
    <div>{{ hello.value }}</div>
</template>

<style lang="scss" scoped></style>

<style>
/* body {

#D83F87

#2A1B3D

#44318D

#E98074

#A4B3B6

} */
</style>