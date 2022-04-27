<template>
    <div id=loginIndex>
        <login @clickLogin='login' @clickSignUp='moveSignUp'/>
        <!-- <div v-if="loading" class="row justify-content-center">
            <Spinner></Spinner>
        </div> -->
        <div v-if="loading" class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <modal :show="showModal" :message="modalMessage"/>
    </div>
</template>

<script>
import login from './Login'
import modal from '@/components/modal/'
// import { routeNames } from '../../router'
import { routeNames } from '@/router'
export default {
    name: 'index',
    components: {
        login,
        modal
    },
    data() {
        return {
            loading: false,
            error:'',
            showModal: false,
            modalMessage:''
        }
    },
    created() {
        console.log('login.index.vue created')
    },
    mounted() {
        console.log('login.index.vue mouted')
    },
    methods: {
        async login(data) {
            this.loading = true
            await this.$store.dispatch('login/login', data)
            .then((res) => {
                // alert(JSON.stringify(this.$store.getters["login/getLoginData"]))
                if(this.$store.getters["login/getLoginData"].role === 'ROLE_USER') {
                    this.$router.push({ name: routeNames.RESERVE})
                } else {
                    this.$router.push({ name: routeNames.PRODUCT_MGNT})    
                }
                
            })
            .catch((err) => {
                alert('Login failed')
            })
            this.loading = false
        },
        moveSignUp() {
            this.$router.push({ name: routeNames.SIGNUP})
        }
    }
}
</script>

<style scoped>
/* .spinner-border {
     display: block;
     position: fixed;
     z-index: 1031;
     top: calc(50%-(100px/2));
     right: calc(50%-(100px/2));
} */
</style>


