import { Enum } from 'enumify';

class InterventionStatus extends Enum {
  static validateInterventionStatus(interventionStatus) {
    const enumValue = InterventionStatus.enumValueOf(interventionStatus);

    return (enumValue === InterventionStatus.ASSIGNED || enumValue === InterventionStatus.COMPLETED || enumValue === InterventionStatus.RECEIVED);
  }
}
InterventionStatus.initEnum(['ASSIGNED', 'COMPLETED', 'RECEIVED']);

export default InterventionStatus;
