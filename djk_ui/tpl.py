from django.utils.html import escape, mark_safe
from django_jinja_knockout import tpl


def print_bs_labels(row, bs_type='info', cb=escape, show_keys=None, i18n=None):
    # See app.css how .conditional-display can be displayed as block element or inline element
    # via outer .display-block / .display-inline classes.
    return mark_safe(
        tpl.PrintList(
            tpl={
                'v': '<span{attrs}>{v}</span><span class="conditional-display"></span>',
                'kv': '<span{attrs}>{k}: {v}</span><span class="conditional-display"></span>',
                'top': '{}',
            },
            tpl_kwargs={'attrs': {'class': 'badge bg-' + bs_type + ' fs-85 preformatted'}},
            cb=cb,
            show_keys=show_keys,
            i18n=i18n
        ).nested(row)
    )


def print_bs_badges(row, cb=escape, show_keys=None, i18n=None):
    # See app.css how .conditional-display can be displayed as block element or inline element
    # via outer .display-block / .display-inline classes.
    return mark_safe(
        tpl.PrintList(
            tpl={
                'v': '<span{attrs}>{v}</span><span class="conditional-display"></span>',
                'kv': '<span{attrs}><div{k_attrs}>{k}:</div> {v}</span><span class="conditional-display"></span>',
                'top': '{}',
            },
            tpl_kwargs={
                'attrs': {'class': "badge badge-info fs-85 preformatted"},
                'k_attrs': {'class': "badge badge-primary text-white preformatted"}
            },
            cb=cb,
            show_keys=show_keys,
            i18n=i18n
        ).nested(row)
    )


def print_bs_well(row, cb=escape, show_keys=None, i18n=None):
    # See app.css how .conditional-display can be displayed as block element or inline element
    # via outer .display-block / .display-inline classes.
    return mark_safe(
        tpl.PrintList(
            tpl={
                'v': '<span{attrs}>{v}</span><span class="conditional-display"></span>',
                'kv': ('<span{attrs}><div{k_attrs}>{k}:</div> {v}</span>'
                        '<span class="conditional-display"></span>'),
                'top': '<div class="border bg-light p-1 m-1">{}</div>',
            },
            tpl_kwargs={
                'attrs': {'class': "badge badge-info fs-85 p-1 m-1 text-left preformatted"},
                'k_attrs': {'class': "badge badge-secondary mr-1 preformatted"}
            },
            cb=cb,
            show_keys=show_keys,
            i18n=i18n
        ).nested(row)
    )


def print_list_group(row, cb=escape, skip_empty=False, show_keys=None, i18n=None):
    return mark_safe(
        tpl.PrintList(
            tpl={
                'v': '<li{li_attrs}>{v}</li>\n',
                'kv': '<li{li_attrs}>{k}: <span{v_attrs}>{v}</span></li>\n',
                'top': '<ul class="list-group">{}</ul>\n',
            },
            tpl_kwargs={
                'li_attrs': {'class': 'list-group-item'},
                'v_attrs': {'class': 'bold'},
            },
            cb=cb,
            skip_empty=skip_empty,
            show_keys=show_keys,
            i18n=i18n
        ).nested(row)
    )


def print_badge_list_group(row, cb=escape, show_keys=None, i18n=None):
    return mark_safe(
        tpl.PrintList(
            tpl={
                'v': '<li{v_attrs}>{v}</li>\n',
                'kv': '<li{v_attrs}><span{k_attrs}>{k}</span>{v}</li>\n',
                'top': '<ul class="list-group">{}</ul>\n',
            },
            tpl_kwargs={
                'v_attrs': {'class': 'list-group-item'},
                'k_attrs': {'class': "badge badge-info float-right preformatted"},
            },
            cb=cb,
            show_keys=show_keys,
            i18n=i18n
        ).nested(row)
    )
