<template lang="pug">
div
    .body.container
        .row
            h2 Footcandle/Lux within distance
        form
            .row
                .col-4.mt-2 Select category:
                .col-8.mt-2
                    select.inp3.form-control#type(v-on:change="lightsUpdate")
                        option LED
                        option HMI
                        option Tungsten
                        option Fluorescent
            .row
                .col-4.mt-2 Select lights:
                .col-8.mt-2
                    select.inp3.form-control#lightname(v-on:change="CalculatePhotometrics")
                        option(v-for="item in LightNameList" :key="item.Light_Name") {{item.Light_Name}}
            .row
                .col-4.mt-2 Object distance (in meter):
                .col-8.mt-2
                    input.inp3.form-control(
                        id="distance"
                        type="number"
                        v-on:change="CalculatePhotometrics"
                    )
            .d-block.mt-2
                span(v-html="output")
        .row.mt-3
            button.btn.btn-block.btn-outline-primary(
                type="button"
                v-on:click="toggleLightDetail"
                v-html="textLightDetail"
            )
        .row.mt-3(v-bind:class="{'d-none': isLightDetail}")
            .card.bg-light.p-3.d-block.lightdetail
                span(v-html="LightDetail")
</template>

<script>
import axios from 'axios';
import $lodash from 'lodash';

export default {
  components: {
    
  },
  data: function() {
      return {
          LightNameList: [],
          LightDataList: [],
          output: '',
          textLightDetail: `Click here if you're interested on the light's detail`,
          isLightDetail: true,
          LightDetail: ''
      }
  },
  methods: {
      toggleLightDetail: function() {
          this.isLightDetail = !this.isLightDetail;
          this.textLightDetail = this.isLightDetail ? `Click here if you're interested on the light's detail` : `Click here to hide the details`;
      },
      lightsUpdate: function() {
          let LightType = $("#type").val();
          // Find light name from existing data in LightDataList
          this.LightNameList = $lodash.chain(this.LightDataList)
                                    .filter(['Type', LightType])
                                    .map(Lights => _.omit(Lights, ['Type', 'Style', 'Color_Temp', 'Beam_Angle', 'Tungsten', 'Daylight', 'Spot_Diameter','Watts','Battery_Plate','Dimmable','CRI','TLCI','Voltage','Amps','Imperial_Measurement','Metric_Measurement','Flicker_Free', 'Ballast', 'Remote_Control']))
                                    .value();
      },
      CalculatePhotometrics: function() {
        let distance = parseInt($("#distance").val()) * 3.281;
        let LightName = $("#lightname").val();

        // Check if object distance input is true
        if (distance == "" || distance == null || distance == undefined) {
            this.output = `<strong class="text-warning">Please fill object distance number</strong>`;
            this.LightDetail = `<p>Please put some number in object distance</p>`;
        } else if (distance != "") {
            // Find the LightData via lodash
            let LightData = $lodash.chain(this.LightDataList)
                                    .find(['Light_Name', LightName])
                                    .value()
            let LightColorTemp = '';
            if (LightData.Tungsten[0].FC === "n/a") {
                // Daylight only
                LightColorTemp = "Daylight only";
                let DaylightFC = isNaN(LightData.Daylight[0].FC) ? LightData.Daylight[0].FC.replace(/,/g, '') : LightData.Daylight[0].FC;
                let LightDaylight = (DaylightFC * 25) / (distance ** 2);
                LightDaylight = parseFloat(Math.round(LightDaylight * 100) / 100).toFixed(0);
                this.output = `<strong class="text-success">You will get ${LightDaylight} footcandle or ` + parseFloat(Math.round(LightDaylight * 10.764 * 100) / 100).toFixed(0) + ` lux.</strong>`;
            } else if (LightData.Daylight[0].FC === "n/a") {
                // Tungsten only
                LightColorTemp = "Tungsten only";
                let TungstenFC = isNaN(LightData.Tungsten[0].FC) ? LightData.Tungsten[0].FC.replace(/,/g, '') : LightData.Tungsten[0].FC;
                let LightTungsten = (TungstenFC * 25) / (distance ** 2);
                LightTungsten = parseFloat(Math.round(LightTungsten * 100) / 100).toFixed(0);
                this.output = `<strong class="text-success">You will get ${LightTungsten} footcandle or ` + parseFloat(Math.round(LightTungsten * 10.764 * 100) / 100).toFixed(0) + ` lux.</strong>`;
            } else {
                // Both daylight and tungsten
                LightColorTemp = "Bicolor";
                let DaylightFC = isNaN(LightData.Daylight[0].FC) ? LightData.Daylight[0].FC.replace(/,/g, '') : LightData.Daylight[0].FC;
                let LightDaylight = (DaylightFC * 25) / (distance ** 2);
                LightDaylight = parseFloat(Math.round(LightDaylight * 100) / 100).toFixed(0);
                let TungstenFC = isNaN(LightData.Tungsten[0].FC) ? LightData.Tungsten[0].FC.replace(/,/g, '') : LightData.Tungsten[0].FC;
                let LightTungsten = (TungstenFC * 25) / (distance ** 2);
                LightTungsten = parseFloat(Math.round(LightTungsten * 100) / 100).toFixed(0);
                this.output = `<strong class="text-success">You will get ${LightDaylight} footcandle or ` + parseFloat(Math.round(LightDaylight * 10.764 * 100) / 100).toFixed(0) + ` lux for daylight color temperature.
                                <br>and ${LightTungsten} footcandle or ` + parseFloat(Math.round(LightTungsten * 10.764 * 100) / 100).toFixed(0) + ` lux for tungsten color temperature.</strong>`;
            }
            
            // Light Detail for nerds
            this.LightDetail = `<ul><li>Light name: ${LightData.Light_Name}</li>
                                <li>Light style: ${LightData.Style}</li>
                                <li>Color temperature: ${LightData.Color_Temp} (${LightColorTemp})</li>
                                <li>Watts: ${LightData.Watts} (${LightData.Amps[0]['120V']} amps)</li>
                                <li>Battery plate: ${LightData.Battery_Plate}</li>
                                <li>Dimmable: ${LightData.Dimmable}</li>
                                <li>CRI: ${LightData.CRI}</li>
                                <li>TLCI: ${LightData.TLCI}</li>
                                <li>Weight: ${LightData.Metric_Measurement[0].Weight} kg / ${LightData.Imperial_Measurement[0].Weight} pounds</li>
                                </ul>`;

        } else {
            this.output = `<strong class="text-danger>Some error happened for the calculation</strong>`
        }
      }
  },
  async created() {
    const config = {
        headers: {
            Accept: 'application/json'
        }
    }
    // 
    try {
      const response = await axios.get(`https://api.npoint.io/5c6005c5820933adf98e/Photometrics`, config);
      // https://api.jsonbin.io/b/5ec4209e18c8475bf16c4b0f <-- alternative, but limited usage
      // https://api.npoint.io/5c6005c5820933adf98e  <-- current use
      this.LightDataList = $lodash.chain(response.data).value()
      
    } catch (error) {
      console.log("Error during axios: " + error);
    }
  }
}
</script>

<style lang="stylus">
.card 
    width:100% !important
</style>