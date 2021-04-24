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
            <select id="type" class="inp3 form-control" @change="lightsUpdate">
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
              id="lightname"
              class="inp3 form-control"
              @change="CalculatePhotometrics"
            >
              <option v-for="item in LightNameList" :key="item.Light_Name">
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
              id="distance"
              class="inp3 form-control"
              type="number"
              @change="CalculatePhotometrics"
            >
          </div>
        </div>
        <div class="d-block mt-2">
          <strong :class="outputClass">{{ outputText }}</strong>
        </div>
      </form>
      <div class="row mt-3">
        <button
          class="btn btn-block btn-outline-primary"
          type="button"
          @click="toggleLightDetail"
        >
          {{ textLightDetail }}
        </button>
      </div>
      <div class="row mt-3" :class="{ 'd-none': isLightDetail }">
        <div class="card bg-light p-3 d-block lightdetail">
          <div v-show="!LightDetailStatus" :key="LightDetailStatus">
            <p>Please put some number in object distance</p>
          </div>
          <div v-show="LightDetailStatus" :key="LightDetailStatus">
            <ul>
              <li>Light name: {{ LightDetail.name }}</li>
              <li>Light style: {{ LightDetail.style }}</li>
              <li>Color temperature: {{ LightDetail.colorTemp }} ({{ LightDetail.colorStyle }})</li>
              <li>Watts: {{ LightDetail.watts }} ({{ LightDetail.amps }} amps)</li>
              <li>Battery plate: {{ LightDetail.battery }}</li>
              <li>Dimmable: {{ LightDetail.dimmable }}</li>
              <li>CRI: {{ LightDetail.cri }}</li>
              <li>TLCI: {{ LightDetail.tlci }}</li>
              <li>Weight: {{ LightDetail.wKilo }} kg / {{ LightDetail.wPounds }} pounds</li>
            </ul>
          </div>
        </div>
      </div>
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
        'https://api.npoint.io/5c6005c5820933adf98e/Photometrics',
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );
      // https://api.jsonbin.io/b/5ec4209e18c8475bf16c4b0f <-- alternative, but limited usage
      // https://api.npoint.io/5c6005c5820933adf98e  <-- current use
      const LightDataList = response.data;
      return { LightDataList };
    } catch (err) {
      console.log(`Error during axios request: ${err}`);
    }
  },
  data() {
    return {
      LightNameList: [],
      LightDataList: [],
      outputClass: '',
      outputText: '',
      textLightDetail: 'Click here if you\'re interested on the light\'s detail',
      isLightDetail: true,
      LightDetailStatus: false,
      LightDetail: {
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
    };
  },
  methods: {
    toggleLightDetail() {
      this.isLightDetail = !this.isLightDetail;
      this.textLightDetail = this.isLightDetail
        ? 'Click here if you\'re interested on the light\'s detail'
        : 'Click here to hide the details';
    },
    lightsUpdate() {
      const LightType = $('#type').val();
      // Find light name from existing data in LightDataList
      this.LightNameList = _.chain(this.LightDataList)
        .filter(['Type', LightType])
        .map((Lights) => _.omit(Lights, [
          'Type',
          'Style',
          'Color_Temp',
          'Beam_Angle',
          'Tungsten',
          'Daylight',
          'Spot_Diameter',
          'Watts',
          'Battery_Plate',
          'Dimmable',
          'CRI',
          'TLCI',
          'Voltage',
          'Amps',
          'Imperial_Measurement',
          'Metric_Measurement',
          'Flicker_Free',
          'Ballast',
          'Remote_Control',
        ]))
        .value();
    },
    CalculatePhotometrics() {
      const distance = parseInt($('#distance').val()) * 3.281;
      const LightName = $('#lightname').val();

      // Check if object distance input is true
      if (!distance) {
        this.outputClass = 'text-warning';
        this.outputText = 'Please fill object distance number';
        this.LightDetail = 'Please put some number in object distance';
        this.LightDetailStatus = false;
      } else {
        // Find the LightData via lodash
        const LightData = _.chain(this.LightDataList)
          .find(['Light_Name', LightName])
          .value();
        let LightColorTemp;
        if (LightData.Tungsten[0].FC === 'n/a') {
          // Daylight only
          LightColorTemp = 'Daylight only';
          const DaylightFC = isNaN(LightData.Daylight[0].FC)
            ? LightData.Daylight[0].FC.replace(/,/g, '')
            : LightData.Daylight[0].FC;
          let LightDaylight = (DaylightFC * 25) / distance ** 2;
          LightDaylight = parseFloat(
            Math.round(LightDaylight * 100) / 100,
          ).toFixed(0);
          this.outputClass = 'text-success';
          this.outputText = `You will get ${LightDaylight} footcandle or ${parseFloat(Math.round(LightDaylight * 10.764 * 100) / 100).toFixed(0)} lux.`;
        } else if (LightData.Daylight[0].FC === 'n/a') {
          // Tungsten only
          LightColorTemp = 'Tungsten only';
          const TungstenFC = isNaN(LightData.Tungsten[0].FC)
            ? LightData.Tungsten[0].FC.replace(/,/g, '')
            : LightData.Tungsten[0].FC;
          let LightTungsten = (TungstenFC * 25) / distance ** 2;
          LightTungsten = parseFloat(
            Math.round(LightTungsten * 100) / 100,
          ).toFixed(0);
          this.outputClass = 'text-success';
          this.outputText = `You will get ${LightTungsten} footcandle or ${
            parseFloat(
              Math.round(LightTungsten * 10.764 * 100) / 100,
            ).toFixed(0)
          } lux.`;
        } else {
          // Both daylight and tungsten
          LightColorTemp = 'Bicolor';
          const DaylightFC = isNaN(LightData.Daylight[0].FC)
            ? LightData.Daylight[0].FC.replace(/,/g, '')
            : LightData.Daylight[0].FC;
          let LightDaylight = (DaylightFC * 25) / distance ** 2;
          LightDaylight = parseFloat(
            Math.round(LightDaylight * 100) / 100,
          ).toFixed(0);
          const TungstenFC = isNaN(LightData.Tungsten[0].FC)
            ? LightData.Tungsten[0].FC.replace(/,/g, '')
            : LightData.Tungsten[0].FC;
          let LightTungsten = (TungstenFC * 25) / distance ** 2;
          LightTungsten = parseFloat(
            Math.round(LightTungsten * 100) / 100,
          ).toFixed(0);
          this.outputClass = 'text-success';
          this.outputText = `You will get ${LightDaylight} footcandle or ${
            parseFloat(
              Math.round(LightDaylight * 10.764 * 100) / 100,
            ).toFixed(0)
          } lux for daylight color temperature and ${LightTungsten} footcandle or ${
            parseFloat(
              Math.round(LightTungsten * 10.764 * 100) / 100,
            ).toFixed(0)
          } lux for tungsten color temperature.`;
        }

        // Light Detail for nerds
        this.LightDetail = {
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
        this.LightDetailStatus = true;
      }
    },
  },
};
</script>

<style lang="stylus">
.card
    width:100% !important
</style>
