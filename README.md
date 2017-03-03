# Тестовая сборка webpack с тучей разных возможностей.

- до 05.02:
    - обработка js6
    - pug
    - sass(extract-text-plugin - sass - css - style)
    - loadash внесен в сборку(**вынесен**)
    - загрузка внешних ресурсов через url-loader(limit для указаниия размера ресурсов которые поподут в сборку)
- 05.02:
    - resolve секции для модулей и файлов
    - добавлен DefinePlugin для определения переменных(Есть еще EnvironmentPlugin для работы именно с окружением)
    - добавлен UglifyJsPlugin
- 06.02:
    - вынесены некоторые настройки из файла package.json в файл конфига
    - переделана система окружений (возможно стоит вынести в разные файлы)
- 16.02
    - Добавлено 2 точки входа и контекст(шаблон [name] работает только с несколькими точками входа)
    - Добавлен NoErrorsPlugin(Не дает дособраться сборке при ошибках)
    - Добавлен CommonsChunkPlugin и новая точка входа для common
    - Посмотреть подробную статистику по сборке --display-modules -v
    - Мультикомпиляция: передать в module.exports = [{webpack.conf}, {webpack.conf}, {webpack.conf}]
- 27.02
    - require.ensure([arrayOfModules], function () {}, 'name')
        - обязателен publicPath в конфиге
        - можно с пустым массивом(подключать в нутри коллбэка)
        - 3й параметр для объединения нескольких модулей в один
        - есть плагины по уменьшению кол-ва отдельных маленьких модулей(limitchunkcountplugin, MinChunkSizePlugin, AggressiveMergingPlugin)
    - require('./path/'+expression+'.js')
        - 1я часть определяет путь до модуля
        - 3я часть определяет RegExp для нужных файлов
        - ищет все файлы подподающие под условия пути и RegExp и пытается добавить в сборку
        - строгая структура путь - выражение - расширение(нельзя скажем впихнуть туда функцию, которая будет возвращать строчку)
        - создается контекст по пути и расширению(в сборку попадут и подкатологи)
    - require.context('./path/', useSubdirectories=false, regExp=/\.js$/)
        - метод resolve('./login') возвращает номер модуля
        - метод keys() возвращает все модули в контексте с расширениями и без
- 03.03
    - bundle-loader(routing)
    - new webpack.ContextReplacementPlugin(
                      resourceRegExp,
                      [newContentResource],
                      [newContentRecursive],
                      [newContentRegExp])
    - new webpack.IgnorePlugin(requestRegExp, [contextRegExp])
    - Externals