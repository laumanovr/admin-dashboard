<template>
  <div class="home-container">
    <Loader v-if="isLoading"/>
    <div class="d-flex justify-space-between">
      <h2 class="head-title">All items</h2>
      <v-btn color="primary" @click="toggleModal">Add new</v-btn>
    </div>
    <v-data-table
      :headers="headers"
      :items="filteredItems"
      :items-per-page="10"
      class="elevation-1"
    >
      <template v-slot:item.url="{ item }">
        <ImageView :item="item" @onSave="onUpdate" ref="imageView" />
      </template>
    </v-data-table>

    <v-dialog v-model="isShowModal" width="800px">
      <h3>Add new item</h3>
      <v-text-field label="Title" v-model="itemObj.title"/>
      <v-text-field label="Description" v-model="itemObj.description"/>
      <v-file-input label="File" v-model="itemObj.file"/>
      <div class="d-flex justify-center align-center">
        <v-btn color="red white--text" @click="toggleModal">Cancel</v-btn>
        <v-btn color="success" @click="onCreate">Create</v-btn>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import {mapGetters, mapActions, mapState} from 'vuex';
export default {
	name: 'Home',
	components: {
		Loader: () => import('@/components/Loader'),
		ImageView: () => import('@/components/ImageView')
	},

	data () {
	  return {
	    itemObj: {
	      title: '',
				description: '',
				file: {}
			},
	    isShowModal: false,
			isLoading: false,
			headers: [
				{text: 'Title', value: 'title', align: 'center'},
				{text: 'Description', value: 'description', align: 'center'},
				{text: 'Image', value: 'url', align: 'center'}
			]
		};
	},
	created () {
	  this.isLoading = true;
		this.fetchAllItems();
	},
	computed: {
		...mapGetters('ItemModule', ['filteredItems']),
		...mapState('ItemModule', ['onSuccess', 'onError'])
	},
	methods: {
	  ...mapActions('ItemModule', ['fetchAllItems']),
		toggleModal () {
			this.isShowModal = !this.isShowModal;
		},
		onCreate () {
			this.isLoading = true;
			const formData = new FormData();
			Object.entries(this.itemObj).forEach((item) => formData.append(item[0], item[1]));
			this.$store.dispatch('ItemModule/create', formData);
		},
		onUpdate (item) {
			this.isLoading = true;
			const formData = new FormData();
			Object.entries(item).forEach((item) => formData.append(item[0], item[1]));
			this.$store.dispatch('ItemModule/update', {id: item.id, formData});
		}
	},
	watch: {
		onSuccess (msg) {
			this.isLoading = false;
			this.$toast.success(msg);
			this.isShowModal = false;
			if (msg.includes('created')) {
				this.fetchAllItems();
			}
		},
		onError (msg) {
			this.isLoading = false;
			this.$toast.error(msg);
		}
	}
};
</script>

<style lang="scss">
.home-container {
  padding: 20px;
  .head-title {
    margin-bottom: 15px;
  }
}
.v-dialog {
  background: #fff;
  padding: 20px;
}
.white--text {
  margin-right: 15px;
}
</style>
