'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const utils = require('../utils');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument("pluginslug", { type: String, required: true, desc: 'Plugin Slug' });
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the first-class ${chalk.red('generator-mica-wp-plugin')} generator!`,
      ),
    );

    const prompts = [
      {
        name: 'pluginName',
        message: 'Plugin name?',
      },
      {
        name: 'pluginURI',
        message: 'Plugin URI?',
      },
      {
        name: 'pluginDescription',
        message: 'Plugin Description?',
      },
      {
        name: 'pluginVersion',
        message: 'Plugin Version?',
      },
      {
        name: 'pluginAuthor',
        message: 'Plugin Author?',
      },
      {
        name: 'pluginAuthorURI',
        message: 'Plugin Author URI?',
      },
      {
        name: 'pluginLicense',
        message: 'Plugin Author License?',
      },
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    // const pluginSlug = utils.slugify(this.props.pluginName);

    this.fs.copyTpl(
      this.templatePath('_plugin.php'),
      this.destinationPath(`${this.options.pluginslug}/${this.options.pluginslug}.php`),
      {...this.props},
    );
  }

  end() {
    this.log(`Run "npm run dev" to register the block.`);
  }
};
