export default function generatePassword(length: number) {
    const alphabet = 'QAZWSXEDCRFVTGBYHNUJMIKOLPp_#@!$%&lmokijuhygtfrdeswaqzxcmnbv1234567890'.split('');
    let generatedPassword: string = '';

    for (let i = 0; i < length; i++) {
        generatedPassword += alphabet[Math.floor(Math.random() * alphabet.length)];
    }

    return generatedPassword;
}