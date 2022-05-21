<template>
  <v-list>
    <template v-for="(wallet, i) in wallets">
      <v-list-item
        :key="wallet.wallet_id"
        :three-line="wallet.selected"
      >
        <v-list-item-content>
          <v-list-item-title v-if="wallet.selected">目前錢包</v-list-item-title>
          <v-list-item-title class="text-h6 d-flex justify-space-between">
            <span>{{ wallet.wallet_name }}</span>
            <span v-if="wallet.selected">${{ wallet.wallet_total }}</span>
          </v-list-item-title>
          <v-list-item-subtitle v-if="wallet.selected" class="text-h6 d-flex justify-space-between">
            <span>{{ wallet.wallet_name }}</span>
            <span>
              <v-btn x-small icon color="error" @click="deleteWallet(wallet.wallet_id)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </span>
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action v-if="!wallet.selected">
          <v-btn icon>
            <v-icon @click="switchWallet(wallet.wallet_id)">mdi-cached</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
      <v-divider :key="i" v-if="wallet.selected"/>
    </template>
    <v-sheet class="pa-2">
      <CreateWalletModal />
    </v-sheet>
  </v-list>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CreateWalletModal from "./components/CreateWalletModal.vue"

export default {
  name: "Wallets",
  data() {
    return {
      tagDialogOpen: false,
    };
  },
  components: {
    CreateWalletModal: CreateWalletModal
  },
  mounted() {},
  methods: {
    ...mapActions({
      deleteWallet: "wallet/deleteWallet",
      switchWallet: "wallet/switchWallet",
    }),
    handleDialogChange(value) {
      this.tagDialogOpen = value;
    },
  },
  computed: {
    ...mapGetters({
      wallets: "auth/getWallets",
    }),
  },
};
</script>