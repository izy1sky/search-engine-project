<template>
    <v-form @submit.prevent="submit" v-model:model-value="form">
        <v-text-field
            label="Search something..."
            single-line
            v-model:model-value="searchString"
            prepend-inner-icon="mdi-magnify"
            rounded="pill"
            variant="solo"
            clearable
            elevation="10"
            :rules="rules"
        >
            <template v-slot:append>
                <v-btn 
                color="indigo" 
                variant="flat" 
                type="submit"
                :disabled="!form"
                >search</v-btn>

                <v-btn 
                class="ms-4"
                color="indigo" 
                @click.prevent=" changeMode"
                variant="flat"
                >{{ type? 'Ranked Search' : 'Boolean Search' }}</v-btn>
            </template>    
            <template v-slot:message="{ message }">
                <span style="color: red; font-weight: bold;"> {{ message }} </span>
            </template>
        </v-text-field>
        <v-radio-group v-model="rankedSearchType" v-if="!type" inline density="compact">
            <v-radio label="Normal Ranked Search" value="Normal Ranked Search" class="ms-4"></v-radio>
            <v-radio label="Multi-news summarization" value="Multi-news summarization" class="ms-4"></v-radio>
            <v-radio label="QA" value="QA" class="ms-4"></v-radio>
        </v-radio-group>
    </v-form>
    
</template>
<script setup>
import { computed } from '@vue/reactivity';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const searchString = ref("")
const router = useRouter()
const form = ref(false)
const rankedSearchType = ref("")
const rules = ref([
    (value) => Boolean(value) || 'Query cannot be empty!'
])

const typeString = computed(() => {
    return type.value ? 'boolean' : ''
})

const params = computed(() => {
    return type.value ? {q: searchString.value, type: 'boolean'} : {
        q: searchString.value, 
        type: 'ranked',
        genre: rankedSearchType.value === 'Normal Ranked Search' ? 'none' : (rankedSearchType.value === 'Multi-news summarization' ? 'summary' : 'QA')
    }
})

const type = ref(true)


function changeMode() {
    type.value = !type.value
}

function submit() {
    router.push({name:'SearchPage', query:params.value})
}
</script>