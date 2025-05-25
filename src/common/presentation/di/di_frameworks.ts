import { SwalManager } from '@/common/domain/models/SwalManager';
import { SwalDataManager } from '@/common/singletons/SwalDataManager';

const swalManagerInstance = new SwalDataManager();
export const swalDataManager: () => SwalManager = () => swalManagerInstance;
