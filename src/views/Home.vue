<template>
    <v-main style="background-image: url('src/assets/material2.jpg'); background-size: cover;">
      <v-container style="max-width: 1280px;">
        <div style="margin-top: 500px;">
            <TheSearchBar></TheSearchBar>
        </div>
      </v-container>
    </v-main>

</template>
<script setup>
import TheSearchBar from '@/components/TheSearchBar.vue';
</script>