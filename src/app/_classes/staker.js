/**
 * Deprecating in favor of member.ts
 */
export class Staker {
  poolsArray;
  totalEarned;
  totalStaked;
  totalROI;

  constructor(dto) {
    this.poolsArray = dto.poolsArray;
    this.totalEarned = +dto.totalEarned;
    this.totalStaked = +dto.totalStaked;
    this.totalROI = +dto.totalROI;
  }
}

