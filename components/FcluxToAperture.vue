<template>
  <div>
    <div class="row">
      <h3>FC/LUX &mdash;&gt; Aperture</h3>
    </div>
    <form>
      <div class="row">
        <div class="col-5 col-md-3 mt-2">
          ISO:&nbsp;
        </div>
        <div class="col-7 col-md-3 d-block mt-2">
          <input
            v-model="input.iso"
            class="inp form-control"
            type="number"
            required="required"
            value=""
          >
        </div>
        <div class="col-5 col-md-3 mt-2">
          FPS:&nbsp;
        </div>
        <div class="col-7 col-md-3 d-block mt-2">
          <select v-model="input.fps" class="inp form-control">
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
      <div class="row">
        <div class="col-5 col-md-3 mt-2">
          Footcandle:
        </div>
        <div class="col-7 col-md-3 d-block mt-2">
          <input
            v-model="input.fc"
            class="inp form-control"
            type="number"
            value=""
          >
        </div>
        <div class="col-5 col-md-3 mt-2">
          Lux:
        </div>
        <div class="col-7 col-md-3 d-block mt-2">
          <input
            v-model="input.lux"
            class="inp form-control"
            type="number"
            value=""
          >
        </div>
      </div>
      <div class="d-block mt-2">
        <p>We are using 180 degree shutter.</p>
        <p><strong :class="output.class">{{ output.text }}</strong></p>
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
        text: '',
      },
      input: {
        fps: '',
        iso: '',
        fc: '',
        lux: '',
      },
    };
  },
  watch: {
    input: {
      handler() {
        this.calculate();
      },
      deep: true,
    },
  },
  methods: {
    calculate() {
      const {
        fps, iso, fc, lux,
      } = this.input;
      let fpsConst;
      // validate FC and Lux
      if (!fc && !lux) {
        this.output.class = 'text-danger';
        this.output.text = 'Please fill the footcandle OR lux';
      } else {
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
        }
        // Now we calculate hard!
        if (intensity) {
          const result = (1 / (2 * Number(fps))) * intensity * fpsConst * Number(iso.replaceAll(',', '.'));
          this.output.class = 'text-success';
          this.output.text = `Your aperture needs to be: f/${parseFloat(Math.round(result * 100) / 100).toFixed(2)}`;
        } else {
          this.output.class = 'text-warning';
          this.output.text = 'Some error happened.';
        }
      }
    },
  },
};
</script>
