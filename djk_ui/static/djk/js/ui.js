/**
 * Does not provide the full abstraction layer, only minimizes the difference between bs3 and bs4 API.
 */

import { propGet } from './prop.js';
import { AppConf } from './conf.js';
import { elements } from './elements.js';
import { TransformTags } from './transformtags.js';

var blockTags = {
    list: [
        {
            enclosureTag: '<ul>',
            // enclosureClasses: 'list-group',
            enclosureClasses: 'list-group',
            itemTag: '<li>',
            // itemClasses: 'condensed list-group-item preformatted',
            itemClasses: 'condensed list-group-item preformatted',
            localKeyTag: '<div>',
            // localKeyClasses: 'label label-info label-gray preformatted br-after',
            localKeyClasses: 'badge preformatted',
        },
        {
            enclosureTag: '<ul>',
            // enclosureClasses: 'list-group',
            enclosureClasses: 'list-group',
            itemTag: '<li>',
            // itemClasses: 'condensed list-group-item list-group-item-warning preformatted',
            itemClasses: 'condensed list-group-item text-secondary preformatted',
            localKeyTag: '<div>',
            // localKeyClasses: 'label label-info label-gray preformatted br-after',
            localKeyClasses: 'badge text-info preformatted',
        },
    ],
    badges: [
        {
            enclosureTag: '<div>',
            // enclosureClasses: 'well well-condensed well-sm',
            enclosureClasses: 'border bg-light p-1 m-1',
            itemTag: '<span>',
            // itemClasses: 'badge preformatted',
            itemClasses: 'badge badge-info p-1 m-1 text-left preformatted',
            localKeyTag: '<div>',
            // localKeyClasses: 'label label-info label-white preformatted',
            localKeyClasses: 'badge badge-secondary mr-1 preformatted',
        }
    ]
};

var cardTagDef = {
    classes: ['card'],
    getTextClass: function(cardType) {
        return (typeof {'light': '', 'default': ''}[cardType]) === 'undefined' ?  'text-white': '';
    },
    getBgClass: function(cardType) {
        return 'bg-' + cardType;
    },
    addCardClasses: function(cardType) {
        if (cardType) {
            var textClass = this.getTextClass(cardType);
            var bgClass = this.getBgClass(cardType);
            if (textClass !== '') {
                this.classList.add(textClass);
            }
            this.classList.add(bgClass);
        }
    },
    removeCardClasses: function(cardType) {
        if (cardType) {
            var textClass = this.getTextClass(cardType);
            var bgClass = this.getBgClass(cardType);
            if (textClass !== '') {
                this.classList.remove(textClass);
            }
            this.classList.remove(bgClass);
        }
    },
    getCardType: function() {
        if (this.hasAttribute('type')) {
            return this.getAttribute('type');
        } else {
            return this.tagName.split(/-/)[1].toLowerCase();
        }
    },
    connected: function() {
        var cardType = this.getCardType();
        this.addCardClasses(cardType);
        this.classList.add('mb-3');
    },
    attributeChanged: {
        type: function(oldValue, newValue, tagDef) {
            this.removeCardClasses(oldValue);
            this.addCardClasses(newValue);
        }
    }
};

elements.newBlockElements(
    $.extend({name: 'card-type'}, cardTagDef),
    $.extend({name: 'card-default'}, cardTagDef),
    $.extend({name: 'card-primary'}, cardTagDef),
    $.extend({name: 'card-success'}, cardTagDef),
    $.extend({name: 'card-info'}, cardTagDef),
    $.extend({name: 'card-warning'}, cardTagDef),
    $.extend({name: 'card-danger'}, cardTagDef),
    $.extend({name: 'card-secondary'}, cardTagDef),
    $.extend({name: 'card-light'}, cardTagDef),
    $.extend({name: 'card-dark'}, cardTagDef),
    {
        name: 'card-group',
        classes: ['card-group']
    },
    {
        name: 'card-header',
        classes: ['card-header']
    },
    {
        name: 'card-body',
        classes: ['card-body', 'text-dark', 'bg-white']
    },
    {
        name: 'card-footer',
        classes: ['card-footer', 'text-dark', 'bg-light']
    },
    {
        name: 'card-title',
        classes: ['card-title', 'mb-0']
    },
    {
        name: 'navbar-default',
        classes: ['nav', 'navbar', 'navbar-light', 'bg-light', 'navbar-expand-md']
    },
    /*
    // Inherited custom elements v1 do not work yet.
    {
        ancestor: HTMLFormElement,
        name: 'form-inline',
        extendsTagName: 'form',
        classes: ['form', 'form-inline'],
    }
    */
);

