function updateDateTime() {
    const now = new Date()

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    }

    const formattedDate = now.toLocaleDateString("en-US", options)
        .replace(" at ", ", ")

    const clockElement = document.getElementById("live-datetime")
    if (clockElement) {
        clockElement.innerHTML = `Arena Live Time: <strong>${formattedDate}</strong>`
    }
}

updateDateTime();
setInterval(updateDateTime, 1000);

const accordionHeaders = document.querySelectorAll('.accordion-header');
accordionHeaders.forEach(header => {
    header.addEventListener('click', function () {
        const parent = this.parentElement;
        const body = this.nextElementSibling;

        parent.classList.toggle('active');

        if (parent.classList.contains('active')) {
            body.style.maxHeight = body.scrollHeight + 'px';
        } else {
            body.style.maxHeight = '0px';
        }
    });
});