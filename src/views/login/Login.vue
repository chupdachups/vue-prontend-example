<template>
    <div class="container">
        <div class="body d-md-flex align-items-center justify-content-between">
            <div class="box-1 mt-md-0 mt-5"> <img src="https://images.pexels.com/photos/2033997/pexels-photo-2033997.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" class="" alt=""> </div>
            <div class="box-2 d-flex flex-column h-100">
                <div class="mt-5">
                    <p class="mb-1 h-1" style="text-align: center;"><strong>Welcome back!</strong></p>
                    <div class="d-flex flex-column align-items-center">
                        <br/><br/>
                        <div class="form-group"><input class="form-control" v-model="inputEmail" type="Email" name="email" placeholder="Email"></div>
                        <div class="form-group"><input  v-on:keyup.enter="login" class="form-control" v-model="inputPassword" type="password" name="password" placeholder="Password"></div>
                        <div class="mt-3 custum-login">
                            <div class="box me-5 custom-login2" @click="login" v-on:keyup.enter="login">Log in</div>
                        </div>
                    </div>
                </div>
                <div class="mt-3 custum-login">
                    <div class="box me-5 custom-login2" style="float:right;" @click="moveSignUp">Sign Up >>></div>
                </div>
            </div> 
            <!-- <span class="fas fa-times"></span> -->
        </div>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            inputEmail: '',
            inputPassword: ''
        }
    },
    created() {
        this.inputEmail = ''
        this.inputPassword = ''
    },
    mounted() {
    },
    methods: {
        login() {
            this.$emit('clickLogin', {
                email: this.inputEmail,
                password: this.inputPassword
            })
        },
        moveSignUp() {
            this.$emit('clickSignUp')
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif
}

.container {
    margin: 50px auto;
    display: grid;
    place-items: center;
    min-height: 80vh
}

.body {
    position: relative;
    width: 720px;
    height: 440px;
    margin: 20px auto;
    border: 1px solid #dddd;
    border-radius: 18px;
    overflow: hidden;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px
}

.box-1 img {
    width: 100%;
    height: 100%;
    object-fit: cover
}

.box-2 {
    padding: 90px 10px;
}

.box-1,
.box-2 {
    width: 50%
}

.h-1 {
    font-size: 24px;
    font-weight: 700
}

.container .box {
    width: 100px;
    height: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 2px solid transparent;
    text-decoration: none;
    color: #615f5fdd
}

.box:active,
.box:visited {
    border: 2px solid #ee82ee
}

.box:hover {
    border: 2px solid #ee82ee
}

@media (max-width:767px) {
    body {
        padding: 10px
    }

    .body {
        width: 100%;
        height: 100%
    }

    .box-1 {
        width: 100%
    }

    .box-2 {
        width: 100%;
        height: 440px
    }
}

.form-control {
    background: transparent;
    border: none;
    color: #61acb3;
    border-bottom: 1px solid #dfe7f1;
    border-radius: 0;
    box-shadow: none;
    outline: none;
    color: inherit;
    text-indent: 0px;
    height: 40px;
    width: 200px
}

.custom-login {
    display: grid;
    grid-template-columns: 1fr 100px 1fr;
}

.box.me-5.custom-login2 {
    height: 35px;
    color: #ee82ee;
    font-size: 16px;
    cursor: pointer
}
</style>


