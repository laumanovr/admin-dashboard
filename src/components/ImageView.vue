<template>
  <div class="image-container" @mouseenter="showHideBtn(true)" @mouseleave="showHideBtn(false)">
    <img :src="imageUrl" alt="image" class="image">
    <div class="action" v-show="isShowBtn">
      <span class="btn" @click="saveData" v-if="imageFile">Save</span>
      <label :for="item.id" v-else>
        <input type="file" :id="item.id" @change="onSelectFile" class="input-photo">
        <span class="btn">Change</span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
	props: {
		item: {
			type: Object,
			default: () => ({})
		}
	},
	data () {
		return {
			isShowBtn: false,
			imageFile: '',
			imageUrl: this.item.url ? this.item.url : require('@/assets/no-photo.png')
		};
	},
	methods: {
	  showHideBtn (bool) {
	    this.isShowBtn = bool;
		},
		onSelectFile (e) {
			this.imageFile = e.target.files[0];
			this.imageUrl = URL.createObjectURL(this.imageFile);
		},
		saveData () {
	    const item = Object.assign({}, this.item, {file: this.imageFile});
			this.$emit('onSave', item);
			this.$nextTick(() => {
			  this.imageFile = '';
			});
		}
	}
};
</script>

<style lang="scss">
  .image-container {
    position: relative;
    width: 100px;
    margin: 0 auto;
    .image {
      width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: 50%;
    }
    .action {
      content: '';
      position: absolute;
      bottom: 6px;
      left: 3px;
      width: 94%;
      height: 40%;
      background: rgb(gray, 0.9);
      border-radius: 0 0 100px 100px;
      cursor: pointer;
      .btn {
        color: #fff;
        padding-top: 10px;
        display: inline-block;
        cursor: pointer;
      }
    }
    .input-photo {
      display: none;
    }
  }
</style>
