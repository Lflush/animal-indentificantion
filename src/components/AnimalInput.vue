<template>
  <div class="animal-input">
    <h2 class="section-title">输入动物属性</h2>
    <form @submit.prevent="submitAnimal">
      <div class="input-group" v-for="attribute in attributes" :key="attribute">
        <label :for="attribute" class="attribute-label">{{ attribute }}：</label>
        <input type="checkbox" v-model="animalAttributes[attribute]" class="checkbox-input" />
      </div>
      <button type="submit" class="submit-btn">开始推理</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      attributes: ['有毛发', '有奶', '有羽毛', '会飞', '会生蛋', '吃肉', '有犀利牙齿', '有爪', '眼向前方', '有蹄', '反刍', '黄褐色', '暗斑点', '黑色条纹', '长脖子', '长腿'],
      animalAttributes: {
        '有毛发': false,
        '有奶': false,
        '有羽毛': false,
        '会飞': false,
        '会生蛋': false,
        '吃肉': false,
        '有犀利牙齿': false,
        '有爪': false,
        '眼向前方': false,
        '有蹄': false,
        '反刍': false,
        '黄褐色': false,
        '暗斑点': false,
        '黑色条纹': false,
        '长脖子': false,
        '长腿': false
      }
    };
  },
  methods: {
    submitAnimal() {
      this.$emit('animal-submitted', this.animalAttributes);
    }
  }
};
</script>

<style scoped>
.animal-input {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 20px auto;
}

.section-title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
}

.input-group {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}

.attribute-label {
  flex: 1;
  font-size: 16px;
  color: #555;
}

.checkbox-input {
  margin-left: 10px;
}

.submit-btn {
  padding: 12px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  margin-top: 20px;
}

.submit-btn:hover {
  background-color: #45a049;
}
</style>
