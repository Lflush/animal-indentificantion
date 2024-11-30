<template> 
  <div id="app">
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

<style scoped>
#app {
  font-family: 'Arial', sans-serif;
  text-align: center;
  color: #2c3e50;
  background: linear-gradient(220.55deg, #4B73FF, #00E0EE, #4DEF8E, #8FFF85, #FFEB3A, #FF7EC7, #DD7BFF);
  background-size: 500% auto;
  animation: gradientAnimation 20s ease infinite;
}

@keyframes gradientAnimation {
  0% { background-position: 0% 0%; }
  25% { background-position: 50% 0%; }
  50% { background-position: 100% 0%; }
  75% { background-position: 50% 0%; }
  100% { background-position: 0% 0%; }
}

main {
  width: 98%;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  
}

.content-wrapper {
  display: flex;
  flex-wrap: wrap; /* Enable wrapping */
  gap: 20px;
  justify-content: space-between;
}


@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
</style>
