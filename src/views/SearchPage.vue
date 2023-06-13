<template>
    <v-main style="background-image: url('src/assets/vbanner.jpg'); background-size: cover;">
        <v-container style="max-width: 1280px;">
            <v-card variant="flat" style="background-color: rgba(255, 255, 255, 0.7);">
                <v-card-item>
                    <TheSearchBar></TheSearchBar>
                </v-card-item>
                <v-divider class="my-2"></v-divider>
                <div v-if="initData">
                    <v-card-item>
                        <span class="text-caption">{{ `About ${length} results(${timeSpend} seconds), Search Type: ${initData.type}` }}</span>
                    </v-card-item>
                    <v-card-item>
                        <v-virtual-scroll :items="initData.data">
                            <template v-slot:default="{ item }">
                                <v-list-item :title="item" lines="three"></v-list-item>
                            </template>
                        </v-virtual-scroll>
                    </v-card-item>
                </div>
                <div v-else>
                    <v-overlay class="overlay">
                        <div class="overlay-content">
                            <v-progress-circular indeterminate color="primary"></v-progress-circular>
                        </div>
                    </v-overlay>
                </div>
            </v-card>
        </v-container>
    </v-main>
</template>
<script setup>
import TheSearchBar from '@/components/TheSearchBar.vue';
import { computed } from '@vue/reactivity';
import { ref } from 'vue';
const startTime = performance.now()
let endTime = performance.now()
const timeSpend = ref(0)
const props = defineProps({
    'param': {
        type:String,
        required:true
    }
})
const initData = ref('')
const length = computed(() => initData && initData.value.data.length)
async function getInitData(query, type) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const data = Array.from({length: 200}, (value, index) => query)
            resolve({type:type, data:data})
        }, 1000)
    })
}

async function init() {
    const searchParam = new URLSearchParams(props.param)
    const type = searchParam.get('type')
    const query = searchParam.get('q')
    console.log(type + '----' + query);
    const data = await getInitData(query, type)
    initData.value = data
    endTime = performance.now()
    timeSpend.value = ((endTime-startTime) / 1000).toFixed(3)
}

init()

</script>

<style scoped>
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