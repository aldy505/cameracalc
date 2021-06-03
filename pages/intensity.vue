<template>
  <div>
    <div class="container mx-auto">
      <div :class="{'hidden': isFclux}">
        <FcluxToAperture />
      </div>
      <div :class="{'hidden': isAperture}">
        <ApertureToFclux />
      </div>
    </div>
    <div class="py-4">
      <div class="block text-center w-1/2 mx-auto">
        <button
          class="border rounded-lg w-full px-8 py-2"
          type="button"
          :class="{
            'border-amber-500 text-amber-700 hover:bg-amber-700 hover:text-white': isAperture,
            'border-blue-500 text-blue-700 hover:bg-blue-700 hover:text-white': isFclux,
          }"
          @click="toggleclass"
        >
          {{ buttonText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isFclux: false,
      isAperture: true,
      buttonText: 'Switch to: Aperture —> FC/LUX'
    };
  },
  methods: {
    toggleclass() {
      this.isFclux = !this.isFclux;
      this.isAperture = !this.isAperture;
      this.buttonText = this.isAperture ?
        'Switch to: Aperture —> FC/LUX' :
        'Switch to: FC/LUX —> Aperture';
    }
  }
};
</script>
