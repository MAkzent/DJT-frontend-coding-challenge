<template>
  <div class="search-container">
    <h1 class="search-title">
      GitHub Issue Viewer
    </h1>
    <SearchInput
      v-model="url"
      class="search-input"
      type="url"
      placeholder="Paste a link to a GitHub Repo!"
      @blur="$v.url.$touch()"
      @keyup.enter="onSubmit"
    />
    <div class="search-tip-container">
      <transition name="slide-down">
        <div v-show="$v.url.$error">
          <p class="search-tip">
            Please enter a valid GitHub repo URL (<span class="italicized"
              >e.g. https://github.com/vuejs/vue</span
            >)
          </p>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import parse from 'url-parse'
import { required, url } from 'vuelidate/lib/validators'
import SearchInput from '../components/SearchInput'
import GithubService from '@/services/Github.js'

// TODO add global error styles
const githubURL = (value) => /^(https:\/\/)(www\.)?github.com(.*)/.test(value)

export default {
  components: {
    SearchInput
  },
  data() {
    return {
      url: '',
      submitted: false
    }
  },
  validations: {
    url: {
      required,
      url,
      githubURL
    }
  },
  methods: {
    parseURL(url) {
      const [, owner, name] = parse(new URL(url)).pathname.split('/')
      return [owner, name]
    },
    isValidRepo(repo) {
      return GithubService.isValidRepo(repo)
    },
    async onSubmit() {
      const vm = this
      vm.$v.$touch()
      if (vm.$v.invalid) return
      const [owner, name] = vm.parseURL(vm.url)

      const exists = await vm.isValidRepo({ owner, name })
      if (exists) {
        await vm.$store.dispatch('issues/setRepo', { owner, name })
        vm.$router.push('/results')
      } else {
      }
    }
  }
}
</script>
<style lang="scss">
.search-container {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 240px;
  width: 280px;

  @include for-tablet-portrait-up {
    width: 540px;
  }

  @include for-tablet-landscape-up {
    width: 660px;
  }
}

.search-title {
  font-size: 24px;
  margin-bottom: 16px;
  white-space: nowrap;

  @include for-tablet-portrait-up {
    font-size: 32px;
    margin-bottom: 24px;
  }

  @include for-tablet-landscape-up {
    font-size: 48px;
    margin-bottom: 32px;
  }
}

.search-input {
  margin-bottom: 16px;
  width: 100%;

  @include for-tablet-portrait-up {
    margin-bottom: 24px;
  }
}

.search-tip-container {
  height: 48px;
  width: 60%;
}

.search-tip {
  background-color: #3f51b5;
  border-radius: 8px;
  color: #fff;
  font-size: 9px;
  padding: 1em;

  @include for-tablet-portrait-up {
    font-size: 12px;
  }
}
</style>
