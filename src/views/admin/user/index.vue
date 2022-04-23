<template>
    <div>
        <div class="mt-5 btn-div" >
            <b-button size="sm" @click="selectAllRows" style="margin-right: 10px;">Select all</b-button>
            <b-button size="sm" @click="clearSelected" style="margin-right: 10px;">Clear selected</b-button>
            <!-- <b-button size="sm" @click="selectThirdRow" style="margin-right: 10px;">Select 3rd row</b-button>
            <b-button size="sm" @click="unselectThirdRow" style="margin-right: 10px;">Unselect 3rd row</b-button> -->
             <b-button 
                @click="deleteAccouts"
                variant="outline-danger" 
                style="margin-right: 10px;">삭제</b-button>
             <!-- <b-button variant="outline-danger">삭제</b-button> -->
        </div>
        <!-- <b-form-group
            label="Selection mode:"
            label-for="table-select-mode-select"
            label-cols-md="4">
            <b-form-select
                id="table-select-mode-select"
                v-model="selectMode"
                :options="modes"
                class="mb-3"/>
        </b-form-group> -->
        <div class="mt-3">
            <b-table striped hover 
                :items="getAccounts" :fields="fields" :busy="isBusy"
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
                key: 'accountId',
                label: 'Id',
                // sortable: true
            },
            {
                key: 'email',
                label: 'Email',
                // sortable: true
            },
            {
                key: 'name.first',
                label: 'First Name',
                // sortable: true
            },
            {
                key: 'name.last',
                label: 'Last Name',
                // sortable: true
            },
            {
                key: 'role',
                label: 'Role',
                // sortable: true
                // Variant applies to the whole column, including the header and footer
                // variant: 'danger'
            }
            ],
            accounts: [],
            isBusy: true,
            // modes: ['multi', 'single', 'range'],
            selectMode: 'multi',
            selected: []
        }
    },
    created() {
        this.$store.dispatch('account/getAccounts')
    },
    mounted() {
    },
    computed: {
        getAccounts() {
            this.isBusy = true
            this.accounts = []
            // const res = this.$store.getters["product/getProducts"]
            this.$store.getters["account/getAccounts"].forEach( i  => {
                this.accounts.push(i)
            });
            this.isBusy = false
            return this.accounts
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
        // selectThirdRow() {
        //     // Rows are indexed from 0, so the third row is index 2
        //     this.$refs.selectableTable.selectRow(2)
        // },
        // unselectThirdRow() {
        //     // Rows are indexed from 0, so the third row is index 2
        //     this.$refs.selectableTable.unselectRow(2)
        // }
        async deleteAccouts() {
            await this.$store.dispatch('account/deleteAccounts', this.selected)
                .then(() => {
                    // alert("Delete Product")
                    this.$refs.mytoast.toast('Delete Accounts.', true)
                    this.$store.dispatch('account/getAccounts')
                })
                .catch(() =>{
                    alert("Delete Accounts failed.")
                })
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
