<template>
  <div class="inference-page">
    <h1 class="main-title">动物识别专家系统</h1>
    <div class="card">
      <animal-input @animal-submitted="startInference" />
    </div>
    <div class="card">
      <inference-results :conclusions="conclusions" :inferencePath="inferencePath" />
    </div>
    <div class="card">
      <rules-manager @add-rule="addRule" @delete-rule="deleteRule" />
    </div>
  </div>
</template>

<script>
import AnimalInput from "@/components/AnimalInput.vue";
import InferenceResults from "@/components/InferenceResults.vue";
import RulesManager from "@/components/RulesManager.vue";
import axios from "@/plugins/axios";

export default {
  components: {
    AnimalInput,
    InferenceResults,
    RulesManager
  },
  data() {
    return {
      conclusions: [],
      inferencePath: [],
      rules: []
    };
  },
  methods: {
    startInference(animalAttributes) {
      axios
        .post("/api/inference/forward", animalAttributes)
        .then(response => {
          this.inferencePath = response.data.inferencePath;
          this.conclusions = Array.from(response.data.conclusions);
        })
        .catch(error => {
          console.error("推理失败:", error);
        });
    },
    addRule(rule) {
      axios
        .post("/api/inference/rules", rule)
        .then(response => {
          this.rules.push(rule);
        })
        .catch(error => {
          console.error("添加规则失败:", error);
        });
    },
    deleteRule(rule) {
      axios
        .delete("/api/inference/rules", { data: rule })
        .then(response => {
          const index = this.rules.indexOf(rule);
          if (index !== -1) {
            this.rules.splice(index, 1);
          }
        })
        .catch(error => {
          console.error("删除规则失败:", error);
        });
    }
  }
};
</script>

<style scoped>
.inference-page {
  text-align: center;
  background-color: #fafafa;
  padding: 40px;
}

.main-title {
  font-size: 32px;
  font-weight: bold;
  color: #333;
  margin-bottom: 40px;
}

.card {
  margin-bottom: 40px;
}
</style>
