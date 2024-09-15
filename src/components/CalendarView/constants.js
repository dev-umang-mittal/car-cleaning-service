export const Views = {
    DAILY: 'Daily',
    WEEKLY: 'Weekly',
    MONTHLY: 'Monthly'
};

export const Buttons = {
    [Views.DAILY]: 'Daily',
    [Views.WEEKLY]: 'Weekly',
    [Views.MONTHLY]: 'Monthly',
};

export const CalendarViews = [{
    view: Views.DAILY,
    button: Buttons[Views.DAILY]
},{
    view: Views.WEEKLY,
    button: Buttons[Views.WEEKLY]
},{
    view: Views.MONTHLY,
    button: Buttons[Views.MONTHLY]
}]