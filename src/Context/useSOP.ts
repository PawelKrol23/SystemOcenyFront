// useSOP.ts
import { useSOP as useSOPContext } from './ContextProvider';

// Używanie hooka z kontekstu
const useSOP = () => {
  return useSOPContext();
};

export default useSOP;
