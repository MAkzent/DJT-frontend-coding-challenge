<template>
  <a :href="link" target="_blank">
    <article class="issue">
      <header>
        <h3>{{ title }}</h3>
        <div class="icons">
            <PullIcon v-if="pull" />
            <ClosedIcon v-if="closed" />
        </div>
      </header>
      <p class="body">{{ bodyDisplay }}</p>
      <ul>
        <li v-for="label in labels" v-bind:key="label.id">
          <Tag :tagName="label.name" :link="label.url" />
        </li>
      </ul>
    </article>
  </a>
</template>

<script>
import Tag from "@/components/Tag";
import PullIcon from "@/assets/icons/pull-request.svg";
import ClosedIcon from "@/assets/icons/issue-closed.svg"

export default {
  name: "Issue",
  components: { Tag, PullIcon, ClosedIcon },
  props: {
    title: String,
    body: String,
    labels: Array,
    closed: Boolean,
    pull: Boolean,
    link: String
  },
  computed: {
    bodyDisplay: function() {
      return this.body.length < 125
        ? this.body
        : `${this.body.substr(0, 124)}...` 
    }
  }
};
</script>

<style lang="scss">
.issue {
  width: 100%;
  height: 100%;
  box-shadow: 3px 10px 12px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;

  header {
    font-size: 18px;
    color: #ffffff;
    background-color: #3f51b5;
    padding: 2rem;
    position: relative;

    h3 {
      margin: 0;
      padding-right: 30px;
    }

    .icons {
      position: absolute;
      top: 0px;
      right: 0px;
      padding: 10px;

      svg {
        width: 10px;
        height: 10px;
        margin-left: 5px;
      }
    }
  }

  p {
    padding: 16px;
    margin: 0;
    font-size: 16px;
    color: #5f7c8a;
    flex-grow: 1;
    overflow: hidden;
  }
  
  ul {
    padding: 16px;
    li {
      display: inline;
    }
  }
}
</style>
