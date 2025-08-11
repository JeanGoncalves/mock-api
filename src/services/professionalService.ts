import { Professional, ServiceCategory, WorkingDay } from "../types";
import { loadCollection, findById } from "../routes/utils";

interface ProfessionalFilters {
  service?: ServiceCategory;
  city?: string;
  minRating?: number;
  maxPrice?: number;
  sort?: string;
}

interface NearbySearchParams {
  lat: number;
  lng: number;
  radius: number;
  service?: ServiceCategory;
}

interface ProfessionalWithDistance extends Professional {
  distance: number;
}

export class ProfessionalService {
  async getProfessionals(filters: ProfessionalFilters): Promise<Professional[]> {
    const professionals = loadCollection<Professional>("professionals");
    let result = professionals.slice();

    if (filters.service) {
      result = result.filter((p) => p.services.includes(filters.service!));
    }

    if (filters.city) {
      const cityLower = filters.city.toLowerCase();
      result = result.filter((p) => p.city.toLowerCase().includes(cityLower));
    }

    if (filters.minRating !== undefined) {
      result = result.filter((p) => p.rating >= filters.minRating!);
    }

    if (filters.maxPrice !== undefined) {
      result = result.filter((p) => p.basePrice <= filters.maxPrice!);
    }

    switch (filters.sort) {
      case "price":
        result.sort((a, b) => a.basePrice - b.basePrice);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }

  async getProfessionalById(id: number): Promise<Professional | null> {
    const professionals = loadCollection<Professional>("professionals");
    return findById(professionals, id) || null;
  }

  async getWorkingHours(id: number): Promise<any[] | null> {
    const professional = await this.getProfessionalById(id);
    return professional ? professional.workingHours : null;
  }

  async getDiary(id: number, date?: string): Promise<any[] | null> {
    const professional = await this.getProfessionalById(id);
    if (!professional) return null;

    if (date) {
      return professional.diary.filter((entry) => entry.date === date);
    }

    return professional.diary;
  }

  async getAvailability(id: number, date: string): Promise<any | null> {
    const professional = await this.getProfessionalById(id);
    if (!professional) return null;

    const dayOfWeek = new Date(date).toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase() as WorkingDay;
    const workingHours = professional.workingHours.find((wh) => wh.day === dayOfWeek);

    if (!workingHours) {
      return {
        date,
        available: false,
        message: "Profissional não trabalha neste dia"
      };
    }

    const [startTime, endTime] = workingHours.hours.split("-");
    const timeSlots = [];
    let currentTime = new Date(`2000-01-01T${startTime}:00`);
    const endDateTime = new Date(`2000-01-01T${endTime}:00`);

    while (currentTime < endDateTime) {
      const timeString = currentTime.toTimeString().slice(0, 5);
      const diaryEntry = professional.diary.find(
        (entry) => entry.date === date && entry.time === timeString
      );

      const status = diaryEntry ? diaryEntry.status : "available";

      timeSlots.push({
        time: timeString,
        status: status
      });

      currentTime.setHours(currentTime.getHours() + 1);
    }

    return {
      date,
      workingHours: workingHours.hours,
      timeSlots
    };
  }

  async searchNearby(params: NearbySearchParams): Promise<ProfessionalWithDistance[]> {
    const professionals = loadCollection<Professional>("professionals");
    let result = professionals.slice();

    if (params.service) {
      result = result.filter((p) => p.services.includes(params.service!));
    }

    const professionalsWithDistance = result
      .map((p) => {
        const distance = this.calculateDistance(params.lat, params.lng, p.location.lat, p.location.lng);
        return { ...p, distance };
      })
      .filter((p) => p.distance <= params.radius)
      .sort((a, b) => a.distance - b.distance);

    return professionalsWithDistance;
  }

  async getByServiceCategory(category: ServiceCategory, city?: string): Promise<Professional[]> {
    const professionals = loadCollection<Professional>("professionals");
    let result = professionals.filter((p) => p.services.includes(category));

    if (city) {
      result = result.filter((p) => p.city.toLowerCase().includes(city.toLowerCase()));
    }

    result.sort((a, b) => b.rating - a.rating);

    return result;
  }

  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }
}
