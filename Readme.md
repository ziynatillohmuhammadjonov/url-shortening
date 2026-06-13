# 🚀 Velocity Landing Page — Bo'limlarni (Section) Dasturlash Yo'riqnomasi

Ushbu qo'llanma **Velocity** qo'shma loyihasida o'zingizga biriktirilgan bo'limni (section) sifatli kodga ko'chirish va topshirish bosqichlarini o'z ichiga oladi.

---

## 🛠 1. Ishni Boshlash (Tayyorgarlik)

1. **Repozitariyni yangilash:** Loyihani kompyuteringizga yuklab olgandan so'ng, har doim `main` filialidan eng so'nggi o'zgarishlarni tortib oling:
   ```bash
   git checkout main
   git pull origin main
   ```

(Eslatma: Ustozingiz base.css faylini qo'shib qo'ygan, uning ichida shriftlar va .container klassi tayyor holatda turibdi).

# 🌿 2. Filial (Branch) Ochish

Har bir vazifa uchun alohida tarmoq (branch) ochish shart. Shaxsiy tarmog'ingizni quyidagi formatda yarating va unga o'ting:

```
git checkout -b ismingiz/section-nomi
```

git checkout -b ismingiz/section-nomi

# 📁 3. Fayl Tuzilishi va Ish Jarayoni Yaratilgan tarmoqda quyidagi fayl strukturasiga rioya qiling:

- HTML fayl: O'zingizga berilgan bo'lim nomi bilan fayl oching (masalan, section-nomi.html).

- CSS fayl: Stil yozish uchun styles papkasi ichida xuddi shu nomdagi CSS faylini yarating (masalan, styles/section-nomi.css).

- Tasvirlar (Images): Dizayndagi rasm va ikonkalarni /images papkasiga joylashtiring.

## 📌 Kod yozish qoidalari:

1. HTML: Semantik teglardan (<header>, <section>, <article>, <div> va hokazo) to'g'ri foydalaning.

2. CSS ulash: O'zingizning HTML faylingiz <head> qismiga bazaviy uslublar va o'zingizning stil faylingizni ulang:

```
<link rel="stylesheet" href="./styles/base.css">
<link rel="stylesheet" href="./styles/section-nomi.css">
```

3. Konteyner: Dizaindagi chegaralanishlar uchun tayyor .container klassidan unumli foydalaning.

# 4. O'zgarishlarni Saqlash va GitHub'ga Yuklash

Kod yozib bo'lingandan so'ng, o'zgarishlarni saqlang va GitHub'dagi shaxsiy tarmog'ingizga yuboring:

```
git add .
git commit -m "Bajarildi: section-nomi bo'limi qo'shildi"
git push origin ismingiz/section-nomi
```

# 📬 5. Pull Request (PR) Ochish va Topshirish

1. GitHub'dagi loyiha sahifasiga o'ting.

2. O'zingiz yuklagan tarmoqni (ismingiz/section-nomi) tanlab, main filialiga Pull Request (PR) yarating.

3. PR sarlavhasiga o'z ismingiz va bo'lim nomini yozing (Masalan: Add Hero Section by Jamshid).

4. Yakunlangan PR havolasini (linkini) nusxalab, ustozingizga tekshirish uchun yuboring.
