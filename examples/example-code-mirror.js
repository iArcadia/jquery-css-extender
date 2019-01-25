function initializeCodeMirror() {
    $('.CodeMirror, .CodeMirror-header').remove();

    createCodeMirror('html');
    createCodeMirror('js');
}

function createCodeMirror(which) {
    let mode, text, code;

    switch (which) {
        case 'js':
            mode = 'javascript';
            text = 'Javascript';
            code = $('script').last().text();
            code = /\s*\/{2} <codemirror-content>(.+?)\/{2} <\/codemirror-content>/s.exec(code)[1].trim()
                .replace(/ {12}([^ ])/g, '$1');
            break;

        case 'html':
            mode = 'text/html';
            text = 'HTML';
            code = $('#my-content').html()
                .replace(/<span data-trans=".+">(.+)<\/span>/g, '$1')
                .replace(/ data-trans=".+"/g, '')
                .replace(/ style=".+"/g, '')
                .replace(/<textarea.+\/textarea>/gs, '')
                .replace(/ {4}([^ ])/g, '$1')
                .trim();
            break;
    }

    let $code = $(`#code-${which}`).text(code);

    let cm = CodeMirror.fromTextArea($code[0], {
        mode: mode,
        theme: 'zenburn',
        lineNumbers: true,
        readOnly: true
    });

    let $cm = $code.next();

    $('<div>').addClass('CodeMirror-header').insertBefore($cm).css(`
        margin-top: 20px;
        padding: 5px 10px;

        font-family: monospace;

        border-bottom: 1px solid #fff;
    `).copyCss($cm, ['background-color', 'color']).text(text);

    $cm.css(`
        width: 100%;
        height: auto;
    `);

    if ($cm.height() > 200) {
        cm.setSize(null, 200);
    }
}

$(document).on('translated', initializeCodeMirror);