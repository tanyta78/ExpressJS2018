const gulp = require('gulp');
const minify_css = require('gulp-clean-css');
const minify_html = require('gulp-htmlmin');
const rename = require('gulp-rename');

gulp.task('minify-css', () => {
    gulp.src('public/css/*.css')
        .pipe(minify_css())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('public/css/'));
});

gulp.task('minify-html', () => {
    gulp.src('views/*.html')
        .pipe((minify_html({ collapseWhitespace: true })))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('views/'));
});

gulp.task('default', ['minify-css', 'minify-html']);