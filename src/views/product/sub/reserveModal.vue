<template>
    <b-modal id="reserve-modal" centered size="lg" title="예약하기"
        ref="reserveModal"
        @show="resetForm"
        @hidden="resetForm"
        :header-bg-variant="headerBgVariant"
        :header-text-variant="headerTextVariant"
        :body-bg-variant="bodyBgVariant"
        :body-text-variant="bodyTextVariant">
        <b-form @submit.stop.prevent="onSubmit">
            <div class="d-block">
                <h3>{{item.productName}}</h3>
            </div>
            <b-container fluid class="mt-5">
                <b-row class="mb-1">
                    <b-col cols="2"><b-icon icon="caret-right" aria-hidden="true"/> 주 소 : </b-col>
                    <b-col>{{item.address +"  "+ item.detailAddress}}</b-col>
                </b-row>
                <b-row class="mb-1 mt-5">
                    <b-col cols="2"><b-icon icon="caret-right" aria-hidden="true"/> 예약일 : </b-col>
                </b-row>
                <b-row class="mb-1">
                    <b-col cols="1"></b-col>
                    <b-col cols="1">From</b-col>
                    <b-col><b-form-datepicker v-model="fromDate" :min="minFrom" :max="toDate" locale="ko"></b-form-datepicker></b-col>
                    <b-col cols="1">To</b-col>
                    <b-col><b-form-datepicker v-model="toDate" :min="fromDate" :max="maxTo" locale="ko"></b-form-datepicker></b-col>
                </b-row>
                <b-row class="mb-1 mt-5">
                    <b-col cols="2"><b-icon icon="caret-right" aria-hidden="true"/> 예약일수 : </b-col>
                    <b-col><span style="font-weight: bold;">{{diffDate}}</span> 일</b-col>
                </b-row>
                <b-row class="mb-1 mt-5">
                    <b-col cols="2"><b-icon icon="caret-right" aria-hidden="true"/> 금액 : </b-col>
                    <b-col>₩ <span style="font-weight: bold;">{{totalPrice.toLocaleString('ko-KR')}}</span></b-col>
                </b-row>
            </b-container>
        </b-form>
        <template #modal-footer>
            <div class="w-100 btn-div">
                <b-button style="margin-right: 10px;"
                    variant="secondary"
                    @click="clickCancel">
                    취소
                </b-button>
                <b-button style="margin-right: 10px;"
                    variant="primary"
                    @click="clickOk">
                    예약
                </b-button>
            </div>
        </template>
    </b-modal>
</template>
<script>
export default {
    props: {
        item: Object
    },
    data() {
        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        const minFrom = new Date(today)
        minFrom.setDate(minFrom.getDate()+1)
        // 15th in two months
        const maxTo = new Date(today)
        maxTo.setMonth(maxTo.getMonth() + 2)
        maxTo.setDate(15)
        return {
            fromDate: '',
            toDate:'',
            minFrom: minFrom,
            maxTo: maxTo,
            headerBgVariant: 'primary',
            headerTextVariant: 'light',
            bodyBgVariant: 'light',
            bodyTextVariant: 'dark',
        }
    },
    created() {

    },
    mounted() {

    },
    computed: {
        diffDate() {
            if( this.fromDate === '' || this.toDate ==='') {
                return 0
            }
            const tmpTo = new Date(this.toDate)
            const tmpFrom = new Date(this.fromDate)
            const diff = tmpTo.getTime() - tmpFrom.getTime()
            return Math.abs(diff / (1000* 3600 *24)) + 1
        },
        totalPrice() {
            return this.diffDate * this.item.price
        }
    },
    methods: {
        openModal() {
            this.$refs.reserveModal.show()
        },
        resetForm() {
            this.fromDate = ''
            this.toDate = ''
        },
        async clickOk() {
            const params = {
                product: {
                    id: this.item.productId
                },
                account: {
                    id: this.$store.getters["login/getLoginData"].accountId,
                    email: this.$store.getters["login/getLoginData"].email
                },
                reserveFrom: new Date(this.fromDate),
                reserveTo: new Date(this.toDate)
            }
            await this.$store.dispatch('reserve/reserveProduct', params)
                .then(() => {
                    this.$nextTick(() => {
                        this.$refs.reserveModal.hide()
                    })
                    alert("Reservation Success")
                    // this.$refs.mytoast.toast('Reserved', true)
                })
                .catch((err) =>{
                    alert("Reservation failed.", err)
                })
        },
        clickCancel() {
            this.$refs.reserveModal.hide()
        }
    }

}
</script>

<style scoped>
.btn-div {
    display: flex;
    justify-content: flex-end;
}

</style>
<style>
#reserve-modal___BV_modal_header_ .close {
    background-color: transparent;
    border: 0;
    float: right;
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1;
    color: #000;
    text-shadow: 0 1px 0 #fff;
    opacity: .5;
}
#reserve-modal___BV_modal_header_ .close:hover {
    opacity: .8;
}
</style>