<template>
  <div>
    <div class="block">
      <h3 class="text-3xl">
        Aperture &mdash;&gt; FC/LUX
      </h3>
    </div>
    <form>
      <div class="flex flex-col md:flex-row items-center py-2">
        <div class="flex-1">
          Aperture:&nbsp;
        </div>
        <div class="flex-2 mx-4">
          <input
            v-model="input.aperture"
            class="w-full rounded-lg border-2 dark:border-gray-800 border-gray-200 focus:border-indigo-600 ring-0 focus:ring-1 ring-indigo-600 dark:focus:border-indigo-400 dark:ring-indigo-400 px-4 py-2 dark:bg-gray-800"
            type="number"
            required="required"
          >
        </div>
        <div class="flex-1">
          FPS:&nbsp;
        </div>
        <div class="flex-2 mx-4">
          <select
            v-model="input.fps"
            class="w-full rounded-lg border-2 dark:border-gray-800 border-gray-200 focus:border-indigo-600 ring-0 focus:ring-1 ring-indigo-600 dark:focus:border-indigo-400 dark:ring-indigo-400 dark:bg-gray-800 px-4 py-2"
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
      <div class="flex flex-col md:flex-row items-center md:w-1/2 py-2">
        <div class="flex-1">
          ISO:
        </div>
        <div class="flex-2 mx-4">
          <input
            v-model="input.iso"
            class="w-full rounded-lg border-2 dark:border-gray-800 border-gray-200 focus:border-indigo-600 ring-0 focus:ring-1 ring-indigo-600 dark:focus:border-indigo-400 dark:ring-indigo-400 px-4 py-2 dark:bg-gray-800"
            type="number"
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
        iso: '',
        aperture: '',
        fps: 24
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
      const {iso, aperture, fps} = this.input;
      let fpsConst;
      // Validate FC and Lux
      if (!iso && !aperture) {
        this.output.class = 'text-red-600';
        this.output.text = 'Please fill the ISO and Aperture number';
        return;
      }

      if (!fps) {
        this.output.class = 'text-red-600';
        this.output.text = 'Please pick the FPS number';
        return;
      }

      // Checking the fps
      if (fps === '24' || fps === '48' || fps === '96') {
        fpsConst = 0.009696;
      } else if (fps === '25' || fps === '50' || fps === '100') {
        fpsConst = 0.0099;
      } else if (fps === '30' || fps === '60' || fps === '120') {
        fpsConst = 0.01086;
      }

      // Now we calculate hard!
      if (fpsConst) {
        const fc =
            Number(aperture.replaceAll(',', '.')) /
            ((1 / (2 * Number(fps))) * Number(iso.replaceAll(',', '.')) * fpsConst);
        const lux = fc * 10.764;
        this.output.class = 'text-emerald-600';
        this.output.text =
            `You need: ${parseFloat(Math.round(fc * 100) / 100).toFixed(2)} footcandle ` +
            `and ${parseFloat(Math.round(lux * 100) / 100).toFixed(2)} lux.`;
      }
    }
  }
};
</script>
