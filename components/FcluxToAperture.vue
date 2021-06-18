<template>
  <div>
    <div class="block">
      <h3 class="text-3xl">
        FC/LUX &mdash;&gt; Aperture
      </h3>
    </div>
    <form>
      <div class="flex flex-col md:flex-row items-center py-2">
        <div class="flex-1">
          ISO:&nbsp;
        </div>
        <div class="flex-2 mx-4">
          <input
            v-model="input.iso"
            class="w-full rounded-lg border-2 dark:border-gray-800 border-gray-200 focus:border-indigo-600 ring-0 focus:ring-1 ring-indigo-600 dark:focus:border-indigo-400 dark:ring-indigo-400 px-4 py-2 dark:bg-gray-800"
            type="number"
            required
            value=""
          >
        </div>
        <div class="flex-1">
          FPS:&nbsp;
        </div>
        <div class="flex-2 mx-4">
          <select
            v-model="input.fps"
            class="w-full rounded-lg border-2 dark:border-gray-800 border-gray-200 focus:border-indigo-600 ring-0 focus:ring-1 ring-indigo-600 dark:focus:border-indigo-400 dark:ring-indigo-400 px-4 py-2 dark:bg-gray-800"
          >
            <option>24</option>
            <option>25</option>
            <option>30</option>
            <option>48</option>
            <option>50</option>
            <option>60</option>
            <option>96</option>
            <option>100</option>
            <option>120</option>
          </select>
        </div>
      </div>
      <div class="flex flex-col md:flex-row py-2 items-center">
        <div class="flex-1">
          Footcandle:
        </div>
        <div class="flex-2 mx-4">
          <input
            v-model="input.fc"
            class="w-full rounded-lg border-2 dark:border-gray-800 border-gray-200 focus:border-indigo-600 ring-0 focus:ring-1 ring-indigo-600 dark:focus:border-indigo-400 dark:ring-indigo-400 px-4 py-2 dark:bg-gray-800"
            type="number"
            value=""
          >
        </div>
        <div class="flex-1">
          Lux:
        </div>
        <div class="flex-2 mx-4">
          <input
            v-model="input.lux"
            class="w-full rounded-lg border-2 dark:border-gray-800 border-gray-200 focus:border-indigo-600 ring-0 focus:ring-1 ring-indigo-600 dark:focus:border-indigo-400 dark:ring-indigo-400 px-4 py-2 dark:bg-gray-800"
            type="number"
            value=""
          >
        </div>
      </div>
      <div class="my-2 block">
        <p>We are using 180 degree shutter.</p>
        <p>
          <strong :class="output.class">{{ output.text }}</strong>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      output: {
        class: '',
        text: ''
      },
      input: {
        fps: 24,
        iso: '',
        fc: '',
        lux: ''
      }
    };
  },
  watch: {
    input: {
      handler() {
        this.calculate();
      },
      deep: true
    }
  },
  methods: {
    calculate() {
      const {fps, iso, fc, lux} = this.input;
      let fpsConst;
      // Validate FC and Lux
      if (!fc && !lux) {
        this.output.class = 'text-red-600';
        this.output.text = 'Please fill the footcandle OR lux';
        return;
      }

      if (!fps) {
        this.output.class = 'text-red-600';
        this.output.text = 'Please pick the FPS number';
        return;
      }

      let intensity;
      // Checking the user input
      if (!fc && lux) {
        intensity = Number(lux.replaceAll(',', '.')) / 10.764;
      } else if (fc && !lux) {
        intensity = Number(fc.replaceAll(',', '.'));
      } else if (fc && lux) {
        intensity = Number(fc.replaceAll(',', '.'));
      }

      // Checking the fps
      if (fps === '24' || fps === '48' || fps === '96') {
        fpsConst = 0.009696;
      } else if (fps === '25' || fps === '50' || fps === '100') {
        fpsConst = 0.0099;
      } else if (fps === '30' || fps === '60' || fps === '120') {
        fpsConst = 0.01086;
      } else {
        fpsConst = 0.009696;
      }

      // Now we calculate hard!
      if (intensity) {
        const result =
            (1 / (2 * Number(fps))) * intensity * fpsConst * Number(iso.replaceAll(',', '.'));
        this.output.class = 'text-emerald-600';
        this.output.text = `Your aperture needs to be: f/${parseFloat(
          Math.round(result * 100) / 100
        ).toFixed(2)}`;
      } else {
        this.output.class = 'text-yellow-600';
        this.output.text = 'Some error happened.';
      }
    }

  }
};
</script>
