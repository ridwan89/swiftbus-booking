// Mock Data untuk Bus Pick & Drop Add-on

export interface Bus {
  id: string;
  operator: string;
  logo: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  from: string;
  to: string;
  price: number;
  class: string;
  amenities: string[];
  seatsAvailable: number;
}

export interface BookingData {
  id: string;
  bus: Bus;
  passenger: {
    name: string;
    phone: string;
    email: string;
  };
  pickupEnabled: boolean;
  dropoffEnabled: boolean;
  pickupLocation?: string;
  dropoffLocation?: string;
  pickupPrice: number;
  dropoffPrice: number;
  pickupTime?: string;
  status: TrackingStatus;
}

export type TrackingStatus = 
  | 'waiting_pickup'
  | 'driver_on_way'
  | 'arrived_at_pool'
  | 'bus_departed'
  | 'bus_arrived'
  | 'driver_dropping'
  | 'completed';

export interface TrackingStep {
  id: number;
  title: string;
  description: string;
  status: 'completed' | 'active' | 'pending';
  time?: string;
  icon: 'motorcycle' | 'building' | 'bus' | 'mapPin' | 'checkCircle';
}

export interface Passenger {
  id: string;
  name: string;
  phone: string;
  seatNumber: string;
  from: string;
  to: string;
  busOperator: string;
  departureTime: string;
  pickupEnabled: boolean;
  pickupStatus: 'not_applicable' | 'pending' | 'driver_assigned' | 'picked_up' | 'delivered_to_pool';
  driverName?: string;
  driverPhone?: string;
  pickupLocation?: string;
}

// Data Bus
export const buses: Bus[] = [
  {
    id: 'bus-001',
    operator: 'PO 27Trans',
    logo: '🚌',
    departureTime: '06:00',
    arrivalTime: '14:00',
    duration: '8 jam',
    from: 'Jakarta',
    to: 'Surabaya',
    price: 350000,
    class: 'Executive',
    amenities: ['AC', 'WiFi', 'Toilet', 'Selimut', 'Bantal'],
    seatsAvailable: 12,
  },
  {
    id: 'bus-002',
    operator: 'Rosalia Indah',
    logo: '🚍',
    departureTime: '08:00',
    arrivalTime: '16:30',
    duration: '8.5 jam',
    from: 'Jakarta',
    to: 'Surabaya',
    price: 320000,
    class: 'VIP',
    amenities: ['AC', 'WiFi', 'Snack', 'Selimut'],
    seatsAvailable: 8,
  },
  {
    id: 'bus-003',
    operator: 'Sumber Alam',
    logo: '🚌',
    departureTime: '10:00',
    arrivalTime: '18:00',
    duration: '8 jam',
    from: 'Jakarta',
    to: 'Surabaya',
    price: 280000,
    class: 'Bisnis',
    amenities: ['AC', 'Toilet', 'Snack'],
    seatsAvailable: 20,
  },
  {
    id: 'bus-004',
    operator: 'Haryanto',
    logo: '🚍',
    departureTime: '19:00',
    arrivalTime: '03:00',
    duration: '8 jam',
    from: 'Jakarta',
    to: 'Surabaya',
    price: 300000,
    class: 'Executive',
    amenities: ['AC', 'WiFi', 'Toilet', 'Selimut', 'Bantal', 'Charger'],
    seatsAvailable: 15,
  },
  {
    id: 'bus-005',
    operator: 'Pahala Kencana',
    logo: '🚌',
    departureTime: '21:00',
    arrivalTime: '05:30',
    duration: '8.5 jam',
    from: 'Jakarta',
    to: 'Surabaya',
    price: 375000,
    class: 'Super Executive',
    amenities: ['AC', 'WiFi', 'Toilet', 'Selimut', 'Bantal', 'Charger', 'TV'],
    seatsAvailable: 6,
  },
];

// Harga Pick & Drop berdasarkan jarak (simulasi)
export const pickDropPrices = {
  short: 15000,   // < 5 km
  medium: 25000,  // 5-10 km
  long: 40000,    // > 10 km
};

// Lokasi pickup/dropoff populer
export const popularLocations = [
  'Rumah (Input Alamat)',
  'Stasiun Gambir',
  'Bandara Soekarno-Hatta',
  'Mall Grand Indonesia',
  'Monas',
  'Universitas Indonesia',
  'Rumah Sakit Cipto',
  'Terminal Pulogebang',
];

