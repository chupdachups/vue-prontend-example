<template>
    <div>
        <div class="mt-5 btn-div" >
             <b-button 
                @click="$bvModal.show('add-modal')"
                variant="outline-primary" 
                style="margin-right: 10px;">추가</b-button>
             <!-- <b-button variant="outline-danger">삭제</b-button> -->
        </div>
        <div class="mb-3 mt-3" v-if="this.mode === 'CARD'">
            <b-row>
                <b-card-group class="col-md-3 mt-3" v-for="item in this.getProducts" :key="item.productId">
                    <b-card
                        border-variant="info"
                        :header="item.productName"
                        :title="item.address"
                        style="max-width: 26rem;"
                        img-src="https://picsum.photos/300/300/?image=41"
                        img-alt="Image">
                        <b-card-text>₩{{item.price}}</b-card-text>
                        <template #footer>
                            <!-- <b-button variant="primary">상세</b-button> -->
                            <b-button variant="danger" @click="deleteProduct(item)">삭제</b-button>
                        </template>
                    </b-card>
                </b-card-group>
            </b-row>
        </div>
        <div class="mb-3 mt-3" v-else>
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
        <b-modal id="add-modal" centered size="lg" title="상품 추가"
            ref="addModal"
            @show="resetForm"
            @hidden="resetForm"
            @ok="handleOk"
            :header-bg-variant="headerBgVariant"
            :header-text-variant="headerTextVariant"
            :body-bg-variant="bodyBgVariant"
            :body-text-variant="bodyTextVariant">
            <b-form @submit.stop.prevent="onSubmit">
                <b-form-group label="상품명">
                    <b-form-input
                    v-model="$v.form.productName.$model"
                    :state="validateState('productName')"
                    aria-describedby="input-1-live-feedback"/>

                    <b-form-invalid-feedback
                        id="input-1-live-feedback">This is a required field and must be at least 10 characters.</b-form-invalid-feedback>
                </b-form-group>
                <b-form-group label="주소" class="mt-2">
                    <b-form-input
                    v-model="$v.form.address.$model"
                    :state="validateState('address')"
                    aria-describedby="input-2-live-feedback"/>

                    <b-form-invalid-feedback
                        id="input-2-live-feedback">This is a required field.</b-form-invalid-feedback>
                </b-form-group>
                <b-form-group label="상세주소" class="mt-2">
                    <b-form-input
                    v-model="$v.form.detailAddress.$model"
                    :state="validateState('detailAddress')"
                    aria-describedby="input-3-live-feedback"/>

                    <b-form-invalid-feedback
                        id="input-3-live-feedback">This is a required field.</b-form-invalid-feedback>
                </b-form-group>
                <b-form-group label="가격" class="mt-2">
                    <b-form-input
                    v-model="$v.form.price.$model"
                    :state="validateState('price')"
                    aria-describedby="input-4-live-feedback"/>

                    <b-form-invalid-feedback
                        id="input-4-live-feedback">This is a required field and must be numeric.</b-form-invalid-feedback>
                </b-form-group>

                <!-- <b-form-group id="example-input-group-2" label="Food" label-for="example-input-2">
                    <b-form-select
                    id="example-input-2"
                    name="example-input-2"
                    v-model="$v.form.food.$model"
                    :options="foods"
                    :state="validateState('food')"
                    aria-describedby="input-2-live-feedback"
                    ></b-form-select>

                    <b-form-invalid-feedback id="input-2-live-feedback">This is a required field.</b-form-invalid-feedback>
                </b-form-group> -->

                <!-- <b-button type="submit" variant="primary">Submit</b-button>
                <b-button class="ml-2" @click="resetForm()">Reset</b-button> -->
            </b-form>
        </b-modal>
        <toast ref="mytoast"/>
    </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength, numeric} from "vuelidate/lib/validators";
import toast from '@/components/toast/toast';

export default {
    mixins: [validationMixin],
    components: {
        toast: toast
    },
    data() {
        return {
            mode: "CARD",
            products: [],
            submittedNames: [],
            // foods: [
            //     { value: null, text: "Choose..." },
            //     { value: "apple", text: "Apple" },
            //     { value: "orange", text: "Orange" }
            // ],
            form: {
                productName: '',
                address: '',
                detailAddress: '',
                price: ''
            },
            headerBgVariant: 'primary',
            headerTextVariant: 'light',
            bodyBgVariant: 'light',
            bodyTextVariant: 'dark',
        }
    },
    validations: {
        form: {
            productName: {
                required,
                minLength: minLength(10)
            },
            address: {
                required
            },
            detailAddress : {
                required
            },
            price: {
                required,
                numeric
            }
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
        handleOk(bvModalEvt) {
            // Prevent modal from closing
            bvModalEvt.preventDefault()
            // Trigger submit handler
            this.handleSubmit()
        },
        // handleSubmit() {
        //     // Exit when the form isn't valid
        //     if (!this.checkFormValidity()) {
        //         return
        //     }
        //     // Push the name to submitted names
        //     this.submittedNames.push(this.name)
        //     // Hide the modal manually
        //     this.$nextTick(() => {
        //         this.$bvModal.hide('add-modal')
        //     })
        // }
        validateState(name) {
            const { $dirty, $error } = this.$v.form[name];
            return $dirty ? !$error : null;
        },
        resetForm() {
            this.form = {
                productName: '',
                address: '',
                detailAddress: '',
                price: ''
            };

            this.$nextTick(() => {
                this.$v.$reset();
            });
        },
        async handleSubmit() {
            this.$v.form.$touch();
            if (this.$v.form.$anyError) {
                return;
            }
            await this.$store.dispatch('product/saveProduct', this.form)
                .then(() => {
                    this.$nextTick(() => {
                        this.$bvModal.hide('add-modal')
                    })
                    // alert("Save Product")
                    this.$refs.mytoast.toast('Saved Product.', true)
                    this.$store.dispatch('product/getProducts')
                })
                .catch(() =>{
                    alert("Save Product failed.")
                })
        },
        async deleteProduct(item) {
            await this.$store.dispatch('product/deleteProduct', item.productId)
                .then(() => {
                    // alert("Delete Product")
                    this.$refs.mytoast.toast('Delete Product.', true)
                    this.$store.dispatch('product/getProducts')
                })
                .catch(() =>{
                    alert("Delete Product failed.")
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

.btn-style {
    margin-left: auto;
}

</style>
<style>
/* #add-modal .modal-header {
    font-weight: 0;
} */
#add-modal___BV_modal_header_ .close {
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
#add-modal___BV_modal_header_ .close:hover {
    opacity: .8;
}
</style>


