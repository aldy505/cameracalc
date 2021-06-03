<template>
  <div>
    <div class="container mx-auto">
      <div class="block">
        <h2 class="text-3xl">
          Footcandle/Lux within distance
        </h2>
      </div>
      <form>
        <div class="flex flex-col md:flex-row items-center py-2">
          <div class="flex-1">
            Select category:
          </div>
          <div class="flex-2 w-full">
            <select
              v-model="lightType"
              class="w-full rounded-lg border-2 dark:bg-gray-800 dark:border-gray-800 border-gray-200 focus:border-indigo-600 ring-0 focus:ring-1 ring-indigo-600 dark:focus:border-indigo-400 dark:ring-indigo-400 px-4 py-2"
              @change="lightsUpdate()"
            >
              <option value="LED">
                LED
              </option>
              <option value="HMI">
                HMI
              </option>
              <option value="Tungsten">
                Tungsten
              </option>
              <option value="Fluorescent">
                Fluorescent
              </option>
            </select>
          </div>
        </div>
        <div class="flex flex-col md:flex-row items-center py-2">
          <div class="flex-1">
            Select lights:
          </div>
          <div class="flex-2 w-full">
            <select
              v-model="input.lightName"
              class="w-full rounded-lg border-2 dark:bg-gray-800 dark:border-gray-800 border-gray-200 focus:border-indigo-600 ring-0 focus:ring-1 ring-indigo-600 dark:focus:border-indigo-400 dark:ring-indigo-400 px-4 py-2"
            >
              <option
                v-for="item in content.lightName"
                :key="item.id"
              >
                {{ item.lightName }}
              </option>
            </select>
          </div>
        </div>
        <div class="flex flex-col md:flex-row items-center py-2">
          <div class="flex-1">
            Object distance (in meters):
          </div>
          <div class="flex-2 w-dull">
            <input
              v-model="input.distance"
              class="w-full rounded-lg border-2 dark:bg-gray-800 dark:border-gray-800 border-gray-200 focus:border-indigo-600 ring-0 focus:ring-1 ring-indigo-600 dark:focus:border-indigo-400 dark:ring-indigo-400 px-4 py-2"
              type="number"
            >
          </div>
        </div>
        <div class="my-2 block">
          <strong :class="output.class">{{ output.text }}</strong>
        </div>
      </form>
      <div class="row mt-3">
        <button
          class="border rounded-lg w-full px-8 py-2 border-blue-500 text-blue-700 hover:bg-blue-700 dark:focus:border-indigo-400 dark:ring-indigo-400 dark:hover:bg-blue-600 hover:text-white"
          type="button"
          @click="toggleLightDetail()"
        >
          {{ lightDetail.text }}
        </button>
      </div>
      <div
        class="my-2"
        :class="{hidden: lightDetail.toggle}"
      >
        <div class="block py-3">
          <div
            v-show="!lightDetail.status"
            :key="input.distance"
          >
            <p>Please put some number in object distance</p>
          </div>
          <div v-show="lightDetail.status">
            <ul>
              <li>Light name: {{ lightDetail.data.name }}</li>
              <li>Light style: {{ lightDetail.data.style }}</li>
              <li>
                Color temperature: {{ lightDetail.data.colorTemp }} ({{
                  lightDetail.data.colorStyle
                }})
              </li>
              <li>Watts: {{ lightDetail.data.watts }} ({{ lightDetail.data.amps }} amps)</li>
              <li>Battery plate: {{ lightDetail.data.battery }}</li>
              <li>Dimmable: {{ lightDetail.data.dimmable }}</li>
              <li>CRI: {{ lightDetail.data.cri }}</li>
              <li>TLCI: {{ lightDetail.data.tlci }}</li>
              <li>
                Weight: {{ lightDetail.data.wKilo }} kg / {{ lightDetail.data.wPounds }} pounds
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import photometrics from '~/assets/photometrics.json';

