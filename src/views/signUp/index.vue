<template>
    <!-- <div style="max-width: 60rem;"> -->
    <div class="px-2" style="margin-top: 7vh;">
        <h2 style="text-align: center;"> Sign Up </h2>
        <!-- <b-icon icon="camera" font-scale="7.5"></b-icon> -->
        <b-card
            style="max-width: 50rem; margin: auto; margin-top: 5vh;"
            align="left">
            <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                <b-form-group
                    id="input-group-3"
                    label="Email address:"
                    label-for="input-3"
                    description="We'll never share your email with anyone else."
                    label-align="left">
                    <b-form-input
                        id="input-3"
                        v-model="form.email"
                        type="email"
                        placeholder="Enter email"
                        required/>
                </b-form-group>
                <b-form-group 
                    id="input-group-1"
                    label="First Name:"
                    label-for="input-1"
                    label-align="left">
                    <b-form-input
                        id="input-1"
                        v-model="form.name.first"
                        type="text"
                        placeholder="Enter First Name"
                        required/>
                </b-form-group>
                <b-form-group 
                    id="input-group-2"
                    label="Last Name:"
                    label-for="input-2"
                    label-align="left">
                    <b-form-input
                        id="input-2"
                        v-model="form.name.last"
                        type="text"
                        placeholder="Enter Last Name"
                        required/>
                </b-form-group>
                <b-form-group
                    id="input-group-4"
                    label="Password:"
                    label-for="input-4"
                    label-align="left">
                    <b-form-input
                        id="input-4"
                        v-model="form.password"
                        type="password"
                        placeholder="Enter password"
                        required/>
                </b-form-group>
                <b-form-group
                    id="input-group-5"
                    label="Address:"
                    label-for="input-5"
                    label-align="left">
                    <b-form-input
                        id="input-5"
                        v-model="form.address.address1"
                        type="text"
                        placeholder="Enter address"
                        required/>
                </b-form-group>
                <b-form-group
                    id="input-group-6"
                    label="Zip:"
                    label-for="input-6"
                    label-align="left">
                    <b-form-input
                        id="input-6"
                        v-model="form.address.zip"
                        type="number"
                        placeholder="Enter zip number"
                        required/>
                </b-form-group>

                <!-- <b-form-group id="input-group-3" label="Food:" label-for="input-3">
                    <b-form-select
                    id="input-3"
                    v-model="form.food"
                    :options="foods"
                    required
                    ></b-form-select>
                </b-form-group> -->

                <!-- <b-form-group id="input-group-4" v-slot="{ ariaDescribedby }">
                    <b-form-checkbox-group
                    v-model="form.checked"
                    id="checkboxes-4"
                    :aria-describedby="ariaDescribedby"
                    >
                    <b-form-checkbox value="me">Check me out</b-form-checkbox>
                    <b-form-checkbox value="that">Check that out</b-form-checkbox>
                    </b-form-checkbox-group>
                </b-form-group> -->

                <b-button type="submit" variant="primary" style="margin-top: 10px;" >Submit</b-button>
                <b-button type="reset" variant="danger" style="margin-top: 10px;">Reset</b-button>
            </b-form>
        </b-card>
        <b-card class="mt-3" header="Form Data Result" style="margin: auto; max-width: 50rem;">
            <pre class="m-0">{{ form }}</pre>
        </b-card>
    </div>
</template>

<script>
    import { routeNames } from '@/router'
    export default {
        data() {
            return {
                form: {
                    name: {
                        first: '',
                        last: ''
                    },
                    email: '',
                    password: '',
                    address: {
                        address1: '',
                        zip:''
                    }
                    // ,
                    // checked: []
                },
                foods: [{ text: 'Select One', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
                show: true
            }
        },
        methods: {
            async onSubmit(event) {
                this.loading = true
                event.preventDefault()
                // alert(JSON.stringify(this.form))
                await this.$store.dispatch('account/signUp', this.form)
                    .then(() => {
                        alert("Welcome to join!")
                        this.$router.push({ name: routeNames.LOGIN})
                    })
                    .catch(() =>{
                        alert("Sign up failed.")
                    })
                this.loading = false
            },
            onReset(event) {
                event.preventDefault()
                // Reset our form values
                this.form.firstName = ''
                this.form.lastName = ''
                this.form.email = ''
                this.form.password = ''
                this.form.address1 = ''
                this.form.zip = ''
                // this.form.food = null
                // this.form.checked = []
                // Trick to reset/clear native browser form validation state
                this.show = false
                this.$nextTick(() => {
                    this.show = true
                })
            }
        }
    }
</script>