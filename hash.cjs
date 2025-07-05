// buat_hash.cjs
const bcrypt = require('bcryptjs');

// Ganti dengan password baru yang kuat
const passwordBaru = 'uwu123';

const hash = bcrypt.hashSync(passwordBaru, 10);

console.log(`Password Asli: ${passwordBaru}`);
console.log('============================================================');
console.log(`Hash untuk Database (salin teks di bawah ini):`);
console.log(hash);
console.log('============================================================');