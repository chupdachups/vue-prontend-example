<template>
    <b-modal id="user-reserve-modal" centered size="lg" title="예약확인" hide-footer
        ref="userReserveModal"
        @show="resetForm"
        @hidden="resetForm"
        :header-bg-variant="headerBgVariant"
        :header-text-variant="headerTextVariant"
        :body-bg-variant="bodyBgVariant"
        :body-text-variant="bodyTextVariant">
        <div class="mt-3">
            <b-table striped hover 
                :items="getReserve" :fields="fields" :busy="isBusy"
                responsive="sm">
                <template #cell(selected)="{ rowSelected }">
                    <template v-if="rowSelected">
                        <span aria-hidden="true">&check;</span>
                    </template>
                    <template v-else>
                        <span aria-hidden="true">&nbsp;</span>
                    </template>
                </template>
            </b-table>
        </div>
    </b-modal>
</template>
<<script>
export default {
    data() {
        return {
            headerBgVariant: 'primary',
            headerTextVariant: 'light',
            bodyBgVariant: 'light',
            bodyTextVariant: 'dark',
                fields: [
                {
                    key: 'product.productName',
                    label: '상품명',
                },
                {
                    key: 'reserveFrom',
                    label: 'From',
                    formatter: (value) => {
                        return /\d{4}-\d{2}-\d{2}/.exec(value.toString())[0]
                    }
                },
                {
                    key: 'reserveTo',
                    label: 'To',
                    formatter: (value) => {
                        return /\d{4}-\d{2}-\d{2}/.exec(value.toString())[0]
                    }
                },
                {
                    key: 'product',
                    label: '일수',
                    formatter: (value, key, item) => {
                        return this.diffDate(item)
                    }
                },
                {
                    key: 'product.price',
                    label: '합계',
                    formatter: (value, key, item) => {
                        return `₩ ${(this.diffDate(item) * value).toLocaleString('ko-KR')}`
                    }
                }
            ],
            reserve: [],
            isBusy: true,
        }
    },
    created() {
        
    },
    mounted() {

    },
    computed: {
        getReserve() {
            this.isBusy = true
            this.reserve = []
            this.$store.getters["reserve/getUserReserve"].forEach( i  => {
                this.reserve.push(i)
            });
            this.isBusy = false
            return this.reserve
        }
    },
    methods: {
        openModal() {
            this.$store.dispatch('reserve/getUserReserve', this.$store.getters["login/getLoginData"].accountId)
            this.$refs.userReserveModal.show()
        },
        resetForm() {
            this.reserve = []
        },
        diffDate(item) {
            if( item.reserveTo === '' || item.reserveFrom ==='') {
                return 0
            }
            const tmpTo = new Date(/\d{4}-\d{2}-\d{2}/.exec(item.reserveTo.toString())[0])
            const tmpFrom = new Date(/\d{4}-\d{2}-\d{2}/.exec(item.reserveFrom.toString())[0])
            const diff = tmpTo.getTime() - tmpFrom.getTime()
            return Math.abs(diff / (1000* 3600 *24)) + 1
        },
        totalPrice() {
            return this.diffDate * this.item.price
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
#user-reserve-modal___BV_modal_header_ .close {
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
#user-reserve-modal___BV_modal_header_ .close:hover {
    opacity: .8;
}
</style>    
}
</script>