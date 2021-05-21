<template>
  <div class="wrap">
    <div>
      <textarea name id cols="30" rows="4" class="text-area" placeholder="Post..."></textarea>
      <div class="post-option">
        <img src="@/assets/icon-camera.svg" alt />

        <button class="btn-post">Post</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Post",
};
</script>

<style lang="scss" scoped>
.wrap {
  width: 100%;
  height: auto;
  background-color: #fff;
  padding: 50px;
  margin-bottom: 30px;
  .text-area {
    border: 1px solid #ced4da;
    color: #495057;
    border-radius: 0.25rem;
    padding: 0.375rem 0.75rem;
    width: 100%;
    transition: all 0.08s ease-in-out;
  }
  .text-area:focus {
    color: #495057;
    background-color: #fff;
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgb(0 123 255 / 25%);
  }
}
.post-option {
  margin-top: 15px;
  margin-left: 15px;
  display: flex;
  justify-content: space-between;
  .btn-post {
    border: #007bff 1px solid;
    padding: 5px 15px;
    color: #007bff;
    border-radius: 5px;
    box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%),
      0 1px 3px 1px rgb(60 64 67 / 15%);
    transition: all 0.08s linear, cubic-bezier(0.4, 0, 0.2, 1);
  }
  .btn-post:hover {
    box-shadow: 0 1px 3px 0 rgb(60 64 67 / 30%),
      0 4px 8px 3px rgb(60 64 67 / 15%);
    background-color: #eee;
  }
}
</style>
