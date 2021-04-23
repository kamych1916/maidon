<template>
  <div class="card-wrap">
    <h4>Фотографии</h4>
    <div class="d-flex align-items-center mt-20" v-if="offerPhothos.length > 0">
      <div class="example-box-photo"></div>
      <span style="line-height: 0;">
        &nbsp; - главная фотография
      </span>
    </div>
    <draggable
      :list="offerPhothos"
      :disabled="!enabled"
      class="row"
      ghost-class="ghost"
      @start="dragging = true"
      @end="dragging = false"
      :animation="400"
      draggable=".item"
    >
      <div
        class="col-md-3 my-20 item"
        v-for="(element, index) in offerPhothos"
        :key="index"
      >
        <div :class="[index === 0 ? 'main' : '', 'box-photo']">
          <div
            class="delete"
            @click="offerPhothos.splice(index, 1), emitData()"
          >
            <i class="bi bi-x-circle-fill"></i>
          </div>
          <img :src="element.imgSrc" class="photo" />
        </div>
      </div>
      <div
        slot="footer"
        role="group"
        aria-label="Basic example"
        key="footer"
        class="box-upload my-20 d-flex align-items-center justify-content-center text-center"
      >
        <input
          max-size="800"
          type="file"
          class="box-photo-input"
          accept="image/png, image/jpeg, image/jpg"
          @change="filesChange"
        />
        <div>
          <div class="w-100 d-flex justify-content-center">
            <i
              style="font-size: 70px; opacity: 0.3; line-height: 0"
              class="bi bi-cloud-arrow-up-fill "
            >
            </i>
          </div>
          добавить фото
        </div>
      </div>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import Api from "~/utils/api";
import NTFS from "~/utils/notifications";

export default {
  props: {
    putPhotos: {
      type: Array,
      required: false,
      default: []
    }
  },
  components: {
    draggable
  },
  watch: {
    putPhotos(newVal, oldVal) {
      if (newVal !== oldVal) this.offerPhothos = newVal;
    }
  },
  data() {
    return {
      offerPhothos: this.putPhotos,
      enabled: true,
      dragging: false
    };
  },
  methods: {
    filesChange(e) {
      const file = e.target.files[0];
      if (file !== undefined) {
        if (file.size > 1024 * 1024) {
          this.sendNTFS(
            "Предупрждение!",
            "Размер фотографии не должно превышать одного мегабайт!",
            "warning"
          );
        } else {
          let url = URL.createObjectURL(file);
          this.offerPhothos.push({
            imgSrc: url,
            imgName: file.name
          });
          const formData = new FormData();
          formData.append("file", file);
          Api.getInstance()
            .offer.upload_file(formData)
            .then(response => {
              this.emitData();
            })
            .catch(error => {
              console.log("upload_file-> ", error);
            });
        }
      }
    },

    emitData() {
      this.$emit("uploadPhoto", {
        offerPhothos: this.offerPhothos
      });
    },

    sendNTFS(title, message, type) {
      NTFS.getInstance().NTFS(title, message, type);
    }
  }
};
</script>

<style lang="scss">
.box-photo {
  height: 200px;
  border: 1px dashed #c0ccda;
  border-radius: 6px;
  cursor: grab;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .photo {
    padding: 10px;
    max-height: 100%;
    max-width: 100%;
  }
  .delete {
    position: absolute;
    right: 0;
    top: 0;
    border-radius: 6px;
    cursor: pointer;
    padding: 5px 10px;
    margin: 5px;
    color: white;
    background-color: rgba(0, 0, 0, 0.4);
  }
}
.example-box-photo {
  width: 20px;
  height: 20px;
  background-color: #fff7e1;
  border: 1px dashed #ccc;
}

.box-photo.main {
  background: #fff7e1;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.box-upload {
  width: 100%;
  border-radius: 6px;
  height: 200px;
  background: #f5fcff;
  border: 1px dashed #c0ccda;
  margin-right: 15px;
  margin-left: 15px;
  position: relative;
  &:hover {
    border: 1px dashed #409eff;
  }
  .box-photo-input {
    opacity: 0;
    z-index: 10;
    cursor: pointer;
    height: 100% !important;
    width: 100% !important;
    position: absolute;
  }
}
</style>
