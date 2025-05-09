const {baseConfig} = require('@virmator/spellcheck/configs/cspell.config.base.cjs');

module.exports = {
    ...baseConfig,
    ignorePaths: [
        ...baseConfig.ignorePaths,
    ],
    words: [
        ...baseConfig.words,
        'clob',
        'foreignkey',
        'mediumint',
        'napi',
        'notnull',
        'nvarchar',
        'primarykey',
        'tinyint',
    ],
};
