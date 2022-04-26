<template>
    <div>
        <div class="mb-3" v-if="this.mode === 'CARD'">
            <b-row>
                <b-card-group class="col-md-3" v-for="item in this.getProducts" :key="item.productId">
                    <b-card
                        border-variant="info"
                        :header="item.productName"
                        :title="item.address"
                        class="mt-5"
                        style="max-width: 26rem;"
                        img-src="https://picsum.photos/300/300/?image=41"
                        img-alt="Image">
                        <b-card-text>₩ {{item.price.toLocaleString('ko-KR')}}</b-card-text>
                        <template #footer>
                            <!-- <b-button variant="primary">상세</b-button> -->
                            <b-button variant="primary" @click="openModal(item)">예약</b-button>
                        </template>
                    </b-card>
                </b-card-group>
            </b-row>
        </div>
        <div class="mb-3" v-else>
            <b-row>
                <b-card-group class="col-md-4" v-for="item in doneProducts" :key="item.name">
                    <b-card
                        border-variant="info"
                        :header="인기상품"
                        :title="item.productName"
                        class="mt-5"
                        style="max-width: 26rem;"
                        img-src="https://placekitten.com/g/300/450"
                        img-alt="Image">
                        <b-card-text>{{item.price}}</b-card-text>
                    </b-card>
                </b-card-group>
            </b-row>
        </div>
        <reserve-modal ref="reserveModal" :item="selectItem"/>
    </div>
    <!-- <b-card-group deck>
        <b-card title="Title" img-src="https://picsum.photos/300/300/?image=41" img-alt="Image" img-top>
        <b-card-text>
            This is a wider card with supporting text below as a natural lead-in to additional content.
            This content is a little bit longer.
        </b-card-text>
        <template #footer>
            <small class="text-muted">Last updated 3 mins ago</small>
        </template>
        </b-card>
    </b-card-group> -->
</template>

<script>
import reserveModal from "./sub/reserveModal"

export default {
    components: {
        reserveModal
    },
    data() {
        return {
            mode: "CARD",
            products: [
                {
                    name: "AAAAAAAAAA",
                    title: "QWEQWE",
                    describe: "AAAAAAAAAAAAAAAAAAAAAA"
                },
                {
                    name: "BBBBBBBBB",
                    title: "QWEQWE",
                    describe: "BBBBBBBBBBBBBBBBBBBBBBBB"
                }
            ],
            selectItem: {}
        }
    },
    created() {
        this.$store.dispatch('product/getProducts')
    },
    mounted() {
    },
    computed: {
        getProducts() {
            this.products = []
            // const res = this.$store.getters["product/getProducts"]
            this.$store.getters["product/getProducts"].forEach( i  => {
                this.products.push(i)
            });
            return this.products
        }
    },
    methods: {
        openModal(item) {
            this.selectItem = item
            this.$refs.reserveModal.openModal()
        }
    }
}
</script>

