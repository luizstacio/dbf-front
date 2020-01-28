import parsedbf from 'parsedbf';
import { Buffer } from 'buffer';

const fileToArrayBuffer = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

document.querySelector('#myfile').addEventListener('change', () => {
    const file = document.querySelector('#myfile').files[0];
    fileToArrayBuffer(file).then(data => {
        const buffer = Buffer.from(data);
        const parsedDBF = parsedbf(buffer);
        const fields = Object.keys(parsedDBF[0]);

        document.querySelector('#fields').innerText = fields.join(', ');
    })
});
