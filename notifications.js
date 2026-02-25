function scheduleReminders(task) {
    if (!task.dueTime) return;

    const due = new Date(task.dueTime).getTime();
    const now = Date.now();

    const intervals = [12, 6, 3]; // hours

    intervals.forEach(hours => {
        const reminderTime = due - hours * 60 * 60 * 1000;
        const delay = reminderTime - now;

        if (delay > 0) {
            setTimeout(() => {
                sendEmail(task, hours);
            }, delay);
        }
    });
}

function sendEmail(task, hoursLeft) {
    emailjs.send("service_5qh17bl", "template_0e22les", {
        task_name: task.text,
        hours_left: hoursLeft,
        to_email: "gauravamarnani1213@gmail.com"
    }, "yP-HeM87UPSSrcr_b");
}
