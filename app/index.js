'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var exec = require('child_process').exec;
var chalk   = require('chalk');
var slugify   = require('slugify');

var LoadedEmailGenerator = module.exports = function LoadedEmailGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(LoadedEmailGenerator, yeoman.generators.Base);

LoadedEmailGenerator.prototype.initGenerator = function () {
  this.log([
chalk.yellow('      :::        ::::::::       :::      :::::::::   ::::::::::  :::::::::'),
chalk.yellow('     :+:       :+:    :+:    :+: :+:    :+:    :+:  :+:         :+:    :+:'),
chalk.yellow('    +:+       +:+    +:+   +:+   +:+   +:+    +:+  +:+         +:+    +:+'),
chalk.yellow('   +#+       +#+    +:+  +#++:++#++:  +#+    +:+  +#++:++#    +#+    +:+'),
chalk.yellow('  +#+       +#+    +#+  +#+     +#+  +#+    +#+  +#+         +#+    +#+'),
chalk.yellow(' #+#       #+#    #+#  #+#     #+#  #+#    #+#  #+#         #+#    #+#'),
chalk.yellow('########## ########   ###     ###  #########   ##########  ######### ')
  ].join('\n'));

  this.log.writeln(chalk.cyan('=> ') + chalk.white('Intializing Static Site Generator v'+this.pkg.version));
};

LoadedEmailGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [
    {
      name: 'projectName',
      message: 'What is the name of this project?',
      default: "test"
    },
    {
      name: 'stagingPath',
      message: 'What is the path on projects.loaded to this project?'
    },
    {
      type: 'confirm',
      name: 'createGit',
      message: 'Would you like to initialise this as a git repository?',
      default: true
    }
  ];

  this.prompt(prompts, function (props) {
    this.projectName = props.projectName;
    this.stagingPath = props.stagingPath;
    this.createGit = props.createGit;

    cb();
  }.bind(this));
};

LoadedEmailGenerator.prototype.app = function app() {
    var cb   = this.async()
  , self = this

  this.log.writeln(chalk.cyan('=> ') + chalk.white('Copying starter files.'));

  this.mkdir('app');
  this.mkdir('app/images/');

  this.copy('gitignore', '.gitignore');
  this.template('_package.json', 'package.json');
  this.template('_gruntfile.js', 'Gruntfile.js');
  this.template('_index.html', './app/index.html');

  cb();
};

LoadedEmailGenerator.prototype.git = function git() {
var cb   = this.async(), self = this;

  if (this.createGit) {
    this.log.writeln(chalk.cyan('=> ') + chalk.white('Initialising Git repository.'));
    exec('git init && git add . && git commit -am "initial commit"', function (error, stdout, stderr) {
      if (error) {
        self.log.writeln(chalk.red('=> Git Initialisation Error!'));
        console.log(error.stack);
        console.log('Error code: '+error.code);
        console.log('Signal received: '+error.signal);
      }
    });
    
    self.log.ok("Git repo initialized.");
    cb();
  }
}

LoadedEmailGenerator.prototype.donezo = function donezo() {
  this.log(chalk.bold.green('\n\n------------------------\n\n\nAll Done!!\n'), {logPrefix: ''});
};