const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();
const csso = require("gulp-csso");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const del = require('del');
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
const htmlmin = require("gulp-htmlmin")

//Html

const html = () => {
  return gulp.src("source/*.html")
    .pipe(htmlmin({collapseWhitespace:true}))
    .pipe(gulp.dest("build"));
}

exports.html = html;

//Js

const js = () => {
  return gulp.src("source/js/*.js")
    .pipe(uglify())
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(gulp.dest("build/js"));
}

exports.js = js;

// Styles

const styles = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("styles.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Images

const images = () => {
  return gulp.src("source/img/*.{jpg,png,svg}")
    .pipe(imagemin([
      imagemin.optipng({ optimizationLevel: 3 }),
      imagemin.mozjpeg({ progressive: true }),
      imagemin.svgo({
        plugins: [
          {cleanupIDs: false},
          {removeUselessDefs: false},
          {removeViewBox: true},
        ]
      })
    ]))
    .pipe(gulp.dest("build/img"))
}

//Webp

const imageswebp = () => {
  return gulp.src("source/img/*.jpg")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/img"))
}

exports.imageswebp = imageswebp;

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series("styles"));
  gulp.watch("source/*.html", gulp.series("html"));
  gulp.watch("source/js/*.js", gulp.series("js"));
}

exports.default = gulp.series(
  styles, server, watcher
);

// Copy

const copy = () => {
  return gulp.src([
    "source/fonts/*.{woff,woff2}",
    "source/css/*.css",
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"));
};

exports.copy = copy;

//Del

const clean = () => {
  return del("build");
};

// Build

const build = gulp.series(
  clean,
  copy,
  styles,
  images,
  imageswebp,
  html,
  js
);

exports.build = build;

exports.default = gulp.series(
  build, server, watcher
);
