<template>
    <div>
        <b-navbar toggleable="lg" type="dark" :variant="gndVariant">
            <b-navbar-brand class="p-1 my-gnd-title" @click="moveToHome">예약 시스템</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav class="my-menu-bar">
                <b-navbar-nav v-if="getUserRole !== 'ROLE_USER'">
                    <b-nav-item @click="moveToProductMgnt">상품관리</b-nav-item>
                    <b-nav-item @click="moveToReserveMgnt">예약관리</b-nav-item>
                    <b-nav-item @click="moveToUserMgnt">유저관리</b-nav-item>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="my-menu-itme">
                    <!-- <b-nav-form>
                        <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
                        <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                    </b-nav-form> -->
                    <b-nav-item-dropdown style="margin-right: 20px;">
                        <!-- Using 'button-content' slot -->
                        <template #button-content>
                            <em>User</em>
                        </template>
                        <!-- <b-dropdown-item href="#">Profile</b-dropdown-item> -->
                        <b-dropdown-item @click="onClickSignOut">Sign Out</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
import { routeNames } from '@/router'

export default {
    data() {
        return {
            userRole: 'ROLE_USER',
            gndVariant: 'info'
        }
    },
    computed: {
        getUserRole() {
            this.userRole = this.$store.getters["login/getLoginData"].role
            this.gndVariant = this.userRole === 'ROLE_USER' ? 'info':'primary'
            return this.userRole
        },
        getGnbVariant() {
            return this.gndVariant
        }
    },
    methods: {
        onClickSignOut() {
            this.$router.push({ name: routeNames.LOGIN})
        },
        moveToProductMgnt() {
            this.$router.push({ name: routeNames.PRODUCT_MGNT}).catch(()=>{})
        },
        moveToReserveMgnt() {
            this.$router.push({ name: routeNames.RESERVE_MGNT}).catch(()=>{})
        },
        moveToUserMgnt() {
            this.$router.push({ name: routeNames.USER_MGNT}).catch(()=>{})
        },
        moveToHome() {
            if(this.userRole === 'ROLE_USER') {
                this.$router.push({ name: routeNames.RESERVE}).catch(()=>{})
            }else{
                this.$router.push({ name: routeNames.PRODUCT_MGNT}).catch(()=>{})
            }
        }
    }
}
</script>

<style scoped>
.my-gnd-title {
    margin-left: 25px;
    cursor: pointer;
}

.my-menu-bar {
    display: flex;
}

.my-menu-itme {
    margin-left: auto;
}
</style>

