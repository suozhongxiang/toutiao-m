module.exports = { // 配置使用的PostCSS插件是用来专门处理css的插件
  plugins: {
    // 'autoprefixer': { // 在css前方加前缀，做到浏览器适配
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // }, // 因为vant UI 默认已经导入了 所以会冲突报错
    'postcss-pxtorem': { // 配置rem
      // rootValue: 37.5, // font-size
      rootValue ({file}) { // rootValue 可以写成变量也可以写成函数，传参为一个当前要处理的样式文件是一个对象，通过解构赋值得到file路径对象，判断其中有没有vant，因为vant使用375做的原型图
        return file.indexOf('vant') !== -1 ? 37.5 : 75 // 判断将vant 转为37.5 自己写的为75  
      },
      propList: ['*'], // 全部转化
      exclude: 'github-markdown' // 不转化这个用来美化正文的css
    }
  }
}