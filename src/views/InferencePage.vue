<template>
  <div>
    <h2>动物专家系统</h2>
    <form @submit.prevent="performInference">
      <div>
        <label>输入初始条件：</label>
        <input v-model="initialConditions" type="text" placeholder="例如: 有毛发, 有奶">
      </div>
      <div>
        <label>选择推理方向：</label>
        <select v-model="inferenceType">
          <option value="forward">正向推理</option>
          <option value="backward">反向推理</option>
        </select>
      </div>
      <button type="submit">开始推理</button>
    </form>

    <div v-if="results.length > 0">
      <h3>推理结果</h3>
      <ul>
        <li v-for="result in results" :key="result">{{ result }}</li>
      </ul>
    </div>

    <div v-if="inferencePath.length > 0">
      <h3>推理过程</h3>
      <ul>
        <li v-for="(step, index) in inferencePath" :key="index">{{ step }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from '@/plugins/axios';

export default {
  data() {
    return {
      initialConditions: '',
      inferenceType: 'forward',
      results: [],
      inferencePath: []
    };
  },
  methods: {
    async performInference() {
      const conditions = this.initialConditions.split(/[,，;]/).map(condition => condition.trim());
      let response;

      if (this.inferenceType === 'forward') {
        const conditionsObject = conditions.reduce((acc, condition) => {
          acc[condition] = true;
          return acc;
        }, {});
        response = await axios.post('http://localhost:9000/api/inference/forward', { attributes: conditionsObject });
      } else {
        response = await axios.post('http://localhost:9000/api/inference/backward', conditions);
      }

      this.results = response.data.conclusions;
      this.inferencePath = response.data.inferencePath;
    }
  }
};
</script>

<style scoped>
/* 添加一些基本样式 */
</style>
