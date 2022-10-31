import { useWeb3React } from '@web3-react/core';
import { CHAINS_INFO } from 'connectors/networks';
import { ChainInfo } from 'connectors/types/chain-info';
import { Select, Text } from 'design';
import { getWalletConnected, switchNetwork } from 'helpers/blockchain.helpers';
import { genericErrorHandler } from 'helpers/error.helpers';
import { useEffect, useState } from 'react';
import { intl } from 'utilities/i18n/intl.utility';
const options: {
  label: string;
  value: ChainInfo | null;
}[] = [
  {
    label: intl.translate({ id: 'Harmony' }),
    value: CHAINS_INFO.harmony,
  },
  {
    label: intl.translate({ id: 'Arbitrum One' }),
    value: CHAINS_INFO.arbitrum,
  },
];

const Blockchain = () => {
  const { account, chainId, activate, library } = useWeb3React();
  const [selectedChain, setSelectedChain] = useState<ChainInfo | null>();
  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      try {
        const walletConnected = getWalletConnected();

        if (walletConnected) {
          await activate(walletConnected);
        }
      } catch (error) {
        genericErrorHandler(error);
      }
    };
    connectWalletOnPageLoad();
  }, []);

  return (
    <div>
      <Text.h2>
        {intl.translate({ id: 'Account connected: {account}' }, { account })}
      </Text.h2>
      <br />
      <Text.p>
        {intl.translate({ id: 'Chain id: {chainId}' }, { chainId })}
      </Text.p>
      <br />
      <div>
        <Select
          label={intl.translate({ id: 'Change network' })}
          name="network"
          id="network"
          value={selectedChain}
          options={options}
          onChange={(evt) => {
            const value = evt.target.value;
            if (value) {
              console.info(value);
              switchNetwork(library, value);
              setSelectedChain(value);
            }
          }}
          variant="outlined"
        />
      </div>
    </div>
  );
};

export default Blockchain;