// Mock passengers untuk admin
export const passengers: Passenger[] = [
  {
    id: 'pax-001',
    name: 'Ahmad Hidayat',
    phone: '0812-3456-7890',
    seatNumber: 'A1',
    from: 'Jakarta',
    to: 'Surabaya',
    busOperator: 'PO 27Trans',
    departureTime: '06:00',
    pickupEnabled: true,
    pickupStatus: 'picked_up',
    driverName: 'Budi Santoso',
    driverPhone: '0878-1234-5678',
    pickupLocation: 'Jl. Sudirman No. 45, Jakarta Selatan',
  },
  {
    id: 'pax-002',
    name: 'Siti Rahayu',
    phone: '0857-9876-5432',
    seatNumber: 'A2',
    from: 'Jakarta',
    to: 'Surabaya',
    busOperator: 'PO 27Trans',
    departureTime: '06:00',
    pickupEnabled: true,
    pickupStatus: 'driver_assigned',
    driverName: 'Dedi Kurniawan',
    driverPhone: '0821-5678-1234',
    pickupLocation: 'Jl. Gatot Subroto No. 12, Jakarta Selatan',
  },
  {
    id: 'pax-003',
    name: 'Rudi Hermawan',
    phone: '0813-5555-4444',
    seatNumber: 'B1',
    from: 'Jakarta',
    to: 'Surabaya',
    busOperator: 'PO 27Trans',
    departureTime: '06:00',
    pickupEnabled: false,
    pickupStatus: 'not_applicable',
  },
  {
    id: 'pax-004',
    name: 'Dewi Lestari',
    phone: '0856-7777-8888',
    seatNumber: 'B2',
    from: 'Jakarta',
    to: 'Surabaya',
    busOperator: 'PO 27Trans',
    departureTime: '06:00',
    pickupEnabled: true,
    pickupStatus: 'pending',
    pickupLocation: 'Apartemen Thamrin Residences, Jakarta Pusat',
  },
  {
    id: 'pax-005',
    name: 'Bambang Wijaya',
    phone: '0899-1111-2222',
    seatNumber: 'C1',
    from: 'Jakarta',
    to: 'Surabaya',
    busOperator: 'PO 27Trans',
    departureTime: '06:00',
    pickupEnabled: true,
    pickupStatus: 'delivered_to_pool',
    driverName: 'Agus Prasetyo',
    driverPhone: '0877-3333-4444',
    pickupLocation: 'Jl. HR Rasuna Said, Kuningan',
  },
];

// Tracking data
export const getTrackingSteps = (status: TrackingStatus): TrackingStep[] => {
  const steps: TrackingStep[] = [
    {
      id: 1,
      title: 'Driver Ojol Menjemput',
      description: 'Driver sedang menuju lokasi penjemputan Anda',
      status: 'pending',
      icon: 'motorcycle',
    },
    {
      id: 2,
      title: 'Tiba di Pool/Agen Bus',
      description: 'Anda telah tiba di titik keberangkatan bus',
      status: 'pending',
      icon: 'building',
    },
    {
      id: 3,
      title: 'Bus Berangkat',
      description: 'Perjalanan antar kota dimulai',
      status: 'pending',
      icon: 'bus',
    },
    {
      id: 4,
      title: 'Bus Tiba di Pool Tujuan',
      description: 'Selamat datang di kota tujuan',
      status: 'pending',
      icon: 'building',
    },
    {
      id: 5,
      title: 'Driver Ojol Mengantar',
      description: 'Driver sedang mengantar Anda ke tujuan akhir',
      status: 'pending',
      icon: 'motorcycle',
    },
  ];

  const statusMap: Record<TrackingStatus, number> = {
    waiting_pickup: 0,
    driver_on_way: 1,
    arrived_at_pool: 2,
    bus_departed: 3,
    bus_arrived: 4,
    driver_dropping: 5,
    completed: 6,
  };

  const currentStep = statusMap[status];

  return steps.map((step, index) => ({
    ...step,
    status: index < currentStep ? 'completed' : index === currentStep ? 'active' : 'pending',
    time: index < currentStep ? `${5 + index}:${String(index * 15).padStart(2, '0')}` : undefined,
  }));
};

// Format harga ke Rupiah
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};
