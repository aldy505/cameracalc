<template>
  <div>
    <div class="body container">
      <div class="row">
        <h2>Lens from sensor to sensor</h2>
      </div>
      <form>
        <div class="row">
          <div class="col-4 mt-2">
            From camera:
          </div>
          <div class="col-8 mt-2">
            <select
              v-model="input.from"
              class="inp4 form-control"
            >
              <option v-for="item in CameraList" :key="item.camera">
                {{ item.camera }}
              </option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col-4 mt-2">
            To camera:
          </div>
          <div class="col-8 mt-2">
            <select
              v-model="input.to"
              class="inp4 form-control"
            >
              <option v-for="item in dataList" :key="item.id">
                {{ item.camera }}
              </option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col-4 col-md-2 mt-2">
            Lens focal length:
          </div>
          <div class="col-8 col-md-4 mt-2">
            <input
              v-model="input.focal"
              class="form-control inp4"
              type="number"
            >
          </div>
          <div class="col-4 col-md-2 mt-2">
            Desired aspect ratio:
          </div>
          <div class="col-8 col-md-4 mt-2">
            <select
              v-model="input.aspectRatio"
              class="inp4 form-control"
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
        <div class="d-block mt-2">
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
        this.output.class = 'text-warning';
        this.output.text = 'Please fill in focal length number';
      } else {
        const fromData = this.dataList.filter((o) => o.camera === from);
        const toData = this.dataList.filter((o) => o.camera === to);

        const parsedFocal = Number(focal.replaceAll(',', '.'));
        const parsedAR = Number(aspectRatio.replaceAll(',', '.'));

        const result = ((parsedFocal * fromData.crop_factor) / toData.crop_factor) * parsedAR;

        this.output.class = 'text-success';
        this.output.text = `Equivalent focal length for ${to}: `
        + `${parseFloat(Math.round(result * 100) / 100).toFixed(0)}mm.`;
      }
    },
  },
};
</script>
