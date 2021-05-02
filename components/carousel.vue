<template>
  <div class="carousel" @keydown="checkSlide($event)" tabindex="0">
    <slot></slot>
    <button @click.prevent="next" class="btn btn-next">
      <div class="arrow">
        <i class="bi bi-arrow-right"></i>
      </div>
    </button>
    <button @click.prevent="prev" class="btn btn-prev">
      <div class="arrow">
        <i class="bi bi-arrow-left"></i>
      </div>
    </button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      index: 0,
      slides: [],
      slideDirection: ""
    };
  },
  computed: {
    slidesLength() {
      return this.slides.length;
    }
  },
  mounted() {
    this.slides = this.$children;
    this.slides.map((slide, index) => {
      slide.index = index;
    });
  },
  methods: {
    next() {
      this.index++;
      if (this.index >= this.slidesLength) {
        this.index = 0;
      }
      this.slideDirection = "slide-right";
    },
    prev() {
      this.index--;
      if (this.index < 0) {
        this.index = this.slidesLength - 1;
      }
      this.slideDirection = "slide-left";
    },
    checkSlide(event) {
      if (event.keyCode === 39) {
        this.next();
      } else if (event.keyCode === 37) {
        this.prev();
      } else {
        return;
      }
    }
  }
};
</script>
<style lang="scss">
.carousel {
  position: absolute;
  overflow: hidden;
  top: 0;
  width: 100%;
  height: 100vh;
  z-index: 2000;
  background: #141414;
  .btn {
    background-color: rgba(0, 0, 0, 0);
    border: 1px solid transparent;
    color: #fff;
    position: absolute;
    z-index: 2;
    height: 100%;
    display: flex;
    align-items: center;
  }
  .btn:hover {
    cursor: pointer;
  }
  .btn:focus {
    outline: none;
  }
  .btn-next {
    justify-content: flex-end;
    width: 50%;
    right: 0;
  }
  .btn-prev {
    justify-content: flex-start;
    width: 50%;
    left: 0;
  }
  .arrow {
    background-color: rgba(31, 45, 61, 0.6);
    color: white;
    border-radius: 30px;
    transition: all 0.3s ease;
    padding: 10px 15px;
    svg {
      fill: white;
    }
  }
  /* .carousel-slider {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
} */
  .carousel-slider {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    display: flex;
    justify-content: center;
    align-items: center;
  }
  .el-image {
    width: 90%;
    height: 90%;
  }
  @media (max-width: 1200px) {
    .el-image {
      height: 60%;
    }
  }
}
</style>
