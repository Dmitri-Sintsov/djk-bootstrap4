App.blockTags = {
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
            localKeyClasses: 'badge badge-pill preformatted',
        },
        {
            enclosureTag: '<ul>',
            // enclosureClasses: 'list-group',
            enclosureClasses: 'list-group',
            itemTag: '<li>',
            // itemClasses: 'condensed list-group-item list-group-item-warning preformatted',
            itemClasses: 'condensed list-group-item bg-light preformatted',
            localKeyTag: '<div>',
            // localKeyClasses: 'label label-info label-gray preformatted br-after',
            localKeyClasses: 'badge badge-pill text-info preformatted',
        },
    ],
    badges: [
        {
            enclosureTag: '<div>',
            // enclosureClasses: 'well well-condensed well-sm',
            enclosureClasses: 'card card-body bg-light p-1 m-1',
            itemTag: '<span>',
            // itemClasses: 'badge preformatted',
            itemClasses: 'badge badge-pill badge-info p-1 m-1 preformatted',
            localKeyTag: '<div>',
            // localKeyClasses: 'label label-info label-white preformatted',
            localKeyClasses: 'badge badge-secondary mr-1 preformatted',
        }
    ]
};

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
            'FORM-INLINE': TransformTags.formInline,
            'NAVBAR-DEFAULT': TransformTags.navbarDefault,
        });
    };

    TransformTags.bsCard = function(elem, tagName) {
        var typ = tagName.split(/-/)[1].toLowerCase();
        var textClass = (typeof {'light': '', 'default': ''}[typ]) === 'undefined' ?  'text-white ': '';
        return this.toTag(elem, 'div', 'card ' + (typ === 'light' ? '' : textClass) + 'bg-' + typ + ' mb-3');
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

}(App.TransformTags.prototype);

App.transformTags = new App.TransformTags();

/**
 * Does not provide the full abstraction layer, only minimizes the difference between bs3 and bs4 API.
 */
App.ui = {
    defaultDialogSize: BootstrapDialog.SIZE_WIDE,
    disposePopover: function($elem) {
        return $elem.popover('dispose');
    },
    getCardTitle: function($elem) {
        return $elem.find('.card-title:first');
    },
    dialogBlockTags: App.blockTags.list,
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
    highlightNav: function(anchor, highlight) {
        if (highlight) {
            $(anchor).addClass('active');
        } else {
            $(anchor).removeClass('active');
        }
    },
    labelClass: 'badge',
    version: 4,
};


/**
 * Uses Tempus Dominus for Bootstrap 4, version 5.1.2.
 */
App.ui.DatetimeWidget = function() {};

void function(DatetimeWidget) {

    DatetimeWidget.wrapDateControls = function() {
        var hash = 'dtp-' + $.randomHash();
        this.$dateControls.addClass('datetimepicker-input');
        this.$dateControls.attr('target', '#' + hash);
        this.$dateControls.wrap('<div class="input-group" id="' + hash + '" data-target-input="nearest"></div>');
        this.$dateControls.after(
            '<div class="input-group-append pointer" data-target="#' + hash + '" data-toggle="datetimepicker">' +
            '<div class="input-group-text"><span class="fa fa-calendar"></span></div>' +
            '</div>'
        );
    };

    DatetimeWidget.init = function() {
        if (!this.has()) {
            return;
        }
        this.wrapDateControls();
        var formatFix = App.propGet(this.formatFixes, App.conf.languageCode);

        // Datetime field widget.
        var options = {
            language: App.conf.languageCode,
        };
        if (formatFix !== undefined) {
            options.format = formatFix.datetime;
            // options.extraformats = [options.format];
        }
        this.$parent.find('.datetime-control').parent('.input-group').datetimepicker(options);

        // Date field widget.
        var options = {
            language: App.conf.languageCode,
            format: 'L',
        };
        if (formatFix !== undefined) {
            options.format = formatFix.date;
            // options.extraformats = [options.format];
        }
        this.$parent.find('.date-control').parent('.input-group').datetimepicker(options);
        return this;
    };

}(App.ui.DatetimeWidget.prototype);
