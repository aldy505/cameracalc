<template>
    <div class="container">
      <div class="row">
        <h2>File size from certain format</h2>
      </div>
      <form>
        <div class="row">
          <div class="col-4 mt-2">
            Select format:
          </div>
          <div class="col-8 mt-2">
            <select
              v-model="input.format"
              class="inp6 form-control"
              @change="CalculateFileSize"
            >
              <option v-for="item in FileSizeData" :key="item.Format">
                {{ item.Format }}
              </option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col-4 col-md-2 mt-2">
            FPS:
          </div>
          <div class="col-8 col-md-4 mt-2">
            <select
              v-model="input.fps"
              class="inp6 form-control"
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
          <div class="col-4 col-md-2 mt-2">
            Resolution:
          </div>
          <div class="col-8 col-md-4 mt-2">
            <select
              v-model="input.resolution"
              class="inp6 form-control"
            >
              <option
                v-for="resolution in resolutions"
                :key="resolution.id"
                :value="resolution.value"
              >
                {{ resolution.text }}
              </option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col-4 mt-2">
            Duration:
          </div>
          <div class="col-4 mt-2">
            <input
              v-model="input.duration"
              class="inp6 form-control"
              type="number"
            >
          </div>
          <div class="col-4 mt-2">
            <select
              v-model="input.unit"
              class="inp6 form-control"
            >
              <option
                v-for="duration in durations"
                :key="duration.id"
                :value="duration.value"
              >
                {{ duration.text }}
              </option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="d-block mt-2">
            <strong>{{ output }}</strong>
          </div>
        </div>
      </form>
    </div>
</template>

<script>
// eslint-disable-next-line import/no-unresolved
import file from '~/assets/file.json';

export default {
  asyncData() {
    const dataList = file;
    return { dataList };
  },
  data() {
    return {
      resolutions: [
        { id: 1, text: 'Full HD (1920 × 1080)', value: '1' },
        { id: 2, text: '2K 16:9 (2048 × 1152)', value: '1.1377' },
        { id: 3, text: 'Ultra HD (3840 × 2160)', value: '4' },
        { id: 4, text: 'Retina 5K (5120 × 2880)', value: '7.1111' },
        { id: 5, text: '6K (6144 × 3456)', value: '10.24' },
        { id: 6, text: '8K (7680 × 4320)', value: '16' },
      ],
      durations: [
        { id: 1, text: 'Hours', value: 'h' },
        { id: 2, text: 'Minutes', value: 'm' },
        { id: 3, text: 'Seconds', value: 's' },
      ],
      output: '',
      input: {
        format: '',
        fps: '',
        resolution: '',
        duration: '',
        unit: '',
      },
    };
  },
  watch: {
    input: {
      handler() {
        this.CalculateFileSize();
      },
      deep: true,
    },
  },
  methods: {
    CalculateFileSize() {
      // Get value from forms
      const {
        format, fps, resolution, duration, unit,
      } = this.input;
      let durationInSecond = Number(duration.replaceAll(',', '.'));

      if (!duration) {
        this.output = 'Please fill the duration input';
      } else {
        // Convert time to seconds
        if (unit === 'h') {
          durationInSecond *= 3600;
        } else if (unit === 'm') {
          durationInSecond *= 60;
        }

        const FPSConst = fps / 24;

        // Search specific format data
        const FormatData = this.dataList.filter((o) => o.Format === format);

        // File size = (Bitrate / FPS) * Time
        const Calculation = (FormatData['24-1080'] * resolution * FPSConst * durationInSecond) / 8;

        if (Calculation < 1000) {
          // MB
          const sizeInMB = (Math.round(Calculation * 100) / 100).toFixed(2);
          this.output = `The file size should be ${sizeInMB} MB`;
        } else if (Calculation <= 1000000) {
          // GB
          const sizeInGB = (Math.round((Calculation / 1000) * 100) / 100).toFixed(2);
          this.output = `The file size should be ${Calculation} MB / ${sizeInGB} GB`;
        } else if (Calculation > 1000000) {
          // TB
          const sizeInGB = (Math.round((Calculation / 1000) * 100) / 100).toFixed(2);
          const sizeInTB = (Math.round((Calculation / 1000000) * 100) / 100).toFixed(2);
          this.output = `The file size should be ${sizeInGB} GB / ${sizeInTB} TB`;
        }
      }
    },
  },
};
</script>
