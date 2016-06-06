'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path')

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the exquisite ' + chalk.red('generator-npbenjohnson') + ' generator!'
    ));

    var prompts = [{
      type: 'confirm',
      name: 'npm',
      message: 'Deploy to npm?',
      default: false
    },
    {
      type: 'confirm',
      name: 'angular',
      message: 'Would you like to use angular?',
      default: false
    },
    {
      type: 'confirm',
      name: 'private',
      message: 'Is this package npm private?',
      default: false
    },
    {
      type: 'input',
      name: 'moduleName',
      message: 'Enter npm module name',
      default: path.basename(process.cwd())
    },
    {
      type: 'input',
      name: 'moduleDescription',
      message: 'Enter npm module description',
      default: ''
    },
    {
      type: 'input',
      name: 'moduleRegistry',
      message: 'Enter jspm module registry',
      default: 'jspm'
    },
    {
      type: 'input',
      name: 'gitUrl',
      message: 'Enter git site url',
      default: 'https://github.com/npbenjohnson/'
    },
    {
      type: 'input',
      name: 'author',
      message: 'Enter author name',
      default: 'Ben Johnson'
    }
    ];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    if(this.props.angular){
      this.fs.copyTpl(
        this.templatePath('test/angular-mock-helper.js'),
        this.destinationPath('test/angular-mock-helper.js'),
        this.props
      );
    }
    var ignore = this.fs.exists(this.destinationPath('index.js')) ? '|index.js' : '';
    this.fs.copyTpl(
      this.templatePath('**/!(angular-mock-helper.js' + ignore + ')'),
      this.destinationPath('.'),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('**/.*'),
      this.destinationPath('.'),
      this.props
    );
  },

  install: function () {
    this.installDependencies();
  }
});
