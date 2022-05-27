/**
 * Does not provide the full abstraction layer, only minimizes the difference between bs3 / bs4 / bs5 API.
 */

import { propGet, propCall } from './prop.js';
import { AppConf } from './conf.js';
import { elements } from './elements.js';
import { initClient } from './initclient.js';
import { TransformTags } from './transformtags.js';

var blockTags = {
    list: [
        {
            enclosureTag: '<ul>',
            enclosureClasses: 'list-group',
            itemTag: '<li>',
            itemClasses: 'condensed list-group-item preformatted',
            localKeyTag: '<div>',
            localKeyClasses: 'badge bg-light text-primary preformatted',
        },
        {
            enclosureTag: '<ul>',
            enclosureClasses: 'list-group',
            itemTag: '<li>',
            itemClasses: 'condensed list-group-item text-secondary preformatted',
            localKeyTag: '<div>',
            localKeyClasses: 'badge bg-light text-secondary  preformatted',
        },
    ],
    badges: [
        {
            enclosureTag: '<div>',
            enclosureClasses: 'border bg-light p-1 m-1',
            itemTag: '<span>',
            itemClasses: 'badge badge-info p-1 m-1 text-left preformatted',
            localKeyTag: '<div>',
            localKeyClasses: 'badge badge-secondary mr-1 preformatted',
        }
    ]
};

var bsTagDef = {
    getTextClass: function(tagType) {
        return (typeof {'light': '', 'default': ''}[tagType]) === 'undefined' ?  'text-white': 'text-dark';
    },
    getBgClass: function(tagType) {
        return (tagType === 'default')? 'bg-light' : 'bg-' + tagType;
    },
    addTypeClasses: function(tagType) {
        if (tagType) {
            var textClass = this.getTextClass(tagType);
            var bgClass = this.getBgClass(tagType);
            if (textClass !== '') {
                this.classList.add(textClass);
            }
            this.classList.add(bgClass);
        }
    },
    removeTypeClasses: function(tagType) {
        if (tagType) {
            var textClass = this.getTextClass(tagType);
            var bgClass = this.getBgClass(tagType);
            if (textClass !== '') {
                this.classList.remove(textClass);
            }
            this.classList.remove(bgClass);
        }
    },
    getTagType: function() {
        if (this.hasAttribute('type')) {
            return this.getAttribute('type');
        } else {
            var tagType = this.tagName.split(/-/)[1].toLowerCase();
            if (tagType === 'type') {
                this.setAttribute('type', 'default');
                return 'default';
            } else {
                return tagType;
            }
        }
    },
    connected: function() {
        var tagType = this.getTagType();
        this.addTypeClasses(tagType);
        // this.classList.add('mb-3');
    },
    attributeChanged: {
        type: function(oldValue, newValue, tagDef) {
            this.removeTypeClasses(oldValue);
            this.addTypeClasses(newValue);
        }
    }
};

var badgeTagDef = $.extend({classes: ['badge', 'rounded-pill']}, bsTagDef);
var labelTagDef = $.extend({classes: ['badge']}, bsTagDef);
var cardTagDef = $.extend({classes: ['card']}, bsTagDef);

var dismissButtonTagDef = {
    ancestor: HTMLButtonElement,
    extendsTagName: 'button',
    classes: ['close'],
    styles: [
        {'text-decoration': 'none'},
        {'border': 'none'},
        {'opacity': '1'},
        {'background-color': 'transparent'},
    ],
    attrs: {
            'aria-label': 'Close',
    },
    innerHTML: '&times;',
};

