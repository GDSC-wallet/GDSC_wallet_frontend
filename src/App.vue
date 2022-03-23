<template>
    <v-app>
        <v-main>
            <v-container fluid>
                <router-view></router-view>
            </v-container>
            <v-bottom-navigation app grow v-model="route">
                <v-btn  value="Home" to="/">
                    <span>Home</span>
                    <v-icon>mdi-history</v-icon>
                </v-btn>

                <v-btn  value="Chart" to="/chart">
                    <span>Chart</span>
                    <v-icon>mdi-heart</v-icon>
                </v-btn>
                <v-btn  value="Setting" to="/setting">
                    <span>Setting</span>
                    <v-icon>mdi-map-marker</v-icon>
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