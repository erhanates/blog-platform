Mini Blog Platformu
Bu proje, kullanıcıların yazı (blog) paylaşımı yapabildiği, içeriklere göz atabildiği ve kullanıcılar arasında özel mesajlaşma sağlayan bir web platformudur. Ayrıca yönetici (admin) paneli ile kullanıcılar ve içerikler kontrol edilebilir.

Geliştirilen sistem; blog içerik yönetimi, kullanıcı oturum işlemleri ve mesajlaşma gibi temel özellikleri sade bir arayüzle sunar.

🚀 Kullanılan Teknolojiler
Framework: Next.js (App Router yapısı ile)

Veritabanı: SQLite

ORM: Prisma

CSS Kütüphanesi: Tailwind CSS

Programlama Dili: TypeScript (React tabanlı)

Backend: Next.js API Routes

⚙️ Kurulum Talimatları
Projeyi çalıştırmak için:

Projeyi GitHub'dan klonlayın veya zip olarak indirin

Proje klasörüne girin:
cd blog-platform

Gerekli paketleri kurun:
npm install

.env dosyasını oluşturun ve içine şunu yazın:
DATABASE_URL="file:./dev.db"

Prisma ile veritabanını başlatın:
npx prisma migrate dev --name init

Prisma client’ı oluşturun:
npx prisma generate

Geliştirme sunucusunu başlatın:
npm run dev

Tarayıcıda açmak için:
http://localhost:3000

🧪 Admin Giriş Bilgileri
Test işlemleri için kullanılabilecek örnek admin hesabı:

E-posta: admin@example.com

Şifre: admin123

Not: Bu kullanıcı sistemde manuel olarak eklenmeli veya veritabanına doğrudan yazılmalıdır.
