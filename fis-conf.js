// 所有的文件产出到 static/ 目录下
// fis.match('*', {
//     release: '/output/$0'
// });

// 某些资源从构建中去除
fis.set('project.ignore', [
  'node_modules/**',
  '.git/**',
  '.svn/**'
]);


fis.match('/modules/**', {
  // 设置 release 为 FALSE，不再产出此文件
  release: false
});


// html 编译压缩
fis.match('*.html', {
  useMap: true,
  optimizer: fis.plugin('htmlmin')  // 压缩html
});

// css 编译压缩
fis.match('*.css', {
  // useSprite: true,
  useHash: true,
  rExt: '.css',
  optimizer: fis.plugin('clean-css'), //压缩css
  // 'keepBreaks': true, //保持一个规则一个换行
  isMod: true
});


// js 编译压缩
fis.match('/js/**/*.js', {
  useHash: true,
  isMod: true,
  optimizer: fis.plugin('uglify-js'), //压缩js
});

//
// 图片 压缩
fis.match('/images/*.png', {
  useHash: true,
  optimizer: fis.plugin('png-compressor',{
     type : 'pngquant'
  })
});

fis.match('/images/*.{jpeg,gif}', {
  useHash: true
});


// 开发的时候不需要压缩、合并图片、也不需要 hash
fis.media('debug').match('**', {
  useHash: false,
  useSprite: false,
  optimizer: null
})

// 基于页面打包处理 (强制打包)
fis.media('prod')
  .match('::package', {
    // spriter: fis.plugin('csssprites', {
    //     layout: 'matrix',
    //     // scale: 0.5, // 移动端二倍图用
    //     margin: '10'
    // }),
    postpackager: fis.plugin('loader', {
      allInOne: true
    })
  });




// 基于资源映射表打包处理
// fis.match('::package', {
//     // npm install [-g] fis3-postpackager-loader
//     // 分析 __RESOURCE_MAP__ 结构，来解决资源加载问题
//     postpackager: fis.plugin('loader', {
//         // resourceType: 'commonJs',
//         useInlineMap: true // 资源映射表内嵌
//     })
// });