elements.newCustomElements(
    {
        name: 'form-inline',
        ancestor: HTMLFormElement,
        extendsTagName: 'form',
        styles: [
            {'display': 'inline-block'},
            {'width': 'auto'},
            {'vertical-align': 'middle'},
        ]
    },
    {
        ancestor: HTMLDivElement,
        name: 'form-row',
        extendsTagName: 'div',
        classes: ['row', 'input-group', 'mb-2'],
    },
    {
        ancestor: HTMLDivElement,
        name: 'form-group',
        extendsTagName: 'div',
        classes: ['input-group', 'mb-2'],
    },
    {
        name: 'form-label',
        classes: ['form-label', 'ms-2', 'me-2'],
    },
    $.extend(true, {
        name: 'btn-dismiss'
    }, dismissButtonTagDef),
    $.extend(true, {
        name: 'dismiss-alert',
        attrs: {
            'data-dismiss': 'alert',
        }
    }, dismissButtonTagDef),
    $.extend({name: 'badge-type'}, badgeTagDef),
    $.extend({name: 'badge-default'}, badgeTagDef),
    $.extend({name: 'badge-primary'}, badgeTagDef),
    $.extend({name: 'badge-success'}, badgeTagDef),
    $.extend({name: 'badge-info'}, badgeTagDef),
    $.extend({name: 'badge-warning'}, badgeTagDef),
    $.extend({name: 'badge-danger'}, badgeTagDef),
    $.extend({name: 'badge-secondary'}, badgeTagDef),
    $.extend({name: 'badge-light'}, badgeTagDef),
    $.extend({name: 'badge-dark'}, badgeTagDef),
    $.extend({name: 'label-type'}, labelTagDef),
    $.extend({name: 'label-default'}, labelTagDef),
    $.extend({name: 'label-primary'}, labelTagDef),
    $.extend({name: 'label-success'}, labelTagDef),
    $.extend({name: 'label-info'}, labelTagDef),
    $.extend({name: 'label-warning'}, labelTagDef),
    $.extend({name: 'label-danger'}, labelTagDef),
    $.extend({name: 'label-secondary'}, labelTagDef),
    $.extend({name: 'label-light'}, labelTagDef),
    $.extend({name: 'label-dark'}, labelTagDef)
).newBlockElements(
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
);

