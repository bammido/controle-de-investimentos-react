import React from 'react';
import { colors } from '../../theme/Theme';

import { Calendar, CalendarProps } from 'primereact/calendar';

export default function DatePicker(props: CalendarProps) {
    return <div>
        <Calendar {...props} />
        <style jsx='true' >{`
        .p-datepicker-calendar{
            /* color: ${colors.primary[6]}; */
        }
        .p-datepicker .p-datepicker-header .p-datepicker-title .p-datepicker-year, .p-datepicker .p-datepicker-header .p-datepicker-title .p-datepicker-month{
            // color: ${colors.primary[5]};
        }
        .p-datepicker .p-datepicker-header .p-datepicker-prev, .p-datepicker .p-datepicker-header .p-datepicker-next{
            // color: ${colors.primary[5]};
        }
        .p-button.p-button-secondary.p-button-text, .p-buttonset.p-button-secondary > .p-button.p-button-text, .p-splitbutton.p-button-secondary > .p-button.p-button-text, .p-fileupload-choose.p-button-secondary.p-button-text{
            // color: ${colors.primary[5]};

        }
        `}</style>
    </div>
}