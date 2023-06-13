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
                :to="{name:'SearchPage', params: {param: searchParam}}"
                type="submit"
                :disabled="!form"
                >search</v-btn>
                
                <v-btn 
                class="ms-4"
                color="indigo" 
                @click.prevent=" changeMode"
                variant="flat"
                >{{ btnString }}</v-btn>
            </template>    
            <template v-slot:message="{ message }">
                <span style="color: red; font-weight: bold;"> {{ message }} </span>
            </template>
        </v-text-field>
    </v-form>
    
</template>
<script setup>
import { computed } from '@vue/reactivity';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const searchString = ref("")
const router = useRouter()
const form = ref(false)
const rules = ref([
    (value) => Boolean(value) || 'Query cannot be empty!'
])
const searchParam = computed(() => {
    const param1 = new URLSearchParams({q: searchString.value, type: typeString.value})
    return param1.toString()
})
const btnString = computed(() => {
    return type.value ? 'Ranked Search' : 'Boolean Search'
})
const typeString = computed(() => {
    return type.value ? 'Boolean Search' : 'Ranked Search'
})
const type = ref(true)
function changeMode() {
    type.value = !type.value
}

function submit() {
    router.push({name:'SearchPage', params:{param: searchParam.value}})
}
</script>