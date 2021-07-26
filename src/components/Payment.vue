<template>
  <div class="home">
    <!-- {{outData}} -->
    <div class="header">
      <h1>Payment List</h1>
    </div>
    <div class="content">
      <div class="content1">
        <div>
          <label class="date" for="date">วันที่ : </label>
          <v-date-picker v-model="form.date" :model-config="modelConfig">
            <template v-slot="{ inputValue, inputEvents }">
              <input class="carlender" :value="inputValue" v-on="inputEvents" />
            </template>
          </v-date-picker>
        </div>

        <div>
          <label for="actions">รายการ : </label>
          <input class="text" type="text" v-model="form.actions" />
        </div>

        <div>
          <label for="amount">จำนวนเงิน : </label>
          <input class="money" type="text" v-model="form.amount" />
        </div>

        <div>
          <label class="status" for="status">สถานะ : </label>
          <input type="radio" v-model="form.status" value="รายรับ" />
          <label class="btn-radio" for="status">รายรับ</label>
          <input type="radio" v-model="form.status" value="รายจ่าย" />
          <label for="status">รายจ่าย</label>
        </div>

        <div>
          <button class="btn" @click="addDataToList">Add</button>
        </div>
      </div>
      <div class="content2">
        <iframe
          src="https://giphy.com/embed/GGE9CDsizAqu4"
          width="200"
          height="200"
          frameBorder="0"
          class="giphy-embed1"
          allowFullScreen
        ></iframe>
      </div>
      <div class="content3">
        <iframe
          src="https://giphy.com/embed/GGE9CDsizAqu4"
          width="200"
          height="200"
          frameBorder="0"
          class="giphy-embed2"
          allowFullScreen
        ></iframe>
      </div>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th class="date">วันที่</th>
          <th class="action">รายการ</th>
          <th class="amount">จำนวนเงิน</th>
          <th class="status">สถานะ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(List, index) in outData" :key="index">
          <td>{{ List.date }}</td>
          <td>{{ List.actions }}</td>
          <td>{{ List.amount }}</td>
          <td>{{ List.status }}</td>
        </tr>
      </tbody>
    </table>
    <div>
      <span class="span1">รายรับ: {{ this.raairub }}</span>
      <span class="span1">รายจ่าย: {{ this.raaijaai }}</span>
      <span class="span1">คงเหลือ: {{ this.total }}</span>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import PaymentStore from "@/store/index.js";
export default {
  name: "Home",
  data() {
    return {
      outData: [],
      form: {
        date: "",
        actions: "",
        amount: "",
        status: "",
      },
      modelConfig: {
        type: "string",
        mask: "DD-MM-YYYY", // Uses 'iso' if missing
      },
      raairub: 0,
      raaijaai: 0,
      total: 0,
    };
  },

  methods: {
    async getData() {
      await PaymentStore.dispatch("fetchData");
      this.outData = PaymentStore.getters.payment;
      this.calStart();
      console.log(this.raairub);
      console.log(this.raaijaai);
      console.log(this.total);
    },

    clearForm() {
      this.form = {
        date: "",
        actions: "",
        amount: "",
        status: "",
      };
    },
    addDataToList() {
      if (
        this.form.date !== "" &&
        this.form.actions !== "" &&
        this.form.amount !== "" &&
        this.form.status !== ""
      ) {
        let payload = {
          date: this.form.date,
          actions: this.form.actions,
          amount: this.form.amount,
          status: this.form.status,
        };
        PaymentStore.dispatch("addData", payload);
        this.cal();
        console.log(payload);
        this.clearForm();
      }
    },
    calStart() {
      this.outData.forEach((element) => {
        if (element.status === "รายรับ") {
          this.raairub = parseInt(element.amount) + this.raairub;
        } else if (element.status === "รายจ่าย") {
          this.raaijaai = parseInt(element.amount) + this.raaijaai;
        }
      });
      this.total = this.raairub - this.raaijaai;
    },
    cal() {
      console.log(this.form.amount);
      if (this.form.status === "รายรับ") {
        this.raairub += parseInt(this.form.amount);
        this.total += parseInt(this.form.amount);
      } else {
        this.raaijaai += parseInt(this.form.amount);
        this.total -= parseInt(this.form.amount);
      }
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Prompt:wght@600&display=swap");
.table {
  margin-left: auto;
  margin-right: auto;
  border-collapse: collapse;
  width: 70%;
  margin-top: 1em;
  margin-bottom: 3em;
  font-size: 20px;
  background-color: white;
}
.table,
td,
th {
  border: 0.5px solid rgb(20, 10, 10);
  text-align: left;
}

th,
td {
  padding: 15px;
}

.span1 {
  padding: 50px;
  color: #f3deca;
  font-size: 26px;
  font-family: "Prompt", sans-serif;
}
.header {
  font-family: "Press Start 2P", cursive;
  color: #f3deca;
  font-size: 2em;
}

.content {
  color: #f3deca;
  font-family: "Prompt", sans-serif;
  font-size: 26px;
  display: grid;
  grid-template-columns: 35% 30% 35%;
}
.date {
  margin-left: 35px;
}
.money {
  margin-right: 30px;
  font-size: 24px;
}
.status {
  margin-left: 19px;
}
.content1 {
  grid-column: 2/3;
}
.content2 {
  grid-column: 1/2;
  grid-row: 1/2;
}
.content3 {
  grid-column: 3/4;
  grid-row: 1/2;
}

.carlender,
.text {
  font-size: 24px;
}
.btn {
  font-family: "Prompt", sans-serif;
  font-size: 26px;
}
.btn-radio {
  margin-right: 15px;
}
</style>
