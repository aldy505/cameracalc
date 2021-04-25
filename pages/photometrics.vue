<template>
  <div>
    <div class="body container">
      <div class="row">
        <h2>Footcandle/Lux within distance</h2>
      </div>
      <form>
        <div class="row">
          <div class="col-4 mt-2">
            Select category:
          </div>
          <div class="col-8 mt-2">
            <select v-model="lightType" class="inp3 input-control" @change="lightsUpdate()">
              <option>LED</option>
              <option>HMI</option>
              <option>Tungsten</option>
              <option>Fluorescent</option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col-4 mt-2">
            Select lights:
          </div>
          <div class="col-8 mt-2">
            <select
              v-model="input.lightName"
              class="inp3 input-control"
            >
              <option v-for="item in content.lightName" :key="item.Light_Name">
                {{ item.Light_Name }}
              </option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col-4 mt-2">
            Object distance (in meters):
          </div>
          <div class="col-8 mt-2">
            <input
              v-model="input.distance"
              class="inp3 input-control"
              type="number"
            >
          </div>
        </div>
        <div class="d-block mt-2">
          <strong :class="output.class">{{ output.text }}</strong>
        </div>
      </form>
      <div class="row mt-3">
        <button
          class="btn btn-block btn-outline-primary"
          type="button"
          @click="toggleLightDetail()"
        >
          {{ textLightDetail }}
        </button>
      </div>
      <div class="row mt-3" :class="{ 'd-none': lightDetail.toggle }">
        <div class="card bg-light p-3 d-block lightdetail">
          <div v-show="!lightDetail.status" :key="lightDetail.status">
            <p>Please put some number in object distance</p>
          </div>
          <div v-show="lightDetail.status" :key="lightDetail.status">
            <ul>
              <li>Light name: {{ lightDetail.data.name }}</li>
              <li>Light style: {{ lightDetail.data.style }}</li>
              <li>Color temperature: {{ lightDetail.data.colorTemp }}
                ({{ lightDetail.data.colorStyle }})</li>
              <li>Watts: {{ LightDetail.watts }} ({{ lightDetail.data.amps }} amps)</li>
              <li>Battery plate: {{ lightDetail.data.battery }}</li>
              <li>Dimmable: {{ lightDetail.data.dimmable }}</li>
              <li>CRI: {{ lightDetail.data.cri }}</li>
              <li>TLCI: {{ lightDetail.data.tlci }}</li>
              <li>Weight: {{ lightDetail.data.wKilo }} kg /
                {{ lightDetail.data.wPounds }} pounds</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-unresolved
import photometrics from '~/assets/photometrics.json';

