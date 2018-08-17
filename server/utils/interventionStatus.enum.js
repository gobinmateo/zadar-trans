import { Enum } from 'enumify';

class InterventionStatus extends Enum {
  static validateInterventionStatus(interventionStatus) {
    const enumValue = InterventionStatus.enumValueOf(interventionStatus);

    return (enumValue === InterventionStatus.DODIJELJENA || enumValue === InterventionStatus.OBAVLJENA || enumValue === InterventionStatus.ZAPRIMLJENA);
  }
}
InterventionStatus.initEnum(['DODIJELJENA', 'OBAVLJENA', 'ZAPRIMLJENA']);

export default InterventionStatus;
