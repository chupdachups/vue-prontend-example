<template>
    <div class="hello">
        <b-card
          header="환영합니다."
          style="max-width: 40rem; margin: auto; margin-top: 10vh;"
          class="mb-2"
          border-variant="info"
          align="left"
        >
            <b-form-group id="reserveBtnGrp">
                <b-container fluid>
                    <b-row>
                        <b-button variant="outline-primary" @click="moveToItemList">예약 하기</b-button>
                    </b-row>
                    <b-row class="mt-3">
                        <b-button variant="outline-success" @click="openModal">예약 확인</b-button>
                    </b-row>
                </b-container>
            </b-form-group>
        </b-card>
        <user-reserve-modal ref='userReserveModal'/>
    </div>
</template>

<script>
import axios from "axios";
import { routeNames } from '@/router'
import userReserveModal from './sub/userReserveModal'

export default {
    name: "reserve",
    components: {
        userReserveModal
    },
    data: () => {
        return {}
    },
    created() {
    },
    methods: {
        moveToItemList() {
            this.$router.push({ name: routeNames.PRODUCT})
        },
        openModal() {
            this.$refs.userReserveModal.openModal();
        }
    }
};
</script>