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
        <!-- 渲染规则 -->
        <tr v-for="rule in rules" :key="rule.id">
          <td>{{ rule.conditions.join(', ') }}</td>
          <td>{{ rule.conclusion }}</td>
          <td>{{ rule.priority }}</td>
          <td>
            <button @click="editRule(rule)" class="edit-btn">编辑</button>
            <button @click="deleteRule(rule)" class="delete-btn">删除</button>
          </td>
        </tr>

        <tr>
          <!-- 编辑表单 -->
          <td v-if="isEditing">
            <input type="text" v-model="editingRuleConditions" placeholder="用逗号分隔">
          </td>
          <td v-if="isEditing">
            <input type="text" v-model="editingRule.conclusion">
          </td>
          <td v-if="isEditing">
            <input type="number" v-model="editingRule.priority">
          </td>
          <td v-if="isEditing">
            <button @click="updateRule" class="save-btn">保存</button>
            <button @click="cancelEdit" class="cancel-btn">取消</button>
          </td>
        </tr>

        <!-- 添加规则 -->
        <tr v-if="isAddingNewRule">
          <td>
            <input type="text" v-model="newRuleConditions" placeholder="用逗号分隔">
          </td>
          <td>
            <input type="text" v-model="newRule.conclusion" placeholder="结论">
          </td>
          <td>
            <input type="number" v-model="newRule.priority" placeholder="优先级">
          </td>
          <td>
            <button @click="addRule" class="save-btn">保存</button>
            <button @click="cancelAddingRule" class="cancel-btn">取消</button>
          </td>
        </tr>

        <!-- 加号按钮 -->
        <tr v-if="!isAddingNewRule">
          <td colspan="4" style="text-align: center;">
            <button @click="startAddingRule" class="add-btn">+</button>
          </td>
        </tr>
      </tbody>
    </table>
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
      isAddingNewRule: false,
      isEditing: false,
      oldRule: null,
    };
  },
  methods: {
    async startAddingRule() {
      this.isAddingNewRule = true;
    },
    async cancelAddingRule() {
      this.isAddingNewRule = false;
      this.newRuleConditions = '';
      this.newRuleConclusion = '';
      this.newRulePriority = 0;
    },
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
        this.isAddingNewRule=false;
      } catch (error) {
        console.error(error);
      }
    },
    async editRule(rule) {
      this.editingRule = { ...rule }; // 深拷贝规则对象
      this.oldRule = { ...rule }; 
      this.editingRuleConditions = rule.conditions.join(', ');
      this.isEditing = true;
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
        await axios.post('http://localhost:9000/api/inference/rules/delete', this.oldRule);

        const response = await axios.post('http://localhost:9000/api/inference/rules/add', newRule);
        this.rules.push({ ...newRule, id: this.editingRule.id });

        this.editingRule = null;
        this.editingRuleConditions = '';
        alert('更新成功');
        this.fetchRules();
      } catch (error) {
        console.error(error);
      }
      this.isEditing = false;
    },
    cancelEdit() {
      this.editingRule = null;
      this.editingRuleConditions = '';
      this.isEditing = false;
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

<style scoped>
h2 {
  color: #333;
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 12px 15px;
  text-align: left;
}

th {
  background-color: #3498db;
  color: #fff;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

button {
  padding: 6px 12px;
  margin: 5px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

button.edit-btn {
  background-color: #28a745;
}

button.delete-btn {
  background-color: #dc3545;
}

button:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

button.edit-btn:hover {
  background-color: #218838;
}

button.delete-btn:hover {
  background-color: #c82333;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
}

form input[type="text"], form input[type="number"] {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

form button {
  background-color: #007bff;
  color: #fff;
}

.edit-form {
  margin-top: 30px;
  background: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
