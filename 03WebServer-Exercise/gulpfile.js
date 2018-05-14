var gulp=require('gulp')
var uglify=require('gulp-uglify')
var del=require('del')

var htmlmin = require('gulp-htmlmin');

gulp.task('minify-html', function(){
    return gulp.src('content/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('content/build'))
})

gulp.task('scripts',function(){
    del.sync('build/**')
    return gulp.src([
        'node_modules/jquery/dist/jquery.js'
    ])
    .pipe(uglify())
    .pipe(gulp.dest('build'))
})