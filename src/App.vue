<template>
  <div id="app" class="mw9 center">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import 'tachyons-sass/tachyons.scss';

input {
  @extend .input-reset;
  @extend .br1;
  @extend .ba;
  @extend .b--black-20;
  @extend .pa2;
  @extend .mb2;
  @extend .mr2;
  @extend .w-100;
  @extend .f7;
}

button {
  @extend .f7;
  @extend .link;
  @extend .dim;
  @extend .br1;
  @extend .ba;
  @extend .ph3;
  @extend .pv2;
  @extend .mb2;
  @extend .dib;
  @extend .black;
}

.card {
  // border
  @extend .br2;
  @extend .ba;
  @extend .b--black-10;

  @extend .ma2;
  @extend .h5;
  @extend .overflow-y-scroll;
  @extend .f5;
  @extend .w-100;

  // breakpoint medium
  @extend .w-40-m;

  // breakpoint large
  @extend .w5-l;
  @extend .ma3-l;
}

.card-title {
  @extend .f4;
  @extend .overflow-hidden;
  @extend .bg-near-white;
  @extend .br2;
  @extend .br--top;
  @extend .black-90;
  @extend .mv0;
  @extend .pv2;
  @extend .ph3;
}

.card-body {
  @extend .pa3;
  @extend .bt;
  @extend .b--black-10;
  @extend .overflow-x-scroll;
}

.my-link {
  @extend .link;
  @extend .black-80;
  @extend .hover-blue;
  cursor: pointer;
}

.selected {
  @extend .underline;
}

.issue-closed {
  content: url('./assets/icons/issue-closed.svg');
  width: 1rem;
  height: 1rem;
}

.issue-pr {
  content: url('./assets/icons/pull-request.svg');
  width: 1rem;
  height: 1rem;
}
</style>
