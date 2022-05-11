<template>
    <v-app>
        <v-main>
            <v-container fluid>
                <router-view></router-view>
            </v-container>
            <v-bottom-navigation app grow v-model="route">
                <v-btn  value="Home" to="/">
                    <span>記帳</span>
                    <v-icon>mdi-file-document-edit</v-icon>
                </v-btn>

                <v-btn  value="Search" to="/search">
                    <span>查帳</span>
                    <v-icon>mdi-magnify</v-icon>
                </v-btn>

                <v-btn  value="Chart" to="/chart">
                    <span>圖表</span>
                    <v-icon>mdi-chart-pie</v-icon>
                </v-btn>
                <v-btn  value="Receipt" to="/receipt">
                    <span>發票</span>
                    <v-icon>mdi-barcode-scan</v-icon>
                </v-btn>
            </v-bottom-navigation>
        </v-main>
    </v-app>
</template>

<script>
export default {
    name: "App",
    data() {
        return {
            route: "Home"
        }
    },
    mounted() {

    },
    methods: {

    },
    computed: {

    }
}

</script>

<style>
.v-bottom-navigation--fixed {position: fixed !important;}

.v-item-group.v-bottom-navigation .v-btn {height: inherit !important;}

</style>