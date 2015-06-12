'use strict';

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Configurable paths for the application
  var appConfig = {
    app: 'app',
    dist: 'dist',
    tplsFile : 'generatedTemplates.js'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: appConfig,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: [
	        '<%= yeoman.app %>/scripts/{,**/}*.js',
          '!<%= yeoman.app %>/scripts/{,*/}generated*.js'
        ],
        tasks: ['jshint'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      compass: {
        files: ['<%= yeoman.app %>/styles/{,**/}*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      templates: {
        files: ['<%= yeoman.app %>/views/{,**/}*.html'],
        tasks: ['ngtemplates']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/{,**/}generated*.js', // generated templates
          '<%= yeoman.app %>/*.html', // root level views
          '.tmp/styles/{,*/}*.css',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= yeoman.dist %>'
        }
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      main: {
        src: [
          'Gruntfile.js',
          '<%= yeoman.app %>/scripts/{,**/}*.js',
	        '!<%= yeoman.app %>/scripts/{,**/}generated*.js'
        ]
      }
    },

    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/{,*/}*',
            '!<%= yeoman.dist %>/.git{,*/}*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 5 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      app: {
        src: ['<%= yeoman.app %>/index.html'],
        ignorePath:  /\.\.\//
      },
      sass: {
        src: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
        ignorePath: /(\.\.\/){1,2}bower_components\//
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: '<%= yeoman.app %>/styles',
        cssDir: '.tmp/styles',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%= yeoman.app %>/images',
        javascriptsDir: '<%= yeoman.app %>/scripts',
        fontsDir: '<%= yeoman.app %>/styles/fonts',
        importPath: './bower_components',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/styles/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      dist: {
        options: {
          generatedImagesDir: '<%= yeoman.dist %>/images/generated'
        }
      },
      server: {
        options: {
          sourcemap: true
        }
      }
    },

    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          '<%= yeoman.dist %>/scripts/{,*/}*.js',
          '<%= yeoman.dist %>/styles/{,*/}*.css',
          '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= yeoman.dist %>/styles/fonts/*'
        ]
      }
    },

    // enviroment specific configuration
    ///////////////////////////////////////
    replace: {
      local: {
        options: {
          patterns: [
            {
              json: grunt.file.readJSON('./app/config/environments/local.json')
            }
          ]
        },
        files: [
          {
            expand: true,
            flatten: true,
            src: ['./app/config/template/config.js'],
            dest: '<%= yeoman.app %>/config/'
          }
        ]
      },
      production: {
        options: {
          patterns: [
            {
              json: grunt.file.readJSON('./app/config/environments/production.json')
            }
          ]
        },
        files: [
          {
            expand: true,
            flatten: true,
            src: ['./app/config/template/config.js'],
            dest: '<%= yeoman.app %>/config/'
          }
        ]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat'],
              css: ['concat']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      options: {
        assetsDirs: [
          '<%= yeoman.dist %>',
          '<%= yeoman.dist %>/images',
          '<%= yeoman.dist %>/styles'
        ]
      }
    },

    // compress css
    ///////////////////////
    cssmin: {
      options: {
        banner: '',
        report: 'min'
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: '<%= yeoman.dist %>',
            src: '**/*.css',
            dest: '<%= yeoman.dist %>'
          }
        ]
      }
    },

    htmlmin: {
      dist: {
        options: {
          // collapseWhitespace: true,
          // conservativeCollapse: true,
          // collapseBooleanAttributes: true,
          // removeCommentsFromCDATA: true,
          // removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>',
          src: ['*.html','pmxdr/{,*/}*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },

    // angular templates
    // extract all templates and create
    // separate module for injection
    ///////////////////////////////////////
    ngtemplates : {
      'lila.web.html.templates' : {
        cwd     : '<%= yeoman.app %>',
        src     : '**/{,**/}*.html',
        dest    : '<%= yeoman.app %>/scripts/<%= yeoman.tplsFile %>',
        options : {
          standalone : true
        }
      }
    },

    // ng-annotate tries to make the code safe for minification automatically
    // by using the Angular long form for dependency injection.
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>/scripts',
          src: ['{,*/}*.js'],
          dest: '<%= yeoman.dist %>/scripts'
        }]
      }
    },

    // uglify js files
    ///////////////////////////////////////
    uglify: {
      dist: {
        files: [
          {
            expand: true,
            cwd: '<%= yeoman.dist %>',
            src: '{,**/}*.js',
            dest: '<%= yeoman.dist %>'
          }
        ]
      }
    },

    // TODO: verify that it actually works
    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%= yeoman.dist %>/*.html']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            'styles/fonts/{,*/}*.*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= yeoman.dist %>/images',
          src: ['generated/*']
        }, {
          expand: true,
          cwd: '.tmp/css',
          dest: '<%= yeoman.dist %>/css',
          src: '{,*/}*.css'
        }, {
          expand: true,
          cwd: '.',
          src: 'bower_components/bootstrap-sass/assets/fonts/bootstrap/*',
          dest: '<%= yeoman.dist %>'
        }]
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: {
        tasks: ['compass:server'],
        options: {
          logConcurrentOutput: true
        }
      },
      dist: {
        tasks: [
          'compass:dist'   // compile sass
        ],
        options: {
          logConcurrentOutput: true
        }
      }
    }

  });

  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {

    if (target === 'dist') {
      return grunt.task.run([
        'replace:local',
        'build',
        'concurrent:server',
        'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'replace:local',
      'wiredep',
      'concurrent:server',
      'autoprefixer',   // prefix styles in tmp
      'ngtemplates',    // generate angular templates file in app
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('build', [
	  'jshint:main',
    'clean:dist',     // clean temp and dist directories
    'wiredep',        // make sure all installed bower dependencies are referenced in files
    'concurrent:dist',// compile sass, move images to dist
    'autoprefixer',   // prefix styles in tmp and app
    'ngtemplates',    // generate angular templates file in app
    'useminPrepare',  // read html build blocks and prepare to concatenate and move css,js to dist
    'concat',         // concatinates files and moves them to dist
    'cssmin',         // minify css in dist
    'ngAnnotate',     // makes angular code safe for minification in dist
    'htmlmin',        // minify and copy html files to dist
    'copy:dist',      // move unhanled files to dist
    'cdnify',         // replace local scripts to remote ones where applicable
    'uglify',         // minifies & uglifies js files in dist
    'filerev',        // hashes js/css/img/font files in dist
    'usemin'
  ]);

  grunt.registerTask('production', [
    'replace:production',
    'build'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);
};
