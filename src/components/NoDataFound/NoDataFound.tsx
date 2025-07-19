import Image from 'next/image';
import noDataFoundImage from '../../assets/no-data-found.png';

export default function NoDataFound() {
    return (
        <div className="flex items-center justify-center gap-2">
            <Image src={noDataFoundImage} alt="No Data Found" width={300} height={300} />
            NoDataFound
        </div>
    );
}
