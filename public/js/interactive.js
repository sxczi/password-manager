function generatePassword(length) {
    const alphabet = 'QAZWSXEDCRFVTGBYHNUJMIKOLPp_#@!$%&lmokijuhygtfrdeswaqzxcmnbv1234567890'.split('');
    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
        generatedPassword += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    return generatedPassword;
}

export function interactive() {
    const view = (input) => {
        if (input.querySelector('.pass').getAttribute('type') === 'password') {
            input.querySelector('.pass').setAttribute('type', 'text');
        } else {
            input.querySelector('.pass').setAttribute('type', 'password');
        }
    };
    
    const copy = (input) => {
        input.querySelector('.pass').select();
        navigator.clipboard.writeText(input.querySelector('.pass').value);
    }

    const edit = (username, password, id) => {
        fetch(`/accounts/${id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password: password || generatePassword(16)
            })
        }).then(() => {
            console.log('Edited account #' + id);
        }).catch(() => {
            console.log('Could not edit account');
        })
    }

    const remove = (id, element) => {
        const confirmation = confirm(`Account #${id} will be deleted.`);

        if (confirmation) {
            element.remove();  
            fetch(`/accounts/${id}`, {
                method: 'delete'
            }).then(() => {
                console.log(`Deleted Account #${id}.`);
            }).catch(() => console.log('failed to delete account'));
        }
    }

    document.addEventListener('click', (e) => {
        if (e.target.id === 'edit') {
            const row = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;

            row.querySelector('.username').removeAttribute('readonly');
            row.querySelector('.pass').removeAttribute('readonly');
            row.querySelector('.pass').setAttribute('type', 'text');

            row.querySelector('.username').select();

            row.querySelectorAll('input').forEach(input => {
                input.addEventListener('keypress', (e) => {
                    if (e.keyCode === 13) {
                        if (e.target.classList.contains('pass')) {
                            const row = e.target.parentElement.parentElement.parentElement;

                            row.querySelector('.username').setAttribute('readonly', '');
                            row.querySelector('.pass').setAttribute('readonly', '');
                            row.querySelector('.pass').setAttribute('type', 'password');

                            edit(row.querySelector('.username').value, row.querySelector('.pass').value, row.getAttribute('index'));
                        } else {
                            const row = e.target.parentElement.parentElement;

                            row.querySelector('.username').setAttribute('readonly', '');
                            row.querySelector('.pass').setAttribute('readonly', '');
                            row.querySelector('.pass').setAttribute('type', 'password');

                            edit(row.querySelector('.username').value, row.querySelector('.pass').value, row.getAttribute('index'));
                        }
                    }
                })
            })
        } else if (e.target.id === 'delete') {
            const id = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute('index');
            remove(id, e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement);
        }
    });
    
    document.querySelectorAll('.options').forEach(item => {
        item.addEventListener('click', event => {
          if (event.target.tagName === 'path') {
            if (event.target.parentElement.id === 'view') {
                view(event.target.parentElement.parentElement.parentElement);
            } else if (event.target.parentElement.id === 'copy') {
                copy(event.target.parentElement.parentElement.parentElement);
            }
          } else {
            if (event.target.id === 'view') {
                view(event.target.parentElement.parentElement);
            } else if (event.target.id === 'copy') {
                copy(event.target.parentElement.parentElement);
            }
          }
        })
    })
}