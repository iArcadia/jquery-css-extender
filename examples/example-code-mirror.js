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

            code = $('#my-content').clone().html()
                .replace(/<span data-trans=".+">(.+)<\/span>/g, '$1')
                .replace(/ data-trans=".+"/g, '')
                .replace(/ style=".*"/g, '')
                .replace(/<div id="my-content-cm".*\/div>/gs, '')
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
    `).copyCss($cm, ['background-color', 'color']).append(
        $('<span>').text(text),
        $('<span>').addClass('CodeMirror-copy').html('<i class="fa fa-copy"></i>').css(`
            margin-left: 5px;
            
            cursor: pointer;
        `).on('click', function () {
            $(`#code-${which}`).show();
            $(`#code-${which}`)[0].select();
            document.execCommand('copy');
            $(`#code-${which}`).hide();

            $(this).prev().text(getCopiedTranslation());

            setTimeout(() => {
                $(this).prev().text(text);
            }, 2000);
        })
    );

    $cm.css(`
        width: 100%;
    `);

    let cmHeight = ($('#block').outerHeight(true) - $('#block-header').outerHeight(true)) - $('#description').outerHeight(true);

    cm.setSize(null, cmHeight);
}

function getCopiedTranslation() {
    switch ($('#select-language').find('option:selected').val()) {
        default:
        case 'en':
            return 'Copied to clipboard!';
        case 'fr':
            return 'Copié dans le presse-papier !';
    }
}

$(document).on('translated', initializeCodeMirror);