export default {
  asyncData() {
    const dataList = photometrics;
    return { dataList };
  },
  data() {
    return {
      lightType: '',
      input: {
        lightName: '',
        distance: '',
      },
      content: {
        lightName: [],
      },
      output: {
        class: '',
        text: '',
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
          wPounds: null,
        },
        status: false,
        toggle: true,
        text: 'Click here if you\'re interested on the light\'s detail',
      },
    };
  },
  watch: {
    input: {
      handler() {
        this.CalculatePhotometrics();
      },
      deep: true,
    },
  },
  methods: {
    toggleLightDetail() {
      this.lightDetail.toggle = !this.lightDetail.toggle;
      this.lightDetail.text = (this.lightDetail.status)
        ? 'Click here if you\'re interested on the light\'s detail'
        : 'Click here to hide the details';
    },
    lightsUpdate() {
      const { lightType } = this.input;
      this.content.lightName = this.dataList
        .filter((o) => o.Type === lightType)
        .map((o) => o.Light_Name);
    },
    getCurrentLightData(lightName) {
      for (let i = 0; i < this.dataList.length; i += 1) {
        const currentLightName = this.dataList.Light_Name;
        if (currentLightName === lightName) {
          return this.dataList[i];
        }
      }
      return null;
    },
    CalculatePhotometrics() {
      const { distance, lightName } = this.input;

      // Check if object distance input is true
      if (!distance) {
        this.output.class = 'text-warning';
        this.output.text = 'Please fill object distance number';
        this.LightDetail = 'Please put some number in object distance';
        this.lightDetail.status = false;
      } else {
        const LightData = this.getCurrentLightData(lightName);
        const parsedDistance = Number(distance.replaceAll(',', '.'));
        let LightColorTemp;

        if (LightData.Tungsten[0].FC === 'n/a') {
          // Daylight only
          LightColorTemp = 'Daylight only';

          const DaylightFC = Number.isNaN(LightData.Daylight[0].FC)
            ? LightData.Daylight[0].FC.replaceAll(',', '')
            : LightData.Daylight[0].FC;

          let LightDaylight = (Number(DaylightFC) * 25) / parsedDistance ** 2;
          LightDaylight = parseFloat(Math.round(LightDaylight * 100) / 100).toFixed(0);

          this.output.class = 'text-success';
          this.output.text = `You will get ${LightDaylight} footcandle `
            + `or ${parseFloat(Math.round(LightDaylight * 10.764 * 100) / 100).toFixed(0)} lux.`;
        } else if (LightData.Daylight[0].FC === 'n/a') {
          // Tungsten only
          LightColorTemp = 'Tungsten only';

          const TungstenFC = Number.isNaN(LightData.Tungsten[0].FC)
            ? LightData.Tungsten[0].FC.replaceAll(',', '')
            : LightData.Tungsten[0].FC;

          let LightTungsten = (TungstenFC * 25) / parsedDistance ** 2;
          LightTungsten = parseFloat(Math.round(LightTungsten * 100) / 100).toFixed(0);

          this.output.class = 'text-success';
          this.output.text = `You will get ${LightTungsten} footcandle `
            + `or ${parseFloat(Math.round(LightTungsten * 10.764 * 100) / 100).toFixed(0)} lux.`;
        } else {
          // Both daylight and tungsten
          LightColorTemp = 'Bicolor';

          const DaylightFC = Number.isNaN(LightData.Daylight[0].FC)
            ? LightData.Daylight[0].FC.replaceAll(',', '')
            : LightData.Daylight[0].FC;

          let LightDaylight = (DaylightFC * 25) / parsedDistance ** 2;
          LightDaylight = parseFloat(Math.round(LightDaylight * 100) / 100).toFixed(0);

          const TungstenFC = Number.isNaN(LightData.Tungsten[0].FC)
            ? LightData.Tungsten[0].FC.replaceAll(',', '')
            : LightData.Tungsten[0].FC;
          let LightTungsten = (TungstenFC * 25) / parsedDistance ** 2;
          LightTungsten = parseFloat(Math.round(LightTungsten * 100) / 100).toFixed(0);

          this.output.class = 'text-success';
          this.output.text = `You will get ${LightDaylight} footcandle `
            + `or ${parseFloat(Math.round(LightDaylight * 10.764 * 100) / 100).toFixed(0)} lux `
            + 'for daylight color temperature and '
            + `${LightTungsten} footcandle or `
            + `${parseFloat(Math.round(LightTungsten * 10.764 * 100) / 100).toFixed(0)} lux `
            + 'for tungsten color temperature.';
        }

        // Light Detail for nerds
        this.lightDetail.data = {
          name: LightData.Light_Name,
          style: LightData.Style,
          colorTemp: LightData.Color_Temp,
          colorStyle: LightColorTemp,
          watts: LightData.Watts,
          amps: LightData.Amps[0]['120V'],
          battery: LightData.Battery_Plate,
          dimmable: LightData.Dimmable,
          cri: LightData.CRI,
          tlci: LightData.TCLI,
          wKilo: LightData.Metric_Measurement[0].Weight,
          wPounds: LightData.Imperial_Measurement[0].Weight,
        };
        this.lightDetail.status = true;
      }
    },
  },
};
</script>
