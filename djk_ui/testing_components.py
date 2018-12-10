class DialogCommands:

    def _dialog_footer_button_click(self, button_title):
        return self.exec(
            # 'to_active_element',
            'to_top_bootstrap_dialog',
            'dialog_relative_by_xpath', (
                './/div[@class="modal-footer"]//button[contains(., {})]',
                button_title,
            ),
            'click',
        )
