module.exports = {
    pluginOptions: {
    //   electronBuilder: {
    //     builderOptions: {
    //       productName: 'Kampe Health',
    //       publish: [
    //         'github'
    //       ],
    //       win: {
    //         icon: 'public/icon.png'
    //       }
    //     }
    //   },
    //   cordovaPath: 'src-cordova'
    },
  
    pages: {
      index: {
        entry: "./src/main.js",
        template: "public/index.html",
        title: "Kampe Health",
        chunks: ["chunk-vendors", "chunk-common", "index"],
      },
      // 'bad': {
      //   entry: './src/error-instance.js',
      //   template: 'public/bad.html',
      //   title: 'Error page',
      //   chunks: ['chunk-vendors', 'chunk-common', 'index']
      // },
      /* Disabled - Only one time
      'googleVerify': {
        entry: './src/error-instance.js',
        template: 'public/somelink.html',
        title: 'Error page',
        chunks: ['chunk-vendors', 'chunk-common', 'index']
      },
      */
    },
  
    // css: {
    //   sourceMap: false
    // },
    // pwa: {
    //   name: 'My App',
    //   themeColor: '#4DBA87',
    //   msTileColor: '#000000',
    //   appleMobileWebAppCapable: 'yes',
    //   appleMobileWebAppStatusBarStyle: 'black',
    // },
    devServer: {
      // host: 'smartmedicare',
      // proxy: 'http://localhost:8000',
      port: 8080 || process.env.PORT
    },
  
    publicPath: ''
  };
  
