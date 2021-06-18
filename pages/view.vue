<template>
  <div class="container mx-auto">
    <div class="block">
      <h2 class="text-3xl">
        Field of View
      </h2>
    </div>
    <form>
      <div class="flex flex-col lg:flex-row items-center py-2">
        <div class="flex-1 w-full">
          <div class="flex flex-row items-center py-2">
            <div class="flex-1">
              Focal Length:&nbsp;
            </div>
            <div class="flex-2 mx-4">
              <input
                v-model="input.focalLength"
                class="w-full rounded-lg border-2 dark:border-gray-800 border-gray-200 focus:border-indigo-600 ring-0 focus:ring-1 ring-indigo-600 dark:focus:border-indigo-400 dark:ring-indigo-400 px-4 py-2 dark:bg-gray-800"
                type="number"
                required="required"
              >
            </div>
          </div>
        </div>

        <div class="flex-1 w-full">
          <div class="flex flex-row items-center py-2">
            <div class="flex-1">
              Camera Sensor:&nbsp;
            </div>
            <div class="flex-2 mx-4">
              <select
                v-model="input.cameraSensor"
                class="w-full rounded-lg border-2 dark:border-gray-800 border-gray-200 focus:border-indigo-600 ring-0 focus:ring-1 ring-indigo-600 dark:focus:border-indigo-400 dark:ring-indigo-400 dark:bg-gray-800 px-4 py-2"
              >
                <option value="1">
                  Full-frame
                </option>
                <option value="1.5">
                  APS / Super35
                </option>
                <option value="2">
                  Micro Four Thids
                </option>
              </select>
            </div>
          </div>
        </div>

        <div class="flex-1 w-full">
          <div class="flex flex-row items-center py-2">
            <div class="flex-1">
              Distance (meters):&nbsp;
            </div>
            <div class="flex-2 mx-4">
              <input
                v-model="input.distance"
                class="w-full rounded-lg border-2 dark:border-gray-800 border-gray-200 focus:border-indigo-600 ring-0 focus:ring-1 ring-indigo-600 dark:focus:border-indigo-400 dark:ring-indigo-400 px-4 py-2 dark:bg-gray-800"
                type="number"
                required="required"
              >
            </div>
          </div>
        </div>
      </div>
      <div class="my-2 block">
        <p><strong :class="output.class">{{ output.text }}</strong></p>
        <p><strong :class="output.class">{{ output.hFOV }}</strong></p>
        <p><strong :class="output.class">{{ output.vFOV }}</strong></p>
        <p><strong :class="output.class">{{ output.hAOV }}</strong></p>
        <p><strong :class="output.class">{{ output.vAOV }}</strong></p>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: {
        focalLength: '',
        cameraSensor: 1,
        distance: 1,
      },
      output: {
        class: '',
        text: '',
        hFOV: '',
        vFOV: '',
        hAOV: '',
        vAOV: '',
      },
    };
  },
  watch: {
    input: {
      handler() {
        this.calculateView();
      },
      deep: true,
    },
  },
  methods: {
    calculateView() {
      const {focalLength, cameraSensor, distance} = this.input;

      if (!focalLength) {
        this.output.class = 'text-red-600';
        this.output.text = 'Please fill in focal length number';
      }

      if (!distance) {
        this.output.class = 'text-red-600';
        this.output.text = 'Please fill in distance number';
      }

      if (!cameraSensor) {
        this.output.class = 'text-red-600';
        this.output.text = 'Please fill desired camera sensor';
      }

      const width = 36;
      const height = 20.25;

      const horizontalAOV = this.angleOfView(width / Number(cameraSensor), this.parseStringToNumber(focalLength));
      const verticalAOV = this.angleOfView(height / Number(cameraSensor), this.parseStringToNumber(focalLength));

      const horizontalFOV = this.fieldOfView(horizontalAOV, this.parseStringToNumber(distance));
      const verticalFOV = this.fieldOfView(verticalAOV, this.parseStringToNumber(distance));

      this.output.class = 'text-emerald-600';
      this.output.text = 'You will have:';
      this.output.hFOV = `Horizontal Field of View: ${this.roundNumber(horizontalFOV)} meters`;
      this.output.vFOV = `Vertical Field of View: ${this.roundNumber(verticalFOV)} meters`;
      this.output.hAOV = `Horizontal Angle of View: ${this.roundNumber(horizontalAOV)}°`;
      this.output.vAOV = `Vertical Angle of View: ${this.roundNumber(verticalAOV)}°`;
    },
    angleOfView(sensorWidth, focalLength) {
      return 2 * (Math.atan(sensorWidth / (2 * focalLength)) * (180 / Math.PI));
    },
    fieldOfView(angleOfView, distance) {
      return 2 * (Math.tan((angleOfView / 2) * distance));
    },
    parseStringToNumber(payload) {
      switch (typeof payload) {
        case 'string':
          return Number(payload.replaceAll(',', ''));
        default:
          return payload;
      }
    },
    roundNumber(payload) {
      return Math.round(payload * 100) / 100;
    },
  },
};
</script>