export default {
  asyncData() {
    const dataList = photometrics;
    return {dataList};
  },
  data() {
    return {
      lightType: '',
      input: {
        lightName: '',
        distance: ''
      },
      content: {
        lightName: []
      },
      output: {
        class: '',
        text: ''
      },
      lightDetail: {
        data: {
          name: null,
          style: null,
          colorTemp: null,
          colorStyle: null,
          watts: null,
          amps: null,
          battery: null,
          dimmable: null,
          cri: null,
          tlci: null,
          wKilo: null,
          wPounds: null
        },
        status: false,
        toggle: true,
        text: 'Click here if you\'re interested on the light\'s detail'
      }
    };
  },
  watch: {
    input: {
      handler() {
        this.calculatePhotometrics();
      },
      deep: true
    }
  },
  methods: {
    toggleLightDetail() {
      this.lightDetail.toggle = !this.lightDetail.toggle;
      this.lightDetail.text = this.lightDetail.toggle ?
        'Click here if you\'re interested on the light\'s detail' :
        'Click here to hide the details';
    },
    lightsUpdate() {
      const {lightType} = this;
      this.content.lightName = this.dataList
        .filter(o => o.Type === lightType)
        .map(o => ({lightName: o.Light_Name, id: o.id}));
    },
    getCurrentLightData(lightName) {
      for (let i = 0; i < this.dataList.length; i += 1) {
        const currentLightName = this.dataList[i].Light_Name;
        if (currentLightName === lightName) {
          return this.dataList[i];
        }
      }

      return null;
    },
    calculatePhotometrics() {
      const {distance, lightName} = this.input;

      if (!lightName) {
        this.output.class = 'text-yellow-600';
        this.output.text = 'Please select a light';
        this.LightDetail = 'Please select a light first';
        this.lightDetail.status = false;
        return;
      }

      // Check if object distance input is true
      if (!distance) {
        this.output.class = 'text-red-600';
        this.output.text = 'Please fill object distance number';
        this.LightDetail = 'Please put some number in object distance';
        this.lightDetail.status = false;
        return;
      }

      const LightData = this.getCurrentLightData(lightName);
      const parsedDistance = Number(distance.replaceAll(',', '.'));
      let LightColorTemp;

      if (LightData.Tungsten.FC === 'n/a') {
        // Daylight only
        LightColorTemp = 'Daylight only';

        const DaylightFC = this.parseStringToNumber(LightData.Daylight.FC);

        let LightDaylight = (Number(DaylightFC) * 25) / (parsedDistance ** 2);
        LightDaylight = Number.parseFloat(Math.round(LightDaylight * 100) / 100).toFixed(0);

        this.output.class = 'text-emerald-600';
        this.output.text =
            `You will get ${LightDaylight} footcandle ` +
            `or ${Number.parseFloat(Math.round(LightDaylight * 10.764 * 100) / 100).toFixed(
              0
            )} lux.`;
      } else if (LightData.Daylight.FC === 'n/a') {
        // Tungsten only
        LightColorTemp = 'Tungsten only';

        const TungstenFC = this.parseStringToNumber(LightData.Tungsten.FC);
        let LightTungsten = (TungstenFC * 25) / (parsedDistance ** 2);
        LightTungsten = Number.parseFloat(Math.round(LightTungsten * 100) / 100).toFixed(0);

        this.output.class = 'text-emerald-600';
        this.output.text =
            `You will get ${LightTungsten} footcandle ` +
            `or ${Number.parseFloat(Math.round(LightTungsten * 10.764 * 100) / 100).toFixed(
              0
            )} lux.`;
      } else {
        // Both daylight and tungsten
        LightColorTemp = 'Bicolor';

        const DaylightFC = this.parseStringToNumber(LightData.Daylight.FC);
        let LightDaylight = (DaylightFC * 25) / (parsedDistance ** 2);
        LightDaylight = Number.parseFloat(Math.round(LightDaylight * 100) / 100).toFixed(0);

        const TungstenFC = this.parseStringToNumber(LightData.Tungsten.FC);
        let LightTungsten = (TungstenFC * 25) / (parsedDistance ** 2);
        LightTungsten = Number.parseFloat(Math.round(LightTungsten * 100) / 100).toFixed(0);

        this.output.class = 'text-emerald-600';
        this.output.text =
            `You will get ${LightDaylight} footcandle ` +
            `or ${Number.parseFloat(Math.round(LightDaylight * 10.764 * 100) / 100).toFixed(
              0
            )} lux ` +
            'for daylight color temperature and ' +
            `${LightTungsten} footcandle or ` +
            `${Number.parseFloat(Math.round(LightTungsten * 10.764 * 100) / 100).toFixed(0)} lux ` +
            'for tungsten color temperature.';
      }

      // Light Detail for nerds
      this.lightDetail.data = {
        name: LightData.Light_Name,
        style: LightData.Style,
        colorTemp: LightData.Color_Temp,
        colorStyle: LightColorTemp,
        watts: LightData.Watts,
        amps: LightData.Amps['120V'],
        battery: LightData.Battery_Plate || 'n/a',
        dimmable: LightData.Dimmable || 'n/a',
        cri: LightData.CRI || 'n/a',
        tlci: LightData.TLCI || 'n/a',
        wKilo: LightData.Metric_Measurement.Weight,
        wPounds: LightData.Imperial_Measurement.Weight
      };
      this.lightDetail.status = true;
    },
    parseStringToNumber(payload) {
      switch (typeof payload) {
        case 'string':
          return Number(payload.replaceAll(',', ''));
        default:
          return payload;
      }
    }
  }

};
</script>
