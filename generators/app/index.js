'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
	constructor(args, opts) {
		super(args, opts);

		this.argument('slug', {type: String, required: true});
	}

	prompting() {
		// Have Yeoman greet the user.
		this.log(
			yosay(
				`Welcome to the ${chalk.red('Mica WP Plugin')} generator!`,
			),
		);

		const prompts = [
			{
				name: 'name',
				message: 'Plugin name?',
			},
			{
				name: 'uri',
				message: 'Plugin URI?',
			},
			{
				name: 'description',
				message: 'Plugin Description?',
			},
			{
				name: 'version',
				message: 'Plugin Version?',
				default: '0.0.0',
			},
			{
				name: 'author',
				message: 'Plugin Author?',
				default: 'Mica WP Plugin',
				save: true,
				store: true,
			},
			{
				name: 'author_url',
				message: 'Plugin Author URL?',
			},
			{
				name: 'license',
				message: 'Plugin Author License?',
				default: 'GPLv2',
				save: true,
				store: true,
			},
			{
				type: 'input',
				name: 'license_uri',
				message: 'License URI',
				default: 'http://www.gnu.org/licenses/gpl-2.0.html',
				save: true,
				store: true,
			},
		];

		return this.prompt(prompts).then(props => {
			// To access props later use this.props.someAnswer;
			this.props = props;
		});
	}

	writing() {
		// const slug = utils.slugify(this.props.plugin);

		this.destinationRoot(this.options.slug);

		this.fs.copy(
			this.templatePath('inc'),
			this.destinationPath('inc'),
			{
				...this.props,
				...this.options,
			},
		);

		this.fs.copy(
			this.templatePath('_webpack.mix.js'),
			this.destinationPath('webpack.mix.js'),
		);

		this.fs.copyTpl(
			this.templatePath('_plugin.php'),
			this.destinationPath(`${this.options.slug}.php`),
			{
				...this.props,
				...this.options,
			},
		);
	}

	end() {
		this.log(`Run "npm run dev" to register the block.`);
	}
};
