import { useWeb3React } from '@web3-react/core';
import ConnectModal from 'examples/components/ConnectModal/ConnectModal';
import { useEffect } from 'react';
import { Select, Text } from 'design';
import { intl } from 'utilities/i18n/intl.utility';
import { genericErrorHandler } from 'helpers/error.helpers';
import { getWalletConnected, switchNetwork } from 'helpers/blockchain.helpers';

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
      <ConnectModal />
      <Text.h2>
        {intl.translate({ id: 'Account connected:' })} {account}
      </Text.h2>

      <br />
      <Text.h2>
        {intl.translate({ id: 'Chain id:' })} {chainId}
      </Text.h2>
      <br />
      <div>
        <Select
          label={intl.translate({ id: 'Change network' })}
          name="network"
          id="network"
          value={''}
          options={[
            {
              label: intl.translate({ id: 'none' }),
              value: 'none',
            },

            {
              label: intl.translate({ id: 'Harmony' }),
              value: 'harmony',
            },
          ]}
          onChange={(evt) => {
            switchNetwork(library, evt.target.value);
          }}
          variant="outlined"
        />
      </div>
    </div>
  );
};

export default Blockchain;
