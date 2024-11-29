<template>
  <div>
    <h2>规则管理</h2>
    <table>
      <thead>
        <tr>
          <th>条件</th>
          <th>结论</th>
          <th>优先级</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="rule in rules" :key="rule.id">
          <td>{{ rule.conditions.join(', ') }}</td>
          <td>{{ rule.conclusion }}</td>
          <td>{{ rule.priority }}</td>
          <td>
            <button @click="editRule(rule)">编辑</button>
            <button @click="deleteRule(rule)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <h3>添加规则</h3>
    <form @submit.prevent="addRule">
      <div>
        <label>条件:</label>
        <input type="text" v-model="newRule.conditions" placeholder="用逗号分隔">
      </div>
      <div>
        <label>结论:</label>
        <input type="text" v-model="newRule.conclusion">
      </div>
      <div>
        <label>优先级:</label>
        <input type="number" v-model="newRule.priority">
      </div>
      <button type="submit">添加</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rules: [],
      newRule: {
        conditions: '',
        conclusion: '',
        priority: 1
      }
    };
  },
  methods: {
    async fetchRules() {
      try {
        const response = await this.$axios.get('/api/inference/rules');
        this.rules = response.data.map((rule, index) => ({ ...rule, id: index }));
      } catch (error) {
        console.error(error);
      }
    },
    async addRule() {
      try {
        const response = await this.$axios.post('/api/inference/rules', this.newRule);
        this.rules.push({ ...this.newRule, id: this.rules.length });
        this.newRule = { conditions: '', conclusion: '', priority: 1 };
      } catch (error) {
        console.error(error);
      }
    },
    async editRule(rule) {
      // 实现编辑规则的逻辑
    },
    async deleteRule(rule) {
      try {
        await this.$axios.delete('/api/inference/rules', { data: rule });
        this.rules = this.rules.filter(r => r.id !== rule.id);
      } catch (error) {
        console.error(error);
      }
    }
  },
  created() {
    this.fetchRules();
  }
};
</script>
