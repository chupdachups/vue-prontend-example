<template>
    <div id='home'>
        <gnb/>
        <div id='page_content'>
            <router-view key='$route.fullPath'/>
        </div>
    </div>
</template>

<script>
import gnb from './GlobalNavigationBar'

export default {
    components: {
        gnb: gnb
    }    
}
</script>
