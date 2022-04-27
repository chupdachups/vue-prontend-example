<template>
    <div>
        <div class="mt-5 btn-div" >
            <b-button size="sm" @click="selectAllRows" style="margin-right: 10px;">Select all</b-button>
            <b-button size="sm" @click="clearSelected" style="margin-right: 10px;">Clear selected</b-button>
            <!-- <b-button size="sm" @click="selectThirdRow" style="margin-right: 10px;">Select 3rd row</b-button>
            <b-button size="sm" @click="unselectThirdRow" style="margin-right: 10px;">Unselect 3rd row</b-button> -->
             <b-button 
                @click="cancelReserve"
                variant="outline-warning" 
                style="margin-right: 10px;">취소</b-button>
        </div>
        <div class="mt-3">
            <b-table striped hover 
                :items="getReserve" :fields="fields" :busy="isBusy"
                :select-mode="selectMode"
                responsive="sm"
                ref="selectableTable"
                selectable
                @row-selected="onRowSelected">
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
        <toast ref="mytoast"/>
    </div>
</template>
<script>
import toast from '@/components/toast/toast';

export default {
    components: {
        toast: toast
    },
    data() {
      return {
            // Note 'isActive' is left out and will not appear in the rendered table
            fields: [
                {
                    key: 'selected',
                    label: ''
                },
                {
                    key: 'reserveId',
                    label: '예약ID',
                    // sortable: true
                },
                {
                    key: 'product.productName',
                    label: '상품명',
                    // sortable: true
                },
                {
                    key: 'account.email',
                    label: 'Email',
                    // sortable: true
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
            selectMode: 'multi',
            selected: []
        }
    },
    created() {
        this.$store.dispatch('reserve/getReserve')
    },
    mounted() {
    },
    computed: {
        getReserve() {
            this.isBusy = true
            this.reserve = []
            this.$store.getters["reserve/getReserve"].forEach( i  => {
                this.reserve.push(i)
            });
            this.isBusy = false
            return this.reserve
        }
    },
    methods: {
        onRowSelected(items) {
            this.selected = items
        },
        selectAllRows() {
            this.$refs.selectableTable.selectAllRows()
        },
        clearSelected() {
            this.$refs.selectableTable.clearSelected()
        },
        async cancelReserve() {
            console.log(this.selected)
            await this.$store.dispatch('reserve/cancelReserve', this.selected)
                .then(() => {
                    // alert("Delete Product")
                    this.$refs.mytoast.toast('Reservation has been canceled.', true)
                    this.$store.dispatch('reserve/getReserve')
                })
                .catch(() =>{
                    alert("Failed to cancel reservation.")
                })
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

