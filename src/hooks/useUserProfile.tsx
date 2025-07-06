import { UserProfileContext } from '@/components/ui/Common/User/UserProfile';
import { useContext } from 'react';

export default function useUserProfile() {
    const contextValues = useContext(UserProfileContext);

    if (!contextValues) {
        throw new Error('useUserProfile must be used within a UserProfileContext.Provider');
    }

    return contextValues;
}
