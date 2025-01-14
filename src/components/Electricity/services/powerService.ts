// services/powerService.ts
import type { PowerCommandResponse } from '../types';

class PowerService {
  private readonly API_URL = '/api/power-management';

  public async togglePower(
    buildingName: string, 
    roomNumber: string, 
    turnOn: boolean
  ): Promise<PowerCommandResponse> {
    // For demo purposes, return a mock response
    // In production, this would make an actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: `Power ${turnOn ? 'on' : 'off'} for ${buildingName}-${roomNumber}`,
          roomStatus: {
            building: buildingName,
            room: roomNumber,
            isPowered: turnOn
          }
        });
      }, 200);
    });
  }

  public async autoManagePower(
    buildingName: string, 
    roomNumber: string, 
    count: number
  ): Promise<boolean> {
    if (count <= 5) {
      await this.togglePower(buildingName, roomNumber, false);
      return false;
    }
    return true;
  }
}

export const powerService = new PowerService();