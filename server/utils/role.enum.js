import { Enum } from 'enumify';

class Role extends Enum {
  static validateRole(role) {
    const enumValue = Role.enumValueOf(role);
    return (enumValue === Role.OPERATOR || enumValue === Role.ADMIN || enumValue === Role.MODEL);
  }
}
Role.initEnum(['OPERATOR', 'ADMIN', 'MODEL']);

export default Role;
