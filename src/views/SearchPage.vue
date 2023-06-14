<template>
    <v-main :style="{'background-image': bgImage, 'background-size': 'cover'}">
        <v-container style="max-width: 1280px;">
            <v-card variant="flat" style="background-color: rgba(255, 255, 255, 0.7);">
                <v-card-item>
                    <TheSearchBar></TheSearchBar>
                </v-card-item>
                <v-divider class="my-2"></v-divider>
                <DetailPage :key="$route.query" :query="$route.query.q" :type="$route.query.type"></DetailPage>
            </v-card>
        </v-container>
    </v-main>
</template>
<script setup>
import { ref } from 'vue';
import DetailPage from '../components/DetailPage.vue';
import BackgroundImage from "@/assets/vbanner.jpg"
import TheSearchBar from '@/components/TheSearchBar.vue';
const bgImage = ref(`url(${BackgroundImage})`)
</script>