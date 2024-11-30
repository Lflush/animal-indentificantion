<template>
  <div class="inference-container">
    <h2>动物识别专家系统</h2>
    <form @submit.prevent="performInference" class="inference-form">
      <div class="form-group">
        <label>输入初始条件：</label>
        <input v-model="initialConditions" type="text" placeholder="例如: 有毛发, 有奶">
      </div>
      <div class="form-group">
        <label>选择推理方向：</label>
        <select v-model="inferenceType">
          <option value="forward">正向推理</option>
          <option value="backward">反向推理</option>
        </select>
      </div>
      <button type="submit" class="submit-btn">开始推理</button>
    </form>

    <div v-if="results.length > 0" class="results">
      <h3>推理结果</h3>
      <ul>
        <li v-for="result in results" :key="result">{{ result }}</li>
      </ul>
    </div>

    <div v-if="inferencePath.length > 0" class="inference-path">
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
h2 {
  color: #333;
  margin-bottom: 20px;
  font-size: 2rem;
}

.inference-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  color: #333;
}

input[type="text"], select {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
}

input[type="text"]:focus, select:focus {
  border-color: #3498db;
  box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
}

.submit-btn {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #0056b3;
}

.results, .inference-path {
  margin-top: 20px;
}

h3 {
  color: #333;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 5px 0;
  border-bottom: 1px solid #ddd;
}

li:last-child {
  border-bottom: none;
}

@media (max-width: 768px) {
  .inference-container {
    width: 90%;
    margin: 0 auto;
  }
}
</style>
