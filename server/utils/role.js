import { Enum } from 'enumify';

class Role extends Enum {}
Role.initEnum(['OPERATOR', 'ADMIN', 'MODEL']);

export default Role;
