
export interface Student {
  id: string;
  name: string;
  dob: Date;
  avatar?: string; // base64 string
}

export type Screen = 'welcome' | 'home' | 'addData' | 'settings';
