import { City } from '@/pages/api/types/city'

export interface Airport {
    id: number;
    name: string;
    iataCode: string;
    city: City ;
}
