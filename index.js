'use strict';

var path = require('path');

module.exports = {
    rules: {
        'filenames-according-to-folder': function(context) {
            return {
                Program: function(node) {

                    var filepath = context.getFilename()
                    /**
                        Используем posix для того что бы добиться консистентности
                        не зависимо от операционный систе и парсим путь к виду:

                        {
                            root: '/',
                            dir: '/home/user/dir',
                            base: 'file.txt',
                            ext: '.txt',
                            name: 'file'
                        }
                    **/

                    var filepathData = path.posix.parse(filepath)
                    var pathFolderNames = filepathData.dir.split('/')

                    /** Получаем индексы и названия папок компонентов и роутов **/
                    var componentFolderNameIndex = pathFolderNames.findIndex(function(path) { return path === 'components' }) + 1
                    var routeFolderNameIndex = pathFolderNames.findIndex(function(path) { return path === 'routes' }) + 1
                    var componentFolderName = pathFolderNames[componentFolderNameIndex]
                    var routeFolderName = pathFolderNames[routeFolderNameIndex]

                    /** Получаем пути от папок роутов и компонентов находящихся в них файлов **/
                    var pathInComponentFolder = pathFolderNames.slice(componentFolderNameIndex).concat(filepathData.name).join('/')
                    var pathInRouteFolder = pathFolderNames.slice(routeFolderNameIndex).concat(filepathData.name).join('/')

                    function toPascalCase(word) {
                        return word
                                    .match(/[a-z]+/gi)
                                    .map(function (word) {
                                        return  word
                                                    .charAt(0)
                                                    .toUpperCase()
                                            +
                                                word
                                                    .substr(1);
                                    })
                                    .join('');
                    }

                    /**
                        Поочередно проверяем названия папок и файла на наличие
                        в нём названия родетельской папки
                    **/
                    function checkFolderName(folderName, path) {
                        if (!path) return

                        var firstFolderInPath = path.split('/')[0];

                        if (!firstFolderInPath.includes(folderName)
                            &&
                            firstFolderInPath !== 'containers'
                            &&
                            firstFolderInPath !== 'components'
                        ) {
                            return context.report(node, `Files and folders should contain in their names component or route folder name: ${toPascalCase(folderName)},\n try to include it or reorganize your file structure`)
                        }

                        return checkFolderName(folderName, path.split('/').slice(1).join('/'));
                    }

                    if (filepathData.dir.includes('app/components/') && filepathData.name !== 'index') {
                        checkFolderName(componentFolderName, pathInComponentFolder)
                    }

                    if (filepathData.dir.includes('app/routes/') && filepathData.name !== 'index') {
                        checkFolderName(routeFolderName, pathInRouteFolder)
                    }
                },
            };
        },
    },
};
