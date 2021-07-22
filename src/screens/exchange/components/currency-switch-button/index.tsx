import { SwitchButton, StyledIcon } from "./styled";
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';

export default function CurrencySwitchButton() {

    return (
        <SwitchButton>
            <StyledIcon icon={faExchangeAlt} />
        </SwitchButton>
    );
}
