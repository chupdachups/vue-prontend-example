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
                        <b-button variant="outline-success">예약 확인</b-button>
                    </b-row>
                </b-container>
            </b-form-group>

            <b-list-group v-if="toDoItems && toDoItems.length">
                <b-list-group-item
                  v-for="toDoItem of toDoItems"
                  v-bind:data="toDoItem.title"
                  v-bind:key="toDoItem.id"
                >
                    <b-form-checkbox v-model="toDoItem.done">{{toDoItem.title}}</b-form-checkbox>
                </b-list-group-item>
            </b-list-group>
        </b-card>
    </div>
</template>

<script>
import axios from "axios";
import { routeNames } from '@/router'

export default {
    name: "reserve",
    data: () => {
        return {
            toDoItems: []
        };
    },
    created() {
        // axios.get('http://127.0.0.1:5000/todo/')
        //     .then(response => {
        //         this.toDoItems = response.data.map(r => r.data)
        //     })
        //     .catch(e => {
        //         console.log('error : ', e)
        //     })
    },
    methods: {
        moveToItemList() {
            this.$router.push({ name: routeNames.PRODUCT})
        }
    }
};
</script>