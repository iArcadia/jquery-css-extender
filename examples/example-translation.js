let translations = {};

function pushTranslation(id, transObj) {
    translations[String(id)] = transObj;
}

function getDomWithTranslationId(id) {
    return $(`[data-trans="${id}"]`);
}

function insertInDomTranslation() {
    let $div = $('<div>').attr('id', 'language-block').appendTo($('body')).css(`
        position: fixed;
        top: 10px;
        right: 10px;

        padding: 10px 20px;

        background-color: #fff;
    `);

    let $select = $('<select>').attr('id', 'select-language').appendTo($div).css(`
        border-radius: 3px;
    `);

    $('<option>').val('en').text('English').appendTo($select);
    $('<option>').val('fr').text('Français').appendTo($select);
}

function onChangeTranslation() {
    $('#select-language').on('change', translate);
}

function translate() {
    let language = $('#select-language').find('option:selected').val();

    for (let key in translations) {
        let insertBefore = translations[key]['_before'] || '';
        let insertAfter = translations[key]['_after'] || '';

        $(`[data-trans=${key}]`).text(insertBefore + translations[key][language] + insertAfter);
    }

    $(document).trigger('translated');
}

$(document).on('pagebuilded', function () {
    insertInDomTranslation();
    onChangeTranslation();

    $(document).trigger('translationready');
});