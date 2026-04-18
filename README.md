# 💸 Günlük Harcama Takibi

Modern, kullanıcı dostu bir günlük harcama takip uygulaması. React, TypeScript ve Tailwind CSS ile geliştirilmiştir.

![Harcama Takibi](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-4-646CFF?logo=vite)

## 🚀 Özellikler

- ✅ **Ekle** – Yeni harcama kaydı oluştur (başlık, tutar, kategori, tarih, not)
- 📋 **Listele** – Tüm harcamaları kategoriye ve tarihe göre görüntüle
- ✏️ **Güncelle** – Mevcut harcamayı düzenle
- 🗑️ **Sil** – Harcamayı kalıcı olarak kaldır
- 🔍 **Arama & Filtreleme** – Başlık/nota göre ara, kategoriye göre filtrele
- 📊 **İstatistikler** – Toplam, aylık harcama ve kategori dağılımı
- 💾 **LocalStorage** – Veriler tarayıcıda kalıcı olarak saklanır
- 📱 **Responsive** – Mobil ve masaüstü uyumlu tasarım

## 🗂️ Proje Yapısı

```
expense-tracker/
├── public/
├── src/
│   ├── components/         # Tekrar kullanılabilir bileşenler
│   │   ├── ExpenseForm.tsx     # Harcama ekleme/düzenleme formu
│   │   ├── ExpenseCard.tsx     # Tek harcama kartı
│   │   ├── SummaryCard.tsx     # Özet istatistik kartları
│   │   └── FilterBar.tsx       # Arama ve kategori filtresi
│   ├── pages/              # Sayfa bileşenleri
│   │   └── Home.tsx            # Ana sayfa (state yönetimi)
│   ├── interfaces/         # TypeScript tip tanımları
│   │   └── index.ts            # Expense, Category tipleri
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.ts
├── tsconfig.json
└── netlify.toml
```

## 🛠️ Kurulum

```bash
# 1. Repoyu klonla
git clone https://github.com/KULLANICI_ADIN/expense-tracker.git
cd expense-tracker

# 2. Bağımlılıkları yükle
npm install

# 3. Geliştirme sunucusunu başlat
npm run dev
```

Tarayıcıda `http://localhost:5173` adresini aç.

## 📦 Build & Yayınlama

```bash
# Üretim için derle
npm run build

# Önizleme
npm run preview
```

### Netlify ile Yayınlama

1. [netlify.com](https://netlify.com) hesabı aç
2. "Add new site" → "Import an existing project"
3. GitHub reponuzu bağla
4. Build ayarları otomatik algılanır (`netlify.toml`)
5. **Deploy!** 🎉

## 🧰 Kullanılan Teknolojiler

| Teknoloji | Açıklama |
|-----------|----------|
| [React 18](https://react.dev) | UI kütüphanesi |
| [TypeScript](https://typescriptlang.org) | Tip güvenliği |
| [Tailwind CSS](https://tailwindcss.com) | Utility-first CSS |
| [Vite](https://vitejs.dev) | Build aracı |
| [uuid](https://www.npmjs.com/package/uuid) | Benzersiz ID üretimi |

## 📸 Ekran Görüntüsü

> Projeyi çalıştırdıktan sonra ekran görüntüsü alıp buraya ekleyin.
> `npm run dev` → tarayıcıda screenshot → `/public/screenshot.png` olarak kaydet.

## 👤 Geliştirici

**Adın Soyadın**
- GitHub: [@kullanici_adin](https://github.com/kullanici_adin)

---

> Bu proje, Web Geliştirme eğitim programı kapsamında geliştirilmiştir.
