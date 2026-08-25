---
slug: "cara-kerja-soft-start-proteksi-phase-loss-rectigate"
title: "Cara Kerja Soft-Start & Proteksi Phase-Loss pada Modul Pemicu SCR Rectigate A3000-SMR-3P"
category: "Power Electronics"
categorySlug: "power-electronics"
excerpt: "Memahami mekanisme sirkuit mikroprosesor ARM 32-bit Rectigate dalam mencegah lonjakan inrush current dan mengamankan Thyristor dari hilang fasa listrik."
publishedAt: "14 Agustus 2026"
readTime: "6 menit baca"
author: "Tim Engineer MT Elektrik"
image: "/images/rectigate/rectigate-1.webp"
keywords:
  - "Rectigate A3000-SMR-3P"
  - "soft start SCR"
  - "phase loss protection"
  - "ARM 32-bit trigger board"
  - "modul thyristor 3 fasa"
relatedProductSlug: "/products/power-electronics/rectigate"
relatedProductTitle: "Rectigate A3000-SMR-3P"
faqs:
  - question: "Berapa kapasitas arus masukan thyristor yang sanggup dipicu oleh modul Rectigate?"
    answer: "Rectigate A3000-SMR-3P dirancang untuk memicu modul Thyristor/SCR dengan kapasitas hingga 2000A."
  - question: "Apakah Rectigate mendukung sinyal masukan analog dari PLC?"
    answer: "Ya, modul mendukung sinyal masukan analog standar industri DC 0–10V, DC 0–5V, dan 4–20 mA."
---

Penyebab utama kerusakan pada modul Thyristor (SCR) dan trafo industri adalah lonjakan arus mendadak (inrush current) saat penyalaan awal serta hilangnya salah satu fasa pasokan listrik AC (phase-loss) saat beroperasi.

## Mekanisme Soft-Start Adjustable (0–16 Detik)

Fitur Soft-Start pada modul Rectigate A3000-SMR-3P mengatur pemicuan sudut fasa SCR secara bertahap dari voltase terendah hingga voltase kerja nominal. Waktu kenaikan ini dapat disetel fleksibel via potensiometer T1.

## Sistem Deteksi Otomatis Hilang Fasa (Phase-Loss)

Jika salah satu fasa pasokan listrik AC terputus (misalnya akibat sekering induk putus), Rectigate A3000-SMR-3P secara otomatis menghentikan pemicuan SCR dalam hitungan milidetik dan mengaktifkan Fault Relay kontaktor.

> **Catatan Ringkas Rekayasa:** Fitur Keamanan: Indikator LED berkedip secara khusus saat terjadi hilangnya fasa, memudahkan teknisi melakukan pemindaian kendala sirkuit secara cepat.
