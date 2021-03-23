<template>
  <div>
    <div class="body container">
      <div class="fclux" :class="{ 'd-none': isFclux }">
        <FcluxToAperture />
      </div>
      <div class="aperture" :class="{ 'd-none': isAperture }">
        <ApertureToFclux />
      </div>
    </div>
    <div class="footer mt-3">
      <div class="row">
        <div class="col-12 offset-md-3 col-md-6">
          <button
            class="btn btn-block"
            type="button"
            :class="{
              'btn-outline-info': isAperture,
              'btn-outline-warning': isFclux,
            }"
            @click="toggleclass"
          >
            {{ btnText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      isFclux: false,
      isAperture: true,
      btnText: "Switch to: Aperture —> FC/LUX",
    }
  },
  methods: {
    toggleclass: function () {
      this.isFclux = !this.isFclux
      this.isAperture = !this.isAperture
      this.btnText = this.isAperture
                ? "Switch to: Aperture —> FC/LUX"
                : "Switch to: FC/LUX —> Aperture"
    },
  },
}
</script>
