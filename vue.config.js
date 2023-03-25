const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  process.env.NODE_ENV === "production" ? "/test-routeam/" : "/",
  transpileDependencies: true
})
