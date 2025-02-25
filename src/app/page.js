"use client";

import { useState } from "react";
import Head from "next/head";

export default function Home() {
  const [formData, setFormData] = useState({
    corporateName: "",
    picName: "",
    forecast: "",
    event: "",
    rangeDateStart: "",
    rangeDateEnd: "",
    desc: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log("📤 Mengirim Data:", formData);

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log("📥 Respons dari Server:", result);

      if (response.ok) {
        alert("Data berhasil dikirim ke Email & WhatsApp!");

        const phoneNumber = "6285772918284"; // Ganti dengan nomor tujuan
        const message = encodeURIComponent(
          `📌 *New Forecast*\n🏢 *Corporate:* ${formData.corporateName}\n👤 *PIC:* ${formData.picName}\n📅 *Date:* ${formData.rangeDateStart} - ${formData.rangeDateEnd}\n📊 *Forecast:* ${formData.forecast}\n🎟️ *Event:* ${formData.event}\n📝 *Desc:* ${formData.desc}`
        );

        window.location.href = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}&type=send`;

        setFormData({
          corporateName: "",
          picName: "",
          forecast: "",
          event: "",
          rangeDateStart: "",
          rangeDateEnd: "",
          desc: "",
        });
      } else {
        alert("Gagal mengirim data: " + result.message);
      }
    } catch (error) {
      console.error("❌ Error:", error.message);
      alert("Terjadi kesalahan: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-red-100 p-4 overflow-hidden">
        <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg border border-red-400">
          <div className="flex justify-center mb-4">
            <img src="./logo.png" alt="Lion Parcel" className="w-3/5" />
          </div>
          <h2 className="text-L font-bold text-red-600 text-center mb-6">
            SUBMIT INFORMASI KEBUTUHAN EVENT
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-red-700 font-medium">Corporate Name</label>
              <input
                type="text"
                name="corporateName"
                value={formData.corporateName}
                onChange={handleChange}
                placeholder="Masukkan nama corporate"
                className="w-full p-3 mt-1 border border-red-400 rounded-lg bg-white text-gray-900 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
            <div>
              <label className="block text-red-700 font-medium">PIC Name</label>
              <input
                type="text"
                name="picName"
                value={formData.picName}
                onChange={handleChange}
                placeholder="Masukkan nama PIC"
                className="w-full p-3 mt-1 border border-red-400 rounded-lg bg-white text-gray-900 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
            <div>
              <label className="block text-red-700 font-medium">ESTIMASI VOLUME</label>
              <input
                type="text"
                name="forecast"
                value={formData.forecast}
                onChange={handleChange}
                placeholder="Estimasi Volume"
                className="w-full p-3 mt-1 border border-red-400 rounded-lg bg-white text-gray-900 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
            <div>
              <label className="block text-red-700 font-medium">Event</label>
              <input
                type="text"
                name="event"
                value={formData.event}
                onChange={handleChange}
                placeholder="Masukkan event"
                className="w-full p-3 mt-1 border border-red-400 rounded-lg bg-white text-gray-900 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
            <div>
              <label className="block text-red-700 font-medium">Range Date</label>
              <div className="flex gap-2">
                <input
                  type="date"
                  name="rangeDateStart"
                  value={formData.rangeDateStart}
                  onChange={handleChange}
                  className="w-1/2 p-3 mt-1 border border-red-400 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
                <input
                  type="date"
                  name="rangeDateEnd"
                  value={formData.rangeDateEnd}
                  onChange={handleChange}
                  className="w-1/2 p-3 mt-1 border border-red-400 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-red-700 font-medium">Description</label>
              <textarea
                name="desc"
                value={formData.desc}
                onChange={handleChange}
                placeholder="Masukkan deskripsi"
                className="w-full p-3 mt-1 h-40 border border-red-400 rounded-lg bg-white text-gray-900 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className={`w-full py-3 rounded-lg text-white font-medium ${loading ? "bg-red-300" : "bg-red-600 hover:bg-red-700"}`}
              disabled={loading}
            >
              {loading ? "Mengirim..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
