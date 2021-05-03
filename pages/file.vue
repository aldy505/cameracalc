<template>
  <div class="container mx-auto">
    <div class="block">
      <h2 class="text-3xl">File size from certain format</h2>
    </div>
    <form>
      <div class="flex flex-col md:flex-row items-center py-2">
        <div class="flex-1">Select format:</div>
        <div class="flex-2 mx-4 w-full">
          <select
            v-model="input.format"
            class="w-full rounded-lg border-2 border-gray-200 focus:border-indigo-600 ring-0 focus:ring-1 ring-indigo-600 px-4 py-2"
          >
            <option v-for="item in dataList" :key="item.Format">
              {{ item.Format }}
            </option>
          </select>
        </div>
      </div>
      <div class="flex flex-col md:flex-row items-center py-2">
        <div class="flex-1">FPS:</div>
        <div class="flex-2">
          <select
            v-model="input.fps"
            class="w-full rounded-lg border-2 border-gray-200 focus:border-indigo-600 ring-0 focus:ring-1 ring-indigo-600 px-4 py-2"
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
        <div class="flex-1 px-4">Resolution:</div>
        <div class="flex-2 mx-4 w-full">
          <select
            v-model="input.resolution"
            class="w-full rounded-lg border-2 border-gray-200 focus:border-indigo-600 ring-0 focus:ring-1 ring-indigo-600 px-4 py-2"
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
      <div class="flex flex-col md:flex-row items-center py-2">
        <div class="flex-1">Duration:</div>
        <div class="flex-2 mx-4 w-full">
          <input
            v-model="input.duration"
            class="w-full rounded-lg border-2 border-gray-200 focus:border-indigo-600 ring-0 focus:ring-1 ring-indigo-600 px-4 py-2"
            type="number"
          />
        </div>
        <div class="flex-1 mx-4 w-full">
          <select
            v-model="input.unit"
            class="w-full rounded-lg border-2 border-gray-200 focus:border-indigo-600 ring-0 focus:ring-1 ring-indigo-600 px-4 py-2"
          >
            <option v-for="duration in durations" :key="duration.id" :value="duration.value">
              {{ duration.text }}
            </option>
          </select>
        </div>
      </div>
      <div class="block my-2">
        <strong :class="output.class">{{ output.text }}</strong>
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
    return {dataList};
  },
  data() {
    return {
      resolutions: [
        {id: 1, text: 'Full HD (1920 × 1080)', value: '1'},
        {id: 2, text: '2K 16:9 (2048 × 1152)', value: '1.1377'},
        {id: 3, text: 'Ultra HD (3840 × 2160)', value: '4'},
        {id: 4, text: 'Retina 5K (5120 × 2880)', value: '7.1111'},
        {id: 5, text: '6K (6144 × 3456)', value: '10.24'},
        {id: 6, text: '8K (7680 × 4320)', value: '16'},
      ],
      durations: [
        {id: 1, text: 'Hours', value: 'h'},
        {id: 2, text: 'Minutes', value: 'm'},
        {id: 3, text: 'Seconds', value: 's'},
      ],
      output: {
        class: '',
        text: '',
      },
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
      const {format, fps, resolution, duration, unit} = this.input;
      let durationInSecond = Number(duration.replaceAll(',', '.'));

      if (!duration) {
        this.output.text = 'Please fill the duration input';
        this.output.class = 'text-red-600';
      } else {
        // Convert time to seconds
        if (unit === 'h') {
          durationInSecond *= 3600;
        } else if (unit === 'm') {
          durationInSecond *= 60;
        }

        const FPSConst = Number(fps) / 24;

        // Search specific format data
        const FormatData = this.dataList.filter(o => o.Format === format);

        // File size = (Bitrate / FPS) * Time
        const Calculation =
          (Number(FormatData[0]['24-1080']) *
            Number(resolution || 1) *
            FPSConst *
            durationInSecond) /
          8;

        if (Calculation < 1000) {
          // MB
          const sizeInMB = Number
            .parseFloat(Math.round(Calculation * 100) / 100)
            .toFixed(2);
          this.output.text = `The file size should be ${sizeInMB} MB`;
          this.output.class = 'text-emerald-600';
        } else if (Calculation < 1000000) {
          // GB
          const sizeInMB = Number
            .parseFloat(Math.round(Calculation * 100) / 100)
            .toFixed(2);
          const sizeInGB = Number
            .parseFloat(Math.round((Calculation / 1000) * 100) / 100)
            .toFixed(2);
          this.output.text = `The file size should be ${sizeInMB} MB / ${sizeInGB} GB`;
          this.output.class = 'text-emerald-600';
        } else if (Calculation < 1000000000) {
          // TB
          const sizeInGB = Number
            .parseFloat(Math.round((Calculation / 1000) * 100) / 100)
            .toFixed(2);
          const sizeInTB = Number
            .parseFloat(Math.round((Calculation / 1000000) * 100) / 100)
            .toFixed(2);
          this.output.text = `The file size should be ${sizeInGB} GB / ${sizeInTB} TB`;
          this.output.class = 'text-emerald-600';
        } else if (Calculation >= 1000000000) {
          // PB
          const sizeInPB = Number
            .parseFloat(Math.round((Calculation / 1000000000) * 100) / 100)
            .toFixed(2);
          const sizeInTB = Number
            .parseFloat(Math.round((Calculation / 1000000) * 100) / 100)
            .toFixed(2);
          this.output.text = `The file size should be ${sizeInTB} TB / ${sizeInPB} PB`;
          this.output.class = 'text-emerald-600';
        }
      }
    },
  },
};
</script>
