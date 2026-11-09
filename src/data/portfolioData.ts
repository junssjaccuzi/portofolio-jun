import { PortfolioData, NPC, Station } from '../types/portfolio';

export const portfolioData: PortfolioData = {
  name: "Rendra Adie Permana",
  nickname: "Jun",
  roles: [
    "Full-Stack Developer",
    "Machine Learning & AI Models",
    "Scalable Cloud Infrastructure",
    "Next.js & Django Ecosystems",
    "Full-Stack Web Systems"
  ],
  primaryRole: "Full-Stack Developer & AI Specialist",
  location: "Kota Tasikmalaya, Jawa Barat, Indonesia",
  tagline: "A Life in Progress.",
  bio: [
    "Halo! Saya Rendra Adie Permana (akrab disapa Jun), seorang Full-Stack Developer dan praktisi AI/Machine Learning asal Kota Tasikmalaya. Saya berfokus pada penciptaan sistem web modern berperforma tinggi serta integrasi kecerdasan buatan dan Artificial Neural Networks ke dalam solusi digital dunia nyata.",
    "Bagi saya, setiap baris kode adalah jembatan antara logika mesin dan nilai guna nyata bagi manusia. Dari arsitektur backend Django & Node.js yang tangguh, antarmuka reaktif Next.js & React, hingga perancangan model deep learning dan infrastruktur cloud yang scalable—semuanya dibangun dengan ketelitian dan semangat belajar tanpa henti."
  ],
  philosophy: "“Teknologi terbaik bukan hanya tentang kode yang rumit, melainkan tentang bagaimana arsitektur yang elegan memecahkan masalah nyata dan terus berkembang seiring waktu.”",
  stats: [
    { label: "Domisili", value: "Tasikmalaya, ID" },
    { label: "Fokus Utama", value: "Full-Stack & AI" },
    { label: "Core Stack", value: "Next.js & Django" },
    { label: "Status", value: "Terbuka Kolaborasi" }
  ],
  skillCategories: [
    {
      title: "Artificial Intelligence & ML",
      skills: [
        { name: "Machine Learning Models", level: 90 },
        { name: "Artificial Neural Networks (ANN)", level: 88 },
        { name: "Python (NumPy, Pandas, Scikit)", level: 92 },
        { name: "Computer Vision & NLP Basics", level: 82 },
        { name: "AI Workflow & Model Deployment", level: 85 }
      ]
    },
    {
      title: "Frontend Engineering",
      skills: [
        { name: "React.js & Next.js", level: 95 },
        { name: "TypeScript / JavaScript", level: 90 },
        { name: "Tailwind CSS & Modern UI", level: 94 },
        { name: "State Management & React Hooks", level: 90 },
        { name: "Responsive & Accessible Design", level: 92 }
      ]
    },
    {
      title: "Backend & Systems",
      skills: [
        { name: "Django & Django REST Framework", level: 92 },
        { name: "Node.js & Express", level: 88 },
        { name: "RESTful API & GraphQL Design", level: 90 },
        { name: "PostgreSQL, MySQL & MongoDB", level: 86 },
        { name: "Scalable Cloud Architecture", level: 84 }
      ]
    },
    {
      title: "DevOps & Tools",
      skills: [
        { name: "Git, GitHub & Version Control", level: 92 },
        { name: "Docker Containerization", level: 84 },
        { name: "CI/CD Pipeline Automation", level: 82 },
        { name: "Linux System Administration", level: 86 }
      ]
    }
  ],
  projects: [
    {
      id: "ai-neural-vision",
      title: "Neural Vision Classifier & Deep Learning Pipeline",
      category: "AI & ML",
      badge: "Featured AI",
      description: "Sistem arsitektur Artificial Neural Network (ANN) untuk analisis klasifikasi pola data multi-dimensi dengan pemrosesan waktu nyata, evaluasi metrik akurasi tinggi, dan dashboard analitik interaktif.",
      highlights: [
        "Optimalisasi arsitektur multilayer neural network untuk prediksi presisi tinggi",
        "Pipeline otomatis pra-pemrosesan data menggunakan Python & pustaka komputasi numerik",
        "Visualisasi metrik loss & akurasi interaktif untuk monitoring pelatihan model"
      ],
      techStack: ["Python", "Neural Networks", "NumPy", "Scikit-Learn", "FastAPI"],
      demoUrl: "#",
      githubUrl: "https://github.com"
    },
    {
      id: "enterprise-nextjs-django",
      title: "Scalable Enterprise Web Ecosystem",
      category: "Full-Stack",
      badge: "Production Ready",
      description: "Platform web berskala enterprise yang mengawinkan kecepatan Server-Side Rendering Next.js dengan stabilitas arsitektur backend Django ORM, authentication aman, dan manajemen transaksi kompleks.",
      highlights: [
        "Desain decoupled architecture: Next.js frontend + Django REST API backend",
        "Keamanan tingkat lanjut dengan JWT, role-based access control, dan data sanitization",
        "Caching layer untuk waktu respon sub-100ms pada beban pengguna tinggi"
      ],
      techStack: ["Next.js", "TypeScript", "Django", "PostgreSQL", "Tailwind CSS"],
      demoUrl: "#",
      githubUrl: "https://github.com"
    },
    {
      id: "cloud-microservices-hub",
      title: "Cloud Infrastructure & Distributed Microservices",
      category: "Cloud & Systems",
      badge: "Infrastructure",
      description: "Infrastruktur cloud terdistribusi berbasis container Docker dan orkestrasi microservice yang dirancang untuk ketersediaan tinggi (high availability) dan skalabilitas elastis.",
      highlights: [
        "Otomasi deployment dengan continuous integration / continuous delivery (CI/CD)",
        "Monitoring performa sistem dan logging terpusat",
        "Arsitektur database relasional teroptimasi dengan connection pooling"
      ],
      techStack: ["Docker", "Linux", "Node.js", "Redis", "Cloud Architecture"],
      demoUrl: "#",
      githubUrl: "https://github.com"
    },
    {
      id: "smart-analytics-suite",
      title: "Predictive Analytics & Real-Time Dashboard",
      category: "AI & ML",
      badge: "Data Science",
      description: "Aplikasi analitik prediktif berbasis machine learning yang mengolah tren historis menjadi estimasi keputusan bisnis secara dinamis dengan visualisasi data interaktif.",
      highlights: [
        "Model regresi dan klasifikasi cerdas untuk mendeteksi anomali data",
        "Integrasi antarmuka real-time charts dengan pembaruan data asinkron",
        "Export laporan otomatis ke berbagai format analitik"
      ],
      techStack: ["Python", "React", "TypeScript", "Tailwind CSS", "REST API"],
      demoUrl: "#",
      githubUrl: "https://github.com"
    }
  ],
  education: [
    {
      institution: "Universitas Perjuangan Tasikmalaya",
      level: "Pendidikan Tinggi (Higher Education)",
      period: "Masa Studi Kuliah",
      location: "Kota Tasikmalaya, Jawa Barat",
      description: "Menempuh pendidikan tinggi di Perjuangan University dengan fokus pendalaman ilmu teknologi informasi, komputasi terstruktur, algoritma pemrograman, dan eksplorasi rekayasa perangkat lunak modern.",
      badge: "Universitas"
    },
    {
      institution: "SMA Negeri 8 Tasikmalaya",
      level: "Sekolah Menengah Atas (High School)",
      period: "Masa Studi SMA",
      location: "Kota Tasikmalaya, Jawa Barat",
      description: "Fase penguatan fondasi logika, sains terapan, kepemimpinan, dan ketertarikan mendalam dalam eksplorasi dunia komputasi dan matematika terapan.",
      badge: "SMA"
    },
    {
      institution: "SMP Negeri 4 Tasikmalaya",
      level: "Sekolah Menengah Pertama (Junior High)",
      period: "Masa Studi SMP",
      location: "Kota Tasikmalaya, Jawa Barat",
      description: "Awal mula tumbuhnya rasa ingin tahu terhadap teknologi digital, eksplorasi perangkat komputer, dan pembelajaran dasar sains analitis.",
      badge: "SMP"
    },
    {
      institution: "SD Negeri 1 Lewo",
      level: "Sekolah Dasar (Elementary School)",
      period: "Masa Studi SD",
      location: "Tasikmalaya, Jawa Barat",
      description: "Langkah awal pendidikan formal, menanamkan nilai-nilai integritas, kerja keras, dan kecintaan pada ilmu pengetahuan sejak dini.",
      badge: "SD"
    }
  ],
  experiences: [
    {
      role: "Full-Stack & AI Systems Developer",
      company: "Independent Projects & Technology Consulting",
      period: "Sekarang",
      type: "Professional Focus",
      description: [
        "Membangun arsitektur perangkat lunak full-stack tangguh menggunakan ekosistem Next.js di frontend dan Django/Node.js di backend.",
        "Merancang dan melatih model Machine Learning serta Artificial Neural Networks untuk kebutuhan automasi dan pemrosesan data cerdas.",
        "Mengonfigurasi infrastruktur cloud, database relasional teroptimasi, dan containerization untuk skalabilitas sistem."
      ],
      skills: ["Next.js", "Django", "Machine Learning", "Neural Networks", "PostgreSQL", "Docker"]
    },
    {
      role: "Software Engineering & Systems Research",
      company: "Academic & Tech Initiatives",
      period: "Tasikmalaya Ecosystem",
      type: "Research & Development",
      description: [
        "Mengeksplorasi integrasi modern web frameworks dengan machine learning pipelines untuk menciptakan aplikasi cerdas berbasis web.",
        "Mengembangkan antarmuka pengguna interaktif dan responsif dengan performa tinggi dan aksesibilitas ramah pengguna.",
        "Melakukan audit kode dan optimasi query database untuk menjamin efisiensi performa aplikasi."
      ],
      skills: ["React", "TypeScript", "Python", "REST APIs", "Tailwind CSS", "Git"]
    }
  ],
  contact: {
    email: "junssjaccuzi@gmail.com",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
    whatsapp: "https://wa.me/",
    locationText: "Kota Tasikmalaya, Jawa Barat, Indonesia"
  }
};

