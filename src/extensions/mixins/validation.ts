import Vue from "vue";

export default Vue.extend({
    data() {
        return {
            valido: true
        }
    },
    methods: {
        checkData():void {
            //@ts-ignore
            if (this.$v.$invalid) {
                this.valido = false;
            } else {
                this.valido = true;
            }
        },
        
    }
})
