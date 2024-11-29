<template>
  <div id="app">
    <header>
      <h1>动物专家系统</h1>
    </header>
    <main>
      <InferencePage />
      <RulesManager />
    </main>
  </div>
</template>

<script>
import RulesManager from './components/RulesManager.vue';
import InferencePage from './views/InferencePage.vue';

export default {
  name: "App",
  components: {
    RulesManager,
    InferencePage
  },
};
</script>

<style>
#app {
  /* ...其他样式 */
  color: #333;
}

header h1 {
  color: #fff;
  margin-bottom: 20px;
}

main {
  width: 80%;
  max-width: 1200px;
  background: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
