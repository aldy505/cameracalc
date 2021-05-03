<template>
  <div>
    <div class="container mx-auto">
      <div class="block">
        <h2 class="text-3xl">Lens from sensor to sensor</h2>
      </div>
      <form>
        <div class="flex flex-col md:flex-row items-center py-2">
          <div class="flex-1">
            From camera:
          </div>
          <div class="flex-2">
            <select
              v-model="input.from"
              class="w-full rounded-lg border-2 border-gray-200 focus:border-indigo-600 ring-0 focus:ring-1 ring-indigo-600 px-4 py-2"
            >
              <option v-for="item in dataList" :key="item.id">
                {{ item.camera }}
              </option>
            </select>
          </div>
        </div>
        <div class="flex flex-col md:flex-row items-center py-2">
          <div class="flex-1">
            To camera:
          </div>
          <div class="flex-2">
            <select
              v-model="input.to"
              class="w-full rounded-lg border-2 border-gray-200 focus:border-indigo-600 ring-0 focus:ring-1 ring-indigo-600 px-4 py-2"
            >
              <option v-for="item in dataList" :key="item.id">
                {{ item.camera }}
              </option>
            </select>
          </div>
        </div>
        <div class="flex flex-col md:flex-row items-center py-2 w-full">
          <div class="flex-1">
            Lens focal length:
          </div>
          <div class="flex-2 mx-4 w-full">
            <input
              v-model="input.focal"
              class="w-full rounded-lg border-2 border-gray-200 focus:border-indigo-600 ring-0 focus:ring-1 ring-indigo-600 px-4 py-2"
              type="number"
            >
          </div>
          <div class="flex-1 py-2 md:py-0">
            Desired aspect ratio:
          </div>
          <div class="flex-2 w-full">
            <select
              v-model="input.aspectRatio"
              class="w-full rounded-lg border-2 border-gray-200 focus:border-indigo-600 ring-0 focus:ring-1 ring-indigo-600 px-4 py-2"
            >
              <option value="1">
                16:9
              </option>
              <option value="0.7407407407407407">
                2.40:1 (cropped)
              </option>
              <option value="1.33">
                4:3
              </option>
            </select>
          </div>
        </div>
        <div class="my-2 block">
          <strong :class="output.class">{{ output.text }}</strong>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-unresolved
import sensor from '~/assets/sensor.json';

export default {
  asyncData() {
    const dataList = sensor;
    return { dataList };
  },
  data() {
    return {
      output: {
        text: '',
        class: '',
      },
      input: {
        from: '',
        to: '',
        focal: '',
        aspectRatio: '',
      },
    };
  },
  watch: {
    input: {
      handler() {
        this.CalculateSensor();
      },
      deep: true,
    },
  },
  methods: {
    CalculateSensor() {
      const {
        from, to, focal, aspectRatio,
      } = this.input;

      // Check if user actually input some number to focal length
      if (!focal) {
        this.output.class = 'text-red-600';
        this.output.text = 'Please fill in focal length number';
      } else {
        const fromData = this.dataList.filter((o) => o.camera === from)[0];
        const toData = this.dataList.filter((o) => o.camera === to)[0];

        const parsedFocal = Number(focal.replaceAll(',', '.'));
        const parsedAR = Number(aspectRatio.replaceAll(',', '.')) || 1;

        const result = ((parsedFocal * fromData.crop_factor) / toData.crop_factor) * parsedAR;

        this.output.class = 'text-emerald-600';
        this.output.text = `Equivalent focal length for ${to}: `
        + `${parseFloat(Math.round(result * 100) / 100).toFixed(0)}mm.`;
      }
    },
  },
};
</script>
