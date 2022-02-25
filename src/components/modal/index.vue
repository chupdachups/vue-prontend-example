<template>
    <div>
        <b-modal v-model="show" title="Error" ok-only>
            <p>{message}</p>
        </b-modal>
    </div>
</template>

<script>
export default {
    name: 'modal',
    props: {
        show: Boolean
    },
    components: {
    },
    data() {
        return {
            message:"ERROR"
        }
    }
}
</script>

<style scoped>

</style>