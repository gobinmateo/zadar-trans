import { Enum } from 'enumify';

class Role extends Enum {
  static validateRole(role) {
    const enumValue = Role.enumValueOf(role);
    return (enumValue === Role.MODEL || enumValue === Role.OPERATOR);
  }
}
Role.initEnum([ 'MODEL', 'OPERATOR' ]);

export default Role;
