import { PhysicsQuestion } from '../types/physics';

export const QUESTIONS_DATA: PhysicsQuestion[] = [
  // =========================================================================
  // TIER 1: SOAL 1–3 — PENGUATAN KONSEP FUNDAMENTAL
  // =========================================================================
  {
    id: 1,
    tier: 'fundamental',
    tierLabel: 'Penguatan Konsep Fundamental',
    title: 'Perpindahan Maksimum Mobil Mainan pada Kurva v-t',
    prompt:
      'Sebuah mobil mainan bergerak sepanjang garis lurus dan direkam dalam kurva kecepatan $v$ ($\\text{m/s}$) pada sumbu vertikal terhadap waktu $t$ ($\\text{s}$) pada sumbu horizontal seperti gambar di samping. Perpindahan maksimum mobil mainan tersebut dari posisi awal hingga waktu $t = 4,0\\text{ s}$ adalah ... m.',
    unit: 'm',
    expectedValue: 12.125,
    expectedFormatted: '12,1',
    stimulus: {
      mode: 'v-t',
      xLabel: 't (s)',
      yLabel: 'v (m/s)',
      tMin: 0,
      tMax: 4.0,
      tStepMajor: 1.0,
      tStepGrid: 0.5,
      yMin: -4,
      yMax: 6,
      yStepMajor: 2,
      yStepGrid: 1,
      objects: [
        {
          id: 'car1',
          label: 'Mobil Mainan',
          color: '#7A1228',
          initialX: 0,
          segments: [
            { tStart: 0, tEnd: 1.0, kind: 'linear-v', vStart: 3, vEnd: 5 },
            { tStart: 1.0, tEnd: 2.0, kind: 'linear-v', vStart: 5, vEnd: 5 },
            { tStart: 2.0, tEnd: 4.0, kind: 'linear-v', vStart: 5, vEnd: -3 },
          ],
        },
      ],
      proofHighlight: {
        tStar: 3.25,
        xStar: 12.125,
        label: 'Titik Balik (v = 0 di t = 3,25 s)',
        phaseNotes: [
          { tFrom: 0, tTo: 1.0, note: 'Fase 1: Mobil dipercepat ke kanan (+2,0 m/s²), kecepatan naik dari 3 ke 5 m/s.' },
          { tFrom: 1.0, tTo: 2.0, note: 'Fase 2: Kecepatan konstan +5,0 m/s (percepatan nol, gaya total nol).' },
          { tFrom: 2.0, tTo: 3.25, note: 'Fase 3a: Diperlambat (-4,0 m/s²), mobil tetap maju hingga berhenti sesaat di t = 3,25 s.' },
          { tFrom: 3.25, tTo: 4.0, note: 'Fase 3b: Kecepatan negatif, mobil berbalik mundur sehingga perpindahan menyusut.' },
        ],
      },
    },
    explanation: {
      memahami: {
        fenomena:
          'Mobil mainan bergerak satu dimensi sepanjang garis lurus. Mula-mula mobil melaju ke arah positif ($v > 0$), lalu mengalami perlambatan hingga berhenti sesaat ($v = 0$) sebelum berbalik mundur ($v < 0$).',
        diketahui: [
          '$t = 0 \\text{ s} \\implies v = 3\\text{ m/s}$',
          '$t = 1,0\\text{ s} \\implies v = 5\\text{ m/s}$ (naik linear)',
          '$1,0 \\le t \\le 2,0\\text{ s} \\implies v = 5\\text{ m/s}$ (konstan)',
          '$t = 2,0\\text{ s} \\to t = 4,0\\text{ s} \\implies v$ turun linear dari $5\\text{ m/s}$ ke $-3\\text{ m/s}$',
        ],
        ditanyakan: 'Perpindahan maksimum $\\Delta x_{\\text{maks}}$ selama selang $0 \\le t \\le 4,0\\text{ s}$ (dalam $\\text{m}$).',
      },
      identifikasi: {
        prinsip: 'Luas bertanda di bawah kurva $v-t$ dan syarat titik balik ekstrem ($v(t^*) = 0$).',
        alasan:
          'Selama $v(t) > 0$, posisi $x(t)$ terus bertambah. Begitu $v(t)$ menjadi negatif, mobil bergerak berbalik arah sehingga perpindahan dari titik awal berkurang. Oleh karena itu, perpindahan maksimum tercapai tepat saat $v(t^*) = 0$.',
      },
      visualisasi: {
        deskripsiDiagram:
          'Perhatikan skala grid horizontal ($0,5\\text{ s}$ per kotak) dan vertikal ($1\\text{ m/s}$ per kotak). Garis turun memotong sumbu-$t$ tepat di antara $t = 3,0\\text{ s}$ dan $t = 3,5\\text{ s}$.',
        arahVektor:
          'Untuk $t < 3,25\\text{ s}$, vektor kecepatan $\\vec{v}$ mengarah ke $+x$ (kanan). Pada $2,0 < t < 4,0\\text{ s}$, vektor percepatan $\\vec{a}$ konstan mengarah ke $-x$ (kiri).',
        catatanFbd:
          'Saat mobil melambat ($2,0 < t < 3,25\\text{ s}$), $\\vec{a}$ berlawanan arah dengan $\\vec{v}$. Setelah $t = 3,25\\text{ s}$, $\\vec{a}$ searah dengan $\\vec{v}$ ke arah kiri.',
      },
      persamaanDasar: [
        {
          rumus: '$$\\Delta x(t) = \\int_{0}^{t} v(\\tau)\\,d\\tau$$',
          simbol: '$\\Delta x$: perpindahan ($\\text{m}$), $v(\\tau)$: kecepatan sesaat ($\\text{m/s}$)',
          makna: 'Perpindahan sama dengan luas bertanda daerah antara kurva $v-t$ dan sumbu waktu.',
        },
        {
          rumus: '$$a = \\frac{\\Delta v}{\\Delta t}$$',
          simbol: '$a$: percepatan ($\\text{m/s}^2$)',
          makna: 'Gradien garis lurus pada grafik $v-t$ menyatakan percepatan konstan pada segmen tersebut.',
        },
      ],
      penurunanMatematis: [
        'Tentukan gradien segmen turun ($2,0 \\le t \\le 4,0\\text{ s}$): $a = \\frac{-3 - 5}{4,0 - 2,0} = \\frac{-8}{2,0} = -4,0\\text{ m/s}^2$.',
        'Cari waktu titik balik $t^*$ ketika $v(t^*) = 0$: $v(t^*) = 5 + a(t^* - 2,0) = 0 \\implies 5 - 4(t^* - 2,0) = 0$.',
        'Selesaikan $t^*$: $4(t^* - 2,0) = 5 \\implies t^* - 2,0 = 1,25 \\implies t^* = 3,25\\text{ s}$.',
        'Pecah luas positif di bawah kurva dari $t = 0$ hingga $t^* = 3,25\\text{ s}$ menjadi trapesium ($0 \\to 1,0$), persegi panjang ($1,0 \\to 2,0$), dan segitiga ($2,0 \\to 3,25$).',
      ],
      perhitungan: {
        langkah: [
          'Luas 1 (trapesium $0 \\le t \\le 1,0\\text{ s}$): $A_1 = \\frac{3 + 5}{2} \\times 1,0 = 4,0\\text{ m}$',
          'Luas 2 (persegi panjang $1,0 \\le t \\le 2,0\\text{ s}$): $A_2 = 5 \\times 1,0 = 5,0\\text{ m}$',
          'Luas 3 (segitiga $2,0 \\le t \\le 3,25\\text{ s}$): $A_3 = \\frac{1}{2} \\times (3,25 - 2,0) \\times 5 = \\frac{1}{2} \\times 1,25 \\times 5 = 3,125\\text{ m}$',
        ],
        substitusiHighlight: '$\\Delta x_{\\text{maks}} = 4,0 + 5,0 + 3,125 = 12,125\\text{ m} \\approx 12,1\\text{ m}$',
      },
      jawabanAkhir: {
        nilaiFormatted: '12,1',
        satuan: 'm',
        interpretasi:
          'Mobil mencapai posisi terjauh $12,1\\text{ m}$ pada $t = 3,25\\text{ s}$, lalu mundur $1,125\\text{ m}$ hingga posisi akhirnya di $t = 4,0\\text{ s}$ menjadi $11,0\\text{ m}$.',
      },
      insightOlimpiade: {
        berpikirCepat:
          'Jangan pernah langsung menghitung luas sampai $t_{\\text{akhir}}$ jika kurva sempat menyeberang ke bawah sumbu-$t$! Selalu cari titik potong $v = 0$ terlebih dahulu.',
        trikSahih:
          'Pada grafik linear yang memotong sumbu-$t$ dari $+5$ ke $-3$, rasio alas segitiga positif dan negatif sama dengan rasio tingginya ($5 : 3$), sehingga $t^* = 2,0 + \\frac{5}{5+3}(2,0) = 3,25\\text{ s}$.',
        kesalahanUmum:
          'Menganggap 1 kotak grid selalu bernilai $1\\text{ s}$ atau menjawab perpindahan akhir ($11,0\\text{ m}$) alih-alih perpindahan maksimum.',
        polaSerupa:
          'Identik dengan Soal OSK 2026 Nomor 1 tentang kurva $v-t$ mobil mainan dan perpindahan maksimum.',
      },
    },
    feedback: {
      wrongHint:
        'Ingat kembali: perpindahan maksimum TIDAK selalu terjadi pada detik terakhir ($t = 4,0\\text{ s}$). Perhatikan kapan mobil berbalik arah!',
      fixReasoning:
        'Cari terlebih dahulu waktu $t^*$ ketika kurva kecepatan memotong $v = 0$, lalu jumlahkan luas bangun datar hanya dari $t = 0$ sampai $t^*$. Perhatikan pula skala $0,5\\text{ s}$ per kotak.',
      recommendedModuleId: 'mod-2',
      correctPraise:
        'Luar biasa! Anda berhasil menemukan titik balik $t = 3,25\\text{ s}$ dan membulatkan hasilnya dengan tepat ke 12,1 m.',
    },
    narration: {
      soalDanDiketahui:
        'Perhatikan Soal Nomor 1. Sebuah mobil mainan bergerak lurus dengan grafik kecepatan terhadap waktu. Pada detik nol kecepatannya tiga meter per detik, naik menjadi lima meter per detik di detik satu, bertahan konstan hingga detik dua, lalu turun lurus menjadi minus tiga meter per detik pada detik empat. Kita diminta mencari perpindahan maksimum selama selang waktu tersebut.',
      pembahasanDanPenurunan:
        'Kunci soal ini adalah menyadari bahwa mobil terus menjauh dari titik awal selama kecepatannya positif. Begitu kecepatan menjadi negatif, mobil mundur dan mengurangi perpindahan. Dari detik dua ke empat, percepatan konstan minus empat meter per detik kuadrat, sehingga kecepatan menjadi nol tepat pada tiga koma dua lima detik. Jumlah luas trapesium, persegi panjang, dan segitiga hingga saat itu menghasilkan dua belas koma satu dua lima meter, atau dua belas koma satu meter.',
      animasiDanInsight:
        'Amati animasi pembuktian: saat mobil melewati detik tiga koma dua lima, vektor kecepatan berbalik ke kiri sementara luas kurva yang diarsir di bawah sumbu waktu mulai mengurangi posisi mobil.',
    },
  },

  {
    id: 2,
    tier: 'fundamental',
    tierLabel: 'Penguatan Konsep Fundamental',
    title: 'Jarak Tempuh Total Saat Terjadi Pembalikan Arah',
    prompt:
      'Sebuah kereta uji bergerak sepanjang rel lurus dengan kurva kecepatan $v$ ($\\text{m/s}$) terhadap waktu $t$ ($\\text{s}$) selama $0 \\le t \\le 3,5\\text{ s}$ seperti pada grafik. Jarak tempuh total yang dilalui kereta uji selama selang waktu tersebut adalah ... m.',
    unit: 'm',
    expectedValue: 10.9166667,
    expectedFormatted: '10,9',
    stimulus: {
      mode: 'v-t',
      xLabel: 't (s)',
      yLabel: 'v (m/s)',
      tMin: 0,
      tMax: 3.5,
      tStepMajor: 1.0,
      tStepGrid: 0.5,
      yMin: -5,
      yMax: 6,
      yStepMajor: 2,
      yStepGrid: 1,
      objects: [
        {
          id: 'train2',
          label: 'Kereta Uji',
          color: '#7A1228',
          initialX: 0,
          segments: [
            { tStart: 0, tEnd: 1.0, kind: 'linear-v', vStart: 2, vEnd: 5 },
            { tStart: 1.0, tEnd: 2.5, kind: 'linear-v', vStart: 5, vEnd: -4 },
            { tStart: 2.5, tEnd: 3.5, kind: 'linear-v', vStart: -4, vEnd: -4 },
          ],
        },
      ],
      proofHighlight: {
        tStar: 1.833333,
        xStar: 5.583333,
        label: 'Pembalikan Arah di t = 11/6 s',
        phaseNotes: [
          { tFrom: 0, tTo: 1.0, note: 'Fase 1: Kereta maju dipercepat (+3 m/s²), menempuh jarak 3,5 m.' },
          { tFrom: 1.0, tTo: 1.8333, note: 'Fase 2a: Masih maju sambil mengerem (-6 m/s²) hingga berhenti sesaat di t = 1,83 s.' },
          { tFrom: 1.8333, tTo: 2.5, note: 'Fase 2b: Berbalik ke arah negatif; jarak bertambah walaupun posisi berkurang.' },
          { tFrom: 2.5, tTo: 3.5, note: 'Fase 3: Mundur dengan laju tetap 4 m/s sejauh 4,0 m tambahan.' },
        ],
      },
    },
    explanation: {
      memahami: {
        fenomena:
          'Kereta bergerak maju pada awal perjalanan, mengalami perlambatan kuat hingga berhenti sejenak, lalu melaju mundur hingga kecepatan konstan $-4\\text{ m/s}$.',
        diketahui: [
          '$(0; 2) \\to (1,0; 5)$ (segmen naik linear)',
          '$(1,0; 5) \\to (2,5; -4)$ (segmen turun linear)',
          '$(2,5; -4) \\to (3,5; -4)$ (segmen konstan negatif)',
        ],
        ditanyakan: 'Jarak tempuh total $s$ selama $0 \\le t \\le 3,5\\text{ s}$ (dalam $\\text{m}$).',
      },
      identifikasi: {
        prinsip: 'Perbedaan antara jarak tempuh skalar $s = \\int |v(t)|\\,dt$ dan perpindahan vektor $\\Delta x = \\int v(t)\\,dt$.',
        alasan:
          'Odometer kendaraan tidak pernah berkurang saat kendaraan mundur. Oleh sebab itu, daerah di bawah sumbu waktu ($v < 0$) tetap dijumlahkan secara positif (nilai mutlak luasnya).',
      },
      visualisasi: {
        deskripsiDiagram:
          'Kurva memotong sumbu-$t$ di antara $t = 1,5\\text{ s}$ dan $t = 2,0\\text{ s}$, membentuk dua segitiga bertolak belakang antara $t = 1,0\\text{ s}$ dan $t = 2,5\\text{ s}$.',
        arahVektor:
          'Sebelum $t^* = 1\\frac{5}{6}\\text{ s}$, $\\vec{v}$ ke kanan ($+$). Setelah $t^*$, $\\vec{v}$ ke kiri ($-$), tetapi laju $|v|$ terus bertambah hingga $4\\text{ m/s}$.',
        catatanFbd:
          'Pada $t = 2,5\\text{ s}$ hingga $3,5\\text{ s}$, gaya total berimbang ($a = 0$) sehingga kereta bergerak mundur beraturan.',
      },
      persamaanDasar: [
        {
          rumus: '$$s = \\int_{0}^{3,5} |v(t)|\\,dt = A_+ + |A_-|$$',
          simbol: '$s$: jarak tempuh total ($\\text{m}$), $A_+$: luas di atas sumbu-$t$, $|A_-|$: besar luas di bawah sumbu-$t$',
          makna: 'Semua lintasan maju maupun mundur dijumlahkan besarnya tanpa tanda negatif.',
        },
      ],
      penurunanMatematis: [
        'Tentukan gradien segmen $1,0 \\le t \\le 2,5\\text{ s}$: $a = \\frac{-4 - 5}{2,5 - 1,0} = \\frac{-9}{1,5} = -6,0\\text{ m/s}^2$.',
        'Cari waktu $t^*$ saat $v = 0$: $5 - 6(t^* - 1,0) = 0 \\implies t^* - 1,0 = \\frac{5}{6}\\text{ s} \\implies t^* = \\frac{11}{6}\\text{ s}$.',
        'Durasi bagian segitiga positif $= \\frac{5}{6}\\text{ s}$, sedangkan durasi bagian segitiga negatif $= 1,5 - \\frac{5}{6} = \\frac{4}{6} = \\frac{2}{3}\\text{ s}$.',
      ],
      perhitungan: {
        langkah: [
          'Trapesium $0 \\to 1,0$: $A_1 = \\frac{2 + 5}{2} \\times 1,0 = 3,5\\text{ m}$',
          'Segitiga atas $1,0 \\to \\frac{11}{6}$: $A_2 = \\frac{1}{2} \\times \\frac{5}{6} \\times 5 = \\frac{25}{12} \\approx 2,0833\\text{ m}$',
          'Besar segitiga bawah $\\frac{11}{6} \\to 2,5$: $|A_3| = \\frac{1}{2} \\times \\frac{2}{3} \\times 4 = \\frac{4}{3} = \\frac{16}{12} \\approx 1,3333\\text{ m}$',
          'Persegi panjang bawah $2,5 \\to 3,5$: $|A_4| = 4 \\times 1,0 = 4,0\\text{ m}$',
        ],
        substitusiHighlight: '$s = 3,5 + \\frac{25}{12} + \\frac{16}{12} + 4,0 = 7,5 + \\frac{41}{12} = \\frac{131}{12} \\approx 10,9167\\text{ m} \\approx 10,9\\text{ m}$',
      },
      jawabanAkhir: {
        nilaiFormatted: '10,9',
        satuan: 'm',
        interpretasi:
          'Kereta menempuh $5,58\\text{ m}$ ke kanan dan $5,33\\text{ m}$ ke kiri sehingga total panjang lintasannya $10,9\\text{ m}$ (sementara perpindahan bersihnya hanya $0,25\\text{ m}$).',
      },
      insightOlimpiade: {
        berpikirCepat:
          'Jika dua segitiga terbentuk dari satu garis lurus yang memotong sumbu-$t$, gunakan perbandingan sebangun: $t_+ : t_- = |v_1| : |v_2| = 5 : 4$.',
        trikSahih:
          'Pertahankan pecahan $\\frac{25}{12}$ dan $\\frac{16}{12}$ hingga penjumlahan terakhir untuk menghindari galat pembulatan bertingkat!',
        kesalahanUmum:
          'Mengurangkan luas di bawah sumbu-$t$ sehingga keliru menghitung perpindahan ($0,25\\text{ m}$) padahal yang diminta adalah jarak tempuh.',
        polaSerupa:
          'Variasi langsung Soal OSK #1 yang menguji ketelitian membedakan skalar jarak dan vektor perpindahan pada grafik $v-t$.',
      },
    },
    feedback: {
      wrongHint:
        'Perhatikan pertanyaan soal: yang ditanyakan adalah JARAK TEMPUH TOTAL, bukan perpindahan bersih maupun perpindahan maksimum.',
      fixReasoning:
        'Tentukan titik potong $v = 0$ secara eksak dengan gradien garis ($a = -6\\text{ m/s}^2$), lalu jumlahkan nilai mutlak seluruh luas di atas maupun di bawah sumbu waktu.',
      recommendedModuleId: 'mod-1',
      correctPraise:
        'Tepat sekali! Anda menjaga pecahan eksak hingga akhir dan membedakan jarak tempuh dari perpindahan dengan sempurna.',
    },
    narration: {
      soalDanDiketahui:
        'Soal Nomor 2 menguji perbedaan jarak tempuh dan perpindahan. Kereta uji memiliki kurva kecepatan dari nol koma dua, naik ke satu koma lima, lalu turun memotong sumbu waktu menuju dua koma lima koma minus empat, dan bertahan di minus empat hingga tiga koma lima detik.',
      pembahasanDanPenurunan:
        'Karena yang ditanyakan adalah jarak tempuh total, semua luas di bawah kurva harus dijumlahkan secara positif. Titik potong kecepatan nol terjadi pada satu lima per enam detik. Luas maju sebesar tiga koma lima ditambah dua lima per dua belas meter, dan luas mundur sebesar empat per tiga ditambah empat meter. Total jarak tempuh adalah seratus tiga puluh satu per dua belas meter, yang dibulatkan menjadi sepuluh koma sembilan meter.',
      animasiDanInsight:
        'Pada simulasi, perhatikan penghitung jarak tempuh yang terus bertambah meskipun kereta sudah bergerak mundur ke kiri.',
    },
  },

  {
    id: 3,
    tier: 'fundamental',
    tierLabel: 'Penguatan Konsep Fundamental',
    title: 'Rentang Posisi Ekstrem (Minimum ke Maksimum)',
    prompt:
      'Sebuah partikel bergerak sepanjang sumbu-$x$ bermula dari $x(0) = 0$. Kurva kecepatannya untuk $0 \\le t \\le 4,0\\text{ s}$ merupakan garis patah melalui titik $(0; -4)$, $(2,0; 3)$, $(3,0; 3)$, dan $(4,0; 0)$. Tentukan selisih antara posisi maksimum dan posisi minimum ($x_{\\text{maks}} - x_{\\text{min}}$) partikel selama selang waktu tersebut (dalam satuan m).',
    unit: 'm',
    expectedValue: 5.785714,
    expectedFormatted: '5,8',
    stimulus: {
      mode: 'v-t',
      xLabel: 't (s)',
      yLabel: 'v (m/s)',
      tMin: 0,
      tMax: 4.0,
      tStepMajor: 1.0,
      tStepGrid: 0.5,
      yMin: -5,
      yMax: 4,
      yStepMajor: 1,
      yStepGrid: 1,
      objects: [
        {
          id: 'particle3',
          label: 'Partikel',
          color: '#7A1228',
          initialX: 0,
          segments: [
            { tStart: 0, tEnd: 2.0, kind: 'linear-v', vStart: -4, vEnd: 3 },
            { tStart: 2.0, tEnd: 3.0, kind: 'linear-v', vStart: 3, vEnd: 3 },
            { tStart: 3.0, tEnd: 4.0, kind: 'linear-v', vStart: 3, vEnd: 0 },
          ],
        },
      ],
      proofHighlight: {
        tStar: 8 / 7,
        xStar: -16 / 7,
        label: 'Posisi Minimum di t = 8/7 s',
        phaseNotes: [
          { tFrom: 0, tTo: 8 / 7, note: 'Partikel bergerak mundur ke arah kiri hingga mencapai x_min = -16/7 m.' },
          { tFrom: 8 / 7, tTo: 2.0, note: 'Setelah v = 0, partikel mulai bergerak ke kanan melewati titik asal.' },
          { tFrom: 2.0, tTo: 4.0, note: 'Melaju konstan lalu melambat hingga berhenti di x_maks = +3,5 m.' },
        ],
      },
    },
    explanation: {
      memahami: {
        fenomena:
          'Partikel awalnya bergerak ke arah negatif ($v < 0$), melambat hingga berbalik arah ke kanan ($v > 0$), lalu akhirnya berhenti di $t = 4,0\\text{ s}$.',
        diketahui: [
          '$x(0) = 0\\text{ m}$',
          'Segmen 1: $(0; -4) \\to (2,0; 3)$',
          'Segmen 2: $(2,0; 3) \\to (3,0; 3)$',
          'Segmen 3: $(3,0; 3) \\to (4,0; 0)$',
        ],
        ditanyakan: 'Selisih posisi maksimum dan minimum $x_{\\text{maks}} - x_{\\text{min}}$ selama $0 \\le t \\le 4,0\\text{ s}$ (dalam $\\text{m}$).',
      },
      identifikasi: {
        prinsip: 'Titik kritis posisi terjadi ketika $v(t) = 0$ serta pada batas interval.',
        alasan:
          'Dari $t = 0$ sampai $v = 0$, partikel bergeser terus ke kiri sehingga mencapai posisi paling kiri ($x_{\\text{min}}$). Setelah $v > 0$, partikel selalu bergerak ke kanan hingga $t = 4,0\\text{ s}$ ($x_{\\text{maks}}$). Jadi $x_{\\text{maks}} - x_{\\text{min}}$ tidak lain adalah jarak yang ditempuh partikel dari titik balik $t^*$ sampai $t = 4,0\\text{ s}$!',
      },
      visualisasi: {
        deskripsiDiagram:
          'Titik potong sumbu-$t$ terletak sedikit di kanan $t = 1,0\\text{ s}$, tidak tepat di kisi grid, sehingga wajib dihitung menggunakan persamaan garis.',
        arahVektor:
          'Pada $0 \\le t < 2,0\\text{ s}$, percepatan bernilai positif ($a = +3,5\\text{ m/s}^2$) ke kanan walaupun awalnya partikel bergerak ke kiri.',
        catatanFbd:
          'Gaya dorong awal mengarah berlawanan dengan gerak mundur partikel sehingga memperlambatnya sampai berhenti di $t = 8/7\\text{ s}$, lalu menariknya ke kanan.',
      },
      persamaanDasar: [
        {
          rumus: '$$x(t) = x(0) + \\int_{0}^{t} v(\\tau)\\,d\\tau$$',
          simbol: '$x_{\\text{min}}$: minimum global posisi, $x_{\\text{maks}}$: maksimum global posisi',
          makna: 'Selisih antara dua titik ekstrem sama dengan integral kecepatan di antara kedua waktu tersebut.',
        },
      ],
      penurunanMatematis: [
        'Gradien segmen pertama ($0 \\le t \\le 2,0$): $a_1 = \\frac{3 - (-4)}{2,0 - 0} = 3,5\\text{ m/s}^2 = \\frac{7}{2}\\text{ m/s}^2$.',
        'Titik balik $v(t^*) = 0$: $-4 + \\frac{7}{2}t^* = 0 \\implies t^* = \\frac{8}{7}\\text{ s} \\approx 1,143\\text{ s}$.',
        'Karena sejak $t^* = \\frac{8}{7}\\text{ s}$ hingga $t = 4,0\\text{ s}$ nilai $v(t) \\ge 0$ selalu positif/nol, maka $x_{\\text{min}} = x(t^*)$ dan $x_{\\text{maks}} = x(4,0)$.',
        'Oleh karena itu: $x_{\\text{maks}} - x_{\\text{min}} = \\int_{8/7}^{4,0} v(t)\\,dt$ (luas positif dari $t^*$ ke $4,0$).',
      ],
      perhitungan: {
        langkah: [
          'Cek $x_{\\text{min}} = x(8/7) = -\\frac{1}{2} \\times \\frac{8}{7} \\times 4 = -\\frac{16}{7} \\approx -2,2857\\text{ m}$',
          'Segitiga positif $(8/7 \\to 2,0)$: alas $= 2 - \\frac{8}{7} = \\frac{6}{7}\\text{ s}$, luas $= \\frac{1}{2} \\times \\frac{6}{7} \\times 3 = \\frac{9}{7} \\approx 1,2857\\text{ m}$',
          'Persegi panjang $(2,0 \\to 3,0)$: luas $= 1,0 \\times 3 = 3,0\\text{ m}$',
          'Segitiga $(3,0 \\to 4,0)$: luas $= \\frac{1}{2} \\times 1,0 \\times 3 = 1,5\\text{ m}$',
          'Sehingga $x_{\\text{maks}} = -\\frac{16}{7} + \\frac{9}{7} + 3,0 + 1,5 = 3,5\\text{ m}$',
        ],
        substitusiHighlight: '$x_{\\text{maks}} - x_{\\text{min}} = \\frac{9}{7} + 3,0 + 1,5 = \\frac{9}{7} + 4,5 = \\frac{81}{14} \\approx 5,7857\\text{ m} \\approx 5,8\\text{ m}$',
      },
      jawabanAkhir: {
        nilaiFormatted: '5,8',
        satuan: 'm',
        interpretasi:
          'Partikel bergerak paling kiri di $-2,29\\text{ m}$ dan paling kanan di $+3,50\\text{ m}$, sehingga bentang gerak totalnya $5,8\\text{ m}$.',
      },
      insightOlimpiade: {
        berpikirCepat:
          'Jangan menebak posisi titik potong dari mata saja! Di OSK, titik potong sengaja diletakkan pada pecahan seperti $8/7\\text{ s}$ agar siswa menggunakan persamaan garis lurus.',
        trikSahih:
          'Perhatikan bahwa $x_{\\text{maks}} - x_{\\text{min}}$ langsung sama dengan luas dari $t^*$ ke $4,0\\text{ s}$ tanpa perlu menghitung $x_{\\text{min}}$ terlebih dahulu.',
        kesalahanUmum:
          'Menjawab $x_{\\text{maks}} = 3,5\\text{ m}$ tanpa mengurangi $x_{\\text{min}} = -2,29\\text{ m}$, atau menganggap $v=0$ terjadi di $t = 1,0\\text{ s}$.',
        polaSerupa:
          'Pengembangan langsung kurva $v-t$ Soal #1 untuk gerak satu dimensi yang diawali kecepatan negatif.',
      },
    },
    feedback: {
      wrongHint:
        'Ingat bahwa partikel sempat bergeser ke koordinat negatif terlebih dahulu sebelum berbalik ke kanan. Posisi minimumnya bernilai negatif!',
      fixReasoning:
        'Hitung titik potong $v = 0$ secara eksak dengan gradien segmen pertama ($a = 3,5\\text{ m/s}^2$), cari $x_{\\text{min}}$ dan $x_{\\text{maks}}$, lalu hitung selisihnya $x_{\\text{maks}} - x_{\\text{min}}$.',
      recommendedModuleId: 'mod-2',
      correctPraise:
        'Hebat! Anda tidak terjebak menaksir kisi grafik secara kasar dan menghitung titik balik $t = 8/7$ detik dengan akurat.',
    },
    narration: {
      soalDanDiketahui:
        'Soal Nomor 3. Sebuah partikel mulai dari posisi nol dengan kecepatan awal minus empat meter per detik. Kecepatan naik lurus menuju tiga meter per detik pada detik dua, bertahan konstan sampai detik tiga, lalu turun ke nol pada detik empat. Tentukan selisih posisi maksimum dan posisi minimumnya.',
      pembahasanDanPenurunan:
        'Pertama, tentukan kapan kecepatan menjadi nol pada segmen pertama. Gradien garis dari nol koma minus empat ke dua koma tiga adalah tiga koma lima meter per detik kuadrat, sehingga kecepatan nol terjadi pada delapan per tujuh detik. Di saat inilah posisi minimum tercapai. Setelah itu kecepatan selalu positif sampai detik keempat, sehingga jarak tempuh dari delapan per tujuh detik sampai detik keempat langsung memberikan selisih x maksimum dikurangi x minimum sebesar delapan puluh satu per empat belas, atau lima koma delapan meter.',
      animasiDanInsight:
        'Perhatikan lintasan animasi: partikel berbalik arah pada koordinat minus dua koma dua sembilan meter lalu berhenti di plus tiga koma lima meter.',
    },
  },

  // =========================================================================
  // TIER 2: SOAL 4–6 — PENERAPAN PRINSIP & PERSAMAAN FISIKA
  // =========================================================================
  {
    id: 4,
    tier: 'penerapan',
    tierLabel: 'Penerapan Prinsip & Persamaan',
    title: 'Kecepatan Rata-Rata hingga Titik Perpindahan Maksimum',
    prompt:
      'Sebuah mobil mainan bergerak di lintasan lurus dengan grafik $v(t)$ melalui titik $(0; 2) \\to (1,5; 5) \\to (2,5; 5) \\to (4,5; -3)$ seperti pada gambar. Hitunglah kecepatan rata-rata mobil mainan tersebut sejak $t = 0$ hingga saat mobil mencapai perpindahan maksimumnya (dalam satuan m/s).',
    unit: 'm/s',
    expectedValue: 3.5666667,
    expectedFormatted: '3,6',
    stimulus: {
      mode: 'v-t',
      xLabel: 't (s)',
      yLabel: 'v (m/s)',
      tMin: 0,
      tMax: 4.5,
      tStepMajor: 1.0,
      tStepGrid: 0.5,
      yMin: -4,
      yMax: 6,
      yStepMajor: 2,
      yStepGrid: 1,
      objects: [
        {
          id: 'car4',
          label: 'Mobil Mainan',
          color: '#7A1228',
          initialX: 0,
          segments: [
            { tStart: 0, tEnd: 1.5, kind: 'linear-v', vStart: 2, vEnd: 5 },
            { tStart: 1.5, tEnd: 2.5, kind: 'linear-v', vStart: 5, vEnd: 5 },
            { tStart: 2.5, tEnd: 4.5, kind: 'linear-v', vStart: 5, vEnd: -3 },
          ],
        },
      ],
      proofHighlight: {
        tStar: 3.75,
        xStar: 13.375,
        label: 'Titik Balik t* = 3,75 s (v_rata = 3,57 m/s)',
        phaseNotes: [
          { tFrom: 0, tTo: 1.5, note: 'Dipercepat dari 2 ke 5 m/s; luas trapesium = 5,25 m.' },
          { tFrom: 1.5, tTo: 2.5, note: 'Kecepatan konstan 5 m/s; luas persegi panjang = 5,0 m.' },
          { tFrom: 2.5, tTo: 3.75, note: 'Melambat hingga v = 0 di t* = 3,75 s; perpindahan puncak = 13,375 m.' },
          { tFrom: 3.75, tTo: 4.5, note: 'Setelah titik balik, mobil mundur (tidak termasuk selang yang ditanyakan).' },
        ],
      },
    },
    explanation: {
      memahami: {
        fenomena:
          'Mobil melaju maju melewati tiga fase hingga mencapai titik terjauhnya saat berhenti sesaat, lalu berbalik arah.',
        diketahui: [
          'Kurva $(0; 2) \\to (1,5; 5) \\to (2,5; 5) \\to (4,5; -3)$',
        ],
        ditanyakan: 'Kecepatan rata-rata $\\bar{v}$ dari $t = 0$ hingga waktu terjadinya perpindahan maksimum $t^*$.',
      },
      identifikasi: {
        prinsip: 'Definisi kecepatan rata-rata $\\bar{v} = \\frac{\\Delta x}{\\Delta t}$ dan syarat titik balik $v(t^*) = 0$.',
        alasan:
          'Berbeda dengan rata-rata aritmetika $\\frac{v_{\\text{awal}} + v_{\\text{akhir}}}{2}$ (yang hanya berlaku untuk satu segmen percepatan konstan!), untuk gerak multi-fase kita wajib membagi perpindahan total $\\Delta x(t^*)$ dengan waktu tempuh total $t^*$.',
      },
      visualisasi: {
        deskripsiDiagram:
          'Luas daerah di bawah kurva dari $t = 0$ sampai titik potong sumbu-$t$ dibagi oleh absis titik potong tersebut memberikan tinggi rata-rata grafik.',
        arahVektor:
          'Selama $0 \\le t < 3,75\\text{ s}$, mobil selalu bergerak searah sumbu-$x$ positif sehingga $\\bar{v} > 0$.',
        catatanFbd:
          'Pada selang $2,5 \\le t \\le 4,5\\text{ s}$, gaya rem konstan memberi perlambatan $-4,0\\text{ m/s}^2$.',
      },
      persamaanDasar: [
        {
          rumus: '$$\\bar{v}_{0 \\to t^*} = \\frac{\\Delta x_{\\text{maks}}}{t^*}$$',
          simbol: '$t^*$: waktu saat $v(t^*) = 0$, $\\Delta x_{\\text{maks}}$: perpindahan pada $t^*$',
          makna: 'Kecepatan rata-rata merupakan rasio perpindahan terhadap selang waktunya.',
        },
      ],
      penurunanMatematis: [
        'Perlambatan pada segmen $2,5 \\le t \\le 4,5$: $a_3 = \\frac{-3 - 5}{4,5 - 2,5} = -4,0\\text{ m/s}^2$.',
        'Waktu titik balik $v(t^*) = 0$: $5 - 4(t^* - 2,5) = 0 \\implies t^* = 2,5 + 1,25 = 3,75\\text{ s}$.',
        'Hitung perpindahan maksimum $\\Delta x(3,75)$ sebagai jumlah tiga bangun datar.',
      ],
      perhitungan: {
        langkah: [
          '$A_1$ ($0 \\to 1,5$): $\\frac{2 + 5}{2} \\times 1,5 = 5,25\\text{ m}$',
          '$A_2$ ($1,5 \\to 2,5$): $5 \\times 1,0 = 5,0\\text{ m}$',
          '$A_3$ ($2,5 \\to 3,75$): $\\frac{1}{2} \\times 1,25 \\times 5 = 3,125\\text{ m}$',
          '$\\Delta x_{\\text{maks}} = 5,25 + 5,0 + 3,125 = 13,375\\text{ m}$',
        ],
        substitusiHighlight: '$\\bar{v} = \\frac{13,375}{3,75} = \\frac{107}{30} \\approx 3,5667\\text{ m/s} \\approx 3,6\\text{ m/s}$',
      },
      jawabanAkhir: {
        nilaiFormatted: '3,6',
        satuan: 'm/s',
        interpretasi:
          'Jika mobil bergerak dengan kecepatan tetap $3,6\\text{ m/s}$ sejak awal, mobil akan tiba di posisi $13,375\\text{ m}$ tepat pada detik ke-$3,75$.',
      },
      insightOlimpiade: {
        berpikirCepat:
          'Waspadai jebakan klasik: menghitung $\\frac{2 + 0}{2} = 1,0\\text{ m/s}$! Rumus $\\frac{v_0 + v}{2}$ hanya sah bila percepatan konstan sepanjang seluruh interval.',
        trikSahih:
          'Ubah desimal berujung 5 atau 25 ke pecahan ($13,375 = \\frac{107}{8}$, $3,75 = \\frac{15}{4}$) agar pembagian $\\frac{107}{30}$ cepat dan akurat tanpa kalkulator.',
        kesalahanUmum:
          'Membagi $\\Delta x_{\\text{maks}}$ dengan $t_{\\text{akhir}} = 4,5\\text{ s}$ alih-alih $t^* = 3,75\\text{ s}$.',
        polaSerupa:
          'Gabungan langsung pencarian $\\Delta x_{\\text{maks}}$ ala Soal OSK #1 dengan konsep kecepatan rata-rata kinematika 1D.',
      },
    },
    feedback: {
      wrongHint:
        'Hati-hati: rumus rata-rata $\\frac{v_{\\text{awal}} + v_{\\text{akhir}}}{2}$ TIDAK berlaku untuk gerak yang memiliki lebih dari satu fase percepatan!',
      fixReasoning:
        'Tentukan waktu perpindahan maksimum $t^*$ (saat $v = 0$), hitung luas total $\\Delta x_{\\text{maks}}$ hingga $t^*$, lalu bagi $\\Delta x_{\\text{maks}}$ dengan $t^*$.',
      recommendedModuleId: 'mod-1',
      correctPraise:
        'Cermat sekali! Anda membagi perpindahan maksimum dengan waktu terjadinya ($3,75\\text{ s}$) secara konsisten.',
    },
    narration: {
      soalDanDiketahui:
        'Soal Nomor 4. Kita diminta menghitung kecepatan rata-rata mobil mainan dari nol detik hingga saat mencapai perpindahan maksimumnya.',
      pembahasanDanPenurunan:
        'Ingat prinsip emas kinematika: rumus setengah dari v awal tambah v akhir hanya berlaku untuk satu segmen percepatan tetap, bukan kurva tiga segmen. Jadi kita cari dulu waktu titik balik, yaitu tiga koma tujuh lima detik. Perpindahan maksimumnya adalah tiga belas koma tiga tujuh lima meter. Membagi nilai ini dengan tiga koma tujuh lima detik menghasilkan tiga koma lima enam tujuh, yang dibulatkan menjadi tiga koma enam meter per detik.',
      animasiDanInsight:
        'Di laboratorium animasi, lihat perbandingan posisi mobil nyata terhadap garis bayangan gerak konstan pada kecepatan rata-rata tiga koma enam meter per detik.',
    },
  },

  {
    id: 5,
    tier: 'penerapan',
    tierLabel: 'Penerapan Prinsip & Persamaan',
    title: 'Masalah Invers Grafik v-t: Mencari Kecepatan Puncak',
    prompt:
      'Sebuah kereta uji bergerak lurus mulai $t = 0$ dengan kecepatan awal $2,0\\text{ m/s}$, dipercepat konstan hingga mencapai kelajuan puncak $v_p$ pada $t = 2,0\\text{ s}$, bergerak konstan dengan laju $v_p$ hingga $t = 3,5\\text{ s}$, lalu diperlambat konstan hingga berhenti pada $t = 5,5\\text{ s}$ dan mundur hingga $t = 6,5\\text{ s}$. Jika diketahui perpindahan maksimum kereta selama $0 \\le t \\le 6,5\\text{ s}$ adalah $24,0\\text{ m}$, tentukan nilai $v_p$ (dalam satuan m/s).',
    unit: 'm/s',
    expectedValue: 44 / 7,
    expectedFormatted: '6,3',
    stimulus: {
      mode: 'v-t',
      xLabel: 't (s)',
      yLabel: 'v (m/s)',
      tMin: 0,
      tMax: 6.5,
      tStepMajor: 1.0,
      tStepGrid: 0.5,
      yMin: -4,
      yMax: 8,
      yStepMajor: 2,
      yStepGrid: 1,
      symbolicYLabel: {
        yValue: 44 / 7,
        label: 'vₚ',
      },
      objects: [
        {
          id: 'train5',
          label: 'Kereta Uji',
          color: '#7A1228',
          initialX: 0,
          segments: [
            { tStart: 0, tEnd: 2.0, kind: 'linear-v', vStart: 2, vEnd: 44 / 7 },
            { tStart: 2.0, tEnd: 3.5, kind: 'linear-v', vStart: 44 / 7, vEnd: 44 / 7 },
            { tStart: 3.5, tEnd: 5.5, kind: 'linear-v', vStart: 44 / 7, vEnd: 0 },
            {
              tStart: 5.5,
              tEnd: 6.5,
              kind: 'linear-v',
              vStart: 0,
              vEnd: -(44 / 7) / 2,
            },
          ],
        },
      ],
      proofHighlight: {
        tStar: 5.5,
        xStar: 24.0,
        label: 'Perpindahan Maksimum = 24,0 m di t = 5,5 s',
        phaseNotes: [
          { tFrom: 0, tTo: 2.0, note: 'Fase akselerasi dari 2 m/s ke v_p = 6,29 m/s.' },
          { tFrom: 2.0, tTo: 3.5, note: 'Fase jelajah konstan pada v_p = 6,29 m/s.' },
          { tFrom: 3.5, tTo: 5.5, note: 'Fase perlambatan tepat berhenti di t = 5,5 s saat x = 24,0 m.' },
          { tFrom: 5.5, tTo: 6.5, note: 'Kereta mulai mundur sehingga x < 24,0 m.' },
        ],
      },
    },
    explanation: {
      memahami: {
        fenomena:
          'Berbeda dari soal langsung, kali ini perpindahan maksimum telah diketahui ($24,0\\text{ m}$) dan kita harus mencari parameter ketinggian kurva $v_p$.',
        diketahui: [
          '$v(0) = 2,0\\text{ m/s}$',
          'Naik linear ke $v_p$ pada $t = 2,0\\text{ s}$, konstan hingga $t = 3,5\\text{ s}$, lalu turun linear menjadi $0$ pada $t = 5,5\\text{ s}$',
          '$\\Delta x_{\\text{maks}} = 24,0\\text{ m}$',
        ],
        ditanyakan: 'Nilai kecepatan puncak $v_p$ (dalam $\\text{m/s}$).',
      },
      identifikasi: {
        prinsip: 'Hubungan luas aljabar di bawah kurva $v-t$ hingga titik balik $v = 0$.',
        alasan:
          'Karena $v(t) > 0$ untuk $0 \\le t < 5,5\\text{ s}$ dan $v(t) < 0$ setelah $t = 5,5\\text{ s}$, maka perpindahan maksimum terjadi tepat pada $t^* = 5,5\\text{ s}$. Luas daerah dari $0$ hingga $5,5\\text{ s}$ merupakan persamaan linear dalam $v_p$.',
      },
      visualisasi: {
        deskripsiDiagram:
          'Grafik menampilkan bentuk trapesium-persegi panjang-segitiga dengan tinggi puncak berlabel simbolik $v_p$ dan titik potong sumbu-$t$ yang jelas di $t = 5,5\\text{ s}$.',
        arahVektor:
          'Kecepatan tetap positif hingga $5,5\\text{ s}$, baru berbalik arah ke kiri pada segmen terakhir $5,5 < t \\le 6,5\\text{ s}$.',
        catatanFbd:
          'Gaya penggerak positif bekerja hingga $t = 2,0\\text{ s}$, seimbang sampai $3,5\\text{ s}$, lalu gaya pengereman konstan bekerja mulai $3,5\\text{ s}$.',
      },
      persamaanDasar: [
        {
          rumus: '$$\\Delta x_{\\text{maks}} = \\int_{0}^{5,5} v(t)\\,dt = A_1 + A_2 + A_3$$',
          simbol: '$v_p$: kecepatan puncak ($\\text{m/s}$)',
          makna: 'Menyatakan kendala geometri kurva dalam satu variabel tak diketahui $v_p$.',
        },
      ],
      penurunanMatematis: [
        'Luas segmen 1 ($0 \\to 2,0\\text{ s}$): $A_1 = \\frac{2,0 + v_p}{2} \\times 2,0 = 2,0 + v_p$.',
        'Luas segmen 2 ($2,0 \\to 3,5\\text{ s}$): $A_2 = v_p \\times (3,5 - 2,0) = 1,5 v_p$.',
        'Luas segmen 3 ($3,5 \\to 5,5\\text{ s}$): $A_3 = \\frac{1}{2} \\times (5,5 - 3,5) \\times v_p = 1,0 v_p$.',
        'Jumlahkan ketiganya dan samakan dengan $24,0$: $(2,0 + v_p) + 1,5 v_p + 1,0 v_p = 24,0$.',
      ],
      perhitungan: {
        langkah: [
          '$2,0 + 3,5 v_p = 24,0$',
          '$3,5 v_p = 22,0$',
          '$v_p = \\frac{22,0}{3,5} = \\frac{44}{7}$',
        ],
        substitusiHighlight: '$v_p = \\frac{44}{7} \\approx 6,2857\\text{ m/s} \\approx 6,3\\text{ m/s}$',
      },
      jawabanAkhir: {
        nilaiFormatted: '6,3',
        satuan: 'm/s',
        interpretasi:
          'Dengan puncak kecepatan $6,3\\text{ m/s}$, total luas kurva positif tepat $24,0\\text{ m}$ sebelum kereta mundur.',
      },
      insightOlimpiade: {
        berpikirCepat:
          'Jangan abaikan kecepatan awal $v(0) = 2,0\\text{ m/s}$! Jika dianggap mulai dari nol, bentuk segmen pertama akan keliru menjadi segitiga.',
        trikSahih:
          'Susun luas total dalam bentuk simbolik $A(v_p)$ terlebih dahulu sebelum memasukkan angka agar aljabar ringkas dan mudah dicek ulang.',
        kesalahanUmum:
          'Menggunakan seluruh selang sampai $6,5\\text{ s}$ (mengurangkan luas mundur $5,5 \\to 6,5$) padahal yang diketahui adalah perpindahan maksimum, bukan perpindahan akhir.',
        polaSerupa:
          'Bentuk soal invers dari Soal OSK #1 yang menguji pemahaman makna geometris luas $v-t$.',
      },
    },
    feedback: {
      wrongHint:
        'Perhatikan bahwa yang diketahui ($24,0\\text{ m}$) adalah perpindahan MAKSIMUM, yang terjadi tepat ketika $v = 0$ di $t = 5,5\\text{ s}$, bukan pada $t = 6,5\\text{ s}$.',
      fixReasoning:
        'Nyatakan luas trapesium ($0\\to 2$), persegi panjang ($2\\to 3,5$), dan segitiga ($3,5\\to 5,5$) sebagai fungsi dari $v_p$, lalu samakan dengan $24,0\\text{ m}$.',
      recommendedModuleId: 'mod-2',
      correctPraise:
        'Bagus sekali! Anda mampu membalik penalaran grafik $v-t$ untuk menemukan parameter puncak kecepatan.',
    },
    narration: {
      soalDanDiketahui:
        'Soal Nomor 5 adalah persoalan invers. Diketahui perpindahan maksimum kereta mencapai dua puluh empat meter, dan kita mencari kecepatan puncaknya.',
      pembahasanDanPenurunan:
        'Karena kecepatan turun memotong sumbu nol pada lima koma lima detik, maka perpindahan maksimum terjadi di lima koma lima detik. Luas trapesium awal adalah dua tambah v p, luas fase konstan satu koma lima v p, dan luas segitiga turun satu koma nol v p. Jumlahnya dua tambah tiga koma lima v p sama dengan dua puluh empat. Diperoleh v p sama dengan empat puluh empat per tujuh, yaitu enam koma tiga meter per detik.',
      animasiDanInsight:
        'Simulasi menunjukkan bahwa dengan puncak enam koma dua sembilan meter per detik, posisi kereta tepat menyentuh dua puluh empat meter pada lima koma lima detik.',
    },
  },

  {
    id: 6,
    tier: 'penerapan',
    tierLabel: 'Penerapan Prinsip & Persamaan',
    title: 'Waktu Kembali ke Titik Asal Setelah Mencapai Perpindahan Maksimum',
    prompt:
      'Sebuah drone darat bergerak sepanjang jalur lurus mulai dari $x(0) = 0$. Selama $0 \\le t \\le 4,0\\text{ s}$, grafik $v(t)$ melalui $(0; 6) \\to (2,0; 6) \\to (4,0; 0)$. Untuk $t > 4,0\\text{ s}$, drone terus bergerak dengan percepatan konstan yang sama seperti pada selang $2,0 \\le t \\le 4,0\\text{ s}$ hingga kembali melewati titik asal $x = 0$. Pada detik ke berapa drone kembali tepat di $x = 0$ (dalam satuan s)?',
    unit: 's',
    expectedValue: 4 + Math.sqrt(12),
    expectedFormatted: '7,5',
    stimulus: {
      mode: 'v-t',
      xLabel: 't (s)',
      yLabel: 'v (m/s)',
      tMin: 0,
      tMax: 8.0,
      tStepMajor: 1.0,
      tStepGrid: 0.5,
      yMin: -12,
      yMax: 8,
      yStepMajor: 2,
      yStepGrid: 2,
      objects: [
        {
          id: 'drone6',
          label: 'Drone Darat',
          color: '#7A1228',
          initialX: 0,
          segments: [
            { tStart: 0, tEnd: 2.0, kind: 'linear-v', vStart: 6, vEnd: 6 },
            { tStart: 2.0, tEnd: 4.0, kind: 'linear-v', vStart: 6, vEnd: 0 },
            { tStart: 4.0, tEnd: 8.0, kind: 'linear-v', vStart: 0, vEnd: -12 },
          ],
        },
      ],
      proofHighlight: {
        tStar: 4.0,
        xStar: 18.0,
        label: 'Kembali di x = 0 pada t = 7,46 s',
        phaseNotes: [
          { tFrom: 0, tTo: 2.0, note: 'Melaju konstan 6 m/s sejauh +12,0 m.' },
          { tFrom: 2.0, tTo: 4.0, note: 'Mengerem (-3 m/s²) hingga mencapai titik balik terjauh x = +18,0 m di t = 4,0 s.' },
          { tFrom: 4.0, tTo: 7.464, note: 'Dipercepat mundur (-3 m/s²) hingga menempuh -18,0 m kembali ke titik asal x = 0.' },
        ],
      },
    },
    explanation: {
      memahami: {
        fenomena:
          'Drone melaju maju mencapai jarak terjauhnya di $t = 4,0\\text{ s}$, kemudian dipercepat mundur dengan percepatan tetap hingga kembali melewati garis start $x = 0$.',
        diketahui: [
          '$x(0) = 0$',
          'Segmen $0 \\le t \\le 2,0$: $v = 6\\text{ m/s}$',
          'Segmen $2,0 \\le t \\le 4,0$: $v$ turun linear dari $6$ ke $0$',
          'Untuk $t > 4,0$: percepatan tetap sama dengan selang $2,0 \\to 4,0$',
        ],
        ditanyakan: 'Waktu $t_{\\text{kembali}} > 0$ ketika posisi drone $x(t_{\\text{kembali}}) = 0$ (dalam $\\text{s}$).',
      },
      identifikasi: {
        prinsip: 'Kesetimbangan luas bertanda ($A_+ = |A_-|$) dan kinematika GLBB dari titik balik.',
        alasan:
          'Agar kembali ke $x = 0$, perpindahan mundur setelah $t = 4,0\\text{ s}$ harus tepat sama besarnya dengan perpindahan maksimum yang dicapai hingga $t = 4,0\\text{ s}$.',
      },
      visualisasi: {
        deskripsiDiagram:
          'Garis lurus turun dari $(2,0; 6)$ melewati $(4,0; 0)$ dan berlanjut dengan kemiringan sama ke kuadran IV ($v < 0$).',
        arahVektor:
          'Untuk $t > 2,0\\text{ s}$, $\\vec{a} = -3,0\\text{ m/s}^2$ ke kiri. Setelah $t = 4,0\\text{ s}$, $\\vec{v}$ juga mengarah ke kiri sehingga laju mundur terus membesar.',
        catatanFbd:
          'Gaya penggerak konstan ke arah kiri bekerja tanpa perubahan sejak $t = 2,0\\text{ s}$.',
      },
      persamaanDasar: [
        {
          rumus: '$$x(t) = x_{\\text{maks}} + \\frac{1}{2} a (t - 4,0)^2 = 0$$',
          simbol: '$a$: percepatan untuk $t \\ge 2,0\\text{ s}$, $\\Delta t = t - 4,0$: lama gerak mundur',
          makna: 'Dari titik berhenti $v = 0$, jarak mundur berbanding kuadrat dengan selang waktu.',
        },
      ],
      penurunanMatematis: [
        'Hitung perpindahan maksimum pada $t = 4,0\\text{ s}$: $\\Delta x_{\\text{maks}} = 6(2,0) + \\frac{1}{2}(2,0)(6) = 12,0 + 6,0 = 18,0\\text{ m}$.',
        'Hitung percepatan pada $t \\ge 2,0\\text{ s}$: $a = \\frac{0 - 6}{4,0 - 2,0} = -3,0\\text{ m/s}^2$.',
        'Misalkan $\\Delta t = t - 4,0$ adalah waktu yang dibutuhkan untuk mundur sejauh $18,0\\text{ m}$ dari keadaan diam.',
        'Substitusikan ke $x = 18,0 + \\frac{1}{2}(-3,0)(\\Delta t)^2 = 0 \\implies 1,5 (\\Delta t)^2 = 18,0$.',
      ],
      perhitungan: {
        langkah: [
          '$(\\Delta t)^2 = \\frac{18,0}{1,5} = 12$',
          '$\\Delta t = \\sqrt{12} = 2\\sqrt{3} \\approx 3,4641\\text{ s}$',
          '$t_{\\text{kembali}} = 4,0 + 3,4641 = 7,4641\\text{ s}$',
        ],
        substitusiHighlight: '$t_{\\text{kembali}} = 4 + 2\\sqrt{3} \\approx 7,464\\text{ s} \\approx 7,5\\text{ s}$',
      },
      jawabanAkhir: {
        nilaiFormatted: '7,5',
        satuan: 's',
        interpretasi:
          'Drone butuh $4,0\\text{ s}$ untuk mencapai jarak $18,0\\text{ m}$ dan $3,46\\text{ s}$ tambahan untuk kembali ke garis start.',
      },
      insightOlimpiade: {
        berpikirCepat:
          'Gunakan kesamaan luas segitiga bawah dan luas total atas: segitiga di bawah sumbu-$t$ dengan kemiringan $-3$ memiliki luas $\\frac{1}{2} |a| (\\Delta t)^2$, sehingga langsung diperoleh $(\\Delta t)^2 = 2 A_+ / |a|$.',
        trikSahih:
          'Jangan lupa menjumlahkan $4,0\\text{ s}$! Nilai $3,46\\text{ s}$ barulah durasi mundurnya, bukan waktu pada jam stopwatch sejak $t = 0$.',
        kesalahanUmum:
          'Menjawab $3,5\\text{ s}$ (lupa menambah $t = 4,0\\text{ s}$) atau mengira waktu pulang sama dengan waktu pergi ($4,0 + 4,0 = 8,0\\text{ s}$).',
        polaSerupa:
          'Memperpanjang analisis titik balik Soal OSK #1 untuk melacak kapan perpindahan bersih kembali menjadi nol.',
      },
    },
    feedback: {
      wrongHint:
        'Ingat: drone menempuh $18,0\\text{ m}$ saat maju (bukan hanya $6,0\\text{ m}$), dan waktu tempuh kembali diukur dari $t = 0$, bukan dari $t = 4,0\\text{ s}$.',
      fixReasoning:
        'Hitung luas total maju ($12 + 6 = 18\\text{ m}$), cari percepatan $a = -3\\text{ m/s}^2$, selesaikan $1,5(\\Delta t)^2 = 18$, lalu tambahkan $\\Delta t$ ke $t = 4,0\\text{ s}$.',
      recommendedModuleId: 'mod-3',
      correctPraise:
        'Mantap! Anda menghitung luas maju total dengan tepat dan ingat menambahkan $4,0\\text{ s}$ untuk waktu total.',
    },
    narration: {
      soalDanDiketahui:
        'Soal Nomor 6. Sebuah drone bergerak dengan kecepatan konstan enam meter per detik selama dua detik, lalu melambat hingga nol pada detik keempat, dan terus mundur dengan percepatan yang sama. Kapan drone kembali ke posisi awal x sama dengan nol?',
      pembahasanDanPenurunan:
        'Hingga detik keempat, perpindahan maksimum drone adalah dua belas ditambah enam, yaitu delapan belas meter. Percepatan pada garis miringnya adalah minus tiga meter per detik kuadrat. Untuk mundur delapan belas meter dari keadaan diam, setengah dikali tiga dikali delta t kuadrat sama dengan delapan belas, menghasilkan delta t sama dengan akar dua belas atau tiga koma empat enam empat detik. Jadi waktu total dari awal adalah empat tambah tiga koma empat enam empat, yaitu tujuh koma lima detik.',
      animasiDanInsight:
        'Amati simulasi: meskipun saat kembali laju drone makin cepat, bentuk segitiga luas di bawah sumbu waktu baru menyamai luas atas tepat di tujuh koma empat enam detik.',
    },
  },

  // =========================================================================
  // TIER 3: SOAL 7–9 — ANALISIS BEBERAPA KONDISI FISIS
  // =========================================================================
  {
    id: 7,
    tier: 'analisis',
    tierLabel: 'Analisis Beberapa Kondisi Fisis',
    title: 'Perpindahan Maksimum pada Kurva v-t Multi-Pembalikan',
    prompt:
      'Sebuah robot pengantar bergerak maju-mundur pada rel lurus dengan kurva $v(t)$ selama $0 \\le t \\le 7,0\\text{ s}$ yang melalui titik-titik sudut $(0; 0) \\to (1,0; 6) \\to (3,0; -4) \\to (5,0; 5) \\to (7,0; -3)$. Tentukan perpindahan maksimum (posisi paling positif) yang dicapai robot tersebut selama selang $0 \\le t \\le 7,0\\text{ s}$ (dalam satuan m).',
    unit: 'm',
    expectedValue: 9.125,
    expectedFormatted: '9,1',
    stimulus: {
      mode: 'v-t',
      xLabel: 't (s)',
      yLabel: 'v (m/s)',
      tMin: 0,
      tMax: 7.0,
      tStepMajor: 1.0,
      tStepGrid: 0.5,
      yMin: -5,
      yMax: 7,
      yStepMajor: 2,
      yStepGrid: 1,
      objects: [
        {
          id: 'robot7',
          label: 'Robot Pengantar',
          color: '#7A1228',
          initialX: 0,
          segments: [
            { tStart: 0, tEnd: 1.0, kind: 'linear-v', vStart: 0, vEnd: 6 },
            { tStart: 1.0, tEnd: 3.0, kind: 'linear-v', vStart: 6, vEnd: -4 },
            { tStart: 3.0, tEnd: 5.0, kind: 'linear-v', vStart: -4, vEnd: 5 },
            { tStart: 5.0, tEnd: 7.0, kind: 'linear-v', vStart: 5, vEnd: -3 },
          ],
        },
      ],
      proofHighlight: {
        tStar: 6.25,
        xStar: 9.125,
        label: 'Puncak Maksimum Kedua di t = 6,25 s',
        phaseNotes: [
          { tFrom: 0, tTo: 2.2, note: 'Puncak lokal pertama tercapai di t₁ = 2,2 s dengan x = +6,6 m.' },
          { tFrom: 2.2, tTo: 3.889, note: 'Robot mundur sementara hingga lembah lokal x = +3,22 m di t₂ = 35/9 s.' },
          { tFrom: 3.889, tTo: 6.25, note: 'Robot kembali maju lebih jauh dan mencapai maksimum global x = +9,125 m di t₃ = 6,25 s.' },
          { tFrom: 6.25, tTo: 7.0, note: 'Robot mundur lagi di detik terakhir.' },
        ],
      },
    },
    explanation: {
      memahami: {
        fenomena:
          'Robot melakukan gerak maju-mundur berulang sehingga grafik $v(t)$ memotong sumbu-$t$ sebanyak tiga kali, menghasilkan dua puncak posisi lokal.',
        diketahui: [
          '$(0; 0) \\to (1,0; 6) \\to (3,0; -4) \\to (5,0; 5) \\to (7,0; -3)$',
          '$x(0) = 0\\text{ m}$',
        ],
        ditanyakan: 'Perpindahan maksimum global $\\Delta x_{\\text{maks}}$ selama $0 \\le t \\le 7,0\\text{ s}$ (dalam $\\text{m}$).',
      },
      identifikasi: {
        prinsip: 'Uji semua titik kritis ($v = 0$ dari positif ke negatif) untuk membandingkan puncak lokal.',
        alasan:
          'Ketika kurva $v(t)$ berubah tanda lebih dari sekali, maksimum lokal terjadi setiap kali $v$ menyeberang dari $+$ ke $-$. Kita wajib mengevaluasi posisi pada semua kandidat maksimum lokal ($t_1$ dan $t_3$) lalu memilih yang terbesar.',
      },
      visualisasi: {
        deskripsiDiagram:
          'Terdapat dua bukit positif ($0 \\to t_1$ dan $t_2 \\to t_3$) yang dipisahkan oleh satu lembah negatif ($t_1 \\to t_2$).',
        arahVektor:
          'Kecepatan berubah arah pada $t_1 = 2,2\\text{ s}$, $t_2 = 3\\frac{8}{9}\\text{ s}$, dan $t_3 = 6,25\\text{ s}$.',
        catatanFbd:
          'Tanda percepatan berganti di tiap sudut grafik: $+6$, $-5$, $+4,5$, dan $-4\\text{ m/s}^2$.',
      },
      persamaanDasar: [
        {
          rumus: '$$\\Delta x_{\\text{maks}} = \\max\\{\\Delta x(t_1),\\; \\Delta x(t_3)\\}$$',
          simbol: '$t_1, t_3$: saat $v(t)$ memotong nol dari atas ke bawah',
          makna: 'Maksimum global hanya bisa berada di titik kritis puncak lokal.',
        },
      ],
      penurunanMatematis: [
        'Titik potong 1 (pada $1,0 \\to 3,0$): $a = \\frac{-4 - 6}{2,0} = -5\\text{ m/s}^2 \\implies t_1 = 1,0 + \\frac{6}{5} = 2,2\\text{ s}$.',
        'Titik potong 2 (pada $3,0 \\to 5,0$): $a = \\frac{5 - (-4)}{2,0} = +4,5\\text{ m/s}^2 \\implies t_2 = 3,0 + \\frac{4}{4,5} = 3 + \\frac{8}{9} = \\frac{35}{9}\\text{ s}$.',
        'Titik potong 3 (pada $5,0 \\to 7,0$): $a = \\frac{-3 - 5}{2,0} = -4\\text{ m/s}^2 \\implies t_3 = 5,0 + \\frac{5}{4} = 6,25\\text{ s}$.',
        'Hitung perpindahan di setiap interval segitiga: bukit 1 ($0 \\to 2,2$), lembah ($2,2 \\to \\frac{35}{9}$), dan bukit 2 ($\\frac{35}{9} \\to 6,25$).',
      ],
      perhitungan: {
        langkah: [
          'Bukit 1 ($0 \\to 2,2$): $A_1 = \\frac{1}{2} \\times 2,2 \\times 6 = +6,6\\text{ m} \\implies \\Delta x(t_1) = 6,6\\text{ m}$',
          'Lembah ($2,2 \\to \\frac{35}{9}$): lebar $= \\frac{35}{9} - \\frac{11}{5} = \\frac{175 - 99}{45} = \\frac{76}{45}\\text{ s}$, luas $= -\\frac{1}{2} \\times \\frac{76}{45} \\times 4 = -\\frac{152}{45} \\approx -3,3778\\text{ m}$',
          'Bukit 2 ($\\frac{35}{9} \\to 6,25$): lebar $= \\frac{25}{4} - \\frac{35}{9} = \\frac{225 - 140}{36} = \\frac{85}{36}\\text{ s}$, luas $= +\\frac{1}{2} \\times \\frac{85}{36} \\times 5 = +\\frac{425}{72} \\approx +5,9028\\text{ m}$',
          'Posisi puncak kedua: $\\Delta x(t_3) = 6,6 - \\frac{152}{45} + \\frac{425}{72} = \\frac{33}{5} - \\frac{152}{45} + \\frac{425}{72} = \\frac{2376 - 1216 + 2125}{360} = \\frac{3285}{360} = \\frac{73}{8} = 9,125\\text{ m}$',
        ],
        substitusiHighlight: '$\\Delta x_{\\text{maks}} = \\max\\{6,6;\\; 9,125\\} = 9,125\\text{ m} \\approx 9,1\\text{ m}$',
      },
      jawabanAkhir: {
        nilaiFormatted: '9,1',
        satuan: 'm',
        interpretasi:
          'Karena bukit positif kedua ($+5,90\\text{ m}$) lebih besar dari lembah negatif di antaranya ($-3,38\\text{ m}$), robot melampaui puncak pertamanya dan mencapai $9,1\\text{ m}$ pada $t = 6,25\\text{ s}$.',
      },
      insightOlimpiade: {
        berpikirCepat:
          'Bandingkan luas bukit baru terhadap lembah sebelumnya! Anda bahkan tidak perlu menghitung puncak pertama jika tahu selisih (bukit 2 $-$ lembah) bernilai positif atau negatif.',
        trikSahih:
          'Untuk segitiga yang dibentuk oleh titik puncak $(t_{\\text{puncak}}, v)$ di antara dua akar, cukup hitung $\\frac{1}{2} \\times \\text{alas} \\times \\text{tinggi}$ tanpa memecahnya per segmen grid.',
        kesalahanUmum:
          'Berhenti menghitung di titik potong pertama ($t_1 = 2,2\\text{ s} \\to 6,6\\text{ m}$) karena mengira perpindahan maksimum selalu terjadi pada $v = 0$ yang pertama.',
        polaSerupa:
          'Perluasan tingkat lanjut Soal OSK #1 ketika kurva kecepatan berosilasi beberapa kali.',
      },
    },
    feedback: {
      wrongHint:
        'Jangan langsung berhenti di titik $v = 0$ pertama ($t = 2,2\\text{ s}$)! Setelah mundur sebentar, robot melaju maju lagi dengan luas positif yang lebih besar.',
      fixReasoning:
        'Cari ketiga titik potong sumbu-$t$ ($t_1, t_2, t_3$), lalu hitung posisi pada kedua puncak lokal ($t_1$ dan $t_3$) untuk membandingkan mana yang lebih jauh.',
      recommendedModuleId: 'mod-2',
      correctPraise:
        'Brilian! Anda memeriksa seluruh titik kritis dan menemukan puncak global di $t = 6,25\\text{ s}$.',
    },
    narration: {
      soalDanDiketahui:
        'Soal Nomor 7 menguji ketelitian saat kurva kecepatan memotong sumbu waktu berkali-kali. Robot bergerak maju lalu mundur lalu maju lagi hingga detik ketujuh. Kita mencari perpindahan maksimum globalnya.',
      pembahasanDanPenurunan:
        'Jangan berhenti di titik balik pertama pada dua koma dua detik yang memberi posisi enam koma enam meter. Setelah mundur tiga koma tiga delapan meter, robot maju lagi sejauh lima koma sembilan nol meter hingga titik balik ketiga di enam koma dua lima detik. Karena kemajuan kedua lebih besar dari kemundurannya, posisi puncak global adalah sembilan koma satu dua lima meter, dibulatkan menjadi sembilan koma satu meter.',
      animasiDanInsight:
        'Lihat animasi grafik posisi: kurva posisi x terhadap t membentuk dua bukit, dan bukit kedua menjulang lebih tinggi dari bukit pertama.',
    },
  },

  {
    id: 8,
    tier: 'analisis',
    tierLabel: 'Analisis Beberapa Kondisi Fisis',
    title: 'Jarak Terjauh dari Titik Asal Koordinat dengan Posisi Awal Tak Nol',
    prompt:
      'Sebuah mobil mainan bergerak pada sumbu-$x$ dimulai dari posisi awal $x(0) = -1,0\\text{ m}$. Kurva $v(t)$ untuk $0 \\le t \\le 6,0\\text{ s}$ melalui titik $(0; -2) \\to (1,0; -2) \\to (3,0; 3) \\to (5,0; 3) \\to (6,0; -2)$. Tentukan jarak terjauh mobil tersebut dari titik asal koordinat $O$ ($|x|_{\\text{maks}}$) selama selang waktu tersebut (dalam satuan m).',
    unit: 'm',
    expectedValue: 4.9,
    expectedFormatted: '4,9',
    stimulus: {
      mode: 'v-t',
      xLabel: 't (s)',
      yLabel: 'v (m/s)',
      tMin: 0,
      tMax: 6.0,
      tStepMajor: 1.0,
      tStepGrid: 0.5,
      yMin: -3,
      yMax: 4,
      yStepMajor: 1,
      yStepGrid: 1,
      objects: [
        {
          id: 'car8',
          label: 'Mobil Mainan',
          color: '#7A1228',
          initialX: -1.0,
          segments: [
            { tStart: 0, tEnd: 1.0, kind: 'linear-v', vStart: -2, vEnd: -2 },
            { tStart: 1.0, tEnd: 3.0, kind: 'linear-v', vStart: -2, vEnd: 3 },
            { tStart: 3.0, tEnd: 5.0, kind: 'linear-v', vStart: 3, vEnd: 3 },
            { tStart: 5.0, tEnd: 6.0, kind: 'linear-v', vStart: 3, vEnd: -2 },
          ],
        },
      ],
      proofHighlight: {
        tStar: 5.6,
        xStar: 4.9,
        label: 'Simpangan Terjauh |x| = 4,9 m di t = 5,6 s',
        phaseNotes: [
          { tFrom: 0, tTo: 1.8, note: 'Berawal dari x = -1,0 m, mobil mundur mencapai ekstrem kiri x = -3,8 m di t = 1,8 s.' },
          { tFrom: 1.8, tTo: 5.0, note: 'Mobil berbalik ke kanan melintasi titik asal O hingga x = +4,0 m.' },
          { tFrom: 5.0, tTo: 5.6, note: 'Melambat sampai berhenti di ekstrem kanan x = +4,9 m (|x| = 4,9 m > 3,8 m).' },
          { tFrom: 5.6, tTo: 6.0, note: 'Berbalik ke kiri kembali mendekati titik asal.' },
        ],
      },
    },
    explanation: {
      memahami: {
        fenomena:
          'Mobil tidak mulai dari $x = 0$, melainkan dari $x(0) = -1,0\\text{ m}$, lalu bergerak ke kiri lebih jauh sebelum akhirnya melaju jauh ke sisi kanan titik asal $O$.',
        diketahui: [
          '$x(0) = -1,0\\text{ m}$',
          'Kurva $v-t$: $(0; -2) \\to (1,0; -2) \\to (3,0; 3) \\to (5,0; 3) \\to (6,0; -2)$',
        ],
        ditanyakan: 'Nilai maksimum $|x(t)|$ untuk $0 \\le t \\le 6,0\\text{ s}$ (dalam $\\text{m}$).',
      },
      identifikasi: {
        prinsip: 'Posisi mutlak $x(t) = x(0) + \\Delta x(t)$ dan perbandingan semua titik ekstrem $|x|$.',
        alasan:
          'Jarak terjauh dari titik asal $O$ bisa terjadi di sisi negatif ($x_{\\text{min}} < 0$) maupun di sisi positif ($x_{\\text{maks}} > 0$). Kita harus mengevaluasi nilai mutlak kedua ekstrem!',
      },
      visualisasi: {
        deskripsiDiagram:
          'Kurva memiliki satu daerah negatif awal ($0 \\to t_1$), satu daerah positif besar ($t_1 \\to t_2$), dan ekor negatif kecil di akhir ($t_2 \\to 6,0$).',
        arahVektor:
          'Pembalikan arah terjadi dua kali: di $t_1$ (ekstrem kiri) dan di $t_2$ (ekstrem kanan).',
        catatanFbd:
          'Percepatan positif $+2,5\\text{ m/s}^2$ bekerja pada $1,0 \\le t \\le 3,0\\text{ s}$ dan percepatan negatif $-5,0\\text{ m/s}^2$ bekerja pada $5,0 \\le t \\le 6,0\\text{ s}$.',
      },
      persamaanDasar: [
        {
          rumus: '$$x(t) = x(0) + \\int_{0}^{t} v(\\tau)\\,d\\tau$$',
          simbol: '$|x(t)|$: jarak mobil dari titik asal koordinat $O$',
          makna: 'Posisi awal $x(0)$ menggeser seluruh kurva posisi $x(t)$ secara vertikal.',
        },
      ],
      penurunanMatematis: [
        'Titik balik 1 (pada $1,0 \\to 3,0$): $a_1 = \\frac{3 - (-2)}{2,0} = 2,5\\text{ m/s}^2 \\implies t_1 = 1,0 + \\frac{2}{2,5} = 1,8\\text{ s}$.',
        'Titik balik 2 (pada $5,0 \\to 6,0$): $a_2 = \\frac{-2 - 3}{1,0} = -5,0\\text{ m/s}^2 \\implies t_2 = 5,0 + \\frac{3}{5,0} = 5,6\\text{ s}$.',
        'Hitung $x(1,8)$ sebagai kandidat ekstrem kiri, dan $x(5,6)$ sebagai kandidat ekstrem kanan.',
      ],
      perhitungan: {
        langkah: [
          'Ekstrem kiri $x(1,8) = -1,0 - (1,0 \\times 2) - \\frac{1}{2}(0,8 \\times 2) = -1,0 - 2,0 - 0,8 = -3,8\\text{ m}$',
          'Dari $1,8 \\to 3,0$: $+\\frac{1}{2}(1,2 \\times 3) = +1,8\\text{ m} \\implies x(3,0) = -2,0\\text{ m}$',
          'Dari $3,0 \\to 5,0$: $+(2,0 \\times 3) = +6,0\\text{ m} \\implies x(5,0) = +4,0\\text{ m}$',
          'Ekstrem kanan $x(5,6) = +4,0 + \\frac{1}{2}(0,6 \\times 3) = +4,0 + 0,9 = +4,9\\text{ m}$',
        ],
        substitusiHighlight: '$|x|_{\\text{maks}} = \\max\\{|-3,8|,\\; |+4,9|,\\; |x(6,0)|\\} = 4,9\\text{ m}$',
      },
      jawabanAkhir: {
        nilaiFormatted: '4,9',
        satuan: 'm',
        interpretasi:
          'Mobil terjauh berada di posisi $+4,9\\text{ m}$ pada $t = 5,6\\text{ s}$, lebih jauh dibanding simpangan kirinya ($3,8\\text{ m}$).',
      },
      insightOlimpiade: {
        berpikirCepat:
          'Bedakan "perpindahan maksimum dari titik awal" ($\\Delta x = x - x_0$) dengan "jarak terjauh dari titik asal $O$" ($|x|$)! Selalu tambahkan $x(0)$.',
        trikSahih:
          'Periksa juga ujung akhir $x(6,0) = 4,9 - \\frac{1}{2}(0,4)(2) = +4,5\\text{ m}$ untuk memastikan tidak ada titik batas yang melampaui ekstrem dalam.',
        kesalahanUmum:
          'Melupakan $x(0) = -1,0\\text{ m}$ sehingga keliru memperoleh $x_{\\text{maks}} = +5,9\\text{ m}$.',
        polaSerupa:
          'Menguji kejelian membedakan perpindahan $\\Delta x$ dan koordinat posisi $x(t)$ pada gerak lurus.',
      },
    },
    feedback: {
      wrongHint:
        'Perhatikan bahwa posisi awal mobil adalah $x(0) = -1,0\\text{ m}$ (bukan nol!), dan soal meminta jarak terjauh dari titik asal $O$, yaitu $|x(t)|_{\\text{maks}}$.',
      fixReasoning:
        'Hitung koordinat posisi di titik balik pertama ($t_1 = 1,8\\text{ s}$) dan titik balik kedua ($t_2 = 5,6\\text{ s}$) dengan menambahkan $x(0) = -1,0\\text{ m}$, lalu ambil nilai mutlak terbesar.',
      recommendedModuleId: 'mod-1',
      correctPraise:
        'Teliti sekali! Anda memperhitungkan posisi awal $-1,0\\text{ m}$ dan membandingkan ekstrem kiri dan kanan.',
    },
    narration: {
      soalDanDiketahui:
        'Soal Nomor 8. Mobil mainan mulai bukan dari nol, melainkan dari koordinat minus satu koma nol meter. Kita diminta mencari jarak terjauh mobil dari titik asal koordinat O.',
      pembahasanDanPenurunan:
        'Ada dua titik balik penting: di detik satu koma delapan mobil berada di ekstrem kiri minus tiga koma delapan meter. Kemudian mobil melaju ke kanan hingga detik lima koma enam mencapai ekstrem kanan plus empat koma sembilan meter. Membandingkan nilai mutlak keduanya, jarak terjauh dari titik asal O adalah empat koma sembilan meter.',
      animasiDanInsight:
        'Dalam animasi, perhatikan posisi titik asal O sebagai patokan: mobil berawal di kiri O, bergerak lebih ke kiri, lalu menyeberangi O ke kanan hingga empat koma sembilan meter.',
    },
  },

  {
    id: 9,
    tier: 'analisis',
    tierLabel: 'Analisis Beberapa Kondisi Fisis',
    title: 'Kurva v-t Tiga Fase dengan Parameter Waktu Tersirat',
    prompt:
      'Sebuah mobil mainan mula-mula diam ($v(0) = 0$) bergerak sepanjang garis lurus dalam tiga fase: (1) dipercepat konstan dengan $a_1 = +3,0\\text{ m/s}^2$ selama selang waktu $t_1$; (2) melaju konstan pada kecepatan puncaknya selama $1,5\\text{ s}$; (3) diperlambat konstan dengan $a_3 = -2,0\\text{ m/s}^2$ hingga berakhir di $t = 9,0\\text{ s}$ dengan kecepatan $v(9,0) = -3,0\\text{ m/s}$. Perpindahan maksimum mobil dari $t = 0$ hingga $t = 9,0\\text{ s}$ adalah ... m.',
    unit: 'm',
    expectedValue: 32.4,
    expectedFormatted: '32,4',
    stimulus: {
      mode: 'v-t',
      xLabel: 't (s)',
      yLabel: 'v (m/s)',
      tMin: 0,
      tMax: 9.0,
      tStepMajor: 1.0,
      tStepGrid: 1.0,
      yMin: -4,
      yMax: 9,
      yStepMajor: 2,
      yStepGrid: 1,
      symbolicYLabel: {
        yValue: 7.2,
        label: 'v_maks',
      },
      symbolicXLabels: [
        { tValue: 2.4, label: 't₁' },
        { tValue: 3.9, label: 't₁+1,5' },
      ],
      stimulusAnnotations: [
        { t: 1.1, y: 4.5, text: 'a₁ = +3,0 m/s²', anchor: 'end', dx: -6 },
        { t: 6.2, y: 3.8, text: 'a₃ = -2,0 m/s²', anchor: 'start', dx: 8 },
      ],
      objects: [
        {
          id: 'car9',
          label: 'Mobil Mainan',
          color: '#7A1228',
          initialX: 0,
          segments: [
            { tStart: 0, tEnd: 2.4, kind: 'linear-v', vStart: 0, vEnd: 7.2 },
            { tStart: 2.4, tEnd: 3.9, kind: 'linear-v', vStart: 7.2, vEnd: 7.2 },
            { tStart: 3.9, tEnd: 9.0, kind: 'linear-v', vStart: 7.2, vEnd: -3.0 },
          ],
        },
      ],
      proofHighlight: {
        tStar: 7.5,
        xStar: 32.4,
        label: 't₁ = 2,4 s → Δx_maks = 32,4 m di t* = 7,5 s',
        phaseNotes: [
          { tFrom: 0, tTo: 2.4, note: 'Dari persamaan kecepatan akhir, diperoleh t₁ = 2,4 s dan v_maks = 7,2 m/s.' },
          { tFrom: 2.4, tTo: 3.9, note: 'Fase jelajah 1,5 s pada 7,2 m/s menambah 10,8 m.' },
          { tFrom: 3.9, tTo: 7.5, note: 'Perlambatan -2,0 m/s² menghentikan mobil tepat di t* = 7,5 s pada 32,4 m.' },
          { tFrom: 7.5, tTo: 9.0, note: 'Mobil mundur hingga kecepatan -3,0 m/s pada t = 9,0 s.' },
        ],
      },
    },
    explanation: {
      memahami: {
        fenomena:
          'Mobil bergerak dalam tiga fase percepatan konstan, namun durasi fase pertama ($t_1$) dan kecepatan puncaknya belum diberikan secara eksplisit.',
        diketahui: [
          '$v(0) = 0$, $a_1 = +3,0\\text{ m/s}^2$ selama $t_1$',
          '$a_2 = 0$ selama $\\Delta t_2 = 1,5\\text{ s}$',
          '$a_3 = -2,0\\text{ m/s}^2$ hingga $T = 9,0\\text{ s}$ dengan $v(9,0) = -3,0\\text{ m/s}$',
        ],
        ditanyakan: 'Perpindahan maksimum $\\Delta x_{\\text{maks}}$ selama $0 \\le t \\le 9,0\\text{ s}$ (dalam $\\text{m}$).',
      },
      identifikasi: {
        prinsip: 'Hubungan kecepatan melalui gradien tiap segmen ($\\Delta v = a \\Delta t$) dan luas trapesium $v-t$.',
        alasan:
          'Kecepatan di akhir fase 3 bergantung secara linear pada $t_1$, sehingga kendala $v(9,0) = -3,0\\text{ m/s}$ menentukan $t_1$ dan $v_{\\text{maks}}$ secara unik.',
      },
      visualisasi: {
        deskripsiDiagram:
          'Grafik berbentuk trapesium dari $t = 0$ sampai titik balik $t^*$ di atas sumbu-$t$, diikuti segitiga kecil negatif sampai $t = 9,0\\text{ s}$.',
        arahVektor:
          'Percepatan berubah dari $+3,0$ menjadi $0$, lalu menjadi $-2,0\\text{ m/s}^2$.',
        catatanFbd:
          'Gaya penggerak konstan positif di fase 1, nol di fase 2, dan gaya pengereman/mundur konstan di fase 3.',
      },
      persamaanDasar: [
        {
          rumus: '$$v(T) = a_1 t_1 + a_3 (T - t_1 - \\Delta t_2)$$',
          simbol: '$t_1$: durasi fase 1, $T = 9,0\\text{ s}$, $\\Delta t_2 = 1,5\\text{ s}$',
          makna: 'Perubahan total kecepatan dari $t = 0$ ke $t = T$ merupakan jumlah kontribusi gradien tiap fase.',
        },
      ],
      penurunanMatematis: [
        'Kecepatan puncak: $v_{\\text{maks}} = a_1 t_1 = 3,0 t_1$.',
        'Durasi fase 3: $\\Delta t_3 = 9,0 - 1,5 - t_1 = 7,5 - t_1$.',
        'Gunakan $v(9,0) = v_{\\text{maks}} + a_3 \\Delta t_3 = -3,0$: $3,0 t_1 - 2,0(7,5 - t_1) = -3,0$.',
        'Sederhanakan: $3 t_1 - 15 + 2 t_1 = -3 \\implies 5 t_1 = 12 \\implies t_1 = 2,4\\text{ s}$, sehingga $v_{\\text{maks}} = 7,2\\text{ m/s}$.',
        'Waktu titik balik $v(t^*) = 0$: terjadi $\\frac{7,2}{2,0} = 3,6\\text{ s}$ setelah fase 3 dimulai ($t = 2,4 + 1,5 = 3,9\\text{ s}$), yakni pada $t^* = 7,5\\text{ s}$.',
      ],
      perhitungan: {
        langkah: [
          'Luas fase 1 ($0 \\to 2,4$): $A_1 = \\frac{1}{2} \\times 2,4 \\times 7,2 = 8,64\\text{ m}$',
          'Luas fase 2 ($2,4 \\to 3,9$): $A_2 = 1,5 \\times 7,2 = 10,80\\text{ m}$',
          'Luas fase 3 positif ($3,9 \\to 7,5$): $A_3 = \\frac{1}{2} \\times 3,6 \\times 7,2 = 12,96\\text{ m}$',
        ],
        substitusiHighlight: '$\\Delta x_{\\text{maks}} = 8,64 + 10,80 + 12,96 = 32,40\\text{ m} = 32,4\\text{ m}$',
      },
      jawabanAkhir: {
        nilaiFormatted: '32,4',
        satuan: 'm',
        interpretasi:
          'Mobil mencapai posisi terjauh $32,4\\text{ m}$ pada detik ke-$7,5$ sebelum berbalik arah di $1,5\\text{ s}$ terakhir.',
      },
      insightOlimpiade: {
        berpikirCepat:
          'Begitu $v_{\\text{maks}} = 7,2\\text{ m/s}$ dan $\\Delta t_3^+ = 3,6\\text{ s}$ ditemukan, keseluruhan daerah positif dari $0$ sampai $7,5\\text{ s}$ hanyalah satu trapesium besar dengan sisi sejajar $7,5\\text{ s}$ dan $1,5\\text{ s}$ serta tinggi $7,2\\text{ m/s}$: $\\frac{7,5 + 1,5}{2} \\times 7,2 = 4,5 \\times 7,2 = 32,4\\text{ m}$!',
        trikSahih:
          'Rumus trapesium besar $\\frac{t^* + \\Delta t_2}{2} v_{\\text{maks}}$ jauh lebih cepat dan anti-salah hitung dibanding menjumlahkan tiga bangun terpisah.',
        kesalahanUmum:
          'Mengira $v = 0$ terjadi pada $t = 9,0\\text{ s}$ padahal pada $t = 9,0\\text{ s}$ kecepatan sudah bernilai $-3,0\\text{ m/s}$.',
        polaSerupa:
          'Soal OSK klasik kinematika grafik tiga fase dengan parameter waktu tersirat.',
      },
    },
    feedback: {
      wrongHint:
        'Cari dulu durasi fase 1 ($t_1$) dari syarat kecepatan akhir $v(9,0) = -3,0\\text{ m/s}$, baru kemudian hitung luas trapesium positifnya hingga $v = 0$.',
      fixReasoning:
        'Susun persamaan $3t_1 - 2(7,5 - t_1) = -3$ untuk menemukan $t_1 = 2,4\\text{ s}$ dan $v_{\\text{maks}} = 7,2\\text{ m/s}$, lalu cari kapan $v = 0$ (di $t^* = 7,5\\text{ s}$).',
      recommendedModuleId: 'mod-3',
      correctPraise:
        'Sempurna! Anda menurunkan $t_1 = 2,4\\text{ s}$ dari gradien kecepatan dan menghitung luas trapesium positif dengan akurat.',
    },
    narration: {
      soalDanDiketahui:
        'Soal Nomor 9. Mobil mulai dari diam, dipercepat tiga meter per detik kuadrat selama t satu, lalu konstan satu koma lima detik, dan diperlambat dua meter per detik kuadrat hingga detik sembilan kecepatannya minus tiga meter per detik.',
      pembahasanDanPenurunan:
        'Dari perubahan kecepatan total, tiga t satu dikurangi dua kali tujuh koma lima minus t satu sama dengan minus tiga, menghasilkan t satu sama dengan dua koma empat detik dan kecepatan puncak tujuh koma dua meter per detik. Kecepatan menjadi nol pada detik tujuh koma lima. Luas trapesium besar hingga titik balik adalah setengah kali tujuh koma lima tambah satu koma lima dikali tujuh koma dua, tepat tiga puluh dua koma empat meter.',
      animasiDanInsight:
        'Lihat animasi membuktikan trapesium waktu tujuh koma lima detik dan kecepatan puncak tujuh koma dua menghasilkan tepat tiga puluh dua koma empat meter.',
    },
  },

  // =========================================================================
  // TIER 4: SOAL 10–12 — PENALARAN MATEMATIS & KOMBINASI KONSEP PENDUKUNG
  // =========================================================================
  {
    id: 10,
    tier: 'matematis',
    tierLabel: 'Penalaran Matematis & Kombinasi',
    title: 'Jarak Pisah Maksimum Dua Mobil pada Grafik v-t Berpotongan',
    prompt:
      'Dua mobil mainan, Mobil A dan Mobil B, memulai gerak dari posisi yang sama ($x_A(0) = x_B(0) = 0$) pada lintasan lurus sejajar. Grafik $v_A(t)$ (garis maroon) dan $v_B(t)$ (garis biru) untuk $0 \\le t \\le 6,0\\text{ s}$ ditunjukkan pada gambar. Berapakah jarak pisah maksimum ketika Mobil A berada di depan Mobil B sebelum disusul oleh Mobil B (dalam satuan m)?',
    unit: 'm',
    expectedValue: 36 / 7,
    expectedFormatted: '5,1',
    stimulus: {
      mode: 'dual-v-t',
      xLabel: 't (s)',
      yLabel: 'v (m/s)',
      tMin: 0,
      tMax: 6.0,
      tStepMajor: 1.0,
      tStepGrid: 0.5,
      yMin: -4,
      yMax: 7,
      yStepMajor: 2,
      yStepGrid: 1,
      objects: [
        {
          id: 'carA10',
          label: 'Mobil A',
          color: '#7A1228',
          initialX: 0,
          segments: [
            { tStart: 0, tEnd: 2.0, kind: 'linear-v', vStart: 4, vEnd: 4 },
            { tStart: 2.0, tEnd: 6.0, kind: 'linear-v', vStart: 4, vEnd: -4 },
          ],
        },
        {
          id: 'carB10',
          label: 'Mobil B',
          color: '#0369A1',
          initialX: 0,
          segments: [
            { tStart: 0, tEnd: 4.0, kind: 'linear-v', vStart: 0, vEnd: 6 },
            { tStart: 4.0, tEnd: 6.0, kind: 'linear-v', vStart: 6, vEnd: 6 },
          ],
        },
      ],
      proofHighlight: {
        tStar: 16 / 7,
        xStar: 36 / 7,
        label: 'Jarak Pisah Maksimum di v_A = v_B (t* = 16/7 s)',
        phaseNotes: [
          { tFrom: 0, tTo: 2.0, note: 'Selama v_A > v_B, Mobil A terus menjauh di depan Mobil B hingga beda posisi 5,0 m di t = 2,0 s.' },
          { tFrom: 2.0, tTo: 16 / 7, note: 'Jarak pisah masih bertambah tipis hingga kedua kecepatan sama di t* = 16/7 s (Δx_rel = 5,14 m).' },
          { tFrom: 16 / 7, tTo: 4.0, note: 'Kini v_B > v_A sehingga Mobil B mengejar dan tepat menyusul di t = 4,0 s!' },
          { tFrom: 4.0, tTo: 6.0, note: 'Mobil B jauh di depan sementara Mobil A berbalik arah.' },
        ],
      },
    },
    explanation: {
      memahami: {
        fenomena:
          'Mobil A awalnya lebih cepat sehingga memimpin di depan Mobil B. Namun Mobil B terus dipercepat sementara Mobil A melambat. Pada saat kecepatan keduanya sama, jarak antara keduanya mencapai maksimum.',
        diketahui: [
          '$x_A(0) = x_B(0) = 0$',
          'Mobil A: $v_A = 4\\text{ m/s}$ ($0 \\to 2,0\\text{ s}$), lalu turun linear ke $(6,0; -4)$',
          'Mobil B: naik linear dari $(0; 0)$ ke $(4,0; 6)$, lalu konstan $6\\text{ m/s}$',
        ],
        ditanyakan: 'Jarak pisah maksimum $(x_A - x_B)_{\\text{maks}}$ sebelum Mobil B menyusul Mobil A (dalam $\\text{m}$).',
      },
      identifikasi: {
        prinsip: 'Kecepatan relatif $v_{\\text{rel}} = v_A - v_B$ dan syarat ekstrem perpindahan relatif ($v_A(t^*) = v_B(t^*)$).',
        alasan:
          'Jarak pisah $\\Delta s(t) = x_A(t) - x_B(t)$ merupakan luas daerah di antara kurva $v_A$ dan $v_B$. Selama $v_A > v_B$, A menjauh dari B. Begitu $v_B > v_A$, B mulai mendekat. Jadi jarak pisah maksimum terjadi tepat di titik potong kedua grafik!',
      },
      visualisasi: {
        deskripsiDiagram:
          'Titik perpotongan kedua kurva berada di antara $t = 2,0\\text{ s}$ dan $t = 2,5\\text{ s}$. Luas trapesium + segitiga di antara kedua kurva dari $t = 0$ sampai titik potong tersebut adalah jarak pisah maksimum.',
        arahVektor:
          'Pada $t^* = \\frac{16}{7}\\text{ s}$, kedua mobil bergerak ke kanan dengan kecepatan sesaat yang sama besar ($\\approx 3,43\\text{ m/s}$).',
        catatanFbd:
          'Secara relatif terhadap Mobil B, masalah ini identik persis dengan kurva kecepatan relatif $v_{\\text{rel}}(t)$ yang memotong nol di $t^* = \\frac{16}{7}\\text{ s}$!',
      },
      persamaanDasar: [
        {
          rumus: '$$\\frac{d}{dt}(x_A - x_B) = v_A(t) - v_B(t) = 0 \\implies v_A(t^*) = v_B(t^*)$$',
          simbol: '$t^*$: waktu titik potong kurva $v_A$ dan $v_B$',
          makna: 'Analogi langsung dari syarat perpindahan maksimum $v(t^*) = 0$ pada kerangka relatif.',
        },
      ],
      penurunanMatematis: [
        'Pada selang $2,0 \\le t \\le 4,0\\text{ s}$: gradien $v_A$ adalah $\\frac{-4 - 4}{4,0} = -2,0\\text{ m/s}^2$, sehingga $v_A(t) = 4 - 2(t - 2) = 8 - 2t$.',
        'Gradien $v_B$ pada $0 \\le t \\le 4,0\\text{ s}$ adalah $\\frac{6}{4} = 1,5\\text{ m/s}^2$, sehingga $v_B(t) = 1,5 t$.',
        'Samakan $v_A(t^*) = v_B(t^*)$: $8 - 2t^* = 1,5 t^* \\implies 3,5 t^* = 8 \\implies t^* = \\frac{16}{7}\\text{ s} \\approx 2,286\\text{ s}$.',
        'Hitung luas di antara $v_A$ dan $v_B$ dari $t = 0$ hingga $t = 2,0$, lalu segitiga kecil dari $t = 2,0$ hingga $t = \\frac{16}{7}$.',
      ],
      perhitungan: {
        langkah: [
          'Pada $t = 2,0\\text{ s}$: $x_A(2) = 4 \\times 2 = 8,0\\text{ m}$, $x_B(2) = \\frac{1}{2} \\times 2 \\times 3 = 3,0\\text{ m} \\implies \\Delta x_{\\text{rel}}(2) = 5,0\\text{ m}$',
          'Beda kecepatan pada $t = 2,0\\text{ s}$: $v_A(2) - v_B(2) = 4 - 3 = 1,0\\text{ m/s}$',
          'Luas segitiga relatif dari $t = 2,0$ ke $t^* = \\frac{16}{7}$ (alas $\\frac{2}{7}\\text{ s}$): $\\frac{1}{2} \\times \\frac{2}{7} \\times 1,0 = \\frac{1}{7}\\text{ m}$',
        ],
        substitusiHighlight: '$(x_A - x_B)_{\\text{maks}} = 5,0 + \\frac{1}{7} = \\frac{36}{7} \\approx 5,1429\\text{ m} \\approx 5,1\\text{ m}$',
      },
      jawabanAkhir: {
        nilaiFormatted: '5,1',
        satuan: 'm',
        interpretasi:
          'Mobil A unggul paling jauh sebesar $5,1\\text{ m}$ pada $t = 2,29\\text{ s}$, lalu disusul Mobil B tepat pada $t = 4,0\\text{ s}$ ($x_A = x_B = 12,0\\text{ m}$).',
      },
      insightOlimpiade: {
        berpikirCepat:
          'Prinsip perpindahan maksimum Soal #1 langsung berlaku untuk gerak dua benda: cukup ganti $v(t)$ menjadi $v_{\\text{rel}}(t) = v_A(t) - v_B(t)$, maka titik balik $v_{\\text{rel}} = 0$ terjadi saat grafik berpotongan!',
        trikSahih:
          'Cukup hitung luas di antara dua kurva ($\\int (v_A - v_B)\\,dt$) dari $0$ ke $t^*$ tanpa perlu mencari rumus kuadrat $x_A(t)$ dan $x_B(t)$ secara terpisah.',
        kesalahanUmum:
          'Mengira jarak pisah maksimum terjadi di $t = 2,0\\text{ s}$ (saat Mobil A mulai melambat) atau di $t = 4,0\\text{ s}$ (saat mereka justru bertemu!).',
        polaSerupa:
          'Aplikasi kinematika relatif 1D yang sangat sering muncul di OSK Fisika SMA.',
      },
    },
    feedback: {
      wrongHint:
        'Kapan jarak pisah dua benda mencapai maksimum? Bukan saat A mulai melambat ($t = 2,0\\text{ s}$), melainkan saat kecepatan keduanya tepat sama ($v_A = v_B$)!',
      fixReasoning:
        'Cari titik potong $8 - 2t^* = 1,5 t^*$ untuk memperoleh $t^* = \\frac{16}{7}\\text{ s}$, lalu hitung luas di antara kurva $v_A$ dan $v_B$ dari $t = 0$ sampai $t^*$.',
      recommendedModuleId: 'mod-4',
      correctPraise:
        'Brilian! Anda menerapkan prinsip titik balik pada kerangka kecepatan relatif dengan sempurna.',
    },
    narration: {
      soalDanDiketahui:
        'Soal Nomor 10 membandingkan dua mobil, A dan B, dari titik start yang sama. Kita mencari jarak pisah maksimum saat Mobil A berada di depan sebelum disusul Mobil B.',
      pembahasanDanPenurunan:
        'Selama kecepatan A lebih besar dari B, jarak antara keduanya terus melebar. Jarak pisah menjadi maksimum tepat saat kedua kurva berpotongan, yaitu ketika kecepatan A sama dengan kecepatan B. Menyamakan delapan minus dua t dengan satu koma lima t menghasilkan waktu t bintang enam belas per tujuh detik. Luas daerah di antara kedua grafik hingga detik tersebut adalah lima ditambah satu per tujuh, yaitu lima koma satu meter.',
      animasiDanInsight:
        'Perhatikan dua mobil di lintasan animasi: pada detik dua koma dua sembilan, jarak di antara keduanya tepat paling lebar sebesar lima koma satu empat meter, sebelum B menyalip A di detik keempat.',
    },
  },

  {
    id: 11,
    tier: 'matematis',
    tierLabel: 'Penalaran Matematis & Kombinasi',
    title: 'Menurunkan Kurva v-t dari Grafik Percepatan-Waktu (a-t)',
    prompt:
      'Sebuah partikel bergerak sepanjang sumbu-$x$ dengan kecepatan awal $v(0) = +2,0\\text{ m/s}$. Grafik percepatan terhadap waktu $a(t)$ selama $0 \\le t \\le 6,0\\text{ s}$ diperlihatkan pada gambar ($a = +2,0\\text{ m/s}^2$ pada $0 \\le t < 1,5\\text{ s}$; $a = 0$ pada $1,5 \\le t < 3,0\\text{ s}$; dan $a = -3,0\\text{ m/s}^2$ pada $3,0 \\le t \\le 6,0\\text{ s}$). Perpindahan maksimum partikel selama $0 \\le t \\le 6,0\\text{ s}$ adalah ... m.',
    unit: 'm',
    expectedValue: 16.9166667,
    expectedFormatted: '16,9',
    stimulus: {
      mode: 'a-t',
      xLabel: 't (s)',
      yLabel: 'a (m/s²)',
      tMin: 0,
      tMax: 6.0,
      tStepMajor: 1.0,
      tStepGrid: 0.5,
      yMin: -4,
      yMax: 3,
      yStepMajor: 1,
      yStepGrid: 1,
      objects: [
        {
          id: 'part11',
          label: 'Partikel (v₀ = +2,0 m/s)',
          color: '#7A1228',
          initialX: 0,
          initialV: 2.0,
          segments: [
            { tStart: 0, tEnd: 1.5, kind: 'step-a', aVal: 2.0 },
            { tStart: 1.5, tEnd: 3.0, kind: 'step-a', aVal: 0.0 },
            { tStart: 3.0, tEnd: 6.0, kind: 'step-a', aVal: -3.0 },
          ],
        },
      ],
      proofHighlight: {
        tStar: 4 + 2 / 3,
        xStar: 16.916667,
        label: 'Konstruksi v(t) → Titik Balik di t* = 4,67 s',
        phaseNotes: [
          { tFrom: 0, tTo: 1.5, note: 'Luas a-t = +3,0 m/s, sehingga v naik dari +2,0 menjadi +5,0 m/s.' },
          { tFrom: 1.5, tTo: 3.0, note: 'a = 0 berarti v konstan pada +5,0 m/s.' },
          { tFrom: 3.0, tTo: 4.667, note: 'a = -3,0 m/s² mengikis kecepatan +5,0 m/s hingga nol pada t* = 4⅔ s.' },
          { tFrom: 4.667, tTo: 6.0, note: 'Kecepatan menjadi negatif; partikel bergerak mundur.' },
        ],
      },
    },
    explanation: {
      memahami: {
        fenomena:
          'Stimulus tidak lagi memberikan grafik $v-t$ secara langsung, melainkan grafik percepatan $a-t$ bertingkat beserta kondisi awal $v(0) = +2,0\\text{ m/s}$.',
        diketahui: [
          '$v(0) = +2,0\\text{ m/s}$',
          '$a = +2,0\\text{ m/s}^2$ untuk $0 \\le t < 1,5\\text{ s}$',
          '$a = 0$ untuk $1,5 \\le t < 3,0\\text{ s}$',
          '$a = -3,0\\text{ m/s}^2$ untuk $3,0 \\le t \\le 6,0\\text{ s}$',
        ],
        ditanyakan: 'Perpindahan maksimum $\\Delta x_{\\text{maks}}$ selama $0 \\le t \\le 6,0\\text{ s}$ (dalam $\\text{m}$).',
      },
      identifikasi: {
        prinsip: 'Dua tahap integrasi kinematika: luas grafik $a-t$ menghasilkan $\\Delta v$, lalu luas grafik $v-t$ menghasilkan $\\Delta x$.',
        alasan:
          'Setelah menurunkan grafik $v-t$ yang bersifat piecewise-linear dari grafik $a-t$, permasalahan kembali tepat ke pola Soal OSK #1 untuk mencari titik balik $v = 0$ dan luas positif maksimum.',
      },
      visualisasi: {
        deskripsiDiagram:
          'Dari grafik $a-t$ bertingkat, kita sketsa grafik $v-t$ kontinu melalui $(0; 2,0) \\to (1,5; 5,0) \\to (3,0; 5,0) \\to (6,0; -4,0)$.',
        arahVektor:
          'Selama $0 \\le t < 4\\frac{2}{3}\\text{ s}$, $\\vec{v}$ tetap positif. Pada $t = 3,0\\text{ s}$, arah vektor percepatan berbalik ke kiri.',
        catatanFbd:
          'Percepatan bernilai negatif mulai $t = 3,0\\text{ s}$, tetapi partikel baru berbalik arah gerak di $t^* = 4\\frac{2}{3}\\text{ s}$.',
      },
      persamaanDasar: [
        {
          rumus: '$$v(t) = v(0) + \\int_{0}^{t} a(\\tau)\\,d\\tau$$',
          simbol: '$a(\\tau)$: percepatan ($\\text{m/s}^2$)',
          makna: 'Luas di bawah kurva $a-t$ menyatakan perubahan kecepatan $\\Delta v$, bukan kecepatan itu sendiri.',
        },
      ],
      penurunanMatematis: [
        '$v(1,5) = 2,0 + (2,0)(1,5) = 5,0\\text{ m/s}$.',
        '$v(3,0) = 5,0 + 0 = 5,0\\text{ m/s}$.',
        'Untuk $t \\ge 3,0\\text{ s}$: $v(t) = 5,0 - 3,0(t - 3,0)$. Pada $t = 6,0\\text{ s}$, $v(6,0) = -4,0\\text{ m/s}$.',
        'Titik balik $v(t^*) = 0$: $5,0 - 3,0(t^* - 3,0) = 0 \\implies t^* = 3,0 + \\frac{5}{3} = 4\\frac{2}{3}\\text{ s}$.',
      ],
      perhitungan: {
        langkah: [
          'Luas $v-t$ pada $0 \\to 1,5$: $A_1 = \\frac{2,0 + 5,0}{2} \\times 1,5 = 5,25\\text{ m}$',
          'Luas $v-t$ pada $1,5 \\to 3,0$: $A_2 = 5,0 \\times 1,5 = 7,50\\text{ m}$',
          'Luas $v-t$ pada $3,0 \\to 4\\frac{2}{3}$: $A_3 = \\frac{1}{2} \\times \\frac{5}{3} \\times 5,0 = \\frac{25}{6} \\approx 4,1667\\text{ m}$',
        ],
        substitusiHighlight: '$\\Delta x_{\\text{maks}} = 5,25 + 7,50 + 4,1667 = 16,9167\\text{ m} \\approx 16,9\\text{ m}$',
      },
      jawabanAkhir: {
        nilaiFormatted: '16,9',
        satuan: 'm',
        interpretasi:
          'Integrasi beruntun dari $a-t$ ke $v-t$ lalu ke $\\Delta x$ menunjukkan puncak perpindahan $16,9\\text{ m}$ di $t = 4,67\\text{ s}$.',
      },
      insightOlimpiade: {
        berpikirCepat:
          'Selalu gambar sketsa grafik $v-t$ di kertas buram saat diberi grafik $a-t$! Dengan begitu seluruh intuisi geometris Soal #1 langsung aktif.',
        trikSahih:
          'Jangan lupa menambahkan $v(0) = +2,0\\text{ m/s}$ saat menghitung nilai awal grafik $v-t$.',
        kesalahanUmum:
          'Mengira luas di bawah grafik $a-t$ adalah perpindahan, atau menganggap titik balik terjadi di $t = 3,0\\text{ s}$ saat $a$ berubah menjadi negatif.',
        polaSerupa:
          'Peningkatan kedalaman dari grafik $v-t$ Soal #1 menuju analisis satu tingkat turunan lebih tinggi ($a-t$).',
      },
    },
    feedback: {
      wrongHint:
        'Hati-hati! Grafik pada soal ini adalah grafik PERCEPATAN ($a-t$), bukan grafik kecepatan ($v-t$). Partikel belum berbalik arah di $t = 3,0\\text{ s}$!',
      fixReasoning:
        'Konstruksi dahulu grafik $v(t)$ menggunakan $v(t) = v(0) + \\text{luas } a-t$, temukan kapan $v(t^*) = 0$ (di $t^* = 4\\frac{2}{3}\\text{ s}$), baru hitung luas di bawah kurva $v-t$.',
      recommendedModuleId: 'mod-3',
      correctPraise:
        'Hebat! Anda sukses menerjemahkan grafik $a-t$ menjadi grafik $v-t$ lalu menemukan perpindahan maksimumnya.',
    },
    narration: {
      soalDanDiketahui:
        'Soal Nomor 11 memberikan grafik percepatan terhadap waktu yang bertingkat, beserta kecepatan awal plus dua meter per detik. Kita diminta mencari perpindahan maksimum.',
      pembahasanDanPenurunan:
        'Langkah pertama adalah mengubah grafik percepatan menjadi grafik kecepatan. Luas grafik a-t pada satu koma lima detik pertama menambah kecepatan sebesar tiga, menjadi lima meter per detik. Setelah konstan satu koma lima detik, percepatan minus tiga mengikis kecepatan lima menjadi nol dalam waktu lima per tiga detik, yakni pada empat dua per tiga detik. Luas di bawah grafik kecepatan hingga saat itu adalah lima koma dua lima ditambah tujuh koma lima ditambah empat koma satu enam tujuh, menghasilkan enam belas koma sembilan meter.',
      animasiDanInsight:
        'Simulasi menampilkan grafik a-t sekaligus grafik v-t hasil integrasi dan gerak partikelnya secara bersamaan.',
    },
  },

  {
    id: 12,
    tier: 'matematis',
    tierLabel: 'Penalaran Matematis & Kombinasi',
    title: 'Kurva v-t Parabolik & Integral Luas hingga Titik Balik',
    prompt:
      'Sebuah roket beroda bergerak sepanjang rel lurus dengan kecepatan yang mengikuti kurva lengkung mulus $v(t) = 3 + 4t - t^2$ (dalam $\\text{m/s}$, dengan $t$ dalam $\\text{s}$) selama $0 \\le t \\le 5,0\\text{ s}$ seperti diperlihatkan pada grafik. Perpindahan maksimum roket beroda tersebut selama selang $0 \\le t \\le 5,0\\text{ s}$ adalah ... m.',
    unit: 'm',
    expectedValue: 34 / 3 + (14 / 3) * Math.sqrt(7),
    expectedFormatted: '23,7',
    stimulus: {
      mode: 'v-t',
      xLabel: 't (s)',
      yLabel: 'v (m/s)',
      tMin: 0,
      tMax: 5.0,
      tStepMajor: 1.0,
      tStepGrid: 0.5,
      yMin: -3,
      yMax: 8,
      yStepMajor: 2,
      yStepGrid: 1,
      stimulusAnnotations: [
        { t: 2.1, y: 7.3, text: 'v(t) = 3 + 4t - t²', anchor: 'start', dx: 4 },
      ],
      objects: [
        {
          id: 'rocket12',
          label: 'Roket Beroda',
          color: '#7A1228',
          initialX: 0,
          segments: [
            { tStart: 0, tEnd: 5.0, kind: 'quadratic-v', c0: 3, c1: 4, c2: -1 },
          ],
        },
      ],
      proofHighlight: {
        tStar: 2 + Math.sqrt(7),
        xStar: 34 / 3 + (14 / 3) * Math.sqrt(7),
        label: 'Titik Balik t* = 2 + √7 ≈ 4,65 s',
        phaseNotes: [
          { tFrom: 0, tTo: 2.0, note: 'Percepatan positif (a > 0) membawa kecepatan ke puncak 7,0 m/s di t = 2,0 s.' },
          { tFrom: 2.0, tTo: 2 + Math.sqrt(7), note: 'Percepatan menjadi negatif; laju berkurang hingga v = 0 pada t* = 2 + √7 s.' },
          { tFrom: 2 + Math.sqrt(7), tTo: 5.0, note: 'Roket mulai mundur pada 0,35 s terakhir.' },
        ],
      },
    },
    explanation: {
      memahami: {
        fenomena:
          'Berbeda dengan kurva garis lurus (percepatan tetap), roket mengalami percepatan yang berubah secara linear terhadap waktu sehingga kurva $v-t$ berbentuk parabola.',
        diketahui: [
          'Persamaan kurva: $v(t) = 3 + 4t - t^2\\text{ m/s}$ untuk $0 \\le t \\le 5,0\\text{ s}$',
        ],
        ditanyakan: 'Perpindahan maksimum $\\Delta x_{\\text{maks}}$ selama $0 \\le t \\le 5,0\\text{ s}$ (dalam $\\text{m}$).',
      },
      identifikasi: {
        prinsip: 'Syarat ekstrem kalkulus ($\\frac{dx}{dt} = v(t) = 0$) dan integral tentu untuk luas daerah melengkung.',
        alasan:
          'Prinsip utama Soal #1 tetap berlaku penuh bahkan untuk kurva non-linear: perpindahan maksimum terjadi saat $v(t^*) = 0$ (dengan $v$ berubah dari $+$ ke $-$), dan besarnya sama dengan luas di bawah kurva $\\int_0^{t^*} v(t)\\,dt$.',
      },
      visualisasi: {
        deskripsiDiagram:
          'Parabola terbuka ke bawah dengan $v(0) = 3$, puncak $(2,0; 7,0)$, memotong sumbu-$t$ di antara $t = 4,5$ dan $5,0\\text{ s}$, serta berakhir di $(5,0; -2,0)$.',
        arahVektor:
          'Percepatan $a(t) = \\frac{dv}{dt} = 4 - 2t$ bernilai positif sebelum $t = 2,0\\text{ s}$, nol di $t = 2,0\\text{ s}$, dan negatif setelahnya.',
        catatanFbd:
          'Pada puncak grafik $v-t$ ($t = 2,0\\text{ s}$), percepatan nol namun roket masih melaju kencang ke kanan. Posisi terjauh baru tercapai saat $v = 0$, bukan saat $a = 0$!',
      },
      persamaanDasar: [
        {
          rumus: '$$v(t^*) = 0 \\implies 3 + 4t^* - (t^*)^2 = 0$$',
          simbol: '$t^*$: akar positif persamaan kuadrat dalam selang $[0, 5]$',
          makna: 'Menentukan batas atas integral luas positif.',
        },
        {
          rumus: '$$\\Delta x(t) = \\int_{0}^{t} (3 + 4\\tau - \\tau^2)\\,d\\tau = 3t + 2t^2 - \\frac{1}{3}t^3$$',
          simbol: '$\\Delta x(t)$: fungsi perpindahan terhadap waktu',
          makna: 'Menghitung luas eksak di bawah kurva parabola.',
        },
      ],
      penurunanMatematis: [
        'Selesaikan $(t^*)^2 - 4t^* - 3 = 0$ dengan rumus kuadrat: $t^* = \\frac{4 \\pm \\sqrt{16 + 12}}{2} = 2 \\pm \\sqrt{7}$.',
        'Karena $t^* \\ge 0$, ambil $t^* = 2 + \\sqrt{7} \\approx 2 + 2,64575 = 4,6458\\text{ s} < 5,0\\text{ s}$.',
        'Substitusikan $t^* = 2 + \\sqrt{7}$ ke $\\Delta x(t^*) = 3t^* + 2(t^*)^2 - \\frac{1}{3}(t^*)^3$.',
        'Untuk aljabar bebas salah hitung, gunakan relasi $(t^*)^2 = 4t^* + 3$ sehingga $(t^*)^3 = 4(t^*)^2 + 3t^* = 19t^* + 12$.',
      ],
      perhitungan: {
        langkah: [
          '$\\Delta x(t^*) = 3t^* + 2(4t^* + 3) - \\frac{1}{3}(19t^* + 12)$',
          '$\\Delta x(t^*) = (3 + 8 - \\frac{19}{3})t^* + (6 - 4) = \\frac{14}{3}t^* + 2$',
          'Masukkan $t^* = 2 + \\sqrt{7}$: $\\Delta x(t^*) = \\frac{14}{3}(2 + \\sqrt{7}) + 2 = \\frac{34}{3} + \\frac{14}{3}\\sqrt{7}$',
        ],
        substitusiHighlight: '$\\Delta x_{\\text{maks}} \\approx 11,3333 + 12,3468 = 23,6802\\text{ m} \\approx 23,7\\text{ m}$',
      },
      jawabanAkhir: {
        nilaiFormatted: '23,7',
        satuan: 'm',
        interpretasi:
          'Puncak perpindahan tercapai pada $t = 4,65\\text{ s}$ sejauh $23,7\\text{ m}$, sedangkan pada akhir $t = 5,0\\text{ s}$ posisinya berkurang menjadi $23,3\\text{ m}$.',
      },
      insightOlimpiade: {
        berpikirCepat:
          'Trik reduksi polinomial olimpiade: karena $(t^*)^2 = 4t^* + 3$, turunkan pangkat $(t^*)^3$ menjadi fungsi linear dalam $t^*$ sebelum memasukkan $\\sqrt{7}$! Ini memangkas waktu hitung hingga 70%.',
        trikSahih:
          'Jangan pernah menggunakan aproksimasi luas segitiga atau trapesium kasar pada soal kurva analitik; selesaikan dengan antiturunan eksak.',
        kesalahanUmum:
          'Mengira perpindahan maksimum terjadi di puncak parabola $t = 2,0\\text{ s}$ (saat kecepatan maksimum) alih-alih di titik potong $v = 0$ ($t^* = 4,65\\text{ s}$).',
        polaSerupa:
          'Generalisasi kalkulus langsung dari Soal OSK #1 untuk percepatan tak konstan.',
      },
    },
    feedback: {
      wrongHint:
        'Ingat: puncak grafik $v-t$ ($t = 2,0\\text{ s}$) adalah saat KECEPATAN maksimum, bukan PERPINDAHAN maksimum! Perpindahan masih terus bertambah selama $v > 0$.',
      fixReasoning:
        'Cari akar $3 + 4t^* - (t^*)^2 = 0$ untuk memperoleh $t^* = 2 + \\sqrt{7}\\text{ s}$, lalu integralkan $v(t)$ dari $0$ sampai $t^*$.',
      recommendedModuleId: 'mod-3',
      correctPraise:
        'Luar biasa! Anda membedakan kecepatan maksimum dari perpindahan maksimum dan mengintegralkan kurva kuadratik dengan presisi.',
    },
    narration: {
      soalDanDiketahui:
        'Soal Nomor 12 menggunakan kurva kecepatan parabolik, yaitu v t sama dengan tiga tambah empat t minus t kuadrat, dari nol sampai lima detik.',
      pembahasanDanPenurunan:
        'Hati-hati terhadap miskonsepsi klasik: puncak parabola di detik kedua hanyalah kecepatan maksimum, bukan perpindahan maksimum. Perpindahan baru maksimum ketika v t sama dengan nol, yang menghasilkan akar t bintang dua tambah akar tujuh, atau sekitar empat koma enam lima detik. Dengan mengintegralkan persamaan v t dari nol sampai t bintang, kita peroleh perpindahan maksimum dua puluh tiga koma tujuh meter.',
      animasiDanInsight:
        'Amati di simulasi bagaimana roket beroda masih melaju ke kanan jauh setelah melewati detik kedua dan baru berhenti sesaat di empat koma enam lima detik.',
    },
  },

  // =========================================================================
  // TIER 5: SOAL 13–15 — TANTANGAN OLIMPIADE TINGKAT KOTA KOMPLEKS
  // =========================================================================
  {
    id: 13,
    tier: 'olimpiade',
    tierLabel: 'Tantangan Olimpiade Kompleks',
    title: 'Optimasi Amplop Kurva v-t dengan Batas Percepatan dan Kelajuan',
    prompt:
      'Sebuah mobil robotik mulai bergerak dari keadaan diam ($v(0) = 0$) pada jalur lurus dan wajib memiliki kecepatan akhir $v(10,0) = -3,0\\text{ m/s}$ pada $t = 10,0\\text{ s}$. Sistem penggerak membatasi percepatan positif maksimum $a(t) \\le +2,5\\text{ m/s}^2$, perlambatan maksimum $a(t) \\ge -1,5\\text{ m/s}^2$, serta kelajuan maju tidak boleh melebihi $7,0\\text{ m/s}$. Berapakah perpindahan maksimum terbesar yang mungkin dicapai mobil tersebut selama $0 \\le t \\le 10,0\\text{ s}$ (dalam satuan m)?',
    unit: 'm',
    expectedValue: 448 / 15,
    expectedFormatted: '29,9',
    stimulus: {
      mode: 'v-t',
      xLabel: 't (s)',
      yLabel: 'v (m/s)',
      tMin: 0,
      tMax: 10.0,
      tStepMajor: 2.0,
      tStepGrid: 1.0,
      yMin: -4,
      yMax: 9,
      yStepMajor: 2,
      yStepGrid: 1,
      stimulusAnnotations: [
        { t: 1.4, y: 4.4, text: 'batas a ≤ +2,5 m/s²', anchor: 'end', dx: -6 },
        { t: 5.0, y: 7.4, text: 'batas v ≤ 7,0 m/s', anchor: 'middle' },
        { t: 7.2, y: 3.0, text: 'batas a ≥ -1,5 m/s²', anchor: 'start', dx: 6 },
      ],
      objects: [
        {
          id: 'opt13',
          label: 'Profil Optimal',
          color: '#7A1228',
          initialX: 0,
          segments: [
            { tStart: 0, tEnd: 2.8, kind: 'linear-v', vStart: 0, vEnd: 7.0 },
            { tStart: 2.8, tEnd: 10 / 3, kind: 'linear-v', vStart: 7.0, vEnd: 7.0 },
            { tStart: 10 / 3, tEnd: 10.0, kind: 'linear-v', vStart: 7.0, vEnd: -3.0 },
          ],
        },
      ],
      proofHighlight: {
        tStar: 8.0,
        xStar: 448 / 15,
        label: 'Amplop Optimal → Δx_maks = 29,9 m di t* = 8,0 s',
        phaseNotes: [
          { tFrom: 0, tTo: 2.8, note: 'Akselerasi penuh +2,5 m/s² mencapai batas kelajuan 7,0 m/s pada t₁ = 2,8 s.' },
          { tFrom: 2.8, tTo: 10 / 3, note: 'Bertahan tepat di batas kelajuan 7,0 m/s hingga t₂ = 3⅓ s.' },
          { tFrom: 10 / 3, tTo: 8.0, note: 'Mengerem sehalus mungkin (-1,5 m/s²) agar memotong nol selambat mungkin di t* = 8,0 s.' },
          { tFrom: 8.0, tTo: 10.0, note: 'Mundur selama 2,0 s tepat menyentuh syarat batas v(10) = -3,0 m/s.' },
        ],
      },
    },
    explanation: {
      memahami: {
        fenomena:
          'Ini adalah soal optimasi lintasan kinematika: tidak hanya satu kurva yang mungkin, tetapi kita mencari kurva $v(t)$ yang memaksimumkan luas positif di bawah semua kendala fisis.',
        diketahui: [
          '$v(0) = 0$ dan $v(10,0) = -3,0\\text{ m/s}$',
          '$-1,5\\text{ m/s}^2 \\le a(t) \\le +2,5\\text{ m/s}^2$',
          '$v(t) \\le 7,0\\text{ m/s}$',
        ],
        ditanyakan: 'Nilai terbesar yang mungkin bagi perpindahan maksimum $\\Delta x_{\\text{maks}}$ (dalam $\\text{m}$).',
      },
      identifikasi: {
        prinsip: 'Metode Amplop Atas (Upper Envelope) kurva $v-t$ pada optimasi kinematika.',
        alasan:
          'Agar integral $\\int_0^{t^*} v(t)\\,dt$ sebesar mungkin, di setiap saat $t$ kurva $v(t)$ harus dibuat setinggi mungkin tanpa melanggar batas naik dari $(0; 0)$, batas atap $v = 7,0$, dan batas mundur dari titik wajib akhir $(10; -3)$.',
      },
      visualisasi: {
        deskripsiDiagram:
          'Amplop batas atas dibentuk oleh perpotongan tiga garis: garis naik $v = 2,5t$, garis mendatar $v = 7,0$, dan garis turun mundur dari $(10; -3)$ dengan gradien $-1,5$.',
        arahVektor:
          'Mobil memaksimalkan percepatan ke kanan di awal, lalu mengerem paling lambat di akhir agar waktu maju selama mungkin.',
        catatanFbd:
          'Strategi optimal ini identik dengan prinsip kendali bang-coast-brake dalam mekanika teknik.',
      },
      persamaanDasar: [
        {
          rumus: '$$v(t) \\le \\min\\big\\{2,5t,\\; 7,0,\\; -3,0 + 1,5(10,0 - t)\\big\\}$$',
          simbol: 'Tiga kurva pembatas atas dalam ruang kecepatan-waktu',
          makna: 'Menjamin semua kendala $v(0)=0$, $v(10)=-3$, dan batas percepatan terpenuhi serentak.',
        },
      ],
      penurunanMatematis: [
        'Batas 1 memotong batas atap: $2,5 t_1 = 7,0 \\implies t_1 = 2,8\\text{ s}$.',
        'Sederhanakan batas 3: $v \\le -3,0 + 15,0 - 1,5t = 12,0 - 1,5t$.',
        'Batas 3 memotong batas atap: $12,0 - 1,5 t_2 = 7,0 \\implies 1,5 t_2 = 5,0 \\implies t_2 = \\frac{10}{3}\\text{ s} \\approx 3,333\\text{ s}$.',
        'Karena $t_2 > t_1$, ketiga batas membentuk trapesium optimal hingga $v = 0$ pada $12,0 - 1,5 t^* = 0 \\implies t^* = 8,0\\text{ s}$.',
      ],
      perhitungan: {
        langkah: [
          'Fase naik ($0 \\to 2,8$): $A_1 = \\frac{1}{2} \\times 2,8 \\times 7,0 = 9,8\\text{ m}$',
          'Fase konstan ($2,8 \\to \\frac{10}{3}$): $\\Delta t_2 = \\frac{10}{3} - \\frac{14}{5} = \\frac{8}{15}\\text{ s} \\implies A_2 = \\frac{8}{15} \\times 7,0 = \\frac{56}{15}\\text{ m}$',
          'Fase turun ($\\frac{10}{3} \\to 8,0$): $\\Delta t_3 = 8 - \\frac{10}{3} = \\frac{14}{3}\\text{ s} \\implies A_3 = \\frac{1}{2} \\times \\frac{14}{3} \\times 7,0 = \\frac{49}{3} = \\frac{245}{15}\\text{ m}$',
        ],
        substitusiHighlight: '$\\Delta x_{\\text{maks}} = 9,8 + \\frac{56}{15} + \\frac{245}{15} = \\frac{147 + 56 + 245}{15} = \\frac{448}{15} \\approx 29,8667\\text{ m} \\approx 29,9\\text{ m}$',
      },
      jawabanAkhir: {
        nilaiFormatted: '29,9',
        satuan: 'm',
        interpretasi:
          'Kurva amplop berbentuk trapesium dengan alas $8,0\\text{ s}$ dan atap $\\frac{8}{15}\\text{ s}$ menghasilkan perpindahan maksimum terbesar sebesar $29,9\\text{ m}$.',
      },
      insightOlimpiade: {
        berpikirCepat:
          'Begitu mengetahui batas trapesium memiliki alas $t^* = 8,0\\text{ s}$, atap $\\Delta t_2 = \\frac{8}{15}\\text{ s}$, dan tinggi $7,0\\text{ m/s}$, langsung hitung $\\frac{8 + 8/15}{2} \\times 7 = \\frac{64}{15} \\times 7 = \\frac{448}{15}\\text{ m}$!',
        trikSahih:
          'Untuk batas akhir $v(T)$, gambar garis mundur dari titik akhir $(T, v(T))$ menggunakan gradien paling landai ke atas (perlambatan maksimum $-|a_-|$) untuk menemukan amplop turun.',
        kesalahanUmum:
          'Lupa mengecek apakah garis naik dan garis turun sempat menyentuh atap $v_{\\text{batas}} = 7,0\\text{ m/s}$, atau keliru memakai luas sampai $t = 10,0\\text{ s}$.',
        polaSerupa:
          'Soal optimasi grafik $v-t$ standar OSK/OSP yang menyatukan konstruksi kurva dan konsep perpindahan maksimum.',
      },
    },
    feedback: {
      wrongHint:
        'Untuk memaksimalkan perpindahan maju, bangun amplop kurva $v-t$ setinggi mungkin: percepat maksimum hingga menyentuh $7,0\\text{ m/s}$, bertahan, lalu mengerem paling lambat menuju $(10; -3)$.',
      fixReasoning:
        'Tulis batas atas $v = 2,5t$, $v = 7,0$, dan garis mundur dari $(10;-3)$ yaitu $v = 12 - 1,5t$. Cari $t_1 = 2,8\\text{ s}$, $t_2 = \\frac{10}{3}\\text{ s}$, dan $t^* = 8,0\\text{ s}$, lalu hitung luas trapesiumnya.',
      recommendedModuleId: 'mod-4',
      correctPraise:
        'Mengagumkan! Anda menguasai metode amplop atas dalam optimasi kurva $v-t$ tingkat olimpiade.',
    },
    narration: {
      soalDanDiketahui:
        'Soal Nomor 13 adalah tantangan optimasi olimpiade. Mobil harus mencapai kecepatan minus tiga meter per detik pada detik kesepuluh dengan batas percepatan plus dua koma lima, batas perlambatan minus satu koma lima, dan batas kelajuan tujuh meter per detik. Kita mencari perpindahan maksimum terbesar yang mungkin dicapai.',
      pembahasanDanPenurunan:
        'Kuncinya adalah metode amplop atas pada grafik v-t. Mobil naik secepat mungkin dengan gradien dua koma lima dan menyentuh batas tujuh meter per detik pada dua koma delapan detik. Dari titik akhir sepuluh koma minus tiga, kita tarik garis mundur dengan kemiringan minus satu koma lima, yaitu v sama dengan dua belas minus satu koma lima t, yang menyentuh tujuh pada tiga satu per tiga detik dan memotong nol pada delapan detik. Luas trapesium optimal tersebut bernilai empat ratus empat puluh delapan per lima belas, yaitu dua puluh sembilan koma sembilan meter.',
      animasiDanInsight:
        'Simulasi menampilkan batas atas terlarang di grafik dan menunjukkan mengapa menyusuri garis amplop menghasilkan jarak paling jauh.',
    },
  },

  {
    id: 14,
    tier: 'olimpiade',
    tierLabel: 'Tantangan Olimpiade Kompleks',
    title: 'Jarak Terdekat Dua Kendaraan Sebelum Berbalik Arah',
    prompt:
      'Pada $t = 0$, Mobil A berada $20,0\\text{ m}$ di belakang Mobil B ($x_A(0) = 0$, $x_B(0) = 20,0\\text{ m}$). Keduanya bergerak pada lintasan lurus yang sama selama $0 \\le t \\le 7,0\\text{ s}$. Mobil A memiliki $v_A(0) = 11,0\\text{ m/s}$ dan diperlambat konstan $-2,0\\text{ m/s}^2$ sepanjang waktu. Mobil B mula-mula diam dan dipercepat konstan hingga mencapai $6,0\\text{ m/s}$ pada $t = 4,0\\text{ s}$, lalu melaju konstan $6,0\\text{ m/s}$. Berapakah jarak terdekat antara Mobil A dan Mobil B selama selang waktu tersebut (dalam satuan m)?',
    unit: 'm',
    expectedValue: 19 / 7,
    expectedFormatted: '2,7',
    stimulus: {
      mode: 'dual-v-t',
      xLabel: 't (s)',
      yLabel: 'v (m/s)',
      tMin: 0,
      tMax: 7.0,
      tStepMajor: 1.0,
      tStepGrid: 1.0,
      yMin: -4,
      yMax: 12,
      yStepMajor: 2,
      yStepGrid: 1,
      stimulusAnnotations: [
        { t: 0.4, y: 11.1, text: 'x_A(0) = 0', anchor: 'start' },
        { t: 4.5, y: 6.5, text: 'x_B(0) = 20,0 m', anchor: 'start' },
      ],
      objects: [
        {
          id: 'carA14',
          label: 'Mobil A',
          color: '#7A1228',
          initialX: 0,
          segments: [
            { tStart: 0, tEnd: 7.0, kind: 'linear-v', vStart: 11, vEnd: -3 },
          ],
        },
        {
          id: 'carB14',
          label: 'Mobil B',
          color: '#0369A1',
          initialX: 20.0,
          segments: [
            { tStart: 0, tEnd: 4.0, kind: 'linear-v', vStart: 0, vEnd: 6 },
            { tStart: 4.0, tEnd: 7.0, kind: 'linear-v', vStart: 6, vEnd: 6 },
          ],
        },
      ],
      proofHighlight: {
        tStar: 22 / 7,
        xStar: 19 / 7,
        label: 'Jarak Terdekat = 2,71 m saat v_A = v_B di t* = 22/7 s',
        phaseNotes: [
          { tFrom: 0, tTo: 22 / 7, note: 'Karena v_A > v_B, Mobil A terus mendekati B sehingga celah menyusut dari 20,0 m.' },
          { tFrom: 22 / 7, tTo: 5.5, note: 'Di t* = 3,14 s, v_A = v_B: celah mencapai minimum 2,71 m (A tidak pernah menyalip B).' },
          { tFrom: 5.5, tTo: 7.0, note: 'Mobil A berhenti di t = 5,5 s lalu mundur menjauhi B.' },
        ],
      },
    },
    explanation: {
      memahami: {
        fenomena:
          'Mobil A mengejar Mobil B yang start $20,0\\text{ m}$ di depan. Namun Mobil A terus melambat sementara Mobil B makin cepat. Apakah A berhasil menyusul B, atau jarak keduanya hanya menyusut ke suatu nilai minimum lalu melebar lagi?',
        diketahui: [
          '$x_B(0) - x_A(0) = 20,0\\text{ m}$',
          '$v_A(t) = 11,0 - 2,0t\\text{ m/s}$',
          '$v_B(t) = 1,5t\\text{ m/s}$ untuk $0 \\le t \\le 4,0\\text{ s}$, lalu $6,0\\text{ m/s}$',
        ],
        ditanyakan: 'Jarak terdekat $(x_B - x_A)_{\\text{min}}$ (atau $0$ jika bertabrakan/menyalip) dalam $\\text{m}$.',
      },
      identifikasi: {
        prinsip: 'Perpindahan relatif maksimum Mobil A terhadap Mobil B dari luas antara grafik $v_A$ dan $v_B$.',
        alasan:
          'Pengurangan celah antara B dan A tepat sama dengan $\\Delta x_{\\text{rel}}(t) = \\int_0^t (v_A - v_B)\\,d\\tau$. Jika $\\Delta x_{\\text{rel, maks}} < 20,0\\text{ m}$, A gagal menyusul dan jarak terdekatnya adalah $20,0 - \\Delta x_{\\text{rel, maks}}$.',
      },
      visualisasi: {
        deskripsiDiagram:
          'Di grafik $v-t$, daerah segitiga di antara garis turun $v_A$ dan garis naik $v_B$ hingga titik potongnya merupakan seberapa besar jarak awal $20,0\\text{ m}$ mampu dipersempit oleh A.',
        arahVektor:
          'Pada $t < t^*$, vektor kecepatan relatif $v_A - v_B > 0$ (mendekat). Pada $t = t^*$, $v_{\\text{rel}} = 0$.',
        catatanFbd:
          'Perhatikan kemiripan struktur: kita mencari luas segitiga di antara dua garis $v_A(t)$ dan $v_B(t)$ sebelum berpotongan.',
      },
      persamaanDasar: [
        {
          rumus: '$$d(t) = 20,0 - \\int_{0}^{t} \\big(v_A(\\tau) - v_B(\\tau)\\big)\\,d\\tau$$',
          simbol: '$d(t) = x_B(t) - x_A(t)$: jarak pisah pada saat $t$',
          makna: 'Minimum $d(t)$ bersesuaian dengan maksimum perpindahan relatif $A$ terhadap $B$.',
        },
      ],
      penurunanMatematis: [
        'Cek titik potong pada selang $0 \\le t \\le 4,0$: $v_A(t^*) = v_B(t^*) \\implies 11,0 - 2,0 t^* = 1,5 t^*$.',
        '$3,5 t^* = 11,0 \\implies t^* = \\frac{22}{7}\\text{ s} \\approx 3,143\\text{ s} < 4,0\\text{ s}$ (valid berada pada segmen linear B!).',
        'Luas segitiga pengurangan celah dari $t = 0$ sampai $t^* = \\frac{22}{7}\\text{ s}$ (alas $= \\frac{22}{7}$, tinggi awal $= 11,0 - 0 = 11,0\\text{ m/s}$):',
        '$\\Delta x_{\\text{rel, maks}} = \\frac{1}{2} \\times 11,0 \\times \\frac{22}{7} = \\frac{121}{7} \\approx 17,2857\\text{ m}$.',
      ],
      perhitungan: {
        langkah: [
          'Bandingkan dengan jarak awal: $17,2857\\text{ m} < 20,0\\text{ m}$, artinya A tidak pernah menyusul B!',
          'Jarak terdekat $d_{\\text{min}} = 20,0 - \\frac{121}{7} = \\frac{140 - 121}{7} = \\frac{19}{7}\\text{ m}$',
        ],
        substitusiHighlight: '$d_{\\text{min}} = \\frac{19}{7} \\approx 2,7143\\text{ m} \\approx 2,7\\text{ m}$',
      },
      jawabanAkhir: {
        nilaiFormatted: '2,7',
        satuan: 'm',
        interpretasi:
          'Mobil A sempat memperkecil jarak dari $20,0\\text{ m}$ menjadi hanya $2,7\\text{ m}$ pada $t = 3,14\\text{ s}$ sebelum tertinggal kembali.',
      },
      insightOlimpiade: {
        berpikirCepat:
          'Luas segitiga relatif langsung terbaca dari gambar grafik $v-t$: setengah dikali selisih kecepatan awal ($11\\text{ m/s}$) dikali waktu perpotongan ($22/7\\text{ s}$)!',
        trikSahih:
          'Selalu periksa apakah $\\Delta x_{\\text{rel, maks}} \\ge d_{\\text{awal}}$; jika ya, berarti terjadi penyalipan dan jarak terdekatnya nol!',
        kesalahanUmum:
          'Mengira jarak terdekat terjadi saat Mobil A berhenti ($t = 5,5\\text{ s}$), padahal sejak $t = 3,14\\text{ s}$ Mobil B sudah lebih cepat daripada A.',
        polaSerupa:
          'Masalah klasik kejar-kejaran pada grafik $v-t$ dalam OSK Fisika tingkat kota.',
      },
    },
    feedback: {
      wrongHint:
        'Jarak terdekat terjadi bukan saat A berhenti, melainkan saat kecepatan A dan B sama ($v_A = v_B$), yaitu pada $t^* = \\frac{22}{7}\\text{ s}$.',
      fixReasoning:
        'Hitung luas segitiga antara kurva $v_A$ dan $v_B$ dari $t = 0$ sampai titik potong $t^* = \\frac{22}{7}\\text{ s}$ ($\\frac{1}{2} \\times 11 \\times \\frac{22}{7}$), lalu kurangkan dari jarak awal $20,0\\text{ m}$.',
      recommendedModuleId: 'mod-4',
      correctPraise:
        'Sangat tajam! Anda melihat bahwa luas segitiga relatif $\\frac{121}{7}\\text{ m} < 20\\text{ m}$ langsung memberi celah minimum $2,7\\text{ m}$.',
    },
    narration: {
      soalDanDiketahui:
        'Soal Nomor 14. Mobil A mengejar Mobil B yang start dua puluh meter di depan. Mobil A berawal dari sebelas meter per detik dan melambat dua meter per detik kuadrat, sementara B dari diam dipercepat satu koma lima meter per detik kuadrat. Berapa jarak terdekat keduanya?',
      pembahasanDanPenurunan:
        'A terus mendekati B selama v A lebih besar dari v B, tepat sampai kedua kurva kecepatan berpotongan di v A sama dengan v B, yakni pada t bintang dua puluh dua per tujuh detik. Luas segitiga di antara kedua grafik hingga saat itu adalah setengah kali sebelas kali dua puluh dua per tujuh, yaitu seratus dua puluh satu per tujuh atau tujuh belas koma dua sembilan meter. Karena kurang dari dua puluh meter, A tidak menyalip B, dan jarak terdekatnya adalah dua puluh dikurangi tujuh belas koma dua sembilan, yaitu dua koma tujuh meter.',
      animasiDanInsight:
        'Lihat animasi dua mobil: Mobil A nyaris menyentuh bumper Mobil B pada tiga koma satu empat detik dengan jarak dua koma tujuh satu meter sebelum akhirnya tertinggal jauh.',
    },
  },

  {
    id: 15,
    tier: 'olimpiade',
    tierLabel: 'Tantangan Olimpiade Kompleks',
    title: 'Analisis Rasio Gradien & Perpindahan Bersih pada Kurva Simbolik',
    prompt:
      'Sebuah partikel bergerak sepanjang garis lurus dari $x(0) = 0$ selama $0 \\le t \\le 10,0\\text{ s}$. Kurva kecepatan $v(t)$ kontinu dan terdiri atas tiga segmen garis lurus: $(0; 0) \\to (2,0; v_1) \\to (6,0; -v_2) \\to (10,0; 0)$, dengan $v_1 > 0$ dan $v_2 > 0$. Diketahui besar percepatan pada segmen kedua ($2,0 \\le t \\le 6,0\\text{ s}$) adalah $1,5$ kali besar percepatan pada segmen pertama ($0 \\le t \\le 2,0\\text{ s}$), dan perpindahan bersih partikel di akhir $t = 10,0\\text{ s}$ adalah $-14,0\\text{ m}$. Tentukan perpindahan maksimum ke arah positif yang dicapai partikel tersebut (dalam satuan m).',
    unit: 'm',
    expectedValue: 14 / 3,
    expectedFormatted: '4,7',
    stimulus: {
      mode: 'v-t',
      xLabel: 't (s)',
      yLabel: 'v (m/s)',
      tMin: 0,
      tMax: 10.0,
      tStepMajor: 2.0,
      tStepGrid: 1.0,
      yMin: -7,
      yMax: 4,
      yStepMajor: 2,
      yStepGrid: 1,
      symbolicYLabel: {
        yValue: 2.8,
        label: 'v₁',
      },
      stimulusAnnotations: [
        { t: 6.2, y: -5.6, text: '-v₂', anchor: 'start', dx: 6 },
        { t: 4.5, y: -2.0, text: '|a₂| = 1,5 a₁', anchor: 'start', dx: 8 },
      ],
      objects: [
        {
          id: 'part15',
          label: 'Partikel',
          color: '#7A1228',
          initialX: 0,
          segments: [
            { tStart: 0, tEnd: 2.0, kind: 'linear-v', vStart: 0, vEnd: 2.8 },
            { tStart: 2.0, tEnd: 6.0, kind: 'linear-v', vStart: 2.8, vEnd: -5.6 },
            { tStart: 6.0, tEnd: 10.0, kind: 'linear-v', vStart: -5.6, vEnd: 0 },
          ],
        },
      ],
      proofHighlight: {
        tStar: 10 / 3,
        xStar: 14 / 3,
        label: 'v₁ = 2,8 m/s, v₂ = 5,6 m/s → Δx_maks = 4,7 m di t* = 3⅓ s',
        phaseNotes: [
          { tFrom: 0, tTo: 2.0, note: 'Dari rasio |a₂| = 1,5 a₁ didapat v₂ = 2 v₁ dan titik balik t* = 3⅓ s.' },
          { tFrom: 2.0, tTo: 10 / 3, note: 'Luas positif total 0 → 3⅓ s adalah (5/3) v₁ = 4,67 m.' },
          { tFrom: 10 / 3, tTo: 6.0, note: 'Partikel berbalik arah ke negatif melewati titik asal.' },
          { tFrom: 6.0, tTo: 10.0, note: 'Berhenti tepat di x(10,0) = -14,0 m.' },
        ],
      },
    },
    explanation: {
      memahami: {
        fenomena:
          'Kurva $v(t)$ memiliki dua parameter kecepatan tak diketahui ($v_1$ dan $v_2$) yang saling terikat oleh rasio gradien percepatan dan kendala perpindahan bersih akhir.',
        diketahui: [
          'Kurva $(0; 0) \\to (2,0; v_1) \\to (6,0; -v_2) \\to (10,0; 0)$',
          '$|a_2| = 1,5 a_1$',
          '$\\Delta x(10,0) = -14,0\\text{ m}$',
        ],
        ditanyakan: 'Perpindahan maksimum ke arah positif $\\Delta x_{\\text{maks}}$ (dalam $\\text{m}$).',
      },
      identifikasi: {
        prinsip: 'Hubungan gradien kurva $v-t$, kesebangunan segitiga titik potong $v = 0$, dan luas bertanda total.',
        alasan:
          'Rasio gradien $|a_2|/a_1$ langsung mengunci perbandingan $v_2 / v_1$ dan lokasi waktu titik balik $t^*$ tanpa perlu mengetahui nilai numerik $v_1$ terlebih dahulu.',
      },
      visualisasi: {
        deskripsiDiagram:
          'Kurva membentuk satu segitiga di atas sumbu-$t$ ($0 \\to t^*$) dan satu segitiga lebih besar di bawah sumbu-$t$ ($t^* \\to 10,0$).',
        arahVektor:
          'Perpindahan maksimum positif tercapai di titik potong sumbu-$t$ pada $t^*$.',
        catatanFbd:
          'Perhatikan bahwa kurva $v-t$ pada segmen 2 turun lurus sejauh $v_1 + v_2$ selama $\\Delta t_2 = 4,0\\text{ s}$.',
      },
      persamaanDasar: [
        {
          rumus: '$$a_1 = \\frac{v_1}{2,0}, \\qquad |a_2| = \\frac{v_1 + v_2}{4,0}$$',
          simbol: '$v_1$: puncak kecepatan positif, $v_2$: besar kecepatan negatif di $t = 6,0\\text{ s}$',
          makna: 'Menghubungkan geometri titik sudut kurva dengan syarat percepatan.',
        },
      ],
      penurunanMatematis: [
        'Gunakan $|a_2| = 1,5 a_1$: $\\frac{v_1 + v_2}{4} = 1,5 \\left(\\frac{v_1}{2}\\right) = \\frac{3}{4} v_1 \\implies v_1 + v_2 = 3 v_1 \\implies v_2 = 2 v_1$.',
        'Cari titik potong $v(t^*) = 0$ pada segmen $2,0 \\le t \\le 6,0$: karena $v$ turun dari $+v_1$ ke $-2v_1$, titik nol membagi interval $4,0\\text{ s}$ dengan rasio $1 : 2$, sehingga $t^* = 2,0 + \\frac{1}{3}(4,0) = \\frac{10}{3}\\text{ s}$.',
        'Nyatakan luas segitiga positif ($0 \\to \\frac{10}{3}$): $A_+ = \\frac{1}{2} \\left(\\frac{10}{3}\\right) v_1 = \\frac{5}{3} v_1$.',
        'Nyatakan luas segitiga negatif ($\\frac{10}{3} \\to 10,0$, alas $= 10 - \\frac{10}{3} = \\frac{20}{3}\\text{ s}$, tinggi $v_2 = 2v_1$): $A_- = \\frac{1}{2} \\left(\\frac{20}{3}\\right)(2 v_1) = \\frac{20}{3} v_1$.',
        'Gunakan perpindahan bersih $\\Delta x(10,0) = A_+ - A_- = -14,0\\text{ m}$: $\\frac{5}{3}v_1 - \\frac{20}{3}v_1 = -5 v_1 = -14,0$.',
      ],
      perhitungan: {
        langkah: [
          '$-5 v_1 = -14,0 \\implies v_1 = \\frac{14}{5} = 2,8\\text{ m/s}$ (dan $v_2 = 5,6\\text{ m/s}$)',
          '$\\Delta x_{\\text{maks}} = A_+ = \\frac{5}{3} v_1 = \\frac{5}{3} \\times \\frac{14}{5} = \\frac{14}{3}\\text{ m}$',
        ],
        substitusiHighlight: '$\\Delta x_{\\text{maks}} = \\frac{14}{3} \\approx 4,6667\\text{ m} \\approx 4,7\\text{ m}$',
      },
      jawabanAkhir: {
        nilaiFormatted: '4,7',
        satuan: 'm',
        interpretasi:
          'Partikel sempat maju sejauh $4,7\\text{ m}$ hingga $t = 3,33\\text{ s}$, lalu mundur $18,7\\text{ m}$ sehingga berakhir di $-14,0\\text{ m}$.',
      },
      insightOlimpiade: {
        berpikirCepat:
          'Perhatikan keajaiban rasio segitiga sebangun: $A_+ = \\frac{5}{3} v_1$ dan $A_- = \\frac{20}{3} v_1 = 4 A_+$! Jadi $A_+ - A_- = -3 A_+ = -14,0 \\implies A_+ = \\frac{14}{3}\\text{ m}$ tanpa perlu mencari $v_1$ sekalipun!',
        trikSahih:
          'Karena segitiga atas dan bawah keduanya berujung pada sumbu-$t$, perbandingan alasnya ($\\frac{10}{3} : \\frac{20}{3} = 1 : 2$) dan perbandingan tingginya ($v_1 : 2v_1 = 1 : 2$) langsung memberi rasio luas $1 : 4$!',
        kesalahanUmum:
          'Mengira $a_2 = -v_2 / 4$ (lupa bahwa pada segmen kedua kecepatan berubah dari $+v_1$ ke $-v_2$, bukan dari $0$ ke $-v_2$).',
        polaSerupa:
          'Puncak penalaran aljabar-geometri kurva $v-t$ yang menumbuhkan intuisi tingkat OSK dan OSP.',
      },
    },
    feedback: {
      wrongHint:
        'Perhatikan perubahan kecepatan pada segmen kedua: dari $+v_1$ menuju $-v_2$, besar perubahannya adalah $v_1 + v_2$, bukan sekadar $v_2$.',
      fixReasoning:
        'Gunakan $\\frac{v_1 + v_2}{4} = 1,5(\\frac{v_1}{2})$ untuk memperoleh $v_2 = 2v_1$, tentukan titik potong $t^* = \\frac{10}{3}\\text{ s}$, lalu susun $A_+ - A_- = -14,0\\text{ m}$.',
      recommendedModuleId: 'mod-4',
      correctPraise:
        'Sensasional! Anda menaklukkan soal tantangan final OSK tingkat kota dengan elegan dan tepat.',
    },
    narration: {
      soalDanDiketahui:
        'Soal Nomor 15, tantangan final tingkat kota. Kurva kecepatan naik dari nol ke v satu di detik dua, turun memotong sumbu waktu ke minus v dua di detik enam, dan kembali ke nol di detik sepuluh. Besar percepatan segmen kedua adalah satu koma lima kali segmen pertama, dan perpindahan akhirnya minus empat belas meter.',
      pembahasanDanPenurunan:
        'Dari rasio gradien, v satu tambah v dua dibagi empat sama dengan satu koma lima kali v satu dibagi dua, menghasilkan v dua sama dengan dua v satu. Artinya garis turun memotong nol di sepertiga interval empat detik, yaitu pada tiga satu per tiga detik. Segitiga positif beralas tiga satu per tiga dengan tinggi v satu, sedangkan segitiga negatif beralas dua kali lipatnya dengan tinggi dua v satu, sehingga luas negatif tepat empat kali luas positif. Selisihnya minus tiga kali luas positif sama dengan minus empat belas, maka perpindahan maksimum positif langsung bernilai empat belas per tiga, yaitu empat koma tujuh meter.',
      animasiDanInsight:
        'Nikmati simulasi pembuktian: luas merah positif sebesar empat koma enam tujuh meter dan luas negatif empat kali lipatnya sebesar delapan belas koma enam tujuh meter menghasilkan posisi akhir tepat minus empat belas meter.',
    },
  },
];
