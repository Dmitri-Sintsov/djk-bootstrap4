from django.forms.widgets import ChoiceWidget


class UiBaseGridWidget(ChoiseWidget):

    js_classpath = None  # 'FkGridWidget'
    component_template_str = '<fk-grid-widget{component_attrs}></fk-grid-widget>'
