import { ConceptNode, FormulaEntry, TheoryModule } from '../types/physics';

export const THEORY_MODULES: TheoryModule[] = [
  {
    id: 'mod-1',
    order: 1,
    title: 'Grafik Kecepatan-Waktu (v-t): Perpindahan vs Jarak Tempuh',
    levelTag: 'Tahap 1 · Fondasi Kinematika 1D',
    summary:
      'Memahami bagaimana kurva kecepatan terhadap waktu mengkodekan arah gerak, luas bertanda (perpindahan), serta luas mutlak (jarak tempuh).',
    pengantar: {
      fenomenaNyata:
        'Bayangkan sebuah mobil mainan atau kereta listrik di lintasan rel lurus. Ketika tombol maju ditekan, mobil melaju ke kanan; ketika gigi mundur diaktifkan saat mobil masih meluncur ke kanan, mobil melambat dulu, berhenti sesaat, lalu berbalik mundur. Grafik kecepatan-waktu ($v-t$) merekam seluruh kisah gerak ini dalam satu kurva.',
      definisiIlmiah: [
        {
          istilah: 'Perpindahan ($\\Delta x$)',
          definisi:
            'Perubahan vektor posisi benda dari titik awal ke titik akhir sepanjang sumbu acuan: $\\Delta x = x(t_2) - x(t_1)$. Nilainya dapat positif, nol, atau negatif.',
        },
        {
          istilah: 'Jarak Tempuh ($s$)',
          definisi:
            'Besaran skalar yang menyatakan total panjang lintasan yang benar-benar dilalui benda tanpa memperdulikan arah gerak. Nilainya tidak pernah berkurang.',
        },
        {
          istilah: 'Kecepatan Sesaat ($v(t)$)',
          definisi:
            'Laju perubahan posisi terhadap waktu pada detik tertentu, $v(t) = \\frac{dx}{dt}$. Tanda $+$ atau $-$ pada gerak 1D menyatakan arah gerak.',
        },
      ],
      besaranDanSatuan: [
        {
          besaran: 'Waktu',
          simbol: '$t$',
          satuanSI: '$\\text{s}$ (sekon)',
          dimensi: '$[\\text{T}]$',
          maknaFisis: 'Parameter berjalannya peristiwa fisis.',
        },
        {
          besaran: 'Posisi / Perpindahan',
          simbol: '$x,\\; \\Delta x$',
          satuanSI: '$\\text{m}$ (meter)',
          dimensi: '$[\\text{L}]$',
          maknaFisis: 'Letak relatif terhadap titik asal $O$ dan perubahan letak bertanda.',
        },
        {
          besaran: 'Kecepatan Sesaat',
          simbol: '$v(t)$',
          satuanSI: '$\\text{m/s}$',
          dimensi: '$[\\text{L}][\\text{T}]^{-1}$',
          maknaFisis: 'Besar laju sekaligus arah gerak (+ ke kanan, - ke kiri).',
        },
      ],
    },
    teoriDasar: {
      prinsip: [
        'Teorema Dasar Kalkulus dalam Kinematika: Jika $v(t) = \\frac{dx}{dt}$, maka perubahan posisi adalah integral tentu $v(t)$ terhadap $t$.',
        'Secara geometris pada kurva $v-t$, integral tentu $\\int_{t_1}^{t_2} v(t)\\,dt$ adalah luas daerah bertanda antara kurva dan sumbu-$t$.',
      ],
      penurunan: [
        'Untuk selang waktu sangat kecil $\\Delta t_i$, kecepatan hampir konstan sebesar $v(t_i)$, sehingga perpindahan kecilnya adalah $\\Delta x_i \\approx v(t_i)\\,\\Delta t_i$ (luas satu persegi panjang tipis).',
        'Menjumlahkan seluruh irisan tipis dari $t_1$ ke $t_2$ dan mengambil limit $\\Delta t_i \\to 0$ menghasilkan: $$\\Delta x = \\lim_{\\Delta t_i \\to 0} \\sum v(t_i)\\,\\Delta t_i = \\int_{t_1}^{t_2} v(t)\\,dt = A_+ - |A_-|$$',
        'Sebaliknya, untuk jarak tempuh total, setiap langkah maju maupun mundur dijumlahkan besarnya: $$s = \\int_{t_1}^{t_2} |v(t)|\\,dt = A_+ + |A_-|$$',
      ],
      asumsi: [
        'Benda dimodelkan sebagai partikel titik yang bergerak murni di satu dimensi (garis lurus).',
        'Sumbu-$x$ positif ditetapkan ke satu arah tetap (misalnya ke kanan).',
      ],
      hubunganPersamaan:
        'Kecepatan rata-rata $\\bar{v} = \\frac{\\Delta x}{\\Delta t}$ berkaitan langsung dengan luas bertanda, sedangkan kelajuan rata-rata $v_{\\text{laju}} = \\frac{s}{\\Delta t}$ berkaitan dengan luas mutlak.',
      kondisiBerlaku:
        'Berlaku untuk semua jenis gerak 1D—baik percepatan konstan maupun berubah-ubah—selama grafik $v(t)$ terintegralkan.',
    },
    visualIlmiah: {
      type: 'distance-vs-displacement',
      caption:
        'Simulasi interaktif perbandingan luas bertanda (perpindahan $\\Delta x$) terhadap luas mutlak (jarak tempuh $s$) ketika kurva $v-t$ menyeberangi sumbu waktu.',
    },
    pendalaman: {
      kasusSederhana:
        'Jika $v(t) \\ge 0$ sepanjang seluruh selang waktu, benda tidak pernah berbalik arah sehingga $\\Delta x = s$.',
      kasusMenengah:
        'Jika kurva $v(t)$ memotong sumbu-$t$ sekali, hitung terpisah luas daerah di atas sumbu ($A_+$) dan di bawah sumbu ($|A_-|$).',
      kasusKompleks:
        'Jika kurva tidak melalui titik kisi bulat, tentukan dahulu absis titik potong $v = 0$ secara aljabar menggunakan gradien garis lurus sebelum menghitung luas segitiga.',
      konsepPendukung:
        'Waspadai skala kisi grafik! Pada soal OSK asli tahun 2026, 1 kotak sumbu-$t$ bernilai $0,5\\text{ s}$ sedangkan 1 kotak sumbu-$v$ bernilai $2\\text{ m/s}$.',
      penerapanOlimpiade:
        'Hampir seluruh soal kinematika grafik OSK menguji jebakan antara $\\Delta x$, $\\Delta x_{\\text{maks}}$, dan $s$ pada grafik yang menyeberang ke kuadran IV ($v < 0$).',
    },
    contohBertahap: [
      {
        judul: 'Contoh Dasar: Kurva Segitiga Simetris',
        soal: 'Benda bergerak dengan $v(t)$ naik linear dari $(0;0)$ ke $(2,0; 4)$ lalu turun linear ke $(4,0; -4)$. Hitunglah perpindahan bersih dan jarak tempuh total hingga $t = 4,0\\text{ s}$.',
        langkah: [
          'Titik potong $v = 0$ berada di $t = 3,0\\text{ s}$ karena simetri antara $(2,0; 4)$ dan $(4,0; -4)$: gradien $-4\\text{ m/s}^2$, $4 - 4(t - 2) = 0 \\implies t = 3,0\\text{ s}$.',
          'Luas positif ($0 \\to 3,0$): $A_+ = \\frac{1}{2} \\times 3,0 \\times 4 = 6,0\\text{ m}$.',
          'Besar luas negatif ($3,0 \\to 4,0$): $|A_-| = \\frac{1}{2} \\times 1,0 \\times 4 = 2,0\\text{ m}$.',
          'Perpindahan bersih: $\\Delta x = 6,0 - 2,0 = 4,0\\text{ m}$. Jarak tempuh total: $s = 6,0 + 2,0 = 8,0\\text{ m}$.',
        ],
        interpretasi:
          'Benda maju $6,0\\text{ m}$ lalu mundur $2,0\\text{ m}$, berakhir di posisi $4,0\\text{ m}$ dengan panjang lintasan total $8,0\\text{ m}$.',
      },
    ],
    narrationScript:
      'Selamat datang di Modul 1 Pusat Pembelajaran Mister Jo. Pada grafik kecepatan terhadap waktu, luas daerah antara kurva dan sumbu waktu adalah perpindahan. Jika kurva berada di atas sumbu waktu, benda bergerak maju dan luasnya positif. Jika kurva turun ke bawah sumbu waktu, benda berbalik arah ke kiri sehingga luasnya mengurangi perpindahan, namun tetap menambah jarak tempuh total. Selalu periksa skala kotak grid sebelum menghitung luas!',
  },

  {
    id: 'mod-2',
    order: 2,
    title: 'Titik Balik (v = 0) dan Syarat Perpindahan Maksimum',
    levelTag: 'Tahap 2 · Konsep Inti Soal OSK #1',
    summary:
      'Mengapa perpindahan maksimum tidak terjadi di akhir waktu maupun di kecepatan puncak, serta cara membuktikan ekstrem global melalui uji titik kritis.',
    pengantar: {
      fenomenaNyata:
        'Saat Anda melempar bola vertikal ke atas, atau mobil mainan melaju maju lalu membalik arah putaran motornya, kapan benda berada paling jauh dari posisi awal? Tepat pada saat kecepatannya sesaat bernilai nol! Sebelum $v = 0$, benda masih menjauh; sesudah $v = 0$, benda mulai kembali mendekati titik awal.',
      definisiIlmiah: [
        {
          istilah: 'Titik Balik Gerak ($t^*$)',
          definisi:
            'Saat ketika kecepatan sesaat bernilai nol ($v(t^*) = 0$) dan tanda kecepatan berubah (dari $+$ ke $-$, atau dari $-$ ke $+$).',
        },
        {
          istilah: 'Perpindahan Maksimum ($\\Delta x_{\\text{maks}}$)',
          definisi:
            'Nilai terbesar fungsi perpindahan $\\Delta x(t)$ di sepanjang interval waktu yang ditinjau $0 \\le t \\le T$.',
        },
      ],
      besaranDanSatuan: [
        {
          besaran: 'Waktu Titik Balik',
          simbol: '$t^*$',
          satuanSI: '$\\text{s}$',
          dimensi: '$[\\text{T}]$',
          maknaFisis: 'Momen berhentinya benda sesaat sebelum berbalik arah.',
        },
        {
          besaran: 'Perpindahan Maksimum',
          simbol: '$\\Delta x_{\\text{maks}}$',
          satuanSI: '$\\text{m}$',
          dimensi: '$[\\text{L}]$',
          maknaFisis: 'Simpangan paling jauh ke arah positif selama selang pengamatan.',
        },
      ],
    },
    teoriDasar: {
      prinsip: [
        'Syarat perlu ekstrem fungsi posisi terdiferensialkan: $\\frac{d(\\Delta x)}{dt} = v(t) = 0$.',
        'Uji turunan kedua (percepatan): Jika $v(t^*) = 0$ dan $a(t^*) = \\frac{dv}{dt} < 0$, maka $t^*$ adalah maksimum lokal. Jika $a(t^*) > 0$, maka $t^*$ adalah minimum lokal.',
      ],
      penurunan: [
        'Misalkan kurva $v(t)$ kontinu pada $[0, T]$. Menurut Teorema Nilai Ekstrem, nilai terbesar $\\Delta x(t)$ hanya dapat terjadi di salah satu dari dua tempat: (1) titik batas $t = 0$ atau $t = T$, atau (2) titik dalam $t^*$ di mana $\\frac{d(\\Delta x)}{dt} = v(t^*) = 0$.',
        'Pada segmen garis lurus dari $(t_a, v_a)$ ke $(t_b, v_b)$ dengan $v_a > 0 > v_b$, gradiennya $a = \\frac{v_b - v_a}{t_b - t_a} < 0$.',
        'Mencari titik potong nol: $$v(t^*) = v_a + a(t^* - t_a) = 0 \\implies t^* = t_a + \\frac{v_a}{|a|} = t_a + \\frac{v_a}{v_a + |v_b|}(t_b - t_a)$$',
      ],
      asumsi: [
        'Fungsi kecepatan $v(t)$ kontinu (benda tidak mengalami lonjakan kecepatan tak terhingga secara seketika).',
      ],
      hubunganPersamaan:
        'Jika terdapat lebih dari satu titik balik (kurva $v-t$ naik turun melewati sumbu-$t$ berkali-kali), bandingkan nilai $\\Delta x(t)$ pada seluruh titik puncak lokal serta titik batas interval.',
      kondisiBerlaku:
        'Selalu sah untuk menentukan maksimum maupun minimum perpindahan pada selang waktu tertutup $[0, T]$.',
    },
    visualIlmiah: {
      type: 'area-vs-turning',
      caption:
        'Visualisasi Soal OSK 2026 Nomor 1: kurva $v(t)$ melalui $(0;2) \\to (1;4) \\to (1,5;4) \\to (3;-2)$ menghasilkan perpindahan puncak $7,0\\text{ m}$ di $t^* = 2,5\\text{ s}$, bukan $6,5\\text{ m}$ di $t = 3,0\\text{ s}$.',
    },
    pendalaman: {
      kasusSederhana:
        'Satu titik balik dari $+$ ke $-$: langsung hitung luas dari $t = 0$ hingga $t^*$.',
      kasusMenengah:
        'Kurva diawali $v < 0$ kemudian menjadi $v > 0$: perpindahan minimum terjadi di $t^*$, sedangkan maksimum bisa berada di ujung akhir $t = T$.',
      kasusKompleks:
        'Kurva berosilasi dengan dua atau lebih puncak lokal positif: evaluasi semua puncak lokal dan pilih yang terbesar.',
      konsepPendukung:
        'Hati-hati membedakan puncak kurva $v-t$ (kecepatan maksimum) dengan titik potong sumbu-$t$ (perpindahan maksimum)! Saat kecepatan maksimum, benda justru sedang melaju paling cepat menjauhi asal.',
      penerapanOlimpiade:
        'Inilah inti langsung Soal OSK Fisika SMA 2026 Nomor 1: siswa yang tidak mencari $t^* = 2,5\\text{ s}$ akan keliru menjawab $6,5\\text{ m}$ alih-alih $7,0\\text{ m}$.',
    },
    contohBertahap: [
      {
        judul: 'Bedah Tuntas Soal Sumber: OSK Fisika 2026 Nomor 1',
        soal: 'Mobil mainan bergerak lurus dengan kurva $v-t$ melalui $(0; 2) \\to (1,0; 4) \\to (1,5; 4) \\to (3,0; -2)$. Tentukan perpindahan maksimumnya dari $t = 0$ hingga $t = 3,0\\text{ s}$.',
        langkah: [
          'Identifikasi skala grid pada naskah OSK: $1$ kotak horizontal $= 0,5\\text{ s}$ dan $1$ kotak vertikal $= 2\\text{ m/s}$.',
          'Segmen $1,5 \\le t \\le 3,0\\text{ s}$ memiliki percepatan $a = \\frac{-2 - 4}{3,0 - 1,5} = -4,0\\text{ m/s}^2$.',
          'Titik balik $v(t^*) = 0$: $4 - 4(t^* - 1,5) = 0 \\implies t^* = 2,5\\text{ s}$.',
          'Jumlahkan luas positif hingga $t^* = 2,5\\text{ s}$: Trapesium $\\frac{2+4}{2}(1,0) = 3,0\\text{ m}$, Persegi panjang $4(0,5) = 2,0\\text{ m}$, Segitiga $\\frac{1}{2}(1,0)(4) = 2,0\\text{ m}$.',
          'Total $\\Delta x_{\\text{maks}} = 3,0 + 2,0 + 2,0 = 7,0\\text{ m}$.',
        ],
        interpretasi:
          'Pada $t = 2,5\\text{ s}$ mobil berhenti sejenak di posisi terjauh $7,0\\text{ m}$, lalu selama $0,5\\text{ s}$ terakhir mundur $0,5\\text{ m}$ sehingga posisi akhirnya $6,5\\text{ m}$.',
      },
    ],
    narrationScript:
      'Modul 2 membahas jantung dari Soal OSK Nomor 1, yaitu titik balik dan perpindahan maksimum. Banyak siswa keliru mengira perpindahan maksimum terjadi di ujung kanan grafik. Padahal selama kecepatan bernilai positif, posisi terus bertambah. Begitu grafik memotong sumbu waktu menuju nilai negatif, mobil berbalik mundur. Jadi perpindahan maksimum tercapai tepat pada saat v sama dengan nol. Pada soal OSK 2026 nomor satu, titik balik berada di dua koma lima detik sehingga perpindahan maksimumnya tepat tujuh koma nol meter.',
  },

  {
    id: 'mod-3',
    order: 3,
    title: 'Gradien Percepatan, Kurva a-t, dan Persamaan GLBB/Kalkulus',
    levelTag: 'Tahap 3 · Penurunan & Integrasi Beruntun',
    summary:
      'Menghubungkan kemiringan grafik v-t dengan grafik percepatan a-t serta mengintegralkan kurva non-linear untuk soal multi-fase.',
    pengantar: {
      fenomenaNyata:
        'Dalam eksperimen fisika modern, sensor akselerometer pada smartphone atau roket mainan merekam percepatan $a(t)$, bukan kecepatan langsung. Untuk mengetahui kapan kendaraan berbalik arah dan seberapa jauh ia melaju, kita harus merekonstruksi grafik $v(t)$ dari data $a(t)$.',
      definisiIlmiah: [
        {
          istilah: 'Percepatan Sesaat ($a(t)$)',
          definisi:
            'Laju perubahan kecepatan terhadap waktu, $a(t) = \\frac{dv}{dt}$, yang secara geometris sama dengan kemiringan (gradien) garis singgung grafik $v-t$.',
        },
        {
          istilah: 'Integrasi Beruntun',
          definisi:
            'Proses dua langkah: $a(t) \\xrightarrow{\\int} v(t) \\xrightarrow{\\int} x(t)$, masing-masing membutuhkan syarat awal $v(0)$ dan $x(0)$.',
        },
      ],
      besaranDanSatuan: [
        {
          besaran: 'Percepatan',
          simbol: '$a(t)$',
          satuanSI: '$\\text{m/s}^2$',
          dimensi: '$[\\text{L}][\\text{T}]^{-2}$',
          maknaFisis: 'Seberapa cepat kecepatan berubah arah atau besarnya setiap detik.',
        },
      ],
    },
    teoriDasar: {
      prinsip: [
        'Gradien kurva $v-t$ adalah percepatan $a(t) = \\frac{dv}{dt}$.',
        'Luas di bawah kurva $a-t$ adalah PERUBAHAN kecepatan: $\\Delta v = v(t_2) - v(t_1) = \\int_{t_1}^{t_2} a(t)\\,dt$.',
      ],
      penurunan: [
        'Untuk percepatan konstan $a$ pada selang $[t_0, t_0 + \\Delta t]$: $$v(t) = v_0 + a(t - t_0)$$',
        'Integrasikan persamaan linear tersebut untuk memperoleh perpindahan segmen: $$\\Delta x = \\int_{t_0}^{t_0+\\Delta t} (v_0 + a\\tau)\\,d\\tau = v_0 \\Delta t + \\frac{1}{2}a(\\Delta t)^2$$',
        'Jika $a(t)$ berubah secara linear sehingga $v(t)$ berbentuk polinomial kuadratik $c_0 + c_1 t + c_2 t^2$, maka titik balik dicari dari akar $v(t^*) = 0$ dan perpindahan dihitung via antiturunan $c_0 t + \\frac{1}{2}c_1 t^2 + \\frac{1}{3}c_2 t^3$.',
      ],
      asumsi: [
        'Perubahan percepatan pada grafik tangga terjadi seketika tanpa celah waktu.',
      ],
      hubunganPersamaan:
        'Hati-hati terhadap miskonsepsi: percepatan negatif ($a < 0$) TIDAK selalu berarti benda bergerak mundur, dan juga TIDAK selalu berarti melambat. Benda melambat hanya jika $\\vec{a}$ dan $\\vec{v}$ berlawanan arah ($a \\cdot v < 0$).',
      kondisiBerlaku:
        'Rumus GLBB $\\Delta x = v_0 t + \\frac{1}{2}at^2$ hanya boleh dipakai di dalam SATU segmen yang percepatannya konstan.',
    },
    visualIlmiah: {
      type: 'slope-acceleration',
      caption:
        'Perhatikan hubungan vektor kecepatan $\\vec{v}$ dan percepatan $\\vec{a}$: saat $a < 0$ dan $v > 0$, benda mengerem; setelah melewati $v = 0$, $a < 0$ justru mempercepat benda ke kiri!',
    },
    pendalaman: {
      kasusSederhana:
        'Membaca percepatan langsung dari gradien segmen lurus pada grafik $v-t$.',
      kasusMenengah:
        'Menentukan durasi fase tak diketahui ($t_1$) dari syarat batas kecepatan akhir $v(T)$ dengan menjumlahkan $\\sum a_i \\Delta t_i$.',
      kasusKompleks:
        'Mengubah grafik $a-t$ bertingkat beserta $v(0) \\neq 0$ menjadi grafik $v-t$ kontinu, lalu menentukan titik balik $v = 0$ dan $\\Delta x_{\\text{maks}}$.',
      konsepPendukung:
        'Aljabar persamaan garis lurus dan reduksi polinomial akar kuadrat.',
      penerapanOlimpiade:
        'Muncul pada soal OSK yang menyembunyikan nilai kecepatan puncak di balik informasi percepatan tiap fase atau grafik $a-t$.',
    },
    contohBertahap: [
      {
        judul: 'Contoh Menengah: Dari Grafik a-t ke Perpindahan Maksimum',
        soal: 'Partikel berawal dengan $v(0) = +4,0\\text{ m/s}$. Untuk $0 \\le t < 2\\text{ s}$, $a = 0$; untuk $2 \\le t \\le 6\\text{ s}$, $a = -2,0\\text{ m/s}^2$. Tentukan $\\Delta x_{\\text{maks}}$.',
        langkah: [
          'Pada $t = 2,0\\text{ s}$: $v(2) = 4,0 + 0 = 4,0\\text{ m/s}$.',
          'Untuk $t \\ge 2,0$: $v(t) = 4,0 - 2,0(t - 2,0) = 0 \\implies t^* = 4,0\\text{ s}$.',
          'Luas grafik $v-t$ hingga $t^* = 4,0\\text{ s}$: $A = 4,0(2,0) + \\frac{1}{2}(2,0)(4,0) = 8,0 + 4,0 = 12,0\\text{ m}$.',
        ],
        interpretasi:
          'Meskipun percepatan sudah negatif sejak $t = 2,0\\text{ s}$, partikel tetap melaju ke kanan sampai $t = 4,0\\text{ s}$ dan mencapai $12,0\\text{ m}$.',
      },
    ],
    narrationScript:
      'Di Modul 3 kita mempelajari hubungan gradien dan percepatan. Kemiringan kurva v terhadap t adalah percepatan. Sebaliknya, jika soal memberikan grafik percepatan terhadap waktu, maka luas di bawah kurva a terhadap t adalah perubahan kecepatan, bukan perpindahan! Ingat miskonsepsi yang sering menjebak: tanda minus pada percepatan tidak berarti benda langsung mundur. Benda baru berbalik mundur setelah kecepatannya habis mencapai nol.',
  },

  {
    id: 'mod-4',
    order: 4,
    title: 'Gerak Relatif 1D dan Optimasi Kurva v-t Tingkat Olimpiade',
    levelTag: 'Tahap 4 · Strategi Olimpiade Kota',
    summary:
      'Menerapkan prinsip perpindahan maksimum pada dua benda bergerak (jarak pisah maksimum/minimum) dan metode amplop atas untuk optimasi kendala.',
    pengantar: {
      fenomenaNyata:
        'Dua pelari atau dua mobil meluncur di jalur lurus yang sama: yang satu lebih cepat di awal namun kehabisan tenaga dan melambat, sementara yang kedua start lebih lambat namun terus dipercepat. Pada momen manakah jarak di antara keduanya paling lebar atau paling sempit?',
      definisiIlmiah: [
        {
          istilah: 'Kecepatan Relatif ($v_{\\text{rel}}$)',
          definisi:
            'Selisih kecepatan benda A terhadap benda B pada saat yang sama: $v_{\\text{rel}}(t) = v_A(t) - v_B(t)$.',
        },
        {
          istilah: 'Amplop Atas Kurva $v-t$',
          definisi:
            'Batas kurva kecepatan tertinggi yang masih memenuhi seluruh kendala percepatan maksimum, perlambatan maksimum, batas kelajuan, dan kecepatan akhir.',
        },
      ],
      besaranDanSatuan: [
        {
          besaran: 'Posisi Relatif',
          simbol: '$\\Delta x_{\\text{rel}}(t)$',
          satuanSI: '$\\text{m}$',
          dimensi: '$[\\text{L}]$',
          maknaFisis: 'Selisih koordinat $x_A(t) - x_B(t)$ yang bernilai ekstrem saat $v_A = v_B$.',
        },
      ],
    },
    teoriDasar: {
      prinsip: [
        'Syarat ekstrem jarak pisah dua benda: $\\frac{d}{dt}(x_A - x_B) = v_A(t) - v_B(t) = 0 \\implies v_A(t^*) = v_B(t^*)$.',
        'Secara geometris pada grafik $v-t$, jarak pisah ekstrem terjadi tepat di TITIK PERPOTONGAN kurva $v_A(t)$ dan $v_B(t)$, dan besarnya sama dengan luas daerah yang diapit kedua kurva!',
      ],
      penurunan: [
        'Misalkan jarak pisah adalah $s_{\\text{AB}}(t) = x_A(t) - x_B(t)$. Maka: $$s_{\\text{AB}}(t) = s_{\\text{AB}}(0) + \\int_{0}^{t} \\big(v_A(\\tau) - v_B(\\tau)\\big)\\,d\\tau$$',
        'Perhatikan bahwa persamaan ini identik secara matematis dengan perpindahan benda tunggal yang memiliki kecepatan efektif $v_{\\text{rel}}(t) = v_A(t) - v_B(t)$!',
        'Oleh karena itu, seluruh metode Soal OSK #1—titik balik $v_{\\text{rel}} = 0$ dan luas bertanda—langsung berlaku tanpa perubahan!',
      ],
      asumsi: [
        'Kedua benda bergerak di lintasan lurus sejajar pada garis koordinat yang sama.',
      ],
      hubunganPersamaan:
        'Untuk soal optimasi benda tunggal dengan batas $a_{\\min} \\le \\frac{dv}{dt} \\le a_{\\maks}$ dan $v \\le v_{\\text{batas}}$, kita menggambar garis batas naik dari $(0, v_0)$, garis datar $v = v_{\\text{batas}}$, dan garis batas mundur dari $(T, v_T)$.',
      kondisiBerlaku:
        'Sangat ampuh menyelesaikan soal kejar-kejaran dan optimasi lintasan 1D tanpa persamaan kuadrat yang panjang.',
    },
    visualIlmiah: {
      type: 'relative-1d',
      caption:
        'Visualisasi dua mobil pada grafik $v-t$: selama $v_A > v_B$, celah di antara keduanya terus membesar (luas diarsir). Tepat saat kedua garis berpotongan ($v_A = v_B$), jarak pisah mencapai puncak!',
    },
    pendalaman: {
      kasusSederhana:
        'Dua benda start bersama ($x_A(0) = x_B(0)$): jarak pisah maksimum langsung sama dengan luas segitiga/trapesium antara $v_A$ dan $v_B$ sampai titik potong.',
      kasusMenengah:
        'Benda B start di depan sejauh $d_0$: cek apakah luas relatif hingga titik potong $\\ge d_0$ (terjadi penyalipan) atau $< d_0$ (jarak minimum $= d_0 - \\Delta x_{\\text{rel, maks}}$).',
      kasusKompleks:
        'Konstruksi amplop kurva $v-t$ untuk memaksimalkan $\\Delta x_{\\text{maks}}$ dengan syarat kecepatan awal, kecepatan akhir, dan batas rem.',
      konsepPendukung:
        'Kesebangunan segitiga dan rasio gradien untuk menemukan jawaban dalam hitungan detik.',
      penerapanOlimpiade:
        'Ciri khas soal nomor 10–15: mengubah persoalan dua benda atau optimasi menjadi masalah luas grafik $v-t$ yang elegan.',
    },
    contohBertahap: [
      {
        judul: 'Contoh Olimpiade: Jarak Pisah Maksimum Dua Kendaraan',
        soal: 'Mobil A melaju konstan $6\\text{ m/s}$ melewati Mobil B yang baru mulai bergerak dari diam pada $t = 0$ dengan percepatan $2\\text{ m/s}^2$. Berapa jarak terjauh A di depan B sebelum B menyusul A?',
        langkah: [
          'Kecepatan sama saat $v_B(t^*) = v_A(t^*) \\implies 2t^* = 6 \\implies t^* = 3,0\\text{ s}$.',
          'Luas segitiga antara garis mendatar $v_A = 6$ dan garis miring $v_B = 2t$ dari $0$ ke $3,0\\text{ s}$ adalah $\\frac{1}{2} \\times 3,0 \\times 6,0 = 9,0\\text{ m}$.',
        ],
        interpretasi:
          'Tanpa menghitung $x_A(3) - x_B(3)$ secara terpisah, luas segitiga grafik langsung memberikan jarak pisah maksimum $9,0\\text{ m}$.',
      },
    ],
    narrationScript:
      'Selamat datang di Modul 4, strategi tingkat olimpiade. Tahukah kamu bahwa masalah kejar-kejaran dua mobil di lintasan lurus sejatinya identik dengan Soal OSK Nomor 1? Cukup pandang kecepatan relatif v A dikurangi v B. Jarak antara dua mobil mencapai maksimum atau minimum tepat saat kedua kurva kecepatan berpotongan, yaitu ketika v A sama dengan v B! Dengan cara ini, soal yang biasanya membutuhkan aljabar panjang dapat diselesaikan hanya dengan menghitung luas segitiga di antara dua grafik.',
  },
];

