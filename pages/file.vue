<template>
  <div class="body">
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
              id="format"
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
              id="fps"
              class="inp6 form-control"
              @change="CalculateFileSize"
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
              id="resolution"
              class="inp6 form-control"
              @change="CalculateFileSize"
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
              id="duration"
              class="inp6 form-control"
              type="number"
              @change="CalculateFileSize"
            >
          </div>
          <div class="col-4 mt-2">
            <select
              id="durationoption"
              class="inp6 form-control"
              @change="CalculateFileSize"
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
  </div>
</template>

<script>
import _ from 'lodash';
import $ from 'jquery';

export default {
  async asyncData({ $axios }) {
    try {
      const response = await $axios.get(
        'https://api.npoint.io/5c6005c5820933adf98e/FileSize',
        {
          headers: {
            Accept: 'appllication/json',
          },
        },
      );
      const FileSizeData = response.data;
      return { FileSizeData };
    } catch (err) {
      console.error(`Error during axios request: ${err}`);
    }
  },
  data() {
    return {
      FileSizeData: [],
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
    };
  },
  methods: {
    CalculateFileSize() {
      // Get value from forms
      const format = $('#format').val();
      const fps = $('#fps').val();
      const resolution = $('#resolution').val();
      let duration = $('#duration').val();
      const durationOption = $('#durationoption').val();
      let FormatData; let FPSConst; let
        Calculation;

      if (!duration) {
        this.output = 'Please fill the duration input';
      } else {
        // Convert time to seconds
        if (durationOption === 'h') {
          duration *= 3600;
        } else if (durationOption === 'm') {
          duration *= 60;
        }

        FPSConst = fps / 24;

        // Search specific format data
        FormatData = _.find(this.FileSizeData, ['Format', format]);

        // File size = (Bitrate / FPS) * Time
        Calculation = (FormatData['24-1080'] * resolution * FPSConst * duration) / 8;
        console.log(Calculation);
        if (Calculation < 1000) {
          // MB
          Calculation = (Math.round(Calculation * 100) / 100).toFixed(2);
          this.output = `The file size should be ${Calculation} MB`;
        } else if (Calculation <= 1000000) {
          // GB
          const CalculationGB = (
            Math.round((Calculation / 1000) * 100) / 100
          ).toFixed(2);
          this.output = `The file size should be ${Calculation} MB / ${CalculationGB} GB`;
        } else if (Calculation > 1000000) {
          // TB
          const CalculationGB = (
            Math.round((Calculation / 1000) * 100) / 100
          ).toFixed(2);
          const CalculationTB = (
            Math.round((Calculation / 1000000) * 100) / 100
          ).toFixed(2);
          this.output = `The file size should be ${CalculationGB} GB / ${CalculationTB} TB`;
        }
      }
    },
  },
};
</script>
