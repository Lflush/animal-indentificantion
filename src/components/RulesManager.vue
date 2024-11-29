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
        <input type="text" v-model="newRuleConditions" placeholder="用逗号分隔">
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

    <!-- 编辑表单 -->
    <div v-if="editingRule" class="edit-form">
      <h3>编辑规则</h3>
      <form @submit.prevent="updateRule">
        <div>
          <label>条件:</label>
          <input type="text" v-model="editingRuleConditions" placeholder="用逗号分隔">
        </div>
        <div>
          <label>结论:</label>
          <input type="text" v-model="editingRule.conclusion">
        </div>
        <div>
          <label>优先级:</label>
          <input type="number" v-model="editingRule.priority">
        </div>
        <button type="submit">保存</button>
        <button @click="cancelEdit">取消</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from '@/plugins/axios';
export default {
  data() {
    return {
      rules: [],
      newRule: {
        conditions: [],
        conclusion: '',
        priority: 1
      },
      newRuleConditions: '',
      editingRule: null,
      editingRuleConditions: '',
    };
  },
  methods: {
    async fetchRules() {
      try {
        const response = await axios.get('http://localhost:9000/api/inference/rules/all');
        this.rules = response.data.map((rule, index) => ({ ...rule, id: index }));
      } catch (error) {
        console.error(error);
      }
    },
    async addRule() {
      try {
        // 将条件字符串转换为数组
        const conditionsArray = this.newRuleConditions.split(',').map(condition => condition.trim());

        // 创建一个新的规则对象
        const newRule = {
          conditions: conditionsArray,
          conclusion: this.newRule.conclusion,
          priority: this.newRule.priority
        };

        const response = await axios.post('http://localhost:9000/api/inference/rules/add', newRule);
        this.rules.push({ ...newRule, id: this.rules.length });
        this.newRule = { conditions: '', conclusion: '', priority: 1 };
        // 刷新规则列表以确保数据一致性
        this.fetchRules();
      } catch (error) {
        console.error(error);
      }
    },
    async editRule(rule) {
      this.editingRule = { ...rule }; // 深拷贝规则对象
      this.editingRuleConditions = rule.conditions.join(', ');
    },
    async updateRule() {
      try {
        const conditionsArray = this.editingRuleConditions.split(',').map(condition => condition.trim());
        const newRule = {
          conditions: conditionsArray,
          conclusion: this.editingRule.conclusion,
          priority: this.editingRule.priority
        };

        // 先删除旧规则
        await axios.post('http://localhost:9000/api/inference/rules/delete', this.editingRule);

        const response = await axios.post('http://localhost:9000/api/inference/rules/add', newRule);
        this.rules.push({ ...newRule, id: this.editingRule.id });

        this.editingRule = null;
        this.editingRuleConditions = '';
        alert('更新成功');
        this.fetchRules();
      } catch (error) {
        console.error(error);
      }
    },
    cancelEdit() {
      this.editingRule = null;
      this.editingRuleConditions = '';
    },
    async deleteRule(rule) {
      try {
        await axios.post('http://localhost:9000/api/inference/rules/delete', rule);
        this.rules = this.rules.filter(r => r.id !== rule.id);
        alert('删除成功');
        // 刷新规则列表以确保数据一致性
        this.fetchRules();
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
