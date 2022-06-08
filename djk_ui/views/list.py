class UiListSortingView:

    highlight_mode = 'cycleRows'
    highlight_mode_rules = {
        'none': {
            'cycler': [],
        },
        'cycleColumns': {
            'direction': 0,
            'cycler': ['text-dark bg-light', 'text-dark'],
        },
        'cycleRows': {
            'direction': 1,
            'cycler': ['text-dark bg-light', 'text-dark'],
        },
        'linearRows': {
            'direction': 1,
            'cycler': ['linear-white'],
        }
    }