void function(TransformTags) {

    TransformTags._init = TransformTags.init;

    TransformTags.init = function() {
        this._init();
        this.addAttrs({
            'bs-data': function(elem, attrName) {
                var attrsToRemove = [attrName];
                for (var i = 0; i < elem.attributes.length; i++) {
                    var name = elem.attributes[i].name;
                    if (name !== attrName) {
                        if (name.substr(0, 3) === 'bs-') {
                            elem.setAttribute(
                                'data-' + name.substr(3), elem.attributes[i].value
                            );
                            // attrsToRemove.push(name);
                        }
                    }
                }
                for (var i = 0; i < attrsToRemove.length; i++) {
                    var name = attrsToRemove[i];
                    elem.removeAttribute(name);
                }
            }
        });
        if (AppConf('compatTransformTags')) {
            this.addTags({
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
                'FORM-INLINE': TransformTags.formInline,
            });
        }
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

function UiPopover($elem) {

    this.init($elem);

} void function(UiPopover) {

    UiPopover.propCall = propCall;

    UiPopover.init = function($elem) {
        if ($elem instanceof jQuery) {
            if ($elem.length !== 1) {
                throw new Error("Only single element jQuery collection is supported");
            }
            this.elem = $elem.get(0);
        } else if ($elem instanceof HTMLElement) {
            this.elem = $elem;
        } else {
            this.elem = null;
        }
        this.popover = $(this.elem).data('bs.popover');
    };

    UiPopover.isHTML = function(options) {
        return options.content instanceof HTMLElement || options.content instanceof jQuery;
    };

    UiPopover.create = function(options) {
        if (this.popover) {
            throw new Error('Popover is already created');
        }
        options.placement = propGet(options, 'placement', $(this.elem).data('bsPlacement'));
        if (typeof options.placement === 'undefined') {
            options.placement = 'bottom';
        }
        options.html = propGet(options, 'html', $(this.elem).data('bsHtml'));
        if (typeof options.html === 'undefined') {
            options.html = this.isHTML(options);
            // detect callback function, distinguish from HTMLElement / jQuery "function"
            if (!options.html && typeof options.content === 'function') {
                options.content = options.content.call(this.elem);
                options.html = this.isHTML(options);
            }
        }
        if (typeof options.template === 'string') {
            // Convert universal .bs-popover-body to bs4 .popover-body
            var $template = $.contents(options.template);
            $template.find('.bs-popover-body').removeClass('bs-popover-body').addClass('popover-body');
            options.template = $template.prop('outerHTML');
        }
        $(this.elem).popover(options);
    };

    UiPopover.setContent = function($content) {
        if (this.popover) {
            this.popover.options.content = $content;
        }
    };

    UiPopover.hide = function() {
        this.propCall('popover.hide');
    };

    UiPopover.show = function() {
        this.propCall('popover.show');
    };

    UiPopover.close = function() {
        var evt = $(this.elem).data('trigger');
        if (evt !== undefined) {
            $(this.elem).trigger(evt);
        } else {
            this.hide();
        }
    };

    UiPopover.state = function(state) {
        switch (state) {
        case 'show':
            this.show();
            break;
        case 'hide':
            this.hide();
            break;
        default:
            throw new Error('Unknown popover state: ' + state);
        }
    };

    UiPopover.dispose = function() {
        this.propCall('popover.dispose');
    };

    // Find associated input by [data-popover].
    UiPopover.getRelatedInput = function() {
        $('[name="' + CSS.escape($(this.elem).data('popover')) + ']"')
    };

    // check out
    UiPopover.empty = function() {
        var $tip = this.getTip();
        if ($tip.length > 0) {
            var $content = $tip.find('.popover-body');
            initClient($content, 'dispose');
            $tip.find('.popover-body').empty();
        }
    };

    /**
     * Change properties of Bootstrap popover.
     */
    UiPopover.change = function(opts) {
        if (this.popover) {
            for (var opt in opts) {
                if (opts.hasOwnProperty(opt)) {
                    this.popover.config[opt] = opts[opt];
                }
            }
        }
    };

    /**
     * Bootstrap popover notification.
     * Changes properties of Bootstrap popover, show popover and move window scrollpos to related location hash.
     */
    UiPopover.update = function(opts) {
        this.change(opts);
        this.show();
        window.location.hash = '#' + $(this.elem).prop('name');
    };

    /**
     * Get tip DOM element for selected popover.
     */
    UiPopover.getTip = function() {
        var result = [];
        var data = $(this.elem).data();
        var tip = $.id(
            $(this.elem).attr('aria-describedby')
        );
        if (tip.length > 0) {
            result.push(tip.get(0));
        }
        return $(result);
    };

    UiPopover.isVisible = function() {
        return this.getTip().filter('.show').length > 0;
    };

}(UiPopover.prototype);


function UiTooltip($elem) {

    this.init($elem);

} void function(UiTooltip) {

    UiTooltip.propCall = propCall;

    UiTooltip.init = function($elem) {
        if ($elem instanceof jQuery) {
            if ($elem.length !== 1) {
                throw new Error("Only single element jQuery collection is supported");
            }
            this.elem = $elem.get(0);
        } else {
            this.elem = $elem;
        }
        this.tooltip = $(this.elem).data('bs.tooltip');
    };

    UiTooltip.create = function(options) {
        if (this.tooltip) {
            throw new Error('Tooltip is already created');
        }
        $(this.elem).tooltip(options);
    };

    UiTooltip.hide = function() {
        this.propCall('tooltip.hide');
    };

    UiTooltip.show = function() {
        this.propCall('tooltip.show');
    };

    UiTooltip.dispose = function() {
        this.propCall('tooltip.dispose');
    };

}(UiTooltip.prototype);


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

    UiDatetimeWidget.onShowDatetimepicker = function(ev) {
        var $widget = $(ev.target).next('.bootstrap-datetimepicker-widget:first');
        var $bootstrapDialogMessage = $widget.parents('.bootstrap-dialog-message:first');
        if ($bootstrapDialogMessage.length === 1) {
            $bootstrapDialogMessage.css({
                'max-height': 'none',
                'overflow-y': 'visible',
            });
        }
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
            this.$dateControls.filter('.datetime-control')
            .on('show.datetimepicker', this.onShowDatetimepicker)
            .datetimepicker(options);

            // Date field widget.
            var options = {
                language: AppConf('languageCode'),
                format: 'L',
            };
            if (formatFix !== undefined) {
                options.format = formatFix.date;
                // options.extraformats = [options.format];
            }
            this.$dateControls.filter('.date-control')
            .on('show.datetimepicker', this.onShowDatetimepicker)
            .datetimepicker(options);
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

export { blockTags, transformTags, highlightNav, getCardTitle, UiPopover, UiTooltip, UiDatetimeWidget, ui };
