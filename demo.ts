'use strict';

import $ = require('jquery');
import Selector from './src/index';

(function() {
    const selector = new Selector('select');

    const eventsLog = $('#events-log');

    selector.setListener((event: string, data: any) => {
        eventsLog.append(event);
        eventsLog.append('\n');
        eventsLog.append(JSON.stringify(data));
        eventsLog.append('\n\n');
    });

    $('#set-values-list').click(() => {
        selector.setValueList(eval($('#values-list').html()));
        $('#current-value').html(selector.getValue().toString());
    });
    $('[id^="switch-value"]').click(function() {
        selector.setValue($(this).attr('name'));
        $('#current-value').html(selector.getValue().toString());
    });
}());
