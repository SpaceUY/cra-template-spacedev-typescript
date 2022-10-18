import { useWeb3React } from '@web3-react/core';
import { useEffect } from 'react';
import { Select, Text } from 'design';
import { intl } from 'utilities/i18n/intl.utility';
import { genericErrorHandler } from 'helpers/error.helpers';
import { getWalletConnected, switchNetwork } from 'helpers/blockchain.helpers';
import { CHAINS_INFO } from 'connectors/networks';
const options = [
  {
    label: intl.translate({ id: 'none' }),
    value: 'none',
  },

  {
    label: intl.translate({ id: 'Harmony' }),
    value: 'harmony',
  },
];

const Blockchain = () => {
  const { account, chainId, activate, library } = useWeb3React();

  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      const walletConnected = getWalletConnected();
      if (walletConnected) {
        try {
          await activate(walletConnected);
        } catch (ex) {
          genericErrorHandler(ex);
        }
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
      <Text.h2>
        {intl.translate({ id: 'Chain id: {chainID}' }, { chainId })}
      </Text.h2>
      <br />
      <div>
        <Select
          label={intl.translate({ id: 'Change network' })}
          name="network"
          id="network"
          value={''}
          options={options}
          onChange={(evt) => {
            switchNetwork(
              library,
              evt.target.value as keyof typeof CHAINS_INFO,
            );
          }}
          variant="outlined"
        />
      </div>
    </div>
  );
};

export default Blockchain;
