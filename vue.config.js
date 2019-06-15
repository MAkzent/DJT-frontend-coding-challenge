module.exports = {
  chainWebpack: config => {
    const svgRule = config.module.rule("svg");
    svgRule.uses.clear();
    svgRule.use("vue-svg-loader").loader("vue-svg-loader");
  },
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/styles/_animations.scss";
          @import "@/assets/styles/_colors.scss";
          @import "@/assets/styles/_breakpoints.scss";
          @import "@/assets/styles/_fonts.scss";
        `
      }
    }
  }
};
