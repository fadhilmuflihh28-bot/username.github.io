const app = document.getElementById("app");

function save(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function load(key) {
  return JSON.parse(localStorage.getItem(key)) || {};
}

function welcome() {
  app.innerHTML = `
    <h2>Sistem Pemeriksaan Pasien</h2>
    <button onclick="loginDokter()">Dokter</button>
    <button onclick="halamanPasien()">Pasien</button>
  `;
}

function loginDokter() {
  app.innerHTML = `
    <h3>Login Dokter</h3>
    <input id="user" placeholder="Username">
    <input id="pw" type="password" placeholder="Password">
    <button onclick="cekLogin()">Login</button>
    <button onclick="register()">Daftar</button>
    <button onclick="welcome()">Kembali</button>
  `;
}

function cekLogin() {
  const akun = load("akun");
  if (akun[user.value] === pw.value) halamanDokter();
  else alert("Login gagal");
}

function register() {
  app.innerHTML = `
    <h3>Daftar Dokter</h3>
    <input id="user">
    <input id="pw" type="password">
    <button onclick="simpanAkun()">Simpan</button>
  `;
}

function simpanAkun() {
  let akun = load("akun");
  akun[user.value] = pw.value;
  save("akun", akun);
  alert("Akun dibuat");
  loginDokter();
}

function halamanDokter() {
  app.innerHTML = `
    <h3>Input Pasien</h3>
    <input id="nama" placeholder="Nama">
    <input id="poli" placeholder="Poli">
    <input id="obat" placeholder="Obat">
    <input id="kontrol" placeholder="Tanggal Kontrol">
    <div id="qr"></div>
    <button onclick="simpanPasien()">Simpan</button>
  `;
}

function simpanPasien() {
  let data = load("pasien");
  data[nama.value] = {
    poli: poli.value,
    obat: obat.value,
    kontrol: kontrol.value
  };
  save("pasien", data);

  document.getElementById("qr").innerHTML = "";
  new QRCode("qr", nama.value);
  alert("Data tersimpan");
}

function halamanPasien() {
  app.innerHTML = `
    <h3>Pasien</h3>
    <input id="nama">
    <button onclick="lihatData()">Cari</button>
    <div id="reader"></div>
    <button onclick="scanQR()">Scan QR</button>
    <button onclick="welcome()">Kembali</button>
  `;
}

function lihatData() {
  let data = load("pasien")[nama.value];
  if (!data) return alert("Tidak ditemukan");

  app.innerHTML = `
    <h3>Data Pasien</h3>
    <p>Nama: ${nama.value}</p>
    <p>Poli: ${data.poli}</p>
    <p>Obat: ${data.obat}</p>
    <p>Kontrol: ${data.kontrol}</p>
    <button onclick="welcome()">Selesai</button>
  `;
}

function scanQR() {
  const qr = new Html5Qrcode("reader");
  qr.start(
    { facingMode: "environment" },
    { fps: 10, qrbox: 250 },
    text => {
      nama.value = text;
      qr.stop();
    }
  );
}

welcome();
