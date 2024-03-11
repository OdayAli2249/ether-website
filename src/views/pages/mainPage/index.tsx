import './styles.scss';
import { invalidateBalanceQuery, useGetBalanceQuery } from '../../../queries/useGetBalanceQuery';
import { invalidateLastBlockNumberQuery, useGetLastBlockNumberQuery } from '../../../queries/useGetLastBlockNumberQuery';
import { noDataValue, queryOptions } from '../../../helpers/constants';
import { DataViewer, Description } from '../../components';

function MainPage() {

    const { data: balance,
        isFetching: getBalanceLoading,
        error: getBalanceError } = useGetBalanceQuery('0xdAC17F958D2ee523a2206206994597C13D831ec7', queryOptions);
    const { data: blockNumber,
        isFetching: getLastBlockNumberLoading,
        error: getLastBlockNumberError } = useGetLastBlockNumberQuery(queryOptions);

    return (
        <div className="main-page-root">
            <div className='viewers-section'>
                <Description title={'Ethereum mainnet'} text={'Ethereum mainnet, the live blockchain network, powers decentralized applications and executes smart contracts, fostering innovation in the blockchain ecosystem.'} />
                <DataViewer title={'Last Block Number'} contentText={!!getLastBlockNumberError ?
                    getLastBlockNumberError.message : !!blockNumber ? blockNumber : noDataValue}
                    contentStyle={!!getLastBlockNumberError ? 'ERROR' : 'DEFAULT'}
                    onRefresh={invalidateLastBlockNumberQuery}
                    disabled={getLastBlockNumberLoading} />
                <DataViewer title={'Balance'} contentText={!!getBalanceError ?
                    getBalanceError.message : !!balance ? balance : noDataValue}
                    contentStyle={!!getBalanceError ? 'ERROR' : 'DEFAULT'}
                    onRefresh={invalidateBalanceQuery}
                    disabled={getBalanceLoading} />
            </div>
            <div className='image-section'>
                <img src={'/ether-website/image.png'} alt="" className={'image'} />
            </div>
        </div>
    );
}

export default MainPage;
