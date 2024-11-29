<template>
  <div class="inference-results" v-if="conclusions.length > 0">
    <div class="conclusions">
      <h3>推理结论</h3>
      <ul>
        <li v-for="(conclusion, index) in conclusions" :key="index">{{ conclusion }}</li>
      </ul>
    </div>

    <div class="inference-path">
      <h3>推理过程</h3>
      <ul>
        <li v-for="(step, index) in inferencePath" :key="index">{{ step }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    conclusions: {
      type: Array,
      default: () => []
    },
    inferencePath: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style scoped>
.inference-results {
  padding: 20px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
}

.conclusions, .inference-path {
  margin-bottom: 20px;
}

ul {
  list-style-type: none;
}
</style>
