document.addEventListener('DOMContentLoaded', () => {
    const personalForm = document.getElementById('personalForm');
    const contactForm = document.getElementById('contactForm');
    const queryString = location.search;
    const queryObject = new URLSearchParams(queryString);
    const currentForm = queryObject.get("firstName") ? "contactForm" : "personalForm";
    if (currentForm === 'personalForm') {
        const contactFormWrapper = document.getElementById('contactFormWrapper');
        contactFormWrapper.style.display = "none";
    } else {
        const personalFormWrapper = document.getElementById('personalFormWrapper');
        personalFormWrapper.style.display = "none";
        
    }


    personalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const firstname = document.getElementById('fname').value;
        const lastname = document.getElementById('lname').value;
        const day = document.getElementById('day').value;
        const month = document.getElementById('month').value;
        const year = document.getElementById('year').value;

        // const data = new FormData(personalForm);
        // data.append('dob', `${day}/${month}/${year}`);
        // data.append('firstName', firstname);
        // data.append('lastName', lastname);
        const contactFormWrapper = document.getElementById('contactFormWrapper');
        const personalFormWrapper = document.getElementById('personalFormWrapper');
        personalFormWrapper.style.display = "none"
        contactFormWrapper.style.display = "block";
        location.search= `?firstName=${firstname}&lastName=${lastname}&dob=${day}/${month}/${year}` 
    });

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const queryString = location.search;
        const queryObject = new URLSearchParams(queryString);
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const firstName= queryObject.get('firstName');
        const lastName= queryObject.get('lastName')
        const dob= queryObject.get('dob');
        const data= JSON.stringify({'email': email, 'phone': phone, 'firstName': firstName, 'lastName': lastName, 'dob':dob})
        console.log(data)


        fetch('/save-details', {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.text())
        .then(result => {
            alert(result);
            if (result === 'Details saved successfully') {
                contactForm.reset();
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        });
    });
});