void function(TransformTags) {

    TransformTags._init = TransformTags.init;

    TransformTags.init = function() {
        this._init();
        if (AppConf('compatTransformTags')) {
            this.add({
                'CARD-TYPE': TransformTags.bsCard,
                'CARD-DEFAULT': TransformTags.bsCard,
                'CARD-PRIMARY': TransformTags.bsCard,
                'CARD-SUCCESS': TransformTags.bsCard,
                'CARD-INFO': TransformTags.bsCard,
                'CARD-WARNING': TransformTags.bsCard,
                'CARD-DANGER': TransformTags.bsCard,
                'CARD-SECONDARY': TransformTags.bsCard,
                'CARD-LIGHT': TransformTags.bsCard,
                'CARD-DARK': TransformTags.bsCard,
                'CARD-GROUP': TransformTags.bsCardGroup,
                'CARD-HEADER': TransformTags.bsCardHeader,
                'CARD-BODY': TransformTags.bsCardBody,
                'CARD-FOOTER': TransformTags.bsCardFooter,
                'CARD-TITLE': TransformTags.bsCardTitle,
                'NAVBAR-DEFAULT': TransformTags.navbarDefault,
            });
        }
        // Inherited custom elements v1 do not work yet.
        this.add({'FORM-INLINE': TransformTags.formInline});
    };

    TransformTags.bsCard = function(elem, tagName) {
        if (elem.hasAttribute('type')) {
            var typ = elem.getAttribute('type');
            elem.removeAttribute('type');
        } else {
            var typ = tagName.split(/-/)[1].toLowerCase();
        }
        var textClass = (typeof {'light': '', 'default': ''}[typ]) === 'undefined' ?  'text-white ': '';
        return this.toTag(elem, 'div', 'card ' + (typ === 'light' ? '' : textClass) + 'bg-' + typ + ' mb-3');
    };

    TransformTags.bsCardGroup = function(elem, tagName) {
        return this.toTag(elem, 'div', 'card-group');
    };

    TransformTags.bsCardHeader = function(elem, tagName) {
        return this.toTag(elem, 'div', 'card-header');
    };

    TransformTags.bsCardBody = function(elem, tagName) {
        return this.toTag(elem, 'div', 'card-body text-dark bg-white');
    };

    TransformTags.bsCardFooter = function(elem, tagName) {
        return this.toTag(elem, 'div', 'card-footer text-dark bg-light');
    };

    TransformTags.bsCardTitle = function(elem, tagName) {
        return this.toTag(elem, 'div', 'card-title mb-0');
    };

    TransformTags.formInline = function(elem, tagName) {
        return this.toTag(elem, 'form', 'form-inline');
    };

    TransformTags.navbarDefault = function(elem, tagName) {
        return this.toTag(elem, 'nav', 'nav navbar navbar-light bg-light navbar-expand-md');
    };

}(TransformTags.prototype);

var transformTags = new TransformTags();

function disposePopover($elem) {
    return $elem.popover('dispose');
}

function highlightNav(anchor, highlight) {
    if (highlight) {
        $(anchor).addClass('active');
    } else {
        $(anchor).removeClass('active');
    }
}

function getCardTitle($elem) {
    return $elem.find('.card-title:first');
}

/**
 * Uses Tempus Dominus for Bootstrap 4, version 5.1.2.
 */
function UiDatetimeWidget() {};

void function(UiDatetimeWidget) {

    UiDatetimeWidget.wrap = function() {
        this.$dateControls.each(function(k, v) {
            var $dateControl = $(v);
            var targetId = $(v).prop('id');
            if (!targetId) {
                targetId = 'dtp-' + $.randomHash() ;
            }
            $dateControl
            .addClass('datetimepicker-input')
            .attr('id', targetId)
            .attr('target', '#' + targetId)
            .wrap('<div class="input-group"></div>');
            $dateControl.after(
                '<div class="input-group-append pointer" data-target="#' + targetId + '" data-toggle="datetimepicker">' +
                '<div class="input-group-text"><span class="fa fa-calendar"></span></div>' +
                '</div>'
            );
        });
    };

    UiDatetimeWidget.init = function() {
        if (this.has()) {
            this.wrap();
            var formatFix = propGet(this.formatFixes, AppConf('languageCode'));

            // Datetime field widget.
            var options = {
                // keepInvalid: true,
                language: AppConf('languageCode'),
            };
            if (formatFix !== undefined) {
                options.format = formatFix.datetime;
                // options.extraformats = [options.format];
            }
            this.$dateControls.filter('.datetime-control').datetimepicker(options);

            // Date field widget.
            var options = {
                language: AppConf('languageCode'),
                format: 'L',
            };
            if (formatFix !== undefined) {
                options.format = formatFix.date;
                // options.extraformats = [options.format];
            }
            this.$dateControls.filter('.date-control').datetimepicker(options);
        }
        return this;
    };

    UiDatetimeWidget.destroy = function() {
        if (this.has()) {
            this.$dateControls.parent('.input-group').each(function() {
                if ($(this).data('datetimepicker') !== undefined) {
                    $(this).datetimepicker('destroy');
                }
            });
        }
    };

}(UiDatetimeWidget.prototype);

var ui = {
    defaultDialogSize: BootstrapDialog.SIZE_WIDE,
    dialogBlockTags: blockTags.list,
    // Currently available highlight directions:
    //   0 - do not highlight,
    //   1 - highlight columns,
    //   2 - highlight rows,
    highlightModeRules: [
        {
            'none': {
                direction: null,
                header: '',
                cycler: [],
            }
        },
        {
            'cycleColumns': {
                direction: 0,
                header: 'table-info',
                cycler: ['table-warning', ''],
            },
        },
        {
            'cycleRows': {
                direction: 1,
                header: 'table-info',
                cycler: ['table-warning', ''],
            },
        },
        {
            'linearRows': {
                direction: 1,
                header: '',
                cycler: ['linear-white'],
            }
        },
    ],
    labelClass: 'badge',
    version: 4,
};

export { blockTags, transformTags, disposePopover, highlightNav, getCardTitle, UiDatetimeWidget, ui };
