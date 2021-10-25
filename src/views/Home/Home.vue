<template>
  <div>
    <h1>Welcome to the Mars Hover Mission Control !</h1>
    <form @submit.prevent="checkData">
      <input
        type="number"
        class="input"
        v-model="limit.x"
        placeholder="East limit"
        required
        min="1"
      />
      <input
        type="number"
        class="input"
        v-model="limit.y"
        placeholder="North limit"
        required
        min="1"
      />
      <input
        type="number"
        class="input"
        v-model="hoverQtd"
        placeholder="How Many hovers?"
        required
        min="1"
      />
      <div v-if="parseInt(hoverQtd) > 0" class="hovers-container">
        <h3>Hovers Data</h3>
        <div
          class="hover-line"
          v-for="(item, i) in parseInt(hoverQtd)"
          :key="item"
        >
          <span
            ><strong>Hover {{ item }} :</strong></span
          >
          <input
            type="number"
            class="input"
            @focusout="updateHoverStartPosition(i, $event, 'x')"
            placeholder="East starting position"
            required
            min=0
            :max="limit.x"
          />
          <input
            type="number"
            class="input"
            placeholder="North starting position"
            @focusout="updateHoverStartPosition(i, $event, 'y')"
            required
            min="0"
            :max="limit.y"
          />
          <select
            class="select"
            @change="updateStartHeading(i, $event.target.value)"
            required
          >
            <option value="">Select</option>
            <option value="N">N</option>
            <option value="E">E</option>
            <option value="S">S</option>
            <option value="W">W</option>
          </select>
          <div class="instructions">
            <div class="buttons">
              <button
                class="btn-primary"
                @click.prevent="addInstruction(i, 'L')"
              >
                Left
              </button>
              <button
                class="btn-primary"
                @click.prevent="addInstruction(i, 'R')"
              >
                Right
              </button>
              <button
                class="btn-primary"
                @click.prevent="addInstruction(i, 'M')"
              >
                Move
              </button>
            </div>
          </div>
          <div class="commands">
            <span
              v-for="(command, i) in hoversData.hovers[i].instructions"
              :key="i"
              >{{ command }}</span
            >
          </div>
        </div>
        <span v-if="(!valid && sent)" class="badge-danger"
          >Error, fill every field and send instructions!</span
        >

         <span v-if="!apiError" class="badge-danger"
          >Error, invalid instructions, you are off bounds!</span
        >
      </div>
      <input type="submit" class="btn-primary" value="Send" />
    </form>
    <Map
      :limitX="parseInt(limit.x)"
      :limitY="parseInt(limit.y)"
      :hoversResponse="hoversResponse"
      v-if="hoversResponse.length > 0"
    />
    <Results :hovers="hoversResponse"/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Results from "@/components/Results/Results.vue"
import Cordinates from "@/types/Coordinates";
import clone from "just-clone";
import HoverInputDto from "@/Dtos/HoverInputDto";
import Map from "@/components/Mars/Map/Map.vue";
export default Vue.extend({
  name: "Home",
  components: { Map ,Results},
  data() {
    return {
      hoverQtd: "",
      limit: {
        x: null,
        y: null,
      },
      hoversStart: [] as Array<Cordinates>,
      hoversData: {} as HoverInputDto,
      hoversResponse: [],
      sent: false,
      apiError:true
    };
  },
  methods: {
    updateHoverStartPosition(i: number, event: any, axis: string): void {
      axis === "x"
        ? (this.hoversData.hovers[i].startingPosition.x = parseInt(
            event.target.value
          ))
        : (this.hoversData.hovers[i].startingPosition.y = parseInt(
            event.target.value
          ));
    },
    addInstruction(i: number, instruction: string) {
      this.hoversData.hovers[i].instructions.push(instruction);
    },
    updateStartHeading(i: number, heading: string) {
      this.hoversData.hovers[i].startingHeading = heading;
    },
    async checkData() {
      this.sent = true;
      if (this.valid && this.sent) {
        await this.sendData();
      }
    },
    async sendData(): Promise<void> {
      const aux = clone(this.limit);
      //limit will never be null because of validator
      //@ts-ignore
      this.hoversData.limit.x = parseInt(aux.x);
      //@ts-ignore
      this.hoversData.limit.y = parseInt(aux.y);

      try {
        const res = await this.$services.hover.sendInstructions(
          this.hoversData
        );
        //@ts-ignore
        this.hoversResponse = res.hoverOutputData;
        this.hoverQtd = "";
        // this.limit = { x: null, y: null };
      } catch (err) {
        this.apiError=true;
        console.log(err);
      }
    },
  },
  computed: {
    valid(): boolean {
      let status = true;
      this.hoversData.hovers.forEach((el) => {
        !el.startingHeading || el.instructions.length === 0
          ? (status = false)
          : null;
      });
      return status;
    },
  },

  watch: {
    hoverQtd(value) {
      let resp: HoverInputDto = { limit: { x: -1, y: -1 }, hovers: [] };
      for (let i = 0; i < parseInt(value); i++) {
        resp.hovers.push({
          startingPosition: { x: -1, y: -1 },
          startingHeading: "",
          instructions: [],
        });
      }
      this.hoversData = clone(resp);
      // this.hoversResponse=[]
    },
  },
});
</script>
<style lang="scss" scoped>
@import "/Home.scss";
</style>
