import { Role } from '../value_object/Role';

const ROLE_LEVEL = [
  { name: 'ノーペア', level: 0 },
  { name: 'ワンペア', level: 1 },
  { name: 'ツーペア', level: 2 },
  { name: 'スリーカード', level: 3 },
  { name: 'ストレート', level: 4 },
  { name: 'フラッシュ', level: 5 },
  { name: 'フルハウス', level: 6 },
  { name: 'フォーカード', level: 7 },
  { name: 'ストレートフラッシュ', level: 8 },
];

export class RoleResults {
  constructor(private roles: Role[]) {}

  //TODO
  findIsStrongest(): Role {
    let currentStrongestCard = 8;
    this.roles.map((role) => {
      const thisRoleLevel = ROLE_LEVEL.find((a) => a.name === role.get()).level;
      currentStrongestCard =
        thisRoleLevel > currentStrongestCard
          ? thisRoleLevel
          : currentStrongestCard;
    });
    return new Role(
      ROLE_LEVEL.find((a) => a.level === currentStrongestCard).name,
    );
  }
}
