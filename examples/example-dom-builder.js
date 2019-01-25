function buildPage() {
    let $body = $('body').css(`margin: 0`);

    let $container = $('<div>').attr('id', 'container').css(`
        width: 100%;
        height: 100vh;
        background: linear-gradient(#ededed, #eee, #eaeaea);
    `).appendTo($body);

    let $block = $('<div>').attr('id', 'block').css(`
        position: fixed;
        top: 50%;
        left: 50%;

        width: 80%;
        height: 80%;

        background-color: #fff;
        border-radius: 3px;
        box-shadow: 0 0 20px rgba(0,0,0,.25);

        transform: translate(-50%, -50%);
    `).appendTo($container);

    let $blockHeader = $('<div>').attr('id', 'block-header').css(`
        padding: 2em 4em .5em 4em;

        background-color: #21a2ed;
        border-radius: 3px 3px 0 0;
    `).appendTo($block);

    let $title = $('<h1>').css(`
        margin: 0;

        font-size: 40px;
        text-align: center;
        text-shadow: 0 0 5px rgba(0,0,0,.1);
        text-fill-color: transparent;

        background: linear-gradient(rgba(255,255,255,.75), 44%, #fff 46%, #fff 50%, rgba(255,255,255,.75) 66%);
        -webkit-background-clip: text;
    `).text('jQuery CSS Extender').appendTo($blockHeader);

    let $subtitle = $('<h2>').css(`
        padding: 10px 0;

        color: #c9f0f2;
        text-align: center;
        text-shadow: 0 0 5px rgba(0,0,0,.5);
    `).appendTo($blockHeader);

    $subtitle.append(
        $('<span>').attr('data-trans', 'example'),
        $('<span>').attr('data-trans', 'subtitle')
    );

    $subtitle.find('span:last-of-type').css(`
        color: #fff;
    `);

    $('h1, h2').css(`font-family: sans-serif`);

    let $content = $('<div>').attr('id', 'content').css(`
        padding: 0 3em 2em 3em;
    `).appendTo($block);

    $content.append(
        $('<p>').attr('data-trans', 'description')
    );

    $content.find('p').css(`
        font-size: 20px;
        text-align: center;
    `);

    $('#my-content').append(
        $('<textarea>').attr('id', 'code-html'),
        $('<textarea>').attr('id', 'code-js')
    ).insertAfter($content.find('p')).css(`
        padding: 15px;
    
        background-color: #eee;
        border-radius: 3px;
    `);

    $('codemirror-content').insertAfter($('#my-content')).hide();

    $(document).trigger('pagebuilded');
}

$(document).ready(function () {
    buildPage();
});