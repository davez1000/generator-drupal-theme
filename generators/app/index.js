'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const { snakeCase } = require('lodash');
const validUrl = require('valid-url');

module.exports = class extends Generator {
  prompting() {
    this.log(
      yosay(`${chalk.green.bold('Welcome to Dave\'s Drupal 8 theme generator')}`)
    );

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your theme?',
        store: true
      },
      {
        type: 'input',
        name: 'proxyTarget',
        message: 'What is the URI for your drupal local site?',
        validate: input =>
          Boolean(validUrl.isWebUri(input)) || 'Please enter a valid URI',
        store: true
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = Object.assign({}, props, {
        sanitizedName: snakeCase(props.name)
      });
    });
  }

  writing() {
    const { sanitizedName } = this.props;

    // Copy over untemplated files
    this.fs.copy(
      this.templatePath('theme.library.yml'),
      this.destinationPath(`${sanitizedName}.library.yml`)
    );
    this.fs.copy(this.templatePath('babelrc'), this.destinationPath('.babelrc'));
    this.fs.copy(
      this.templatePath('editorconfig'),
      this.destinationPath('.editorconfig')
    );
    this.fs.copy(this.templatePath('eslintrc'), this.destinationPath('.eslintrc'));
    this.fs.copy(this.templatePath('gitignore'), this.destinationPath('.gitignore'));
    this.fs.copy(this.templatePath('config'), this.destinationPath('config'));
    this.fs.copy(this.templatePath('images'), this.destinationPath('images'));
    this.fs.copy(this.templatePath('src'), this.destinationPath('src'));

    this.fs.copyTpl(
      this.templatePath('theme.info.yml'),
      this.destinationPath(`${sanitizedName}.info.yml`),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('theme.theme'),
      this.destinationPath(`${sanitizedName}.theme`),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('config/webpack.common.js'),
      this.destinationPath('config/webpack.common.js'),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('config/webpack.development.js'),
      this.destinationPath('config/webpack.development.js'),
      this.props
    );
  }

  install() {
    this.installDependencies({ bower: false });
  }
};
