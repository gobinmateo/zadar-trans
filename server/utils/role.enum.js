import { Enum } from 'enumify';

class Role extends Enum {
  static validateRole(role) {
    const enumValue = Role.enumValueOf(role);
    return (enumValue === Role.ADMIN || enumValue === Role.MODEL || enumValue === Role.OPERATOR);
  }
}
Role.initEnum(['ADMIN', 'MODEL', 'OPERATOR']);

export default Role;
