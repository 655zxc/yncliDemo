<template>
  <div>
    <button @click="longTask">click</button>
  </div>
</template>
    
<script>
let timer;
export default {
  data() {
    return {};
  },
  methods: {
    debounce() {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        console.log("run task");
      }, 1000);
    },
    longTask(gen) {
      if (typeof gen === "function") gen = gen();
      if (!gen || typeof gen.next !== "function") return;
      return function next() {
        const start = performance.now();
        const res = null;
        do {
          res = gen.next();
        } while (!res.done && performance.now() - start < 25);
        if (res.done) return;
        setTimeout(next);
      };
    }
  }
};
</script>
    
<style>
</style>
    