<template>
  <div class="card">
    <div class="card-header">
      <slot name="header"></slot>
      <slot name="icon"></slot>
    </div>
    <div class="card-item, card-body">
      <slot name="body"></slot>
    </div>
    <div class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<style lang="scss">
.card {
  border: 1px solid #e8e6e6;
  box-shadow: 0px 5px 20px #cfd8cd;
  display: flex;
  flex-direction: column;
}

.card-header {
  background-color: #3f51b5;
  color: #fff;
  flex: 0 1 30%;
  padding: 24px;
  position: relative;

  svg {
    position: absolute;
    top: 8px;
    right: 8px;
    fill: #cfd8dc;
    height: 1em;
    width: 1em;
  }
}

.card-body {
  flex: 0 1 50%;
  padding: 16px 16px 0 16px;
}

.card-footer {
  display: flex;
  flex: 0 1 20%;
  padding: 1em;
}
</style>
