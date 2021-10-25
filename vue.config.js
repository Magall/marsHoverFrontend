module.exports = {
    css: {
      loaderOptions: {
        sass: {
          prependData: `@import "@/scss/constants.scss"; @import "@/scss/global.scss";`
        }
      }
    }
  };