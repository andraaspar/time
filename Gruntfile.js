module.exports = function(grunt) {
	
	grunt.initConfig({
			ASSET_CSS_PATH: '<%= AT_PATH %>style/time.css',
			AT_PATH: 'tmp/asset_templates/',
			BUILD_PATH: 'build/',
			ASSET_JS_PATH: '<%= AT_PATH %>script/time.js',
			
			clean: {
				compile: ['build', 'tmp']
			},
			copy: {
				compile: {
					files:[{
						expand: true,
						cwd: 'src/dropin',
						dot: true,
						src: ['**'],
						dest: '<%= BUILD_PATH %>'
					}, {
						expand: true,
						cwd: 'tmp/dropin',
						dot: true,
						src: ['**'],
						dest: '<%= BUILD_PATH %>'
					}]
				}
			},
			kapocs: {
				compile: {
					assets: [{
						expand: true,
						cwd: 'src/assets',
						dot: true,
						src: ['**'],
						dest: '<%= BUILD_PATH %>'
					}],
					assetTemplates: [{
						expand: true,
						cwd: 'src/asset_templates',
						dot: true,
						src: ['**'],
						dest: '<%= BUILD_PATH %>'
					}, {
						expand: true,
						cwd: 'tmp/asset_templates',
						dot: true,
						src: ['**'],
						dest: '<%= BUILD_PATH %>'
					}],
					templates: [{
						expand: true,
						cwd: 'src/templates',
						dot: true,
						src: ['**'],
						dest: '<%= BUILD_PATH %>'
					}]
				}
			},
			less: {
				compile: {
					files: {
						'<%= ASSET_CSS_PATH %>': 'src/less/_style.less'
					}
				}
			},
			typescript: {
				compile: {
					files: {
						'<%= ASSET_JS_PATH %>': 'src/time/Main.ts'
					}
				}
			},
			sas: {
				update: {}
			},
			shell: {
				update: {
					command: ['bower prune', 'bower update', 'bower install'].join('&&')
				}
			}
		});
	
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-kapocs');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-sas');
	grunt.loadNpmTasks('grunt-typescript');
	
	grunt.registerTask('update', ['shell:update', 'sas:update']);
	grunt.registerTask('compile', ['clean:compile', 'copy:compile', 'typescript:compile', 'less:compile', 'kapocs:compile']);
	grunt.registerTask('default', ['compile']);
};