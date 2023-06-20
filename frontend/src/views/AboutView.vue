<template>
  <div class="about">
    <h1 @click="sendMessage">This is an about page</h1>
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
