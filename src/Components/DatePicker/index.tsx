import React from 'react';
import { colors } from '../../theme/Theme';

import { Calendar, CalendarProps } from 'primereact/calendar';

export default function DatePicker(props: CalendarProps) {
    return <div>
        <Calendar {...props} />
    </div>
}