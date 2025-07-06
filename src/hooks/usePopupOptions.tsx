import { IPopupOptions } from '@/types';
import { useState } from 'react';

export default function usePopupOptions() {
    const [popupOptions, setPopupOptions] = useState<IPopupOptions>({
        open: false,
        closeOnDocumentClick: true,
        actionType: 'update',
        form: '',
        data: null,
        title: '',
    });
    return { popupOptions, setPopupOptions };
}
