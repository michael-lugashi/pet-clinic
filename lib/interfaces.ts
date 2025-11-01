export type PetType = 'Dog' | 'Cat' | 'Bird' | 'Fish' | 'Other';

export interface Patient {
  id: number;
  clientName: string;
  petName: string;
  phone: string;
  petAge: string;
  petType: PetType;
}