export const CONCEPT_NODES: ConceptNode[] = [
  {
    id: 'node-inti',
    title: 'Soal OSK #1: Kurva v-t & Perpindahan Maksimum',
    category: 'inti',
    shortDesc: 'Pusat kajian kinematika gerak lurus 1D dari kurva kecepatan-waktu.',
    detail:
      'Semua 15 soal latihan dan modul teori berakar pada analisis gerakan satu dimensi melalui kurva kecepatan terhadap waktu ($v-t$), meliputi hubungan luas, gradien, dan syarat titik ekstrem.',
    keyFormula: '$$\\Delta x(t) = \\int_{0}^{t} v(\\tau)\\,d\\tau$$',
    connections: ['node-luas', 'node-balik', 'node-gradien', 'node-jarak'],
    relatedModuleId: 'mod-2',
    relatedQuestionIds: [1, 4, 5],
  },
  {
    id: 'node-luas',
    title: 'Luas Bertanda (Perpindahan)',
    category: 'grafik',
    shortDesc: 'Daerah di atas sumbu-$t$ ($+$) dan di bawah sumbu-$t$ ($-$).',
    detail:
      'Perpindahan merupakan integral tentu kecepatan terhadap waktu. Segmen kurva piecewise-linear membentuk bangun trapesium, persegi panjang, dan segitiga.',
    keyFormula: '$$\\Delta x = A_+ - |A_-|$$',
    connections: ['node-inti', 'node-jarak', 'node-awal'],
    relatedModuleId: 'mod-1',
    relatedQuestionIds: [1, 2, 6],
  },
  {
    id: 'node-jarak',
    title: 'Luas Mutlak (Jarak Tempuh)',
    category: 'turunan',
    shortDesc: 'Total panjang lintasan tanpa memperhatikan arah balik.',
    detail:
      'Berbeda dengan perpindahan vektor, jarak tempuh skalar menjumlahkan besar seluruh segmen maju maupun mundur.',
    keyFormula: '$$s = \\int |v(t)|\\,dt = A_+ + |A_-|$$',
    connections: ['node-inti', 'node-luas'],
    relatedModuleId: 'mod-1',
    relatedQuestionIds: [2, 3],
  },
  {
    id: 'node-balik',
    title: 'Titik Balik & Uji Ekstrem (v = 0)',
    category: 'inti',
    shortDesc: 'Syarat perlu maksimum/minimum lokal posisi.',
    detail:
      'Ketika $v(t)$ memotong nol dari $+$ ke $-$, perpindahan mencapai maksimum lokal. Jika terdapat beberapa puncak lokal, seluruh kandidat wajib dibandingkan.',
    keyFormula: '$$\\frac{d(\\Delta x)}{dt} = v(t^*) = 0$$',
    connections: ['node-inti', 'node-multi', 'node-relatif'],
    relatedModuleId: 'mod-2',
    relatedQuestionIds: [1, 3, 7, 12],
  },
  {
    id: 'node-gradien',
    title: 'Gradien Kurva & Grafik a-t',
    category: 'grafik',
    shortDesc: 'Kemiringan $v-t$ adalah percepatan; luas $a-t$ adalah $\\Delta v$.',
    detail:
      'Digunakan untuk menemukan titik potong $v = 0$ secara eksak dengan persamaan garis dan menurunkan kurva $v(t)$ dari grafik $a(t)$ bertingkat.',
    keyFormula: '$$a(t) = \\frac{dv}{dt},\\quad v(t) = v_0 + \\int_{0}^{t} a(\\tau)\\,d\\tau$$',
    connections: ['node-inti', 'node-optimasi'],
    relatedModuleId: 'mod-3',
    relatedQuestionIds: [6, 9, 11, 15],
  },
  {
    id: 'node-awal',
    title: 'Posisi Awal & Kecepatan Rata-Rata',
    category: 'turunan',
    shortDesc: 'Pergeseran koordinat $x(0) \\neq 0$ dan rasio $\\Delta x / \\Delta t$.',
    detail:
      'Untuk jarak terjauh dari titik asal $O$, koordinat $x(t) = x(0) + \\Delta x(t)$ harus diuji di sisi kiri ($x < 0$) maupun kanan ($x > 0$).',
    keyFormula: '$$x(t) = x(0) + \\Delta x(t),\\quad \\bar{v} = \\frac{\\Delta x}{\\Delta t}$$',
    connections: ['node-luas', 'node-multi'],
    relatedModuleId: 'mod-1',
    relatedQuestionIds: [4, 8],
  },
  {
    id: 'node-multi',
    title: 'Osilasi Multi-Pembalikan',
    category: 'olimpiade',
    shortDesc: 'Membandingkan beberapa bukit lokal dan kesebangunan rasio.',
    detail:
      'Menguji konsistensi aljabar dan kesebangunan segitiga ketika kurva $v-t$ menyeberang sumbu waktu berulang kali atau melibatkan parameter simbolik.',
    keyFormula: '$$x_{\\text{maks}} = \\max_k \\{x(t_k^*)\\}$$',
    connections: ['node-balik', 'node-awal'],
    relatedModuleId: 'mod-2',
    relatedQuestionIds: [7, 8, 15],
  },
  {
    id: 'node-relatif',
    title: 'Gerak Relatif 1D pada Grafik v-t',
    category: 'olimpiade',
    shortDesc: 'Jarak pisah ekstrem dua benda terjadi saat $v_A = v_B$.',
    detail:
      'Mengubah permasalahan dua benda menjadi satu kurva kecepatan relatif $v_{\\text{rel}} = v_A - v_B$; luas di antara dua kurva adalah perubahan jarak pisah.',
    keyFormula: '$$v_{\\text{rel}}(t^*) = v_A(t^*) - v_B(t^*) = 0$$',
    connections: ['node-balik', 'node-optimasi'],
    relatedModuleId: 'mod-4',
    relatedQuestionIds: [10, 14],
  },
  {
    id: 'node-optimasi',
    title: 'Optimasi Amplop Kurva v-t',
    category: 'olimpiade',
    shortDesc: 'Memaksimalkan perpindahan di bawah batas $a_{\\pm}$ dan $v_{\\text{batas}}$.',
    detail:
      'Membangun amplop atas kurva $v(t)$ dari kendala percepatan positif, batas atap kelajuan, dan garis perlambatan mundur dari kecepatan akhir.',
    keyFormula: '$$v(t) \\le \\min\\{v_0 + a_+ t,\\; v_{\\text{batas}},\\; v_T + |a_-|(T - t)\\}$$',
    connections: ['node-gradien', 'node-relatif'],
    relatedModuleId: 'mod-4',
    relatedQuestionIds: [13, 15],
  },
];

