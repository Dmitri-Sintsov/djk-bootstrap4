void function(TransformTags) {

    TransformTags._init = TransformTags.init;

    TransformTags.init = function() {
        this._init();
        this.add({
            'CARD-DEFAULT': TransformTags.bsCard,
            'CARD-PRIMARY': TransformTags.bsCard,
            'CARD-SUCCESS': TransformTags.bsCard,
            'CARD-INFO': TransformTags.bsCard,
            'CARD-WARNING': TransformTags.bsCard,
            'CARD-DANGER': TransformTags.bsCard,
            'CARD-SECONDARY': TransformTags.bsCard,
            'CARD-LIGHT': TransformTags.bsCard,
            'CARD-DARK': TransformTags.bsCard,
            'CARD-HEADER': TransformTags.bsCardHeader,
            'CARD-BODY': TransformTags.bsCardBody,
            'CARD-FOOTER': TransformTags.bsCardFooter,
            'CARD-TITLE': TransformTags.bsCardTitle,
        });
    };

    TransformTags.bsCard = function(elem, tagName) {
        var typ = tagName.split(/-/)[1].toLowerCase();
        return this.toTag(elem, 'div', 'card ' + (typ === 'light' ? '' : 'text-white ') + 'bg-' + typ + ' mb-3');
    };

    TransformTags.bsCardHeader = function(elem, tagName) {
        return this.toTag(elem, 'div', 'card-header');
    };

    TransformTags.bsCardBody = function(elem, tagName) {
        return this.toTag(elem, 'div', 'card-body');
    };

    TransformTags.bsCardFooter = function(elem, tagName) {
        return this.toTag(elem, 'div', 'card-footer');
    };

    TransformTags.bsCardTitle = function(elem, tagName) {
        return this.toTag(elem, 'div', 'card-title');
    };

}(App.TransformTags.prototype);

App.transformTags = new App.TransformTags();

App.ui = {
    cardTitleSelector: '.card-title:first',
};
