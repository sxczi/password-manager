import express from 'express';
import fs from 'fs';

import generatePassword from './generatePassword';
import { encrypt, decrypt } from './encryption';

const port = process.env.PORT || 3000;
const app = express();

app.use(express.static('public'));
app.use(express.json());

interface Account {
    site: string;
    username: string;
    password: string;
    index: number;
}

app.get('/accounts', (req, res) => {
    const accounts = JSON.parse(fs.readFileSync('./accounts.json', 'utf-8'));

    accounts.forEach((account: Account) => {
        account.username = decrypt(account.username);
        account.password = decrypt(account.password);
    });

    res.status(200).json(accounts);
});

app.get('/generatePassword', (req, res) => {
    res.send(generatePassword(16));
});

app.post('/accounts', (req, res) => {
    const accounts = JSON.parse(fs.readFileSync('./accounts.json', 'utf-8'));
    const { site, username, password } = req.body;

    if (site && username && password) {
        accounts.push({
            site,
            username: encrypt(username),
            password: encrypt(password),
            index: accounts[0] ? accounts[accounts.length -1].index + 1 : 1
        });

        fs.writeFileSync('./accounts.json', JSON.stringify(accounts));
    } else if (site && username && !password) {
        accounts.push({
            site,
            username: encrypt(username),
            password: encrypt(generatePassword(16)),
            index: accounts[0] ? accounts[accounts.length -1].index + 1 : 1
        });

        fs.writeFileSync('./accounts.json', JSON.stringify(accounts));
     } else {
        res.status(400).json({
            error: 'Please enter a site and a username/email and a password.'
        });
    }
});

app.delete('/accounts/:id', (req, res) => {
    let accounts = JSON.parse(fs.readFileSync('./accounts.json', 'utf-8'));

    if (accounts.some((account: Account) => account.index === Number.parseInt(req.params.id))) {
        accounts = accounts.filter((account: Account) => account.index !== Number.parseInt(req.params.id));
        fs.writeFileSync('./accounts.json', JSON.stringify(accounts));
    } else {
        res.status(404).json({
            error: `Account #${req.params.id} does not exist`
        });
    }
});

app.put('/accounts/:id', (req, res) => {
    const accounts = JSON.parse(fs.readFileSync('./accounts.json', 'utf-8'));

    if (accounts.some((account: Account) => account.index === Number.parseInt(req.params.id))) {
        accounts.forEach((account: Account) => {
            if (account.index === Number.parseInt(req.params.id)) {
                account.username = encrypt(req.body.username);
                account.password = encrypt(req.body.password);
            }
        });

        fs.writeFileSync('./accounts.json', JSON.stringify(accounts));
    } else {
        res.status(404).json({
            error: `Account #${req.params.id} does not exist`
        });
    }
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});