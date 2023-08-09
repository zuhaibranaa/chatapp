<template>
  <div class="about">
    <button @click="sendMessage">This is an about page</button>
  </div>
</template>
<script>
export default {
  methods: {
    sendMessage() {
      this.$socket.emit("chat message", "Button Clicked On Frontend");
    },
  },
};
</script>
