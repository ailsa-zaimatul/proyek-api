import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  // 1. Ambil header authorization
  const authHeader = req.headers["authorization"];

  // 2. Jika authHeader ada, potong kata "Bearer " untuk mengambil token aslinya saja
  //    Jika tidak pakai Bearer, dia akan langsung mengambil teks tokennya
  const token = authHeader && authHeader.startsWith("Bearer ") 
    ? authHeader.split(" ")[1] 
    : authHeader;

  // 3. Jika token sama sekali tidak dikirim
  if (!token) {
    return res
      .status(401)
      .send("Access Denied: Token tidak ditemukan, silakan login.");
  }

  try {
    // 4. Verifikasi token menggunakan secret key "perpus2025"
    const verified = jwt.verify(token, "perpus2025");

    req.user = verified;
    next(); // Lolos penjagaan, lanjut ke controller data

  } catch (error) {
    res
    // Tambahkan dua baris console.log ini untuk mengintip isi token & error aslinya
    console.log("=== INVESTIGASI JWT ===");
    console.log("Token yang diterima backend:", token);
    console.log("Pesan Error Asli dari Library JWT:", error.message);
    console.log("=======================");

    res
      .status(403)
      .send(`Invalid Token: ${error.message}`); // Biar pesan error aslinya kelihatan juga di Postman!
  }
  };