export const stations: Station[] = [
  {
    id: "about",
    index: "01",
    title: "TENTANG",
    subtitle: "Profil & Lokasi",
    icon: "🚏",
    positionX: 511,
    topPercent: "52%",
    color: "#f59e0b"
  },
  {
    id: "experience",
    index: "02",
    title: "PENGALAMAN",
    subtitle: "Riwayat Kerja",
    icon: "☕",
    positionX: 2664,
    topPercent: "52%",
    color: "#fb923c"
  },
  {
    id: "projects",
    index: "03",
    title: "PROYEK",
    subtitle: "Karya & Riset",
    icon: "⚡",
    positionX: 5400,
    topPercent: "55%",
    color: "#38bdf8"
  },
  {
    id: "education",
    index: "04",
    title: "PENDIDIKAN",
    subtitle: "Riwayat Belajar",
    icon: "📖",
    positionX: 6912,
    topPercent: "54%",
    color: "#a855f7"
  },
  {
    id: "contact",
    index: "05",
    title: "KONTAK",
    subtitle: "Pesan & Surel",
    icon: "✉️",
    positionX: 8100,
    topPercent: "52%",
    color: "#ec4899"
  }
];

export const npcs: NPC[] = [
  {
    id: "oren-cat",
    name: "Oren si Kucing",
    title: "Kucing Penjaga Halte",
    positionX: 846,
    topPercent: "79%",
    sheetUrl: "/characters/cat-oren-idle-sheet.png",
    sheetWidth: 131,
    sheetHeight: 174,
    animationType: "idle-4frame",
    animationDuration: "2.2s",
    animationDelay: "-1.4s",
    avatarEmoji: "🐱",
    roleDescription: "Kucing jalanan yang setia menemani langkah para pengelana di kota senja.",
    dialogue: [
      "Meong! Selamat datang di dunia portofolio Jun!",
      "Jun adalah developer handal dari Kota Tasikmalaya. Dia sering coding sampai larut sambil ngopi!",
      "Gunakan tombol A/D, tombol panah di keyboard, atau tap layar untuk jalan ke halte berikutnya ya! Meoong~"
    ],
    specialFact: "Oren suka tidur di samping keyboard saat Jun sedang melatih model Neural Network."
  },
  {
    id: "maya",
    name: "Maya",
    title: "Peneliti Teknologi",
    positionX: 2952,
    topPercent: "79%",
    sheetUrl: "/characters/maya-idle-sheet.png",
    sheetWidth: 256,
    sheetHeight: 342,
    animationType: "idle-4frame",
    animationDuration: "2.6s",
    animationDelay: "-0.6s",
    avatarEmoji: "👩‍💻",
    roleDescription: "Seorang engineer yang kagum pada integrasi AI dan Full-Stack web.",
    dialogue: [
      "Hai! Senang bertemu denganmu di dekat stasiun proyek!",
      "Jun sangat mendalami kombinasi Next.js dan Django—arsitektur yang memadukan kecepatan antarmuka dengan kehandalan backend.",
      "Proyek AI dan Neural Network-nya di Pos 03 benar-benar patut kamu intip!"
    ],
    specialFact: "Maya sering bertukar ide arsitektur cloud dengan Jun di sela-sela proyek."
  },
  {
    id: "farmer",
    name: "Pak Tani",
    title: "Petani Teladan",
    positionX: 6228,
    topPercent: "79%",
    sheetUrl: "/characters/farmer-idle-sheet.png",
    sheetWidth: 256,
    sheetHeight: 342,
    animationType: "idle-4frame",
    animationDuration: "3s",
    animationDelay: "-2.1s",
    avatarEmoji: "🌾",
    roleDescription: "Sosok bijak yang menyaksikan tekad belajar Jun dari masa sekolah.",
    dialogue: [
      "Sampurasun, anom! Sedang mengamati perjalanan belajar Kang Jun ya?",
      "Dari SD Negeri 1 Lewo, SMPN 4, SMAN 8, hingga Universitas Perjuangan di Tasikmalaya, Kang Jun selalu tekun menuntut ilmu.",
      "Seperti padi di sawah, semakin berisi semakin merunduk. Teruslah berkarya untuk tanah kelahiran!"
    ],
    specialFact: "Pak Tani selalu mengingatkan agar jangan lupa istirahat saat mengejar cita-cita."
  },
  {
    id: "crow",
    name: "Gagak",
    title: "Pengawas Cakrawala",
    positionX: 7812,
    topPercent: "51%",
    sheetUrl: "/characters/crow-idle-sheet.png",
    sheetWidth: 144,
    sheetHeight: 192,
    animationType: "idle-4frame",
    animationDuration: "3.2s",
    animationDelay: "-1.1s",
    avatarEmoji: "🦅",
    roleDescription: "Burung gagak misterius yang bertengger di dahan pohon senja.",
    dialogue: [
      "Kraak! Angin senja membawa kabar baik dari Pos Pengalaman!",
      "Infrastruktur awan yang scalable, container Docker yang rapi, dan sistem microservice tangguh... semuanya diracik dengan cermat oleh Jun!",
      "Lompatlah ke halte berikutnya untuk menyapa dan mengirim pesan ke Jun! Kraak!"
    ],
    specialFact: "Gagak ini mengawasi kestabilan server di atas langit awan."
  },
  {
    id: "clara",
    name: "Clara",
    title: "Sahabat Diskusi",
    positionX: 7668,
    topPercent: "79%",
    sheetUrl: "/characters/clara-sit-idle-sheet.png",
    sheetWidth: 198,
    sheetHeight: 264,
    animationType: "seated-blink",
    animationDuration: "5.8s",
    animationDelay: "-2.3s",
    avatarEmoji: "☕",
    roleDescription: "Teman minum teh yang sedang menikmati pemandangan senja.",
    dialogue: [
      "Halo! Senja di dunia ini indah sekali ya?",
      "Pencapaian yang diraih Jun adalah buah dari dedikasi bertahun-tahun dalam menekuni dunia software engineering.",
      "Sebentar lagi kamu akan sampai di halte terakhir: Kotak Pesan Jun! Jangan ragu menyapanya lewat email ya."
    ],
    specialFact: "Clara paling suka kopi hangat khas Priangan Timur."
  },
  {
    id: "ibu-warung",
    name: "Ibu Warung",
    title: "Pemilik Kedai Senja",
    positionX: 9720,
    topPercent: "79%",
    sheetUrl: "/characters/ibu-warung-idle-sheet.png",
    sheetWidth: 198,
    sheetHeight: 264,
    animationType: "seated-blink",
    animationDuration: "6.2s",
    animationDelay: "-3.1s",
    avatarEmoji: "🍵",
    roleDescription: "Ibu ramah pemilik warung di ujung jalur portofolio.",
    dialogue: [
      "Mangga linggih! Selamat sudah berjalan jauh sampai ke ujung dunia senja ini!",
      "Kang Jun orangnya ramah dan selalu terbuka untuk diskusi proyek, freelance, maupun kolaborasi teknologi.",
      "Surelnya junssjaccuzi@gmail.com selalu siap menerima pesan dari kawan-kawan sekalian!"
    ],
    specialFact: "Warung Ibu menyediakan teh manis hangat gratis bagi setiap pengunjung portofolio."
  }
];

export const inspirationalQuotes: string[] = [
  "“A life in progress: setiap langkah kecil dalam kode adalah batu pijakan menuju mahakarya besar.”",
  "“Dari Kota Tasikmalaya untuk inovasi teknologi masa depan.”",
  "“Elegansi bukan tentang ketiadaan kekurangan, melainkan ketelitian dalam setiap penyempurnaan.”",
  "“Jembatan antara kecerdasan buatan dan sentuhan manusia adalah empati sang pencipta sistem.”",
  "“Belajar tanpa henti: dari bangku sekolah dasar hingga arsitektur neural network dunia nyata.”"
];