export const FORMULA_COMPENDIUM: FormulaEntry[] = [
  {
    id: 'f-1',
    kategori: 'Definisi Kinematika 1D',
    nama: 'Perpindahan sebagai Integral Kecepatan (Luas Grafik v-t)',
    persamaan: '$$\\Delta x = x(t_2) - x(t_1) = \\int_{t_1}^{t_2} v(t)\\,dt$$',
    variabel: [
      { simbol: '$\\Delta x$', arti: 'Perpindahan posisi', satuan: '$\\text{m}$', dimensi: '$[\\text{L}]$' },
      { simbol: '$v(t)$', arti: 'Kecepatan sesaat terhadap waktu', satuan: '$\\text{m/s}$', dimensi: '$[\\text{L}][\\text{T}]^{-1}$' },
      { simbol: '$t$', arti: 'Waktu pengamatan', satuan: '$\\text{s}$', dimensi: '$[\\text{T}]$' },
    ],
    kondisiPenggunaan: 'Berlaku umum untuk gerak lurus satu dimensi apa pun (baik percepatan konstan maupun berubah-ubah).',
    catatanOlimpiade: 'Luas di atas sumbu-$t$ bernilai positif; luas di bawah sumbu-$t$ bernilai negatif.',
    narration: 'Perpindahan delta x sama dengan integral kecepatan v terhadap waktu dari t satu sampai t dua, yang secara geometris adalah luas bertanda di bawah kurva v terhadap t.',
  },
  {
    id: 'f-2',
    kategori: 'Definisi Kinematika 1D',
    nama: 'Jarak Tempuh Total (Luas Mutlak Kurva v-t)',
    persamaan: '$$s = \\int_{t_1}^{t_2} |v(t)|\\,dt = A_+ + |A_-|$$',
    variabel: [
      { simbol: '$s$', arti: 'Jarak tempuh skalar', satuan: '$\\text{m}$', dimensi: '$[\\text{L}]$' },
      { simbol: '$A_+$', arti: 'Total luas kurva saat $v > 0$', satuan: '$\\text{m}$', dimensi: '$[\\text{L}]$' },
      { simbol: '$|A_-|$', arti: 'Besar total luas kurva saat $v < 0$', satuan: '$\\text{m}$', dimensi: '$[\\text{L}]$' },
    ],
    kondisiPenggunaan: 'Digunakan setiap kali soal menanyakan panjang lintasan total atau jarak tempuh ketika benda sempat berbalik arah.',
    catatanOlimpiade: 'Selalu pisahkan integrasi pada titik potong $v(t) = 0$ sebelum menjumlahkan besarnya.',
    narration: 'Jarak tempuh total s adalah integral nilai mutlak kecepatan terhadap waktu, yaitu penjumlahan besar luas positif dan besar luas negatif.',
  },
  {
    id: 'f-3',
    kategori: 'Syarat Ekstrem & Titik Balik',
    nama: 'Syarat Titik Balik & Penentuan Waktu Potong Linear',
    persamaan: '$$v(t^*) = 0, \\qquad t^* = t_a + \\frac{v_a}{|a|} = t_a + \\frac{v_a}{v_a - v_b}(t_b - t_a)$$',
    variabel: [
      { simbol: '$t^*$', arti: 'Waktu terjadinya titik balik', satuan: '$\\text{s}$', dimensi: '$[\\text{T}]$' },
      { simbol: '$v_a, v_b$', arti: 'Kecepatan di ujung segmen linear ($v_a v_b < 0$)', satuan: '$\\text{m/s}$', dimensi: '$[\\text{L}][\\text{T}]^{-1}$' },
      { simbol: '$a$', arti: 'Gradien percepatan segmen', satuan: '$\\text{m/s}^2$', dimensi: '$[\\text{L}][\\text{T}]^{-2}$' },
    ],
    kondisiPenggunaan: 'Bagian rumus rasio linear berlaku pada segmen garis lurus grafik $v-t$ yang memotong sumbu waktu.',
    catatanOlimpiade: 'Syarat $v(t^*) = 0$ memberi kandidat ekstrem; selalu uji juga nilai di batas waktu $t = 0$ dan $t = T$.',
    narration: 'Titik balik gerak terjadi saat v t bintang sama dengan nol. Pada segmen garis lurus, waktu potong dapat dihitung langsung dengan perbandingan kecepatan awal dibagi besar percepatan.',
  },
  {
    id: 'f-4',
    kategori: 'Turunan & Integrasi Percepatan',
    nama: 'Hubungan Grafik a-t dan Kecepatan Sesaat',
    persamaan: '$$a(t) = \\frac{dv}{dt}, \\qquad v(t) = v(0) + \\int_{0}^{t} a(\\tau)\\,d\\tau$$',
    variabel: [
      { simbol: '$a(t)$', arti: 'Percepatan sesaat', satuan: '$\\text{m/s}^2$', dimensi: '$[\\text{L}][\\text{T}]^{-2}$' },
      { simbol: '$v(0)$', arti: 'Kecepatan awal pada $t = 0$', satuan: '$\\text{m/s}$', dimensi: '$[\\text{L}][\\text{T}]^{-1}$' },
    ],
    kondisiPenggunaan: 'Dipakai untuk mencari gradien kurva $v-t$ atau membangun kurva $v(t)$ dari grafik $a-t$.',
    catatanOlimpiade: 'Jangan lupa menambahkan $v(0)$! Luas grafik $a-t$ hanya memberi perubahan kecepatan $\\Delta v$, bukan nilai $v$ mutlak.',
    narration: 'Percepatan adalah turunan kecepatan terhadap waktu, sedangkan kecepatan pada saat t sama dengan kecepatan awal ditambah luas di bawah kurva percepatan terhadap waktu.',
  },
  {
    id: 'f-5',
    kategori: 'Kecepatan Rata-Rata & GLBB Segmen',
    nama: 'Kecepatan Rata-Rata & Perpindahan Satu Segmen Konstan',
    persamaan: '$$\\bar{v} = \\frac{\\Delta x}{\\Delta t}, \\qquad \\Delta x_{\\text{seg}} = v_0 \\Delta t + \\frac{1}{2}a(\\Delta t)^2 = \\frac{v_0 + v_1}{2}\\Delta t$$',
    variabel: [
      { simbol: '$\\bar{v}$', arti: 'Kecepatan rata-rata', satuan: '$\\text{m/s}$', dimensi: '$[\\text{L}][\\text{T}]^{-1}$' },
      { simbol: '$\\Delta t$', arti: 'Selang waktu segmen', satuan: '$\\text{s}$', dimensi: '$[\\text{T}]$' },
    ],
    kondisiPenggunaan: 'Rumus rata-rata $\\frac{v_0 + v_1}{2}$ hanya sah pada satu segmen dengan percepatan konstan $a$. Untuk multi-fase wajib gunakan $\\frac{\\Delta x_{\\text{total}}}{\\Delta t_{\\text{total}}}$.',
    catatanOlimpiade: 'Luas trapesium $\\frac{v_0 + v_1}{2}\\Delta t$ adalah bentuk paling cepat untuk menghitung perpindahan tiap segmen linear.',
    narration: 'Kecepatan rata-rata secara umum adalah perpindahan total dibagi selang waktu total. Rumus setengah dari v nol tambah v satu hanya berlaku dalam satu segmen percepatan konstan.',
  },
  {
    id: 'f-6',
    kategori: 'Gerak Relatif 1D',
    nama: 'Jarak Pisah Ekstrem Dua Benda pada Grafik v-t',
    persamaan: '$$x_A(t) - x_B(t) = \\big(x_A(0) - x_B(0)\\big) + \\int_{0}^{t} \\big(v_A(\\tau) - v_B(\\tau)\\big)\\,d\\tau$$',
    variabel: [
      { simbol: '$x_A - x_B$', arti: 'Posisi relatif A terhadap B', satuan: '$\\text{m}$', dimensi: '$[\\text{L}]$' },
      { simbol: '$v_A - v_B$', arti: 'Kecepatan relatif A terhadap B', satuan: '$\\text{m/s}$', dimensi: '$[\\text{L}][\\text{T}]^{-1}$' },
    ],
    kondisiPenggunaan: 'Berlaku untuk dua benda pada lintasan lurus sejajar. Nilai ekstrem jarak pisah terjadi saat $v_A(t^*) = v_B(t^*)$.',
    catatanOlimpiade: 'Secara grafis, perubahan jarak pisah adalah luas daerah yang diapit di antara kurva $v_A$ dan $v_B$.',
    narration: 'Selisih posisi dua benda adalah selisih posisi awal ditambah integral selisih kecepatan keduanya. Jarak pisah menjadi maksimum atau minimum tepat saat kedua kurva kecepatan berpotongan.',
  },
];
