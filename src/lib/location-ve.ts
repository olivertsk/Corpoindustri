export const states = [
  { value: 'amazonas', label: 'Amazonas' },
  { value: 'anzoategui', label: 'Anzoátegui' },
  { value: 'apure', label: 'Apure' },
  { value: 'aragua', label: 'Aragua' },
  { value: 'barinas', label: 'Barinas' },
  { value: 'bolivar', label: 'Bolívar' },
  { value: 'carabobo', label: 'Carabobo' },
  { value: 'cojedes', label: 'Cojedes' },
  { value: 'delta_amacuro', label: 'Delta Amacuro' },
  { value: 'distrito_capital', label: 'Distrito Capital' },
  { value: 'falcon', label: 'Falcón' },
  { value: 'guarico', label: 'Guárico' },
  { value: 'lara', label: 'Lara' },
  { value: 'merida', label: 'Mérida' },
  { value: 'miranda', label: 'Miranda' },
  { value: 'monagas', label: 'Monagas' },
  { value: 'nuevo_esparta', label: 'Nueva Esparta' },
  { value: 'portuguesa', label: 'Portuguesa' },
  { value: 'sucre', label: 'Sucre' },
  { value: 'tachira', label: 'Táchira' },
  { value: 'trujillo', label: 'Trujillo' },
  { value: 'vargas', label: 'La Guaira' },
  { value: 'yaracuy', label: 'Yaracuy' },
  { value: 'zulia', label: 'Zulia' },
];

export const cities: Record<string, { value: string; label: string }[]> = {
  amazonas: [{ value: 'puerto_ayacucho', label: 'Puerto Ayacucho' }],
  anzoategui: [
    { value: 'barcelona', label: 'Barcelona' },
    { value: 'puerto_la_cruz', label: 'Puerto La Cruz' },
    { value: 'el_tigre', label: 'El Tigre' },
  ],
  apure: [
    { value: 'san_fernando', label: 'San Fernando de Apure' },
    { value: 'guasdualito', label: 'Guasdualito' },
  ],
  aragua: [
    { value: 'maracay', label: 'Maracay' },
    { value: 'la_victoria', label: 'La Victoria' },
  ],
  barinas: [{ value: 'barinas', label: 'Barinas' }],
  bolivar: [
    { value: 'ciudad_bolivar', label: 'Ciudad Bolívar' },
    { value: 'ciudad_guayana', label: 'Ciudad Guayana' },
  ],
  carabobo: [
    { value: 'valencia', label: 'Valencia' },
    { value: 'puerto_cabello', label: 'Puerto Cabello' },
  ],
  cojedes: [{ value: 'san_carlos', label: 'San Carlos' }],
  delta_amacuro: [{ value: 'tucupita', label: 'Tucupita' }],
  distrito_capital: [{ value: 'caracas', label: 'Caracas' }],
  falcon: [
    { value: 'coro', label: 'Coro' },
    { value: 'punto_fijo', label: 'Punto Fijo' },
  ],
  guarico: [
    { value: 'san_juan_de_los_morros', label: 'San Juan de los Morros' },
  ],
  lara: [
    { value: 'barquisimeto', label: 'Barquisimeto' },
    { value: 'cabudare', label: 'Cabudare' },
  ],
  merida: [{ value: 'merida', label: 'Mérida' }],
  miranda: [
    { value: 'los_teques', label: 'Los Teques' },
    { value: 'guarenas', label: 'Guarenas' },
    { value: 'guatire', label: 'Guatire' },
  ],
  monagas: [{ value: 'maturin', label: 'Maturín' }],
  nuevo_esparta: [
    { value: 'la_asuncion', label: 'La Asunción' },
    { value: 'porlamar', label: 'Porlamar' },
  ],
  portuguesa: [{ value: 'guanare', label: 'Guanare' }],
  sucre: [
    { value: 'cumana', label: 'Cumaná' },
    { value: 'carupano', label: 'Carúpano' },
  ],
  tachira: [
    { value: 'san_cristobal', label: 'San Cristóbal' },
    { value: 'rubio', label: 'Rubio' },
  ],
  trujillo: [{ value: 'trujillo', label: 'Trujillo' }],
  vargas: [{ value: 'la_guaira', label: 'La Guaira' }],
  yaracuy: [{ value: 'san_felipe', label: 'San Felipe' }],
  zulia: [
    { value: 'maracaibo', label: 'Maracaibo' },
    { value: 'cabimas', label: 'Cabimas' },
  ],
};

export const findState = (state?: string) => {
  const foundState = states.find((s) => s.value === state);
  return foundState ? foundState.label : 'N/A';
};

export const findCity = (state?: string, city?: string) => {
  if (state) {
    const foundCities = cities[state] || [];
    const foundCity = foundCities.find((c) => c.value === city);
    return foundCity ? foundCity.label : 'N/A';
  }
  return 'N/A';
};
