<template>
    <div v-if="initData">
        <v-card-item>
            <span class="text-caption">{{ `About ${length} results(${timeSpend} seconds), Search Type: ${initData.type}` }}</span>
        </v-card-item>
        <v-card-item v-if="initData['topData']">
            <v-card class="my-5">
                <v-card-text class="text-center">
                    <span class="text-h5 font-weight-bold">{{initData['topData']}}</span>
                </v-card-text>
            </v-card>
        </v-card-item>
        <v-card-item>
            <template v-for="item in initData['data']" :key="item['url']">
                <v-card class="my-5">
                    <template v-slot:prepend>
                        <v-icon icon="mdi-wikipedia" size="x-large"></v-icon>
                    </template>
                    <template v-slot:title>
                        <div class="d-flex flex-column align-start justify-center">
                            <span class="text-caption font-weight-bold">{{ getHostName(item['url']) }}</span>
                            <span class="text-caption"> {{ item['url'] }}</span>
                        </div>
                    </template>
                    <v-card-item>
                        <a :href="item['url']" class="text-primary text-h5" style="text-decoration: none;" target="_blank">{{ getMainMessage(item['text'], 20) }}</a>
                    </v-card-item>
                    <v-card-item>
                        <span class="text-body-1 text-wrap">{{ getMainMessage(item['text'], 200) }}</span>
                    </v-card-item>
                </v-card>
            </template>
        </v-card-item>
    </div>
    <div v-else>
        <v-overlay class="overlay">
            <div class="overlay-content">
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </div>
        </v-overlay>
    </div>
</template>
<script setup>
import { computed } from '@vue/reactivity';
import { ref } from 'vue';
// import result from '@/exapmle_data/result.json'
const props = defineProps(['query', 'type', 'genre'])
const startTime = performance.now()
let endTime = performance.now()
const timeSpend = ref(0)
const initData = ref('')
const length = computed(() => initData && initData.value.data.length)

async function getInitData(query, type, genre) {
    const params = type === 'boolean' ?  new URLSearchParams({
        query: query,
        type: type
    }) : new URLSearchParams({
        query: query,
        type: type,
        genre:genre
    })
    const url = 'http://localhost:3386?' + params.toString()
    console.log(url)
    return fetch(url).then(res=>res.json())
}

async function init() {
    const type = props.type
    const query = props.query
    const genre = props.genre
    console.log(type + '----' + query + '---' + genre);
    const data = await getInitData(query, type, genre)
    initData.value = {
        data: type === 'boolean' || genre === 'none' ? data['result'] : data['result'][1],
        topData: type === 'boolean' || genre === 'none' ? null : (genre === 'summary' ? data['result'][0]['summary'][0] : data['result'][0]['answer'][0]),
        type: type
    }
    endTime = performance.now()
    timeSpend.value = ((endTime-startTime) / 1000).toFixed(3)
}

init()

function getHostName(urlString) {
    console.log(urlString);
    const url = new URL(urlString)
    return url.hostname.split('.').slice(1, ).join('.')
}

function getMainMessage(text, charCount) {
    const tooLong = text.length > charCount
    return text.slice(0, charCount) + (tooLong ? '...' : '')
}

</script>
<style>
.overlay {
    position: relative;
    height: 1000px; /* 调整为所需高度 */
}

.overlay-content {
    position: absolute;
    top: 50%;
    left: 50%;
}
</style>
