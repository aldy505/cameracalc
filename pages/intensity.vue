<template lang="pug">
div
    - var fps = [ '24', '25', '30', '48', '50', '60', '72', '75', '90', '96', '100', '120']
    //- button fc -> aperture or aperture -> fc
    button.btn#btnSwitch(
        type="button"
        class="btn-danger"
        v-on:click="changeButtonColor"
    ) Switch

    div(v-if="this.btnSwitchState === false") 
        h2 FC/Lux -&gt; Aperture
        form.form-inline
            .row
                .form-group.col
                    .col-sm-3.col-md-3 ISO&nbsp;
                    .col-sm-9.col-md-4
                        input.f1.form-control(
                            type="number"
                            id="iso"
                            required
                        )
                .form-group.col
                    .col-sm-3.col-md-3 FPS&nbsp;
                    .col-sm-9.col-md-4
                        select.f1.form-control#fps(required)
                            
                            each item in fps
                                option= item
            .row
                .form-group.col
                    .col-sm-3.col-md-3 Footcandle&nbsp;
                    .col-sm-9.col-md-4
                        input.f1.form-control(
                            type="number"
                            id="fc"
                        )
                .form-group.col
                    .col-sm-3.col-md-3 Lux&nbsp;
                    .col-sm-9.col-md-4
                        input.f1.form-control(
                            type="number"
                            id="lux"
                        )
            .row
                .col
                    p Your aputure needs to be (on 180 degree shutter): 
                    //strong {{f1-result}}
    div(v-else)
        h2 Aperture -&gt; FC/Lux
        form
            .row
                .form-group.col
                    .col-sm-3.col-md-3 ISO&nbsp;
                    .col-sm-9.col-md-4
                        input.f2.form-control(
                            type="number"
                            id="iso"
                            required
                        )
                .form-group.col
                    .col-sm-3.col-md-3 FPS&nbsp;
                    .col-sm-9.col-md-4
                        select.f2.form-control#fps(required)
                            each item in fps
                                option= item
            .row
                .form-group.col
                    .col-sm-3.col-md-3 Aperture&nbsp;
                    .col-sm-9.col-md-4
                        input.f2.form-control(
                            type="number"
                            id="fc"
                        )
            .row
                .col
                    p Your light intensity needs to be (on 180 degree shutter): 
                    //strong {{f2-result}}

</template>

<script>
export default {
    data: {
        btnSwitchState: false,
    },
    methods: {
        changeButtonColor: function(event) {
            let el = document.querySelector('#btnSwitch');
            el.classList.toggle("btn-danger");
            el.classList.toggle("btn-success");
            this.btnSwitchState = !this.btnSwitchState;
            console.log(this.btnSwitchState);
        }
    }
}
</script>

<style lang="stylus" scoped>
div.row
    padding: 5px 0
</style>